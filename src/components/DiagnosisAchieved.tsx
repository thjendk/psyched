import React, { useContext } from 'react';
import { DiagnosisContext } from './DiagnosisTable';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { Icon } from 'semantic-ui-react';
import { diagnosisSymptoms } from 'utils/utils';

export interface DiagnosisAchievedProps {}

const DiagnosisAchieved: React.SFC<DiagnosisAchievedProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const selectedIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const isAchieved = diagnosisSymptoms(diagnosis).reduce(
    (sum, s) => (selectedIds.includes(s.id) ? (sum = true) : (sum = false)),
    true
  );

  return isAchieved ? (
    <>
      <Icon name="check" color="green" />
    </>
  ) : (
    <>
      <Icon name="close" color="red" />
    </>
  );
};

export default DiagnosisAchieved;
