import React, { useState, useContext } from 'react';
import Diagnosis from 'classes/Diagnosis.class';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Symptom from 'classes/Symptom.class';
import { DiagnosisContext } from './DiagnosisTable';
import TagInput from './TagInput';

export interface DiagnosisSymptomInputProps {}

const DiagnosisSymptomInput: React.SFC<DiagnosisSymptomInputProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const [value, setValue] = useState<number>(null);
  let symptoms = useSelector((state: ReduxState) =>
    state.symptoms.symptoms.filter((s) => {
      const dS = diagnosis.symptoms.find((ds) => ds.symptom.id === s.id);
      if (!!dS && !dS.hidden) return false;
      return true;
    })
  );
  const symptomOptions = symptoms.map((s: Symptom) => ({
    text: s.name.toTitleCase(),
    value: s.id,
    key: s.id
  }));

  const handleSubmit = async () => {
    await Diagnosis.addSymptom(diagnosis.id, value);
  };

  return (
    <TagInput
      placeholder="+ Tilføj symptom"
      handleChange={setValue}
      onSubmit={handleSubmit}
      options={symptomOptions}
      value={value}
    />
  );
};

export default DiagnosisSymptomInput;
