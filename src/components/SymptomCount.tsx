import React, { useContext } from 'react';
import { DiagnosisContext } from './DiagnosisTable';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { diagnosisSymptoms } from 'utils/utils';

export interface SymptomCountProps {}

const SymptomCount: React.SFC<SymptomCountProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const selectedIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const count = diagnosisSymptoms(diagnosis).reduce(
    (sum, s) => (sum += selectedIds.includes(s.id) ? 1 : 0),
    0
  );

  return <>{count}</>;
};

export default SymptomCount;
