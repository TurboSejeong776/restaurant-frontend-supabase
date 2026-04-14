import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CartState, CartItem } from '@/types/CartTypes';

const initialState: CartState = {
  restaurants: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      state.restaurants = action.payload.restaurants;
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    },
    addItem: (
      state,
      action: PayloadAction<{
        restaurantId: number;
        restaurantName: string;
        restaurantLogo?: string;
        item: CartItem;
      }>
    ) => {
      const { restaurantId, restaurantName, restaurantLogo, item } =
        action.payload;
      const rest = state.restaurants.find(
        (r) => r.restaurantId === restaurantId
      );

      if (rest) {
        const found = rest.items.find((i) => i.id === item.id);
        if (found) found.quantity += item.quantity;
        else rest.items.push(item);
        rest.subtotal = rest.items.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
      } else {
        state.restaurants.push({
          restaurantId,
          restaurantName,
          restaurantLogo: restaurantLogo || '',
          items: [item],
          subtotal: item.price * item.quantity,
        });
      }

      // Update totals
      state.totalItems = state.restaurants.reduce(
        (sum, r) => sum + r.items.reduce((s, i) => s + i.quantity, 0),
        0
      );
      state.totalPrice = state.restaurants.reduce(
        (sum, r) => sum + r.subtotal,
        0
      );
    },
    clearCart: (state) => {
      state.restaurants = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { setCart, addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
