import React, { useState } from 'react';
import Symptom from 'classes/Symptom.class';
import { Popup, Modal, Icon, Button } from 'semantic-ui-react';
import { Tag } from './DiagnosisTableRow';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Diagnosis from 'classes/Diagnosis.class';

export interface SymptomTagProps {
  symptom: Symptom;
  diagnosis: Diagnosis;
}

const SymptomTag: React.SFC<SymptomTagProps> = ({ symptom: s, diagnosis }) => {
  const symptomIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const handlePick = (id: number) => {
    Symptom.pick(id);
  };

  const handleRemoveSymptom = async (id: number) => {
    setRemoveLoading(true);
    await Diagnosis.removeSymptom(diagnosis.id, id);
    setModalOpen(false);
    setRemoveLoading(false);
  };

  return (
    <Popup
      key={s.id}
      position="top center"
      disabled={!s.description}
      trigger={
        <Tag
          active={symptomIds.includes(s.id)}
          notParent={diagnosis.symptoms.map((s) => s.id).includes(s.id)}
        >
          <span onClick={() => handlePick(s.id)}>{s.name.toTitleCase()}</span>
          {user && diagnosis.symptoms.map((s) => s.id).includes(s.id) && (
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
                Vil du fjerne {s.name} fra {diagnosis.name}?
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
                  onClick={() => handleRemoveSymptom(s.id)}
                >
                  <Icon name="trash" /> Ja
                </Button>
              </Modal.Actions>
            </Modal>
          )}
        </Tag>
      }
    >
      {s.description}
    </Popup>
  );
};

export default SymptomTag;
