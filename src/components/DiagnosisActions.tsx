import React, { useState, useContext } from 'react';
import { Button, Modal, Icon } from 'semantic-ui-react';
import Diagnosis from 'classes/Diagnosis.class';
import { DiagnosisContext } from './DiagnosisTable';

export interface DiagnosisActionsProps {
  handleEdit: Function;
}

const DiagnosisActions: React.SFC<DiagnosisActionsProps> = ({ handleEdit }) => {
  const diagnosis = useContext(DiagnosisContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemove = async () => {
    setIsDeleting(true);
    await Diagnosis.remove(diagnosis.id);
    setIsModalOpen(false);
    setIsDeleting(false);
  };

  return (
    <Button.Group fluid>
      <Button onClick={() => handleEdit(true)} basic color="orange">
        Rediger
      </Button>
      <Modal
        open={isModalOpen}
        trigger={
          <Button onClick={() => setIsModalOpen(true)} basic color="red">
            Slet
          </Button>
        }
      >
        <Modal.Header>Vil du slette {diagnosis.name}?</Modal.Header>
        <Modal.Actions>
          <Button basic color="black" onClick={() => setIsModalOpen(false)}>
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
  );
};

export default DiagnosisActions;
