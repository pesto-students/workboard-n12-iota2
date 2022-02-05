import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import boardSlice from './boardSlice';
import teamSlice from './teamSlice';

const store = configureStore({
  reducer: { auth: authSlice.reducer, boards: boardSlice.reducer, team: teamSlice.reducer },
});

export default store;