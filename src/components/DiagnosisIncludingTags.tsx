import React, { useContext } from 'react';
import { DiagnosisContext } from './DiagnosisTable';
import { Tag } from './SymptomTag';
import Diagnosis from 'classes/Diagnosis.class';
import { isAchieved } from 'utils/utils';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Icon } from 'semantic-ui-react';
import DiagnosisIncludingInput from './DiagnosisIncludingInput';

export interface DiagnosisIncludingTagsProps {}

const DiagnosisIncludingTags: React.SFC<DiagnosisIncludingTagsProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const user = useSelector((state: ReduxState) => state.auth.user);

  const handleSubmit = async (includingId: number) => {
    await Diagnosis.removeIncluding(diagnosis.id, includingId);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {diagnosis.including
        .map((i) => (
          <Tag active={isAchieved(i)}>
            {diagnoses.find((d) => d.id === i.id).name}
            {user && <Icon onClick={() => handleSubmit(i.id)} name="close" color="grey" />}
          </Tag>
        ))
        .concat(user && <DiagnosisIncludingInput diagnosis={diagnosis} />)}
    </div>
  );
};

export default DiagnosisIncludingTags;
