import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth';
import symptomReducer from './symptoms';
import diagnosisReducer from './diagnoses.reducer';
import settingsReducer from './settings';
import groupsReducer from './groups.reducer';

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  symptoms: symptomReducer.reducer,
  diagnoses: diagnosisReducer.reducer,
  settings: settingsReducer.reducer,
  groups: groupsReducer.reducer
});

export type ReduxState = ReturnType<typeof rootReducer>;

export default rootReducer;
