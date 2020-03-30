import React, { useState, useRef, useEffect } from 'react';
import Diagnosis from 'classes/Diagnosis.class';
import { Tag } from './DiagnosisTableRow';
import { Dropdown } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface DiagnosisExcludingInputProps {
  diagnosis: Diagnosis;
}

const DiagnosisExcludingInput: React.SFC<DiagnosisExcludingInputProps> = ({ diagnosis }) => {
  const [adding, setAdding] = useState(false);
  const [value, setValue] = useState<number>(null);
  const [submitting, setSubmitting] = useState(false);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const diagnosisOptions = diagnoses
    .filter((d) => !diagnosis.excluding.map((p) => p.id).includes(d.id))
    .map((d) => ({ text: d.name, value: d.id, key: d.id }));
  const ref = useRef(null);

  const handleSubmit = async () => {
    if (!value) return setAdding(false);
    setSubmitting(true);
    await Diagnosis.addExcluding(diagnosis.id, value);
    setSubmitting(false);
  };

  useEffect(() => {
    ref.current?.handleFocus();
  }, [adding]);

  if (adding)
    return (
      <Dropdown
        size="small"
        ref={ref}
        loading={submitting}
        disabled={submitting}
        value={value}
        onBlur={handleSubmit}
        style={{ marginLeft: '5px' }}
        options={diagnosisOptions}
        onChange={(e, { value }) => setValue(value as number)}
        selection
        search
        clearable
      />
    );
  return <Tag onClick={() => setAdding(true)}>+ Tilføj udelukkende</Tag>;
};

export default DiagnosisExcludingInput;
