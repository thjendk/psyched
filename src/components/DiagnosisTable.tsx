import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import DiagnosisTableRow from './DiagnosisTableRow';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import LoadingPage from './misc/LoadingPage';
import Diagnosis from 'classes/Diagnosis.class';

export interface DiagnosisTableProps {}

const DiagnosisTable: React.SFC<DiagnosisTableProps> = () => {
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const symptomIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);

  const sorter = (a: Diagnosis, b: Diagnosis) => {
    return (
      b.symptoms.filter((s) => symptomIds.includes(s.id)).length -
      a.symptoms.filter((s) => symptomIds.includes(s.id)).length
    );
  };

  useEffect(() => {
    Diagnosis.fetch();
  }, []);

  if (!diagnoses) return <LoadingPage />;
  return (
    <Table celled>
      <Table.Header>
        <Table.HeaderCell>Diagnose</Table.HeaderCell>
        <Table.HeaderCell>Beskrivelse</Table.HeaderCell>
        <Table.HeaderCell>Symptomer</Table.HeaderCell>
        <Table.HeaderCell>Opfyldt</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {diagnoses
          .slice()
          .sort(sorter)
          .map((d) => (
            <DiagnosisTableRow diagnosis={d} />
          ))}
      </Table.Body>
    </Table>
  );
};

export default DiagnosisTable;
