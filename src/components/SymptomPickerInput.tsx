import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Symptom from 'classes/Symptom.class';

export interface SymptomPickerInputProps {
  setAdding: Function;
}

const BoxContainer = styled.div`
  border: 1px solid grey;
`;

const SymptomPickerInput: React.SFC<SymptomPickerInputProps> = ({ setAdding }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await Symptom.create({ name: name.toLowerCase(), description });
    setIsSubmitting(false);
    setAdding(false);
  };

  return (
    <BoxContainer>
      <Input fluid placeholder="Navn" value={name} onChange={(e) => setName(e.target.value)} />
      <Input
        fluid
        placeholder="Beskrivelse"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        loading={isSubmitting}
        disabled={isSubmitting}
        fluid
        basic
        color="blue"
        onClick={handleSubmit}
      >
        Tilføj
      </Button>
    </BoxContainer>
  );
};

export default SymptomPickerInput;
