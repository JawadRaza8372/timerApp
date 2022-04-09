import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  choclateList: null,
  features: null,
  lastupdate: null,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setFeatures: (state, action) => {
      if (action.payload.features === null) {
        state.features = null;
      } else {
        state.features = action.payload.features;
      }
    },
    setChocoList: (state, action) => {
      if (action.payload.choclateList === null) {
        state.choclateList = null;
      } else {
        state.choclateList = action.payload.choclateList;
      }
    },
    setUpdate: (state, action) => {
      if (action.payload.lastupdate === null) {
        state.lastupdate = null;
      } else {
        state.lastupdate = action.payload.lastupdate;
      }
    },
  },
});

export const { setFeatures, setChocoList, setUpdate } = projectSlice.actions;

export default projectSlice.reducer;
