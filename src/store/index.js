import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import boardSlice from './borad-slice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
});

export default store;