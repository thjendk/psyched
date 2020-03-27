import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingType } from './auth';
import { Diagnosis } from 'types/generated';

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
    setStatus: (state, action: PayloadAction<LoadingType>) => {
      state.status = action.payload;
    }
  }
});

export default diagnosisReducer;
