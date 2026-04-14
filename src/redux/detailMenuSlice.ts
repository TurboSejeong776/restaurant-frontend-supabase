import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type MenuFilterState = {
  filter: 'all' | 'food' | 'drink';
};

const initialState: MenuFilterState = { filter: 'all' };

const menuFilterSlice = createSlice({
  name: 'menuFilter',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<'all' | 'food' | 'drink'>) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = menuFilterSlice.actions;
export default menuFilterSlice.reducer;
