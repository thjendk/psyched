import React, { useEffect, useState } from 'react';
import { Table, Input } from 'semantic-ui-react';
import DiagnosisTableRow from './DiagnosisTableRow';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import LoadingPage from './misc/LoadingPage';
import Diagnosis from 'classes/Diagnosis.class';
import DiagnosisInputRow from './DiagnosisInputRow';
import _ from 'lodash';
export const DiagnosisContext = React.createContext<Diagnosis>(null);

export interface DiagnosisTableProps {}

const DiagnosisTable: React.SFC<DiagnosisTableProps> = () => {
  const [search, setSearch] = useState('');
  const user = useSelector((state: ReduxState) => state.auth.user);
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms, _.isEqual);
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
  const selectedIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);

  const sorter = (a: Diagnosis, b: Diagnosis) => {
    const points = (d: Diagnosis) => {
      const sum = d.symptoms
        .filter((s) => selectedIds.includes(s.symptom.id))
        .reduce((sum, s) => (sum += s?.point || 0), 0);
      return sum / 100;
    };

    const numberOfSymptoms = (d: Diagnosis) => {
      return d.symptoms.filter((s) => selectedIds.includes(s.symptom.id)).length;
    };

    if (points(a) < points(b)) return 1;
    if (points(a) > points(b)) return -1;
    if (numberOfSymptoms(a) < numberOfSymptoms(b)) return 1;
    if (numberOfSymptoms(a) > numberOfSymptoms(b)) return -1;
    return a.icdCode.localeCompare(b.icdCode);
  };

  useEffect(() => {
    Diagnosis.fetch();
  }, []);

  if (!diagnoses) return <LoadingPage />;
  return (
    <div style={{ marginTop: '1em', overflowX: 'auto' }}>
      <Table celled size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={user ? 9 : 8}>
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
            <Table.HeaderCell style={{ width: '130px' }}>Krævet</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '130px' }}>Udelukkende</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '130px' }}>Lignende</Table.HeaderCell>
            <Table.HeaderCell width={1}>Opfyldt</Table.HeaderCell>
            <Table.HeaderCell width={1}>Antal</Table.HeaderCell>
            {user && <Table.HeaderCell width={1}>Muligheder</Table.HeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {diagnoses
            .slice()
            .sort(sorter)
            .map((d, i) => (
              <DiagnosisContext.Provider value={d}>
                <DiagnosisTableRow index={i} search={search} />
              </DiagnosisContext.Provider>
            ))
            .concat(user && <DiagnosisInputRow />)}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DiagnosisTable;
