import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, TextArea } from 'semantic-ui-react';
import styled from 'styled-components';
import Symptom from 'classes/Symptom.class';

export interface SymptomPickerInputProps {
  setAdding?: Function;
  setEditing?: Function;
  symptom?: Symptom;
}

const BoxContainer = styled.div`
  border: 1px solid grey;
`;

const SymptomPickerInput: React.SFC<SymptomPickerInputProps> = ({
  setAdding,
  symptom,
  setEditing
}) => {
  const [name, setName] = useState(symptom?.name || '');
  const [description, setDescription] = useState(symptom?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);

  const handleSubmit = async () => {
    if (!name) return setAdding(false);
    setIsSubmitting(true);
    if (!!symptom) {
      await Symptom.update(symptom.id, { name, description });
      setEditing(false);
    } else {
      await Symptom.create({ name: name.toLowerCase(), description });
      setAdding(false);
    }

    setIsSubmitting(false);
  };

  const handleCancel = () => {
    if (!!symptom) return setEditing(false);
    setAdding(false);
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <BoxContainer>
      <Input
        ref={ref}
        fluid
        placeholder="Navn"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextArea
        style={{ width: '100%' }}
        placeholder="Beskrivelse"
        value={description}
        onChange={(e, { value }) => setDescription(value as string)}
      />
      <div style={{ display: 'flex' }}>
        <Button
          loading={isSubmitting}
          disabled={isSubmitting}
          fluid
          basic
          color="blue"
          onClick={handleSubmit}
        >
          {!!symptom ? 'Rediger' : 'Tilføj'}
        </Button>
        <Button basic color="black" onClick={handleCancel}>
          Annuller
        </Button>
      </div>
    </BoxContainer>
  );
};

export default SymptomPickerInput;
