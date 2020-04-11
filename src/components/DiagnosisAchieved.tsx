import React, { useContext } from 'react';
import { DiagnosisContext } from './DiagnosisTable';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import { hasConflict } from 'utils/utils';
import { Icon } from 'semantic-ui-react';

export interface DiagnosisAchievedProps {}

const DiagnosisAchieved: React.SFC<DiagnosisAchievedProps> = () => {
  const diagnosis = useContext(DiagnosisContext);
  const selectedIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);

  const sum = diagnosis.symptoms
    .filter((s) => selectedIds.includes(s.symptom.id))
    .reduce((sum, s) => (sum += s?.point || 0), 0);
  if (hasConflict(diagnosis))
    return (
      <>
        <Icon name="close" color="red" />
        <br />
        Udelukket grundet konflikt.
        <br />
        {sum}
      </>
    );
  return sum >= 100 ? (
    <>
      <Icon name="check" color="green" /> {sum}
    </>
  ) : (
    <>
      <Icon name="close" color="red" /> {sum}
    </>
  );
};

export default DiagnosisAchieved;
