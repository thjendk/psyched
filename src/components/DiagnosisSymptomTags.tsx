import React, { useContext } from 'react';
import SymptomTag from './SymptomTag';
import { DiagnosisContext } from './DiagnosisTable';
import { totalSymptoms } from 'utils/utils';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface DiagnosisSymptomTagsProps {}

const DiagnosisSymptomTags: React.SFC<DiagnosisSymptomTagsProps> = () => {
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const diagnosis = useContext(DiagnosisContext);
  const symptomIds = totalSymptoms(diagnosis);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      {symptomIds.slice().map((id) => (
        <SymptomTag
          diagnosisSymptom={diagnosis.symptoms.find((s) => s.symptom.id === id)}
          symptom={symptoms.find((s) => s.id === id)}
        />
      ))}
    </div>
  );
};

export default DiagnosisSymptomTags;
