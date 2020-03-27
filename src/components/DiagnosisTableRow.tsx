import React from 'react';
import { Table, Popup } from 'semantic-ui-react';
import { Diagnosis } from 'types/generated';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Symptom from 'classes/Symptom.class';

export interface DiagnosisTableRowProps {
  diagnosis: Diagnosis;
}

const Tag = styled.span`
  border-radius: 5px;
  background-color: ${(props) => props.color || '#0089e0'};
  padding: 3px 10px;
  color: white;
  margin-left: 5px;
  cursor: pointer;

  :hover {
    border: 1px solid black;
  }
`;

const DiagnosisTableRow: React.SFC<DiagnosisTableRowProps> = ({ diagnosis }) => {
  const symptomIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const symptoms = diagnosis.symptoms.filter((s) => symptomIds.includes(s.id));

  const handlePick = (id: number) => {
    Symptom.pick(id);
  };

  return (
    <Table.Row>
      <Table.Cell width={4}>{diagnosis.name}</Table.Cell>
      <Table.Cell>{diagnosis.description}</Table.Cell>
      <Table.Cell>
        {diagnosis.symptoms.map((s) => (
          <Popup
            position="top center"
            disabled={!s.description}
            trigger={
              <Tag onClick={() => handlePick(s.id)} color={!symptomIds.includes(s.id) && 'red'}>
                {s.name}
              </Tag>
            }
          >
            {s.description}
          </Popup>
        ))}
      </Table.Cell>
      <Table.Cell>
        {symptoms.length} / {diagnosis.symptoms.length}
      </Table.Cell>
    </Table.Row>
  );
};

export default DiagnosisTableRow;
