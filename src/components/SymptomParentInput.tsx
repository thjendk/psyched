import React, { useState } from 'react';
import Symptom from 'classes/Symptom.class';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import _ from 'lodash';
import TagInput from './TagInput';

export interface SymptomParentInputProps {
  symptom: Symptom;
}

const SymptomParentInput: React.SFC<SymptomParentInputProps> = ({ symptom }) => {
  const [parentId, setParentId] = useState<number>(null);
  const symptoms = useSelector(
    (state: ReduxState) =>
      state.symptoms.symptoms.filter(
        (s) => s.id !== symptom.id && !symptom.children.map((c) => c.id).includes(s.id)
      ),
    _.isEqual
  );
  const symptomOptions = symptoms.map((s) => ({ text: s.name, value: s.id, key: s.id }));

  const handleSubmit = async () => {
    await Symptom.addOrRemoveParent({ id: symptom.id, parentId: parentId });
  };

  return (
    <TagInput
      placeholder="+ Tilføj kategori"
      handleChange={setParentId}
      onSubmit={handleSubmit}
      options={symptomOptions}
      value={parentId}
    />
  );
};

export default SymptomParentInput;
