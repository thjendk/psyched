import React from 'react';
import styled from 'styled-components';

export interface SymptomWindowProps {}

const BorderBox = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
`;

const SymptomWindow: React.SFC<SymptomWindowProps> = () => {
  return <BorderBox></BorderBox>;
};

export default SymptomWindow;
