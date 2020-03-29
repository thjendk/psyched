import React, { useState, useRef, useEffect } from 'react';
import { Tag } from './DiagnosisTableRow';
import Symptom from 'classes/Symptom.class';
import { Dropdown } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface SymptomParentInputProps {
  symptom: Symptom;
}

const SymptomParentInput: React.SFC<SymptomParentInputProps> = ({ symptom }) => {
  const [editing, setEditing] = useState(false);
  const [parentId, setParentId] = useState<number>(null);
  const [submitting, setSubmitting] = useState(false);
  const symptoms = useSelector((state: ReduxState) =>
    state.symptoms.symptoms.filter((s) => s.id !== symptom.id)
  );
  const symptomOptions = symptoms.map((s) => ({ text: s.name, value: s.id, key: s.id }));
  const ref = useRef(null);

  useEffect(() => {
    if (editing) {
      ref.current.handleFocus();
    }
  }, [editing]);

  const handleSubmit = async () => {
    if (!parentId) return setEditing(false);
    setSubmitting(true);
    await Symptom.addParent(symptom.id, parentId);
    setSubmitting(false);
    setParentId(null);
    setEditing(false);
  };

  if (editing)
    return (
      <Dropdown
        ref={ref}
        size="small"
        loading={submitting}
        disabled={submitting}
        onBlur={handleSubmit}
        search
        clearable
        selection
        options={symptomOptions}
        value={parentId}
        onChange={(e, { value }) => setParentId(value as number)}
      />
    );
  return <Tag onClick={() => setEditing(true)}>+ Tilføj parent</Tag>;
};

export default SymptomParentInput;
