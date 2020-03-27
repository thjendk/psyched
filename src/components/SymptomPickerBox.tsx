import React, { useState } from 'react';
import Symptom from 'classes/Symptom.class';
import styled from 'styled-components';
import { Input, Divider } from 'semantic-ui-react';
import Highlight from 'react-highlighter';
import SymptomPickerInput from './SymptomPickerInput';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';

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
  all?: boolean;
}

const SymptomPickerBox: React.SFC<SymptomPickerBoxProps> = ({ symptoms, all }) => {
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState('');
  const user = useSelector((state: ReduxState) => state.auth.user);
  symptoms = symptoms.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handlePick = (id: number) => {
    Symptom.pick(id);
  };

  const sorter = (a: Symptom, b: Symptom) => {
    return a.name.localeCompare(b.name);
  };

  return (
    <div style={{ overflowY: 'auto' }}>
      <Input
        fluid
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Søg..."
      />
      <Divider />
      {symptoms
        .slice()
        .sort(sorter)
        .map((s) => (
          <SymptomPickerRow onClick={() => handlePick(s.id)}>
            <Highlight search={search}>{s.name.toTitleCase()}</Highlight>
            {s.description && (
              <span>
                {' '}
                <Highlight search={search}>({s.description})</Highlight>
              </span>
            )}
          </SymptomPickerRow>
        ))
        .concat(
          all &&
            (adding ? (
              <SymptomPickerInput setAdding={setAdding} />
            ) : (
              user && (
                <SymptomPickerRow onClick={() => setAdding(true)}>
                  + Tilføj symptom...
                </SymptomPickerRow>
              )
            ))
        )}
    </div>
  );
};

export default SymptomPickerBox;
