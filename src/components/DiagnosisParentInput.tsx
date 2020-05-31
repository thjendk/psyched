import React, { useState } from 'react';
import Diagnosis from 'classes/Diagnosis.class';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import TagInput from './TagInput';

export interface DiagnosisParentInputProps {
  diagnosis: Diagnosis;
}

const DiagnosisParentInput: React.SFC<DiagnosisParentInputProps> = ({ diagnosis }) => {
  const [value, setValue] = useState<number>(null);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const diagnosisOptions = diagnoses
    .filter((d) => diagnosis.parent?.id !== d.id)
    .map((d) => ({ text: d.name, value: d.id, key: d.id }));

  const handleSubmit = async () => {
    await Diagnosis.addOrRemoveParent({ id: diagnosis.id, parentId: value });
  };

  return (
    <TagInput
      placeholder="+ Tilføj lignende"
      handleChange={setValue}
      onSubmit={handleSubmit}
      options={diagnosisOptions}
      value={value}
    />
  );
};

export default DiagnosisParentInput;
