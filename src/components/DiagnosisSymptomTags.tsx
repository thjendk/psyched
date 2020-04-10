import React, { useContext } from 'react';
import SymptomTag from './SymptomTag';
import { DiagnosisContext } from './DiagnosisTable';
import { totalSymptoms } from 'utils/utils';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import _ from 'lodash';

export interface DiagnosisSymptomTagsProps {}

const DiagnosisSymptomTags: React.SFC<DiagnosisSymptomTagsProps> = () => {
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms, _.isEqual);
  const diagnosis = useContext(DiagnosisContext);
  const symptomIds = totalSymptoms(diagnosis);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      {symptomIds.map((id) => {
        const diagnosisSymptom = diagnosis.symptoms.find((s) => s.symptom.id === id);
        if (diagnosisSymptom?.point < 0) return null;
        return (
          <SymptomTag
            diagnosisSymptom={diagnosisSymptom}
            symptom={symptoms.find((s) => s.id === id)}
          />
        );
      })}
    </div>
  );
};

export default DiagnosisSymptomTags;
