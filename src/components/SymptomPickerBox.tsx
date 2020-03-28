import React, { useState } from 'react';
import Symptom from 'classes/Symptom.class';
import { Input, Divider } from 'semantic-ui-react';
import SymptomPickerInput from './SymptomPickerInput';
import { useSelector } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import SymptomPickerRow, { SymptomPickerRowContainer } from './SymptomPickerRow';

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

  const sorter = (a: Symptom, b: Symptom) => {
    return a.name.localeCompare(b.name);
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
      <div style={{ overflowY: 'auto', height: '30vh' }}>
        {symptoms
          .slice()
          .sort(sorter)
          .map((s) => <SymptomPickerRow symptom={s} search={search} />)
          .concat(
            all &&
              (adding ? (
                <SymptomPickerInput setAdding={setAdding} />
              ) : (
                user && (
                  <SymptomPickerRowContainer onClick={() => setAdding(true)}>
                    + Tilføj symptom...
                  </SymptomPickerRowContainer>
                )
              ))
          )}
      </div>
    </div>
  );
};

export default SymptomPickerBox;
