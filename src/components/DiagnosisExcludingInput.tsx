import React, { useState } from 'react';
import Diagnosis from 'classes/Diagnosis.class';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import TagInput from './TagInput';

export interface DiagnosisExcludingInputProps {
  diagnosis: Diagnosis;
}

const DiagnosisExcludingInput: React.SFC<DiagnosisExcludingInputProps> = ({ diagnosis }) => {
  const [value, setValue] = useState<number>(null);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const diagnosisOptions = diagnoses
    .filter((d) => !diagnosis.excluding.map((p) => p.id).includes(d.id))
    .map((d) => ({ text: d.name, value: d.id, key: d.id }));

  const handleSubmit = async () => {
    await Diagnosis.addExcluding(diagnosis.id, value);
  };

  return (
    <TagInput
      placeholder="+ Tilføj udelukkende"
      handleChange={setValue}
      onSubmit={handleSubmit}
      options={diagnosisOptions}
      value={value}
    />
  );
};

export default DiagnosisExcludingInput;
