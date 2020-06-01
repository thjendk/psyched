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
    <div style={{ marginTop: '5px' }}>
      <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {group.name}{' '}
        {group.symptoms.map((s) => (
          <div style={{ marginTop: '1em' }}>
            <SymptomTag symptom={s} />
          </div>
        ))}
        <div style={{ marginTop: '1em' }}>
          <GroupSymptomInput />
        </div>
      </span>
      {group.children.map((c) => (
        <div style={{ marginLeft: '1.5em', marginTop: '5px' }}>
          <GroupContext.Provider value={c}>
            <DiagnosisGroup />
          </GroupContext.Provider>
        </div>
      ))}
    </div>
  );
};

export default DiagnosisGroup;
