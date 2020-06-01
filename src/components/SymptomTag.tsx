import React, { useState, useContext } from 'react';
import Symptom from 'classes/Symptom.class';
import { Popup, Modal, Icon, Button } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { DiagnosisContext } from './DiagnosisTable';
import styled from 'styled-components';
import Group from 'classes/Group.class';
import { GroupContext } from './DiagnosisSymptomTags';
import SymptomTagChildren from './SymptomTagChildren';

export const Tag = styled.span<{ active?: boolean; notParent?: boolean }>`
  border-radius: 5px;
  background-color: ${(props) =>
    props.active ? '#0089e0' : props.notParent ? '#ffdd8f' : 'white'};
  padding: 3px 10px;
  color: ${(props) => (props.active ? 'white' : 'black')};
  margin-left: 5px;
  cursor: pointer;
  border: ${(props) => (props.active ? '1px solid white' : '1px dashed black')};
  white-space: nowrap;
  display: flex;

  :hover {
    border: 1px solid black;
  }
`;

export interface SymptomTagProps {
  symptom: Symptom;
  style?: any;
  excess?: boolean;
  hideChildren?: boolean;
}

const SymptomTag: React.SFC<SymptomTagProps> = ({ symptom, style, excess }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const symptomIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const diagnosis = useContext(DiagnosisContext);
  const group = useContext(GroupContext);

  const handlePick = (id: number) => {
    Symptom.pick(id);
  };

  const handleRemoveSymptom = async (id: number) => {
    setRemoveLoading(true);
    await Group.addOrRemoveSymptom({ groupId: group.id, symptomId: id });
    setModalOpen(false);
    setRemoveLoading(false);
  };

  if (excess) {
    return (
      <SymptomTag
        symptom={symptom}
        hideChildren
        style={{
          backgroundColor: '#870000',
          color: 'white'
        }}
      />
    );
  }
  return (
    <Popup
      key={symptom.id}
      position="top center"
      disabled={!symptom.description}
      trigger={
        <Tag style={style} active={symptomIds.includes(symptom.id)}>
          <span onClick={() => handlePick(symptom.id)}>{symptom.name.toTitleCase()}</span>
          {user && (
            <>
              <Modal
                open={modalOpen}
                trigger={
                  <Icon
                    style={{ marginLeft: '4px' }}
                    color="grey"
                    onClick={() => setModalOpen(true)}
                    name="close"
                  />
                }
              >
                <Modal.Header>
                  Vil du fjerne {symptom.name} fra {diagnosis.name}?
                </Modal.Header>
                <Modal.Actions>
                  <Button basic color="black" onClick={() => setModalOpen(false)}>
                    <Icon name="close" /> Nej
                  </Button>
                  <Button
                    basic
                    color="red"
                    loading={removeLoading}
                    disabled={removeLoading}
                    onClick={() => handleRemoveSymptom(symptom.id)}
                  >
                    <Icon name="trash" /> Ja
                  </Button>
                </Modal.Actions>
              </Modal>
            </>
          )}
          <SymptomTagChildren parent={symptom} />
        </Tag>
      }
    >
      {symptom.description}
    </Popup>
  );
};

export default SymptomTag;
