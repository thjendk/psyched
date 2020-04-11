import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { Tag } from './SymptomTag';

export interface TagInput {
  options: any[];
  value: number;
  onSubmit: (value: number) => Promise<void>;
  handleChange: (value: number) => void;
  placeholder: string;
}

const TagInput: React.SFC<TagInput> = ({ options, value, onSubmit, handleChange, placeholder }) => {
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (editing) {
      ref.current.handleFocus();
    }
  }, [editing]);

  const handleSubmit = async () => {
    if (!value) return setEditing(false);
    setSubmitting(true);
    await onSubmit(value);
    setSubmitting(false);
    setEditing(false);
    handleChange(null);
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
        options={options}
        value={value}
        onChange={(e, { value }) => handleChange(value as number)}
      />
    );
  return <Tag onClick={() => setEditing(true)}>{placeholder}</Tag>;
};

export default TagInput;
