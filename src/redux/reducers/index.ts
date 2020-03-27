import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import symptomReducer from './symptoms';
import diagnosisReducer from './diagnoses.reducer';

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  symptoms: symptomReducer.reducer,
  diagnoses: diagnosisReducer.reducer
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;
