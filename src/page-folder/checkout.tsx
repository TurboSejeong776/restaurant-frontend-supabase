import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';
import type { FullCart } from '@/types/CartTypes';
import { fetchCart } from '@/api/cartService';

import { setCart } from '@/redux/cartSlice';
import { fullCartSlice } from '@/types/CartTypes';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';

import OrderProfile from '@/my-components/OrderProfile';
import CheckoutList from '@/my-components/CheckoutList';
import Transaction from '@/my-components/Transaction';

const Checkout = () => {
  const [orderInfo, setOrderInfo] = useState<{
    deliveryAddress: string;
    notes?: string;
    phone?: string;
  } | null>(null);
  const cartState = useSelector((state: RootState) => state.cart);

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

  console.log('Checkout render start');
  console.log('orderInfo:', orderInfo);
  console.log('cartState:', cartState);

  return (
    <section className='flex flex-col w-[361px] sm:w-[1000px] sm:justify-around mt-[80px] mx-auto gap-[16px] sm:gap-[24px]'>
      <p className='font-extrabold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] text-black'>
        Checkout
      </p>
      <div className='flex flex-col sm:hidden'>
        <OrderProfile onSave={setOrderInfo} />
        {Array.isArray(cartState.restaurants) &&
          cartState.restaurants.map((data) => (
            <CheckoutList key={data.restaurantId} list={data} />
          ))}
        <Transaction trans={cartState} orderInfo={orderInfo} />
      </div>

      <div className='sm:flex flex-row w-full hidden justify-between h-full gap-[20px]'>
        <div className='flex flex-col w-full max-w-[590px] gap-[20px]'>
          <OrderProfile onSave={setOrderInfo} />
          {Array.isArray(cartState.restaurants) &&
            cartState.restaurants.map((data) => (
              <CheckoutList key={data.restaurantId} list={data} />
            ))}
        </div>

        <Transaction trans={cartState} orderInfo={orderInfo} />
      </div>
    </section>
  );
};

export default Checkout;
