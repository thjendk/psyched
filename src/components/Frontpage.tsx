import React from 'react';
import DiagnosisTable from './DiagnosisTable';
import SymptomPicker from './SymptomPicker';

export interface FrontpageProps {}

const Frontpage: React.FC<FrontpageProps> = () => {
  return (
    <div>
      <SymptomPicker />
      <DiagnosisTable />
    </div>
  );
};

export default Frontpage;
