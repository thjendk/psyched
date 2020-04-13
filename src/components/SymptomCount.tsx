import React, { useContext } from 'react';
import { DiagnosisContext } from './DiagnosisTable';
import { chosenSymptoms, symptomCount } from 'utils/utils';

export interface SymptomCountProps {}

const SymptomCount: React.SFC<SymptomCountProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const count = symptomCount(diagnosis);

  return (
    <>
      {chosenSymptoms(diagnosis).length} / {count} (
      {((chosenSymptoms(diagnosis).length / count || 0) * 100).toFixed(0)} %)
    </>
  );
};

export default SymptomCount;
