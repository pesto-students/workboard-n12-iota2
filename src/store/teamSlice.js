import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: { members: [] },
  reducers: {
    setTeamMmbers(state, action) {
      state.members = [...action.payload.members];
    },
  },
});

export const teamActions = teamSlice.actions;

export default teamSlice;
