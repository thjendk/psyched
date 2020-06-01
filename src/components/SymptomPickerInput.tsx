import React, { useState, useRef, useEffect } from 'react';
import { Input, Button, TextArea, Form } from 'semantic-ui-react';
import styled from 'styled-components';
import Symptom from 'classes/Symptom.class';
import { useDispatch } from 'react-redux';
import settingsReducer from 'redux/reducers/settings';

export interface SymptomPickerInputProps {
  setAdding?: Function;
  setEditing?: Function;
  symptom?: Symptom;
}

const BoxContainer = styled.div`
  border: 1px solid grey;
  padding: 3px;
`;

const SymptomPickerInput: React.SFC<SymptomPickerInputProps> = ({
  setAdding,
  symptom,
  setEditing
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(symptom?.name || '');
  const [description, setDescription] = useState(symptom?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name) return setAdding(false);
    setIsSubmitting(true);
    if (!!symptom) {
      await Symptom.update(symptom.id, { name, description });
      setEditing(false);
    } else {
      await Symptom.create({ name: name.toLowerCase(), description });
      setName('');
      dispatch(settingsReducer.actions.setSymptomSearchLeft(''));
      setDescription('');
    }

    setIsSubmitting(false);
  };

  const handleCancel = () => {
    if (!!symptom) return setEditing(false);
    setAdding(false);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    dispatch(settingsReducer.actions.setSymptomSearchLeft(value));
  };

  return (
    <BoxContainer>
      <Form>
        <Form.TextArea
          fluid
          placeholder="Navn"
          value={name}
          onChange={(e, { value }) => handleNameChange(value as string)}
        />
        <Form.TextArea
          style={{ width: '100%' }}
          placeholder="Beskrivelse"
          value={description}
          onChange={(e, { value }) => setDescription(value as string)}
        />
        <div style={{ display: 'flex' }}>
          <Button.Group fluid>
            <Button
              loading={isSubmitting}
              disabled={isSubmitting}
              basic
              color="blue"
              onClick={handleSubmit}
            >
              {!!symptom ? 'Rediger' : 'Tilføj'}
            </Button>
            <Button basic color="black" onClick={handleCancel}>
              Annuller
            </Button>
          </Button.Group>
        </div>
      </Form>
    </BoxContainer>
  );
};

export default SymptomPickerInput;
