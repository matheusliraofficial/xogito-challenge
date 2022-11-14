import { combineReducers } from "redux";

import usersReducer from "./slices/users";
import projectsReducer from "./slices/projects";
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  users: usersReducer,
  projects: projectsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
})