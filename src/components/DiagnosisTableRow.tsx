import React, { useState, useContext } from 'react';
import { Table } from 'semantic-ui-react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import GroupSymptomInput from './DiagnosisSymptomInput';
import DiagnosisInputRow from './DiagnosisInputRow';
import Highlighter from 'react-highlighter';
import { DiagnosisContext } from './DiagnosisTable';
import DiagnosisSymptomTags from './DiagnosisSymptomTags';
import DiagnosisParentTags from './DiagnosisParentTags';
import ExcessSymptoms from './ExcessSymptoms';
import DiagnosisActions from './DiagnosisActions';
import DiagnosisAchieved from './DiagnosisAchieved';
import SymptomCount from './SymptomCount';

const Break = styled.div`
  flex-basis: 100%;
  border-bottom: 1px solid lightgrey;
  height: 5px;
  padding: 5px;
`;

export interface DiagnosisTableRowProps {
  search: String;
  index: number;
}

const DiagnosisTableRow: React.SFC<DiagnosisTableRowProps> = ({ search, index }) => {
  const [isEditing, setEditing] = useState(false);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const diagnosis = useContext(DiagnosisContext);

  if (isEditing) return <DiagnosisInputRow diagnosis={diagnosis} setEditing={setEditing} />;
  return (
    <>
      <Table.Row style={index % 2 !== 0 ? { backgroundColor: '#ededed' } : null}>
        <Table.Cell rowSpan={2}>
          <Highlighter search={search}>{diagnosis.name}</Highlighter>
        </Table.Cell>
        <Table.Cell textAlign="center">
          <Highlighter search={search}>{diagnosis.icdCode}</Highlighter>
        </Table.Cell>
        <Table.Cell>
          <Highlighter search={search}>{diagnosis.description}</Highlighter>
        </Table.Cell>
        <Table.Cell>
          <DiagnosisParentTags />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <DiagnosisAchieved />
        </Table.Cell>
        <Table.Cell>
          <SymptomCount />
        </Table.Cell>
        {user && (
          <Table.Cell>
            <DiagnosisActions handleEdit={setEditing} />
          </Table.Cell>
        )}
      </Table.Row>
      <Table.Row style={index % 2 !== 0 ? { backgroundColor: '#ededed' } : null}>
        <Table.Cell style={{ border: '1px solid #e3e3e3' }} colSpan={8}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <DiagnosisSymptomTags />
          </div>
          {user && (
            <>
              <GroupSymptomInput />
            </>
          )}
          <hr />
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <ExcessSymptoms />
          </div>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default DiagnosisTableRow;
