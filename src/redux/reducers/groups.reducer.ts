import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Group from 'classes/Group.class';
import { insertOrReplace } from 'redux/misc/utilityFunctions';

const initialState = {
  groups: [] as Group[]
};

const groupsReducer = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroups: (state, action: PayloadAction<Group[]>) => {
      insertOrReplace(state.groups, action.payload);
    }
  }
});

export default groupsReducer;
