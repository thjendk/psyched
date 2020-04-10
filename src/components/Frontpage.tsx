import React from 'react';
import DiagnosisTable from './DiagnosisTable';
import SymptomPicker from './SymptomPicker';
import ColorDescription from './ColorDescription';

export interface FrontpageProps {}

const Frontpage: React.FC<FrontpageProps> = () => {
  return (
    <div>
      <SymptomPicker />
      <ColorDescription />
      <DiagnosisTable />
    </div>
  );
};

export default Frontpage;
