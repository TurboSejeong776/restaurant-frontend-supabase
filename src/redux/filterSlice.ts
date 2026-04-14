import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RestauFilters } from '@/types/RestoTypes';

type FilterState = {
  filters: RestauFilters;
};

const initialState: FilterState = {
  filters: {
    range: null,
    priceMin: null,
    priceMax: null,
    rating: null,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<RestauFilters>) => {
      state.filters = action.payload;
    },
  },
});

export const { setFilters } = filterSlice.actions;
export default filterSlice.reducer;
