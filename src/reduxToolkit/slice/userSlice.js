import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: [],
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const {addUser} = userSlice.actions;
export default userSlice.reducer;
