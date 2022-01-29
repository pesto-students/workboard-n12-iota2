import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import boardSlice from './boardSlice';

const store = configureStore({
  reducer: { auth: authSlice.reducer, board: boardSlice.reducer },
});

export default store;