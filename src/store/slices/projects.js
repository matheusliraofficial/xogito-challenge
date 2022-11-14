import { createSlice } from "@reduxjs/toolkit";
import initialState from "../../mocks/projects.json";

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    insertProject: (state, { payload }) => {
      payload.id = state[state.length - 1].id + 1;
      state.push(payload);
      return state;
    },
    editProject: (state, { payload }) => {
      const index = state.findIndex(({ id }) => id === parseInt(payload.id));
      state[index] = payload;
      return state;
    },
  },
});

export const { insertProject, editProject } = projectsSlice.actions;
export const projectsSelector = projectId => store => store.projects.find(({ id }) => parseInt(projectId) === id)
export default projectsSlice.reducer;
