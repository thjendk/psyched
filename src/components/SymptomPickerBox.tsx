import React, { useState } from 'react';
import Symptom from 'classes/Symptom.class';
import { Input, Divider } from 'semantic-ui-react';
import SymptomPickerInput from './SymptomPickerInput';
import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from 'redux/reducers';
import SymptomPickerRow, { SymptomPickerRowContainer } from './SymptomPickerRow';
import settingsReducer from 'redux/reducers/settings';

export interface SymptomPickerBoxProps {
  symptoms?: Symptom[];
}

const SymptomPickerBox: React.SFC<SymptomPickerBoxProps> = ({ symptoms }) => {
  const [adding, setAdding] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: ReduxState) => state.auth.user);
  const allSymptoms = useSelector((state: ReduxState) => state.symptoms.symptoms);
  const isLeftPicker = !symptoms;
  const search = useSelector((state: ReduxState) =>
    isLeftPicker ? state.settings.symptomSearchLeft : state.settings.symptomSearchRight
  );
  symptoms = symptoms || allSymptoms.filter((s) => !s.parent);

  const handleSearch = (value: string) => {
    if (isLeftPicker) dispatch(settingsReducer.actions.setSymptomSearchLeft(value));
    if (!isLeftPicker) dispatch(settingsReducer.actions.setSymptomSearchRight(value));
  };

  const doesIncludeSearch = (s: Symptom) => {
    s = allSymptoms.find((symp) => symp.id === s.id);
    if (
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    )
      return true;
    if (s.children.length > 0) return s.children.some((s) => doesIncludeSearch(s));
    return false;
  };

  const sorter = (a: Symptom, b: Symptom) => {
    return a.name.localeCompare(b.name);
  };

  symptoms = symptoms.filter((s) => doesIncludeSearch(s));
  return (
    <div>
      <Input
        fluid
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Søg..."
      />
      <Divider />
      <div style={{ overflowY: 'auto', height: '50vh' }}>
        {isLeftPicker &&
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
