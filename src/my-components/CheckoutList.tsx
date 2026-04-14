import React from 'react';

import { Button } from '@/components/button';
import { useNavigate } from 'react-router-dom';
import CartCard from '@/reusables/CartCard';
import type { RestaurantCart } from '@/types/CartTypes';
import { ChevronRight } from 'lucide-react';

import Placeholder from '@/assets/RestoLogoPlaceholder.png';

type CheckoutListProps = { list: RestaurantCart };

const CheckoutList: React.FC<CheckoutListProps> = ({ list }) => {
  const navigate = useNavigate();
  return (
    <section className='flex flex-col w-[366px] rounded-[16px] p-[16px] gap-[12px] bg-white text-black sm:w-full sm:h-[388px] sm:max-h-full sm:p-[20px] sm:gap-[20px]'>
      <div className='flex flex-row w-full h-[40px] justify-between'>
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
        <Button
          onClick={() => navigate(`/Detail/${list.restaurantId}`)}
          className='border-[#D5D7DA] border-[1px] w-[106px] sm:w-[120px] h-[36px] sm:h-[40px] flex rounded-[100px] px-[24px] py-[8px] gap-[8px] sm:px-[8px] font-bold text-sm sm:text-base tracking-tight'
        >
          Add More
        </Button>
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
    </section>
  );
};

export default CheckoutList;
