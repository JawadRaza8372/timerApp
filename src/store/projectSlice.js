import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  tasks: [],
  usersActivity: [],
  layout: "",
  todayActivity: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      if (action.payload.users === null) {
        state.users = null;
      } else {
        state.users = action.payload.users;
      }
    },
    setTasks: (state, action) => {
      if (action.payload.tasks === null) {
        state.tasks = null;
      } else {
        state.tasks = action.payload.tasks;
      }
    },
    setUserActivity: (state, action) => {
      if (action.payload.usersActivity === null) {
        state.usersActivity = null;
      } else {
        state.usersActivity = action.payload.usersActivity;
      }
    },
    setLayout: (state, action) => {
      if (action.payload.loginLayout === null) {
        state.layout = "";
      } else {
        state.layout = action.payload.loginLayout;
      }
    },
    setTodayActivity: (state, action) => {
      if (action.payload.todayActivity === null) {
        state.todayActivity = null;
      } else {
        state.todayActivity = action.payload.todayActivity;
      }
    },
  },
});

export const {
  setTasks,
  setUsers,
  setUserActivity,
  setLayout,
  setTodayActivity,
} = projectSlice.actions;

export default projectSlice.reducer;
