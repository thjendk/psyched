import React, { useContext } from 'react';
import { ReduxState } from 'redux/reducers';
import { useSelector } from 'react-redux';
import { DiagnosisContext } from './DiagnosisTable';
import { isAchieved } from 'utils/utils';
import { Tag } from './SymptomTag';
import { Icon } from 'semantic-ui-react';
import DiagnosisParentInput from './DiagnosisParentInput';
import Diagnosis from 'classes/Diagnosis.class';

export interface DiagnosisParentTagsProps {}

const DiagnosisParentTags: React.SFC<DiagnosisParentTagsProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const user = useSelector((state: ReduxState) => state.auth.user);

  const handleSubmit = async (parentId: number) => {
    await Diagnosis.removeParent(diagnosis.id, parentId);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {diagnosis.parents
        .map((p) => (
          <Tag active={isAchieved(p)}>
            {diagnoses.find((d) => d.id === p.id).name}
            {user && <Icon onClick={() => handleSubmit(p.id)} name="close" color="grey" />}
          </Tag>
        ))
        .concat(user && <DiagnosisParentInput diagnosis={diagnosis} />)}
    </div>
  );
};

export default DiagnosisParentTags;
