import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shouldHide: true,
  selectedIds: [] as number[],
  symptomSearch: '',
  diagnosisSearch: '',
  selectedSymptomsSearch: ''
};

const settingsReducer = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleHide: (state) => {
      state.shouldHide = !state.shouldHide;
    }
  }
});

export default settingsReducer;
