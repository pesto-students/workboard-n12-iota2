import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import boardSlice from './boardSlice';

const store = configureStore({
  reducer: { auth: authSlice.reducer, boards: boardSlice.reducer },
});

export default store;