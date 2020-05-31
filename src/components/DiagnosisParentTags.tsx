import React, { useContext } from 'react';
import { ReduxState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import { DiagnosisContext } from './DiagnosisTable';
import { Tag } from './SymptomTag';
import { Icon } from 'semantic-ui-react';
import DiagnosisParentInput from './DiagnosisParentInput';
import Diagnosis from 'classes/Diagnosis.class';
import { diagnosisSymptoms } from 'utils/utils';

export interface DiagnosisParentTagsProps {}

const DiagnosisParentTags: React.SFC<DiagnosisParentTagsProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const user = useSelector((state: ReduxState) => state.auth.user);
  const p = diagnoses.find((d) => d.id === diagnosis.parent?.id);
  const selectedIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const isAchieved = diagnosisSymptoms(diagnosis).reduce(
    (sum, s) => (sum = selectedIds.includes(s.id) ? true : false),
    true
  );

  const handleSubmit = async (parentId: number) => {
    await Diagnosis.addOrRemoveParent({ id: diagnosis.id, parentId });
  };

  if (diagnosis.parent) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <Tag active={isAchieved}>
        {diagnoses.find((d) => d.id === p?.id)?.name}
        {user && <Icon onClick={() => handleSubmit(p.id)} name="close" color="grey" />}
      </Tag>
      {user && <DiagnosisParentInput diagnosis={diagnosis} />}
    </div>
  );
};

export default DiagnosisParentTags;
