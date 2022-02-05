import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { profile: {} },
  reducers: {
    signup(state, action) {
      state.profile = { ...action.payload }
    },
    logout(state) {
      state.profile = {}
    }
    // ,
    // showNotification(state, action) {
    //   state.notification = {
    //     status: action.payload.status,
    //     title: action.payload.title,
    //     message: action.payload.message,
    //   };
    // },
  },
});

export const authActions = authSlice.actions;

export default authSlice;