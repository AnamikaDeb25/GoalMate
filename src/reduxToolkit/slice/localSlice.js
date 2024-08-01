import {createSlice} from '@reduxjs/toolkit';

const localSlice = createSlice({
  name: 'localState',
  initialState: [],
  reducers: {
    addCurrentUser(state, action) {
      return action.payload;
    },
  },
});

export const {addCurrentUser} = localSlice.actions;
export default localSlice.reducer;
