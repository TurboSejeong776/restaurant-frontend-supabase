import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/button';
import CartCard from '@/reusables/CartCard';
import type { RestaurantCart } from '@/types/CartTypes';
import { ChevronRight } from 'lucide-react';

import Placeholder from '@/assets/RestoLogoPlaceholder.png';

type CartListProps = { list: RestaurantCart };

const CartList: React.FC<CartListProps> = ({ list }) => {
  const navigate = useNavigate();
  return (
    <section className='flex flex-col w-[366px] h-[372px] rounded-[16px] p-[16px] gap-[12px] bg-white text-black sm:h-[388px] sm:p-[20px] sm:gap-[20px]'>
      <div className='flex flex-row w-full h-[32px] gap-[4px] sm:gap-[8px]'>
        <img
          src={list.restaurantLogo || Placeholder}
          alt='logo here!'
          className='w-[32px] h-[32px]'
        />
        <p className='text-base sm:text-lg font-bold tracking-tight'>
          {list.restaurantName}
        </p>
        <ChevronRight className='w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]' />
      </div>

      {list.items.map((item) => (
        <CartCard
          key={item.id}
          item={item}
          restaurant={{
            id: list.restaurantId,
            name: list.restaurantName,
            logo: list.restaurantLogo || '',
          }}
        />
      ))}

      <div className='w-full h-[1px] bg-[#D5D7DA] my-2' />

      <div className='flex flex-col sm:flex-row w-full h-[112px] gap-[12px] sm:h-[60px] sm:gap-none sm:justify-between'>
        <div className='flex flex-col w-full sm:w-[223px] h-[56px] sm:h-[60px]'>
          <p className='text-sm sm:text-base font-medium sm:tracking-tight'>
            Total
          </p>
          <p className='text-lg sm:text-xl font-extrabold tracking-tight sm:tracking-normal'>
            {list.subtotal}
          </p>
        </div>

        <Button
          onClick={() => {
            navigate('/Checkout');
          }}
          className='bg-[#C12116] w-full sm:w-[240px] h-[44px] sm:h-[48px] flex rounded-[100px] p-[8px] gap-[8px] font-bold text-sm sm:text-base tracking-tight'
        >
          Checkout
        </Button>
      </div>
    </section>
  );
};

export default CartList;
