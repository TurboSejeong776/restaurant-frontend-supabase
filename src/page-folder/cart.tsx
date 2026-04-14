import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import { setCart } from '@/redux/cartSlice';
import { fetchCart } from '@/api/cartService';
import type { FullCart } from '@/types/CartTypes';
import { fullCartSlice } from '@/types/CartTypes';

import { ScrollArea } from '@/components/ui/scroll-area';

import CartList from '@/my-components/CartList';

const Cart = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery<FullCart, Error>({
    queryKey: ['cart'],
    queryFn: fetchCart,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCart(fullCartSlice(data)));
    }
  }, [data, dispatch]);

  if (isLoading) return <p>Loading cart…</p>;
  if (isError) return <p>Failed to load cart.</p>;

  const restaurants = data ? fullCartSlice(data).restaurants : [];

  return (
    <section className='flex flex-col w-[361px] max-h-[816px] mt-[80px] mx-auto gap-[16px]'>
      <p className='font-extrabold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] text-black'>
        My Cart
      </p>
      <ScrollArea className='flex flex-col w-full max-h-[764px] gap-[20px]'>
        {restaurants.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          restaurants.map((restaurant) => (
            <CartList key={restaurant.restaurantId} list={restaurant} />
          ))
        )}
      </ScrollArea>
    </section>
  );
};

export default Cart;
