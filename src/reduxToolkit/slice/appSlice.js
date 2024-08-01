import {createSlice} from '@reduxjs/toolkit';

const getFormattedDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = today.getFullYear();

  return `${day}/${month}/${year}`;
};
const appSlice = createSlice({
  name: 'appSlice',
  initialState: {
    list: [{title: 'Add your todays task', id: 1, taskList: []}],
  },
  reducers: {
    addTask: (state, action) => {
      const {task, done} = action.payload;
      const id = getFormattedDate();
      const itemIndex = state.list.findIndex(item => item.id === id);

      if (itemIndex !== -1) {
        state.list[itemIndex].taskList.push({task, done});
      } else {
        state.list.push({
          id,
          title: `Your Top Tasks for ${id}`,
          taskList: [{task, done}],
        });
      }
    },
    updateTask: (state, action) => {
      const {task, done, taskIndex} = action.payload;
      const id = getFormattedDate();
      const itemIndex = state.list.findIndex(item => item.id === id);

      if (
        itemIndex !== -1 &&
        state.list[itemIndex] &&
        state.list[itemIndex].taskList[taskIndex]
      ) {
        state.list[itemIndex].taskList[taskIndex] = {task, done};
      }
    },
    removeTask: (state, action) => {
      const id = getFormattedDate();
      const itemIndex = state.list.findIndex(item => item.id === id);
      const {taskIndex} = action.payload;
      if (state.list[itemIndex]) {
        state.list[itemIndex].taskList = state.list[itemIndex].taskList.filter((_, tIndex) => tIndex !== taskIndex);
      }
    },
  },
});

export const {addTask, updateTask, removeTask} = appSlice.actions;
export default appSlice.reducer;
