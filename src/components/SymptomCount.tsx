import React, { useContext } from 'react';
import { DiagnosisContext } from './DiagnosisTable';
import { chosenSymptoms, allIds } from 'utils/utils';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

export interface SymptomCountProps {}

const SymptomCount: React.SFC<SymptomCountProps> = () => {
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const diagnosis = useContext(DiagnosisContext);

  const bannedIds = diagnosis.symptoms
    .filter((s) => s.point < 0 || s.hidden)
    .map((s) => s.symptom.id);
  const diagnosisSymptoms = allIds(diagnosis)
    .filter((id) => !bannedIds.includes(id))
    .map((id) => symptoms.find((s) => s.id === id));

  return (
    <>
      {chosenSymptoms(diagnosis).length} / {diagnosisSymptoms.length} (
      {((chosenSymptoms(diagnosis).length / diagnosisSymptoms.length || 0) * 100).toFixed(0)} %)
    </>
  );
};

export default SymptomCount;
