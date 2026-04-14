export type FullCart = {
  cart: {
    restaurant: {
      id: number;
      name: string;
      logo: string;
    };
    items: {
      id: number;
      menu: {
        id: number;
        foodName: string;
        price: number;
        type: string;
        image: string;
      };
      quantity: number;
      itemTotal: number;
    }[];
    subtotal: number;
  }[];
  summary: {
    totalItems: number;
    totalPrice: number;
    restaurantCount: number;
  };
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type RestaurantCart = {
  restaurantId: number;
  restaurantName: string;
  restaurantLogo?: string;
  items: CartItem[];
  subtotal: number;
};

export type CartState = {
  restaurants: RestaurantCart[];
  totalItems: number;
  totalPrice: number;
};

export const fullCartSlice = (cartData: FullCart): CartState => {
  const restaurants: RestaurantCart[] = cartData.cart.map((r) => ({
    restaurantId: r.restaurant.id,
    restaurantName: r.restaurant.name,
    restaurantLogo: r.restaurant.logo,
    items: r.items.map((i) => ({
      id: i.menu.id,
      name: i.menu.foodName,
      price: i.menu.price,
      quantity: i.quantity,
      image: i.menu.image,
    })),
    subtotal: r.subtotal,
  }));
  const totalItems = restaurants.reduce(
    (sum, r) => sum + r.items.reduce((s, i) => s + i.quantity, 0),
    0
  );
  const totalPrice = restaurants.reduce((sum, r) => sum + r.subtotal, 0);
  return {
    restaurants,
    totalItems,
    totalPrice,
  };
};
