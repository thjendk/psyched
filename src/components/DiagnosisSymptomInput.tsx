import React, { useState, useRef, useEffect } from 'react';
import Diagnosis from 'classes/Diagnosis.class';
import { Dropdown } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Symptom from 'classes/Symptom.class';

export interface DiagnosisSymptomInputProps {
  diagnosis: Diagnosis;
  setAdding: Function;
}

const DiagnosisSymptomInput: React.SFC<DiagnosisSymptomInputProps> = ({ diagnosis, setAdding }) => {
  const [value, setValue] = useState<number>(null);
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef(null);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  let symptoms: any = useSelector((state: ReduxState) =>
    state.symptoms.symptoms.filter(
      (s) =>
        !diagnosis.symptoms
          .concat(
            diagnoses
              .filter((d) => d.children.map((p) => p.id).includes(diagnosis.id))
              .flatMap((d) => d.symptoms)
          )
          .map((ds) => ds.id)
          .includes(s.id)
    )
  );
  symptoms = symptoms.map((s: Symptom) => ({
    text: s.name.toTitleCase(),
    value: s.id,
    key: s.id
  }));

  useEffect(() => {
    ref.current.handleFocus();
  }, []);

  const handleSubmit = async () => {
    if (!value) return setAdding(false);
    setSubmitting(true);
    await Diagnosis.addSymptom(diagnosis.id, value);
    setSubmitting(false);
    setAdding(false);
  };

  return (
    <Dropdown
      size="small"
      ref={ref}
      loading={submitting}
      disabled={submitting}
      onBlur={handleSubmit}
      value={value}
      style={{ marginLeft: '5px' }}
      options={symptoms}
      onChange={(e, { value }) => setValue(value as number)}
      selection
      search
      clearable
    />
  );
};

export default DiagnosisSymptomInput;
