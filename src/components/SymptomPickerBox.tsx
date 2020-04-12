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
  const allSymptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState('');
  const user = useSelector((state: ReduxState) => state.auth.user);

  const doesIncludeSearch = (s: Symptom) => {
    s = allSymptoms.find((symp) => symp.id === s.id);
    if (s.name.includes(search) || s.description.includes(search)) return true;
    if (s.children.length > 0) return s.children.some((s) => doesIncludeSearch(s));
    return false;
  };

  const sorter = (a: Symptom, b: Symptom) => {
    return a.name.localeCompare(b.name);
  };

  symptoms = symptoms.filter((s) => doesIncludeSearch(s));
  symptoms = symptoms.filter((s) => s.parents.length === 0);
  return (
    <div>
      <Input
        fluid
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Søg..."
      />
      <Divider />
      <div style={{ overflowY: 'auto', height: '50vh' }}>
        {all &&
          (adding ? (
            <SymptomPickerInput setAdding={setAdding} />
          ) : (
            user && (
              <SymptomPickerRowContainer onClick={() => setAdding(true)}>
                + Tilføj symptom...
              </SymptomPickerRowContainer>
            )
          ))}
        {symptoms.sort(sorter).map((s) => (
          <SymptomPickerRow symptom={s} search={search} />
        ))}
      </div>
    </div>
  );
};

export default SymptomPickerBox;
