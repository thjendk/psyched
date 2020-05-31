import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Diagnosis } from 'types/generated';
import { insertOrReplace } from 'redux/misc/utilityFunctions';

const initialState = {
  diagnoses: [] as Diagnosis[]
};

const diagnosisReducer = createSlice({
  name: 'diagnosis',
  initialState,
  reducers: {
    setDiagnoses: (state, action: PayloadAction<Diagnosis[]>) => {
      state.diagnoses = action.payload;
    },
    addDiagnosis: (state, action: PayloadAction<Diagnosis>) => {
      insertOrReplace(state.diagnoses, action.payload);
    },
    removeDiagnosis: (state, action: PayloadAction<number>) => {
      const index = state.diagnoses.findIndex((d) => d.id === action.payload);
      if (index !== -1) state.diagnoses.splice(index, 1);
    }
  }
});

export default diagnosisReducer;
