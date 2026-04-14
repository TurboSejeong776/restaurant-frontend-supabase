export type OrderItem = {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
  itemTotal: number;
};

export type OrderRestaurant = {
  restaurant: {
    id: number;
    name: string;
  };
  items: OrderItem[];
  subtotal: number;
};

export type OrderPricing = {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
};

export type Order = {
  id: number;
  transactionId: string;
  status: 'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled';
  paymentMethod: string;
  pricing: OrderPricing;
  restaurants: OrderRestaurant[];
  createdAt: string;
  updatedAt: string;
};

export type OrderPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type OrderFilter = {
  status?: 'preparing' | 'on_the_way' | 'delivered' | 'done' | 'cancelled';
};

export type OrderRequest = {
  paymentMethod: string;
  deliveryAddress: string;
  notes?: string;
  phone?: string;
  restaurants: OrderRestaurant[];
};

export type OrderListGET = {
  orders: Order[];
  pagination: OrderPagination;
  filter: OrderFilter;
};
