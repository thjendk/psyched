import React, { useContext } from 'react';
import SymptomTag from './SymptomTag';
import { GroupContext } from './DiagnosisSymptomTags';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import GroupSymptomInput from './DiagnosisSymptomInput';

export interface DiagnosisGroupProps {}

const DiagnosisGroup: React.SFC<DiagnosisGroupProps> = () => {
  let group = useContext(GroupContext);
  const groups = useSelector((state: ReduxState) => state.groups.groups);
  group = groups.find((g) => group.id === g.id);

  return (
    <li>
      {group.name}:
      {group.symptoms.map((s) => (
        <SymptomTag symptom={s} />
      ))}
      <GroupSymptomInput />
      {group.children.map((c) => (
        <ul>
          <GroupContext.Provider value={c}>
            <DiagnosisGroup />
          </GroupContext.Provider>
        </ul>
      ))}
    </li>
  );
};

export default DiagnosisGroup;
