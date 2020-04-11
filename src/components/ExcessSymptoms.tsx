import React, { useContext } from 'react';
import SymptomTag from './SymptomTag';
import { DiagnosisContext } from './DiagnosisTable';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Symptom from 'classes/Symptom.class';
import { allIds } from 'utils/utils';
import { Icon } from 'semantic-ui-react';

export interface ExcessSymptomsProps {}

const ExcessSymptoms: React.SFC<ExcessSymptomsProps> = () => {
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const selectedIds = useSelector((state: ReduxState) => state.symptoms.selectedIds);
  const diagnosis = useContext(DiagnosisContext);

  const createExcess = () => {
    const excessSymptoms: Symptom[] = selectedIds
      .filter((id) => {
        const diagnosisSymptom = diagnosis.symptoms.find((symp) => symp.symptom.id === id);
        if (allIds(diagnosis).includes(id)) return false;
        if (!!diagnosisSymptom) {
          if (diagnosisSymptom?.point < 0) return true;
          if (diagnosisSymptom?.hidden) return false;
          return true;
        }
        return true;
      })
      .map((id) => symptoms.find((s) => s.id === id));

    if (excessSymptoms.length === 0) {
      return <Icon style={{ marginLeft: '5px', alignSelf: 'center' }} name="check" color="green" />;
    }

    const excess = excessSymptoms.map((s) => {
      const exists = diagnosis.symptoms.find((symp) => symp.symptom.id === s.id);
      return <SymptomTag excess symptom={s} diagnosisSymptom={exists} />;
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
