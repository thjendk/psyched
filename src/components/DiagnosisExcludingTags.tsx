import React, { useContext } from 'react';
import Diagnosis from 'classes/Diagnosis.class';
import { ReduxState } from 'redux/reducers';
import { DiagnosisContext } from './DiagnosisTable';
import { useSelector } from 'react-redux';
import { Tag } from './SymptomTag';
import { isAchieved } from 'utils/utils';
import { Icon } from 'semantic-ui-react';
import DiagnosisExcludingInput from './DiagnosisExcludingInput';

export interface DiagnosisExcludingTagsProps {}

const DiagnosisExcludingTags: React.SFC<DiagnosisExcludingTagsProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const diagnoses = useSelector((state: ReduxState) => state.diagnoses.diagnoses);
  const user = useSelector((state: ReduxState) => state.auth.user);

  const handleSubmit = async (excludingId: number) => {
    await Diagnosis.removeExcluding(diagnosis.id, excludingId);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {diagnosis.excluding
        .map((e) => (
          <Tag active={isAchieved(e)}>
            {diagnoses.find((d) => d.id === e.id).name}
            {user && <Icon onClick={() => handleSubmit(e.id)} name="close" color="grey" />}
          </Tag>
        ))
        .concat(user && <DiagnosisExcludingInput diagnosis={diagnosis} />)}
    </div>
  );
};

export default DiagnosisExcludingTags;
