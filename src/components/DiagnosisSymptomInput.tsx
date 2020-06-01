import React, { useState, useContext } from 'react';
import Symptom from 'classes/Symptom.class';
import TagInput from './TagInput';
import Group from 'classes/Group.class';
import { ReduxState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import { GroupContext } from './DiagnosisSymptomTags';

export interface GroupSymptomInputProps {}

const GroupSymptomInput: React.SFC<GroupSymptomInputProps> = () => {
  const group = useContext(GroupContext);
  const [symptomId, setValue] = useState<number>(null);
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const symptomOptions = symptoms.map((s: Symptom) => ({
    text: s.name.toTitleCase(),
    value: s.id,
    key: s.id
  }));

  const handleSubmit = async (symptomId: number) => {
    await Group.addOrRemoveSymptom({ symptomId: symptomId, groupId: group.id });
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
    </>
  );
};

export default GroupSymptomInput;
