import React, { useState } from 'react';
import { Table, Icon, Modal, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import DiagnosisSymptomInput from './DiagnosisSymptomInput';
import Diagnosis from 'classes/Diagnosis.class';
import DiagnosisInputRow from './DiagnosisInputRow';
import DiagnosisParentInput from './DiagnosisParentInput';
import SymptomTag from './SymptomTag';
import Highlighter from 'react-highlighter';
import { DiagnosisSymptom } from 'types/generated';
import DiagnosisIncludingInput from './DiagnosisIncludingInput';
import DiagnosisExcludingInput from './DiagnosisExcludingInput';
import { getTopParents, addedSymptoms } from 'utils/utils';
import _ from 'lodash';

const Break = styled.div`
  flex-basis: 100%;
  border-bottom: 1px solid lightgrey;
  height: 5px;
  padding: 5px;
`;

export const Tag = styled.span<{ active?: boolean; notParent?: boolean }>`
  border-radius: 5px;
  background-color: ${(props) =>
    props.active ? '#0089e0' : props.notParent ? '#ffdd8f' : 'white'};
  padding: 3px 10px;
  color: ${(props) => (props.active ? 'white' : 'black')};
  margin-left: 5px;
  margin-top: 5px;
  cursor: pointer;
  border: ${(props) => (props.active ? null : '1px dashed black')};
  white-space: nowrap;

  :hover {
    border: 1px solid black;
  }
`;

export interface DiagnosisTableRowProps {
  diagnosis: Diagnosis;
  search: String;
}

const DiagnosisTableRow: React.SFC<DiagnosisTableRowProps> = ({ diagnosis, search }) => {
  const [adding, setAdding] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const allSymptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const selectedIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const symptoms = diagnosis.symptoms.filter(
    (s) => (s.point > 0 || !s.point) && s.symptom.parents.length === 0
  );
  const parents = getTopParents(diagnosis);
  const added = addedSymptoms(diagnosis);
  const excessSymptoms = allSymptoms.filter(
    (symp) =>
      !_.unionBy(
        symptoms.map((s) => s.symptom),
        parents,
        added,
        (s) => s.id
      )
        .map((s) => s.id)
        .includes(symp.id) && selectedIds.includes(symp.id)
  );

  const sorter = (a: DiagnosisSymptom, b: DiagnosisSymptom) => {
    return a.symptom.name.localeCompare(b.symptom.name);
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

  const handleRemoveExcluding = async (excludingId: number) => {
    await Diagnosis.removeExcluding(diagnosis.id, excludingId);
  };

  const handleRemoveIncluding = async (includingId: number) => {
    await Diagnosis.removeIncluding(diagnosis.id, includingId);
  };

  const createExcess = () => {
    const excess = excessSymptoms.map((s) => {
      const exists = diagnosis.symptoms.find((symp) => symp.symptom.id === s.id);
      return <SymptomTag excess diagnosis={diagnosis} symptom={s} diagnosisSymptom={exists} />;
    });

    if (excess.length === 0)
      return <Icon style={{ marginLeft: '5px', alignSelf: 'center' }} name="check" color="green" />;
    return excess;
  };

  const isAchieved = (d: Diagnosis) => {
    const diagnosis = diagnoses.find((diag) => diag.id === d.id);
    if (hasConflict(diagnosis)) return false;
    const sum = chosenSymptoms(diagnosis).reduce((sum, s) => (sum += s?.point || 0), 0);
    return sum >= 100;
  };

  const createAchieved = () => {
    const sum = diagnosis.symptoms
      .filter((s) => selectedIds.includes(s.symptom.id))
      .reduce((sum, s) => (sum += s?.point || 0), 0);
    if (hasConflict(diagnosis))
      return (
        <>
          <Icon name="close" color="red" />
          <br />
          Udelukket grundet konflikt.
          <br />
          {sum}
        </>
      );
    return sum >= 100 ? (
      <>
        <Icon name="check" color="green" /> {sum}
      </>
    ) : (
      <>
        <Icon name="close" color="red" /> {sum}
      </>
    );
  };

  const hasConflict = (d: Diagnosis) => {
    if (
      d.excluding.some((d) => isAchieved(d)) ||
      d.including.some((d) => !isAchieved(d)) ||
      d.symptoms.filter((s) => selectedIds.includes(s.symptom.id)).some((s) => s.point < 0)
    )
      return true;
    return chosenSymptoms(d).some((s) => s.point < 0);
  };

  const chosenSymptoms = (d: Diagnosis) => {
    return d.symptoms.filter((s) => selectedIds.includes(s.symptom.id));
  };

  if (isEditing) return <DiagnosisInputRow diagnosis={diagnosis} setEditing={setEditing} />;
  return (
    <>
      <Table.Row>
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
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {diagnosis.including
              .map((i) => (
                <Tag active={isAchieved(i)}>
                  {diagnoses.find((d) => d.id === i.id).name}
                  {user && (
                    <>
                      {' '}
                      <Icon onClick={() => handleRemoveIncluding(i.id)} name="close" color="grey" />
                    </>
                  )}
                </Tag>
              ))
              .concat(user && <DiagnosisIncludingInput diagnosis={diagnosis} />)}
          </div>
        </Table.Cell>
        <Table.Cell>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {diagnosis.excluding
              .map((e) => (
                <Tag active={isAchieved(e)}>
                  {diagnoses.find((d) => d.id === e.id).name}
                  {user && (
                    <>
                      {' '}
                      <Icon onClick={() => handleRemoveExcluding(e.id)} name="close" color="grey" />
                    </>
                  )}
                </Tag>
              ))
              .concat(user && <DiagnosisExcludingInput diagnosis={diagnosis} />)}
          </div>
        </Table.Cell>
        <Table.Cell>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {diagnosis.parents
              .map((p) => (
                <Tag active={isAchieved(p)}>
                  {diagnoses.find((d) => d.id === p.id).name}
                  {user && (
                    <>
                      <Icon onClick={() => handleRemoveParent(p.id)} name="close" color="grey" />
                    </>
                  )}
                </Tag>
              ))
              .concat(user && <DiagnosisParentInput diagnosis={diagnosis} />)}
          </div>
        </Table.Cell>
        <Table.Cell textAlign="center">{createAchieved()}</Table.Cell>
        <Table.Cell>
          {chosenSymptoms(diagnosis).length} /{' '}
          {symptoms.filter((s) => !s.point || s.point > 0).length} (
          {(
            (chosenSymptoms(diagnosis).length /
              symptoms.filter((s) => !s.point || s.point > 0).length || 0) * 100
          ).toFixed(0)}{' '}
          %)
        </Table.Cell>
        {user && (
          <Table.Cell>
            <Button.Group fluid>
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
            </Button.Group>
          </Table.Cell>
        )}
      </Table.Row>
      <Table.Row>
        <Table.Cell style={{ border: '1px solid #e3e3e3' }} colSpan={8}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {symptoms
              .slice()
              .sort(sorter)
              .map((s: DiagnosisSymptom) => (
                <SymptomTag diagnosisSymptom={s} diagnosis={diagnosis} />
              ))
              .concat(
                ..._.unionBy(parents, added, 'id').map((p) => (
                  <SymptomTag symptom={p} diagnosis={diagnosis} key={p.id} />
                ))
              )
              .concat(
                user &&
                  (adding ? (
                    <DiagnosisSymptomInput diagnosis={diagnosis} setAdding={setAdding} />
                  ) : (
                    <Tag onClick={() => setAdding(true)}>+ Tilføj symptom</Tag>
                  ))
              )
              .concat(
                <>
                  <Break />
                  <span style={{ alignSelf: 'center' }}>Ikke matchende symptomer: </span>
                  {createExcess()}
                </>
              )}
          </div>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

export default DiagnosisTableRow;
