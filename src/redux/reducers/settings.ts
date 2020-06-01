import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  shouldHide: true,
  selectedIds: [] as number[],
  symptomSearchLeft: '',
  symptomSearchRight: '',
  diagnosisSearch: '',
  selectedSymptomsSearch: ''
};

const settingsReducer = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleHide: (state) => {
      state.shouldHide = !state.shouldHide;
    },
    setSymptomSearchLeft: (state, action: PayloadAction<string>) => {
      state.symptomSearchLeft = action.payload;
    },
    setSymptomSearchRight: (state, action: PayloadAction<string>) => {
      state.symptomSearchRight = action.payload;
    },
    setDiagnosisSearch: (state, action: PayloadAction<string>) => {
      state.diagnosisSearch = action.payload;
    }
  }
});

export default settingsReducer;
