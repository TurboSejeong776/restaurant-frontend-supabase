import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import menuFilterReducer from './detailMenuSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    menuFilter: menuFilterReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
