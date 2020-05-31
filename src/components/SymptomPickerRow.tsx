import React, { useState } from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlighter';
import { Loader, Icon, Modal, Button } from 'semantic-ui-react';
import Symptom from 'classes/Symptom.class';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import SymptomPickerInput from './SymptomPickerInput';
import SymptomParentTag from './SymptomParentTag';
import SymptomParentInput from './SymptomParentInput';

export const SymptomPickerRowContainer = styled.p<{ active?: boolean }>`
  border-bottom: 0px;
  padding: 5px 5px;
  margin: 0;
  border-bottom: 1px solid grey;
  background-color: ${(props) => (props.active ? '#c5fac5' : null)};

  /* :nth-child(odd) {
    background-color: #ededed;
  } */

  :hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`;

export interface SymptomPickerRowProps {
  search: string;
  symptom: Symptom;
}

const SymptomPickerRow: React.SFC<SymptomPickerRowProps> = ({ search, symptom }) => {
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const selectedIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);

  const handleRemove = async () => {
    setRemoving(true);
    await Symptom.remove(symptom.id);
    setModalOpen(false);
    setRemoving(false);
  };

  const handlePick = () => {
    Symptom.pick(symptom.id);
  };

  if (editing) return <SymptomPickerInput symptom={symptom} setEditing={setEditing} />;
  return (
    <>
      <SymptomPickerRowContainer active={selectedIds.includes(symptom.id)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div onClick={handlePick} style={{ width: '100%' }}>
            <Highlight search={search}>{symptom.name.toTitleCase()}</Highlight>
            {symptom.description && (
              <>
                <br />
                <Highlight style={{ color: 'grey' }} search={search}>
                  {symptom.description}
                </Highlight>
              </>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ whiteSpace: 'nowrap' }}>
              {user && !symptom.parent && <SymptomParentInput symptom={symptom} />}
              {symptom.parent && (
                <SymptomParentTag symptom={symptom} parentId={symptom.parent.id} />
              )}
            </div>
            {user && (
              <div style={{ marginLeft: '10px', whiteSpace: 'nowrap' }}>
                <Icon onClick={() => setEditing(true)} name="wrench" color="grey" />
                {removing ? (
                  <Loader active inline size="tiny" />
                ) : (
                  <Modal
                    open={modalOpen}
                    trigger={<Icon name="close" onClick={() => setModalOpen(true)} color="grey" />}
                  >
                    <Modal.Header>Vil du slette {symptom.name}?</Modal.Header>
                    <Modal.Actions>
                      <Button onClick={() => setModalOpen(false)} basic color="black">
                        <Icon name="close" /> Nej
                      </Button>
                      <Button
                        loading={removing}
                        disabled={removing}
                        onClick={handleRemove}
                        basic
                        color="red"
                      >
                        <Icon name="trash" /> Ja
                      </Button>
                    </Modal.Actions>
                  </Modal>
                )}
              </div>
            )}
          </div>
        </div>
      </SymptomPickerRowContainer>
      {symptom.children
        .map((s) => symptoms.find((symp) => symp.id === s.id))
        .map((s) => (
          <div style={{ marginLeft: '1em', borderLeft: '1px solid lightgrey' }}>
            <SymptomPickerRow symptom={s} search={search} />
          </div>
        ))}
    </>
  );
};

export default SymptomPickerRow;
