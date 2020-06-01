import React, { useContext } from 'react';
import SymptomTag from './SymptomTag';
import { DiagnosisContext } from './DiagnosisTable';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Symptom from 'classes/Symptom.class';
import { diagnosisSymptoms } from 'utils/utils';

export interface SymptomTagChildrenProps {
  parent: Symptom;
}

const SymptomTagChildren: React.SFC<SymptomTagChildrenProps> = ({ parent }) => {
  const diagnosis = useContext(DiagnosisContext);
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);

  if (parent?.children.length === 0) return null;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-apart',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      }}
    >
      {parent.children.map((s) => {
        const chosenChild = diagnosisSymptoms(diagnosis).find((symp) => symp.id === s.id);
        if (!!chosenChild) return <SymptomTag symptom={chosenChild} />;

        const symptom = symptoms.find((symp) => symp.id === s.id);
        return <SymptomTag symptom={symptom} />;
      })}
    </div>
  );
};

export default SymptomTagChildren;
