import type { OrderRequest } from '@/types/OrderTypes';
import type { OrderListGET } from '@/types/OrderTypes';
import { api } from './api';

export const placeOrder = async (order: OrderRequest) => {
  const response = await api.post('/functions/v1/create-order', order);
  return response.data;
};

export const getMyOrders = async (
  status?: string,
  page = 1,
  limit = 10
): Promise<OrderListGET> => {
  const res = await api.get('/functions/v1/get-my-orders', {
    params: { status, page, limit },
  });
  return res.data.data;
};
