import React, { useState } from 'react';
import { Table, Icon, Modal, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Symptom from 'classes/Symptom.class';
import DiagnosisSymptomInput from './DiagnosisSymptomInput';
import Diagnosis from 'classes/Diagnosis.class';
import DiagnosisInputRow from './DiagnosisInputRow';
import DiagnosisParentInput from './DiagnosisParentInput';
import SymptomTag from './SymptomTag';

export interface DiagnosisTableRowProps {
  diagnosis: Diagnosis;
}

export const Tag = styled.span<{ active?: boolean; notParent?: boolean }>`
  border-radius: 5px;
  background-color: ${(props) => (props.active ? '#0089e0' : props.notParent ? '#ffdd8f' : null)};
  padding: 3px 10px;
  color: ${(props) => (props.active ? 'white' : null)};
  margin-left: 5px;
  margin-top: 5px;
  cursor: pointer;
  border: ${(props) => (props.active ? null : '1px dashed black')};

  :hover {
    border: 1px solid black;
  }
`;

const DiagnosisTableRow: React.SFC<DiagnosisTableRowProps> = ({ diagnosis }) => {
  const [adding, setAdding] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const symptomIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const symptoms = diagnosis.symptoms.concat(
    diagnoses
      .filter((d) => d.children.map((p) => p.id).includes(diagnosis.id))
      .flatMap((d) =>
        d.symptoms.filter((s) => !diagnosis.symptoms.map((symp) => symp.id).includes(s.id))
      )
  );
  const pickedSymptoms = diagnosis.symptoms.filter((s) => symptomIds.includes(s.id));

  const sorter = (a: Symptom, b: Symptom) => {
    return a.name.localeCompare(b.name);
  };

  const handleRemove = async () => {
    setIsDeleting(true);
    await Diagnosis.remove(diagnosis.id);
    setDeleteModal(false);
    setIsDeleting(false);
  };

  const handleRemoveParent = async (parentId: number) => {
    await Diagnosis.removeParent(diagnosis.id, parentId);
  };

  if (isEditing) return <DiagnosisInputRow diagnosis={diagnosis} setEditing={setEditing} />;
  return (
    <>
      <Table.Row>
        <Table.Cell>{diagnosis.name}</Table.Cell>
        <Table.Cell>{diagnosis.icdCode}</Table.Cell>
        <Table.Cell>{diagnosis.description}</Table.Cell>
        <Table.Cell>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {diagnosis.parents
              .map((p) => (
                <Tag>
                  {diagnoses.find((d) => d.id === p.id).name}{' '}
                  <Icon onClick={() => handleRemoveParent(p.id)} name="close" color="grey" />
                </Tag>
              ))
              .concat(user && <DiagnosisParentInput diagnosis={diagnosis} />)}
          </div>
        </Table.Cell>
        <Table.Cell>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {symptoms
              .slice()
              .sort(sorter)
              .map((s) => <SymptomTag symptom={s} diagnosis={diagnosis} />)
              .concat(
                user &&
                  (adding ? (
                    <DiagnosisSymptomInput diagnosis={diagnosis} setAdding={setAdding} />
                  ) : (
                    <Tag onClick={() => setAdding(true)}>+ Tilføj symptom</Tag>
                  ))
              )}
          </div>
        </Table.Cell>
        <Table.Cell>
          {pickedSymptoms.length} / {symptoms.length}
        </Table.Cell>
        {user && (
          <Table.Cell>
            <Button onClick={() => setEditing(true)} basic color="orange">
              Rediger
            </Button>
            <Modal
              open={deleteModal}
              trigger={
                <Button onClick={() => setDeleteModal(true)} basic color="red">
                  Slet
                </Button>
              }
            >
              <Modal.Header>Vil du slette {diagnosis.name}?</Modal.Header>
              <Modal.Actions>
                <Button basic color="black" onClick={() => setDeleteModal(false)}>
                  <Icon name="close" /> Nej
                </Button>
                <Button
                  loading={isDeleting}
                  disabled={isDeleting}
                  basic
                  color="red"
                  onClick={handleRemove}
                >
                  <Icon name="trash" /> Ja
                </Button>
              </Modal.Actions>
            </Modal>
          </Table.Cell>
        )}
      </Table.Row>
    </>
  );
};

export default DiagnosisTableRow;
