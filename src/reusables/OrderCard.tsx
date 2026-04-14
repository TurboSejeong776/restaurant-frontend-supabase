import React from 'react';

import type { OrderItem } from '@/types/OrderTypes';

import Burger from '@/assets/OrderBurger.png';

type OrderCardProps = {
  item: OrderItem;
};

const OrderCard: React.FC<OrderCardProps> = ({ item }) => {
  return (
    <section className='flex flex-row w-full h-[64px] gap-[12px] sm:w-[486.5px] sm:h-[80px] sm:gap-[17px]'>
      <img
        src={Burger}
        alt='foodImage'
        className='w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] rounded-[12px]'
      />
      <div className='flex flex-col w-full h-[58px] sm:h-[60px]'>
        <p className='font-medium text-sm sm:text-base'>{item.menuName}</p>
        <p className='font-extrabold text-base'>
          {item.quantity} x {item.price}
        </p>
      </div>
    </section>
  );
};
export default OrderCard;
