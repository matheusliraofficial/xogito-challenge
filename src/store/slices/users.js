import { createSlice } from "@reduxjs/toolkit";
import initialState from "../../mocks/users.json";

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    insertUser: (state, { payload }) => {
      payload.id = state[state.length - 1].id + 1;
      state.push(payload);
      return state;
    },
  },
});

export const { insertUser } = usersSlice.actions;
export default usersSlice.reducer;
