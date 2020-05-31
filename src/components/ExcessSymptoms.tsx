import React, { useContext } from 'react';
import SymptomTag from './SymptomTag';
import { DiagnosisContext } from './DiagnosisTable';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Symptom from 'classes/Symptom.class';
import { Icon } from 'semantic-ui-react';
import { diagnosisSymptoms } from 'utils/utils';

export interface ExcessSymptomsProps {}

const ExcessSymptoms: React.SFC<ExcessSymptomsProps> = () => {
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const selectedIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const diagnosis = useContext(DiagnosisContext);

  const createExcess = () => {
    const excessSymptoms: Symptom[] = selectedIds
      .filter((id) => {
        if (
          diagnosisSymptoms(diagnosis)
            .map((s) => s.id)
            .includes(id)
        )
          return false;
        return true;
      })
      .map((id) => symptoms.find((s) => s.id === id));

    if (excessSymptoms.length === 0) {
      return <Icon style={{ marginLeft: '5px', alignSelf: 'center' }} name="check" color="green" />;
    }

    const excess = excessSymptoms.map((s) => {
      return <SymptomTag excess symptom={s} />;
    });

    return excess;
  };

  return (
    <>
      <span style={{ alignSelf: 'center' }}>Ikke matchende symptomer: </span>
      {createExcess()}
    </>
  );
};

export default ExcessSymptoms;
