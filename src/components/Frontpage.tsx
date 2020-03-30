import React from 'react';
import DiagnosisTable from './DiagnosisTable';
import SymptomPicker from './SymptomPicker';
import { Divider } from 'semantic-ui-react';
import ColorDescription from './ColorDescription';

export interface FrontpageProps {}

const Frontpage: React.FC<FrontpageProps> = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#2185d0', fontSize: '3em' }}>Psyched</h1>
      <Divider />
      <SymptomPicker />
      <ColorDescription />
      <DiagnosisTable />
    </div>
  );
};

export default Frontpage;
