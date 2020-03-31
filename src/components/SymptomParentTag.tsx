import React, { useState } from 'react';
import Symptom from 'classes/Symptom.class';
import { Tag } from './DiagnosisTableRow';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Modal, Loader, Icon, Button } from 'semantic-ui-react';

export interface SymptomParentTagProps {
  symptom: Symptom;
  parentId: number;
}

const SymptomParentTag: React.SFC<SymptomParentTagProps> = ({ symptom, parentId }) => {
  const user = useSelector((state: ReduxState) => state.auth.user);
  const [removing, setRemoving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const parent = symptoms.find((s) => s.id === parentId);

  const handleRemove = async () => {
    setRemoving(true);
    await Symptom.removeParent(symptom.id, parentId);
    setRemoving(false);
  };

  return (
    <Tag>
      {parent.name}{' '}
      {user &&
        (removing ? (
          <Loader active inline size="tiny" />
        ) : (
          <Modal
            open={modalOpen}
            trigger={<Icon name="close" onClick={() => setModalOpen(true)} color="grey" />}
          >
            <Modal.Header>
              Vil du slette {parent.name} fra {symptom.name}?
            </Modal.Header>
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
        ))}
    </Tag>
  );
};

export default SymptomParentTag;
