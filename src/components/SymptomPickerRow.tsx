import React, { useState } from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlighter';
import { Loader, Icon, Modal, Button } from 'semantic-ui-react';
import Symptom from 'classes/Symptom.class';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import SymptomPickerInput from './SymptomPickerInput';

export const SymptomPickerRowContainer = styled.p`
  border: 1px solid lightgrey;
  border-bottom: 0px;
  padding: 5px 5px;
  margin: 0;

  :last-child {
    border-bottom: 1px solid lightgrey;
  }

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
  const user = useSelector((state: ReduxState) => state.auth.user);
  const [removing, setRemoving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
    <SymptomPickerRowContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ flexGrow: 1 }} onClick={handlePick}>
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
        {user && (
          <div>
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
    </SymptomPickerRowContainer>
  );
};

export default SymptomPickerRow;
