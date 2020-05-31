import React, { useEffect, useState } from 'react';
import { Table, Input } from 'semantic-ui-react';
import DiagnosisTableRow from './DiagnosisTableRow';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import LoadingPage from './misc/LoadingPage';
import Diagnosis from 'classes/Diagnosis.class';
import DiagnosisInputRow from './DiagnosisInputRow';
import _ from 'lodash';
import { diagnosisSymptoms } from 'utils/utils';
import Group from 'classes/Group.class';
export const DiagnosisContext = React.createContext<Diagnosis>(null);

export interface DiagnosisTableProps {}

const DiagnosisTable: React.SFC<DiagnosisTableProps> = () => {
  const [search, setSearch] = useState('');
  const user = useSelector((state: ReduxState) => state.auth.user);
  const diagnoses = useSelector(
    (state: ReduxState) =>
      state.diagnoses.diagnoses?.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.description.toLowerCase().includes(search.toLowerCase()) ||
          d.icdCode.toLowerCase().includes(search.toLowerCase())
      ),
    _.isEqual
  );
  const groups = useSelector((state: ReduxState) => state.groups.groups);
  const selectedIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);

  const sorter = (a: Diagnosis, b: Diagnosis) => {
    const numberOfSymptoms = (d: Diagnosis) => {
      return diagnosisSymptoms(d).reduce(
        (sum, s) => (sum += selectedIds.includes(s.id) ? 1 : 0),
        0
      );
    };

    if (numberOfSymptoms(a) < numberOfSymptoms(b)) return 1;
    if (numberOfSymptoms(a) > numberOfSymptoms(b)) return -1;
    return a.icdCode.localeCompare(b.icdCode);
  };

  useEffect(() => {
    Diagnosis.fetch();
    Group.fetchAll();
  }, []);

  if (diagnoses.length === 0 || groups.length === 0) return <LoadingPage />;
  return (
    <div style={{ marginTop: '1em' }}>
      <Table celled size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={user ? 7 : 6}>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Søg"
                fluid
              />
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell width={1}>Diagnose</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '70px' }}>ICD-10</Table.HeaderCell>
            <Table.HeaderCell width={4}>Beskrivelse</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '130px' }}>Fælles</Table.HeaderCell>
            <Table.HeaderCell width={1}>Opfyldt</Table.HeaderCell>
            <Table.HeaderCell width={1}>Antal</Table.HeaderCell>
            {user && <Table.HeaderCell width={1}>Muligheder</Table.HeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {diagnoses.sort(sorter).map((d, i) => (
            <DiagnosisContext.Provider value={d}>
              <DiagnosisTableRow index={i} search={search} />
            </DiagnosisContext.Provider>
          ))}
          {user && <DiagnosisInputRow />}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DiagnosisTable;
