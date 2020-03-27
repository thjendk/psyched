import React, { useState } from 'react';
import Symptom from 'classes/Symptom.class';
import styled from 'styled-components';
import { Input, Divider } from 'semantic-ui-react';
import Highlight from 'react-highlighter';

const SymptomPickerRow = styled.p`
  border: 1px solid lightgrey;
  border-bottom: 0px;
  padding: 5px 5px;
  margin: 0;

  :last-child {
    border-bottom: 1px solid lightgrey;
  }

  :hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`;

export interface SymptomPickerBoxProps {
  symptoms: Symptom[];
}

const SymptomPickerBox: React.SFC<SymptomPickerBoxProps> = ({ symptoms }) => {
  const [search, setSearch] = useState('');
  symptoms = symptoms.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handlePick = (id: number) => {
    Symptom.pick(id);
  };

  return (
    <div>
      <Input
        fluid
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Søg..."
      />
      <Divider />
      {symptoms.map((s) => (
        <SymptomPickerRow onClick={() => handlePick(s.id)}>
          <Highlight search={search}>{s.name}</Highlight>
        </SymptomPickerRow>
      ))}
    </div>
  );
};

export default SymptomPickerBox;
