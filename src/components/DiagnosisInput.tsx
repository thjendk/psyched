import React, { useRef, useEffect, useState } from 'react';
import { Input, Form } from 'semantic-ui-react';

export interface DiagnosisInputProps {
  setAdding: Function;
}

const DiagnosisInput: React.SFC<DiagnosisInputProps> = ({ setAdding }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleSubmit = async () => {
    if (!name) return setAdding(false);
    await console.log('Submitted');
    setAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit} style={{ display: 'inline', marginLeft: '10px' }}>
      <Input
        ref={ref}
        size="small"
        onBlur={handleSubmit}
        onChange={(e) => setName(e.target.value)}
      />
    </Form>
  );
};

export default DiagnosisInput;
