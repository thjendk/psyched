import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from 'classes/User';

export type LoadingType = 'success' | 'loading' | 'error' | 'idle';
const initialState = { user: null as User | null, status: 'idle' as LoadingType };

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setStatus: (state, action: PayloadAction<LoadingType>) => {
      state.status = action.payload;
    }
  }
});

export default authReducer;
