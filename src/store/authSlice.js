import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: false, profile: {} },
  reducers: {
    signup(state, action) {
      state.isLoggedIn = true;
      state.profile = { ...action.payload }
    },
    logout(state) {
      state.isLoggedIn = false;
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