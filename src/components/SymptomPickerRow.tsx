import React, { useState } from 'react';
import styled from 'styled-components';
import Highlight from 'react-highlighter';
import { Loader, Icon } from 'semantic-ui-react';
import Symptom from 'classes/Symptom.class';

export const SymptomPickerRowContainer = styled.p`
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

export interface SymptomPickerRowProps {
  search: string;
  symptom: Symptom;
}

const SymptomPickerRow: React.SFC<SymptomPickerRowProps> = ({ search, symptom }) => {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async (id: number) => {
    setRemoving(true);
    await Symptom.remove(id);
    setRemoving(false);
  };

  const handlePick = (id: number) => {
    Symptom.pick(id);
  };

  return (
    <SymptomPickerRowContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div onClick={() => handlePick(symptom.id)}>
          <Highlight search={search}>{symptom.name.toTitleCase()}</Highlight>
          {symptom.description && (
            <span>
              {' '}
              <Highlight search={search}>({symptom.description})</Highlight>
            </span>
          )}
        </div>
        <div>
          {removing ? (
            <Loader active inline size="tiny" />
          ) : (
            <Icon name="close" onClick={() => handleRemove(symptom.id)} color="grey" />
          )}
        </div>
      </div>
    </SymptomPickerRowContainer>
  );
};

export default SymptomPickerRow;
