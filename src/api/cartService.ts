import { api } from './api'; // your axios instance
import type { FullCart } from '@/types/CartTypes';

export const fetchCart = async (): Promise<FullCart> => {
  const { data } = await api.get('/functions/v1/cart');
  const rawCart = data.data;
  return {
    cart: rawCart.cart,
    summary: { totalItems: 0, totalPrice: 0, restaurantCount: 0 },
  };
};

export const updateCartItem = async ({
  restaurantId,
  menuId,
  quantity,
}: {
  restaurantId: number;
  menuId: number;
  quantity: number;
}): Promise<void> => {
  await api.post('/functions/v1/cart', { restaurantId, menuId, quantity });
};
