import React, { useContext, useState, useEffect } from 'react';
import { Dropdown, Input, Form, Button } from 'semantic-ui-react';
import Group from 'classes/Group.class';
import { DiagnosisContext } from './DiagnosisTable';

export interface GroupInputProps {}

const GroupInput: React.SFC<GroupInputProps> = () => {
  const [parentId, setParentId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const diagnosis = useContext(DiagnosisContext);
  const initialIndex = parentId
    ? diagnosis.groups.find((g) => g.id === Number(parentId)).children.length
    : diagnosis.groups.filter((g) => !g.parent).length;
  const [index, setIndex] = useState(initialIndex);
  const parentOptions = diagnosis.groups.map((g) => ({
    key: g.id,
    value: g.id,
    text: g.name
  }));

  const handleSubmit = async () => {
    if (!name) return;
    setLoading(true);
    try {
      await Group.addOrRemove({
        diagnosisId: diagnosis.id,
        name,
        index,
        parentId: parentId ? Number(parentId) : null
      });
      setName('');
      setIndex(initialIndex);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex, parentId]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Dropdown
          options={parentOptions}
          value={parentId}
          onChange={(e, { value }) => setParentId(value as string)}
          placeholder="Parent group"
          search
          clearable
          selection
        />
        <Input
          placeholder="Index"
          type="number"
          value={index}
          onChange={(e) => setIndex(e.target.value as any)}
        />
        <Input placeholder="Group name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button loading={loading} disabled={loading} basic type="submit">
          Tilføj
        </Button>
      </Form>
    </div>
  );
};

export default GroupInput;
