import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingType } from './auth';
import { Diagnosis } from 'types/generated';
import { insertOrReplace } from 'redux/misc/utilityFunctions';

const initialState = {
  status: 'idle' as LoadingType,
  diagnoses: null as Diagnosis[]
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
    },
    setStatus: (state, action: PayloadAction<LoadingType>) => {
      state.status = action.payload;
    }
  }
});

export default diagnosisReducer;
