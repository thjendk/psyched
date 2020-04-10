import React, { useContext } from 'react';
import SymptomTag from './SymptomTag';
import { DiagnosisContext } from './DiagnosisTable';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import Symptom from 'classes/Symptom.class';

export interface SymptomTagChildrenProps {
  symptom: Symptom;
  shouldHide?: boolean;
}

const SymptomTagChildren: React.SFC<SymptomTagChildrenProps> = ({ symptom: s, shouldHide }) => {
  const diagnosis = useContext(DiagnosisContext);
  const symptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-apart',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      }}
    >
      {s?.children.map((s) => {
        const chosenChild = diagnosis.symptoms.find((symp) => symp.symptom.id === s.id);
        if (!!chosenChild) return <SymptomTag hidden={shouldHide} diagnosisSymptom={chosenChild} />;
        if (chosenChild?.point < 0) return null;

        const symptom = symptoms.find((symp) => symp.id === s.id);
        return <SymptomTag hidden={shouldHide} symptom={symptom} />;
      })}
    </div>
  );
};

export default SymptomTagChildren;
