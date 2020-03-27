import React, { useState } from 'react';
import { Table, Popup } from 'semantic-ui-react';
import { Diagnosis } from 'types/generated';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Symptom from 'classes/Symptom.class';
import DiagnosisInput from './DiagnosisInput';
import DiagnosisSymptomInput from './DiagnosisSymptomInput';

export interface DiagnosisTableRowProps {
  diagnosis: Diagnosis;
}

const Tag = styled.span<{ active?: boolean }>`
  border-radius: 5px;
  background-color: ${(props) => (props.active ? '#0089e0' : null)};
  padding: 3px 10px;
  color: ${(props) => (props.active ? 'white' : null)};
  margin-left: 5px;
  cursor: pointer;
  border: ${(props) => (props.active ? null : '1px dashed black')};

  :hover {
    border: 1px solid black;
  }
`;

const DiagnosisTableRow: React.SFC<DiagnosisTableRowProps> = ({ diagnosis }) => {
  const [adding, setAdding] = useState(false);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const symptomIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const symptoms = diagnosis.symptoms.filter((s) => symptomIds.includes(s.id));

  const handlePick = (id: number) => {
    Symptom.pick(id);
  };

  const sorter = (a: Symptom, b: Symptom) => {
    return a.name.localeCompare(b.name);
  };

  return (
    <Table.Row>
      <Table.Cell width={4}>{diagnosis.name}</Table.Cell>
      <Table.Cell>{diagnosis.description}</Table.Cell>
      <Table.Cell>
        {diagnosis.symptoms
          .slice()
          .sort(sorter)
          .map((s) => (
            <Popup
              position="top center"
              disabled={!s.description}
              trigger={
                <Tag onClick={() => handlePick(s.id)} active={symptomIds.includes(s.id)}>
                  {s.name.toTitleCase()}
                </Tag>
              }
            >
              {s.description}
            </Popup>
          ))
          .concat(
            user &&
              (adding ? (
                <DiagnosisSymptomInput diagnosis={diagnosis} setAdding={setAdding} />
              ) : (
                <Tag onClick={() => setAdding(true)}>+ Tilføj symptom</Tag>
              ))
          )}
      </Table.Cell>
      <Table.Cell>
        {symptoms.length} / {diagnosis.symptoms.length}
      </Table.Cell>
    </Table.Row>
  );
};

export default DiagnosisTableRow;
