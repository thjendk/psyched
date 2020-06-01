import React, { useContext } from 'react';
import SymptomTag from './SymptomTag';
import { GroupContext } from './DiagnosisSymptomTags';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import GroupSymptomInput from './DiagnosisSymptomInput';
import Group from 'classes/Group.class';
import { DiagnosisContext } from './DiagnosisTable';
import { Icon } from 'semantic-ui-react';

export interface DiagnosisGroupProps {}

const DiagnosisGroup: React.SFC<DiagnosisGroupProps> = () => {
  let group = useContext(GroupContext);
  const diagnosis = useContext(DiagnosisContext);
  useSelector((state: ReduxState) => state.symptoms.symptoms);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const groups = useSelector((state: ReduxState) => state.groups.groups);
  group = groups.find((g) => group.id === g.id);

  const handleRemove = async () => {
    await Group.addOrRemove({
      diagnosisId: diagnosis.id,
      name: group.name,
      index: group.index,
      parentId: group.parent?.id
    });
  };

  return (
    <div style={{ marginTop: '5px' }}>
      <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {user && (
          <Icon
            name="close"
            style={{ marginRight: '5px', cursor: 'pointer' }}
            size="small"
            onClick={handleRemove}
            color="grey"
          />
        )}
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
