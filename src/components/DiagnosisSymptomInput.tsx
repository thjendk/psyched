import React, { useState, useContext } from 'react';
import Symptom from 'classes/Symptom.class';
import TagInput from './TagInput';
import Group from 'classes/Group.class';
import { ReduxState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import { GroupContext } from './DiagnosisSymptomTags';
import { SymptomGroupInput } from 'types/generated';
import { Dropdown, Button, Input } from 'semantic-ui-react';
import { DiagnosisContext } from './DiagnosisTable';

export interface GroupSymptomInputProps {}

const GroupSymptomInput: React.SFC<GroupSymptomInputProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const group = useContext(GroupContext);
  const [symptomId, setValue] = useState<number>(null);
  const [name, setName] = useState('');
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const symptomOptions = symptoms.map((s: Symptom) => ({
    text: s.name.toTitleCase(),
    value: s.id,
    key: s.id
  }));

  const handleSubmit = async (symptomId: number) => {
    await Group.addSymptom({ symptomId: symptomId, groupId: group.id });
  };

  const handleAddGroup = async () => {
    await Group.addOrRemove({ name, diagnosisId: diagnosis.id, parentId: group?.id });
  };

  return (
    <>
      {group && (
        <TagInput
          placeholder="+ Tilføj symptom"
          handleChange={setValue}
          onSubmit={handleSubmit}
          options={symptomOptions}
          value={symptomId}
        />
      )}
      <Input onChange={(e) => setName(e.target.value)} size="mini" placeholder="Tilføj gruppe..." />
      <Button
        style={{ marginLeft: '5px' }}
        size="mini"
        basic
        color="black"
        onClick={handleAddGroup}
      >
        Tilføj
      </Button>
      <li>
        <Input
          onChange={(e) => setName(e.target.value)}
          size="mini"
          placeholder="Tilføj gruppe..."
        />

        <Button
          style={{ marginLeft: '5px' }}
          size="mini"
          basic
          color="black"
          onClick={handleAddGroup}
        >
          Tilføj
        </Button>
      </li>
    </>
  );
};

export default GroupSymptomInput;
