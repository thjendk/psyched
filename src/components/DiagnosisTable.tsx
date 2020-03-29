import React, { useEffect, useState } from 'react';
import { Table, Input } from 'semantic-ui-react';
import DiagnosisTableRow from './DiagnosisTableRow';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import LoadingPage from './misc/LoadingPage';
import Diagnosis from 'classes/Diagnosis.class';
import DiagnosisInputRow from './DiagnosisInputRow';
import { totalSymptoms } from 'utils/utils';

export interface DiagnosisTableProps {}

const DiagnosisTable: React.SFC<DiagnosisTableProps> = () => {
  const [search, setSearch] = useState('');
  const user = useSelector((state: ReduxState) => state.auth.user);
  const diagnoses = useSelector((state: ReduxState) =>
    state.diagnoses.diagnoses?.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase()) ||
        d.icdCode.toLowerCase().includes(search.toLowerCase())
    )
  );
  const symptomIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);

  const sorter = (a: Diagnosis, b: Diagnosis) => {
    const points = (d: Diagnosis) => {
      const selected = totalSymptoms(d).filter(
        (s) => symptomIds.includes(s.symptom.id) && s.point > 0
      );
      if (selected.length === 0) return 0;
      const selectedSum = selected.reduce((sum, s) => (sum += s.point), 0);
      const totalSum = totalSymptoms(d).reduce((sum, s) => (sum += s.point), 0);
      if (selectedSum === 0) return 0;

      return selectedSum / totalSum;
    };

    if (points(a) < points(b)) return 1;
    if (points(a) > points(b)) return -1;
    return a.icdCode.localeCompare(b.icdCode);
  };

  useEffect(() => {
    Diagnosis.fetch();
  }, []);

  if (!diagnoses) return <LoadingPage />;
  return (
    <div style={{ marginTop: '1em' }}>
      <Table celled size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={user ? 8 : 7}>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Søg"
                fluid
              />
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Diagnose</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '70px' }}>ICD-10</Table.HeaderCell>
            <Table.HeaderCell width={4}>Beskrivelse</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '130px' }}>Krævet</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '130px' }}>Udelukkende</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '130px' }}>Lignende</Table.HeaderCell>
            <Table.HeaderCell>Symptomer</Table.HeaderCell>
            <Table.HeaderCell>Opfyldt</Table.HeaderCell>
            <Table.HeaderCell>Antal</Table.HeaderCell>
            {user && <Table.HeaderCell>Muligheder</Table.HeaderCell>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {diagnoses
            .slice()
            .sort(sorter)
            .map((d) => <DiagnosisTableRow search={search} diagnosis={d} />)
            .concat(user && <DiagnosisInputRow />)}
        </Table.Body>
      </Table>
    </div>
  );
};

export default DiagnosisTable;
