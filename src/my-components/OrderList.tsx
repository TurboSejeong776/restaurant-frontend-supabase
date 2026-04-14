import React from 'react';
import { useState } from 'react';

import { Button } from '@/components/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import OrderCard from '@/reusables/OrderCard';
import ReviewForm from './Review';
import type { OrderRestaurant } from '@/types/OrderTypes';
import { ChevronRight } from 'lucide-react';

import Placeholder from '@/assets/RestoLogoPlaceholder.png';

type OrderListProps = { list: OrderRestaurant; transactionId: string };

const OrderList: React.FC<OrderListProps> = ({ list, transactionId }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className='flex flex-col w-[361px] min-h-[274px] rounded-[16px] p-[16px] gap-[12px] bg-white text-black sm:w-full sm:min-h-[268px] sm:p-[20px] sm:gap-[16px]'>
      <div className='flex flex-row w-full h-[32px] gap-[8px]'>
        <img src={Placeholder} alt='logo here!' className='w-[32px] h-[32px]' />
        <p className='text-base sm:text-lg font-bold tracking-tight'>
          {list.restaurant.name}
        </p>
        <ChevronRight className='w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]' />
      </div>

      {list.items.map((item) => (
        <OrderCard key={item.menuId} item={item} />
      ))}

      <div className='w-full h-[1px] bg-[#D5D7DA] my-2' />

      <div className='flex flex-col sm:flex-row w-full h-[110px] gap-[12px] sm:h-[60px] sm:gap-none sm:justify-between'>
        <div className='flex flex-col w-full sm:w-[223px] h-[54px] sm:h-[60px]'>
          <p className='text-sm sm:text-base font-medium sm:tracking-tight'>
            Total
          </p>
          <p className='text-lg sm:text-xl font-extrabold tracking-tight sm:tracking-normal'>
            {list.subtotal}
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='bg-[#C12116] w-full sm:w-[240px] h-[44px] sm:h-[48px] flex rounded-[200px] p-[8px] gap-[8px] font-bold text-sm sm:text-base tracking-tight text-white'>
              Give Review
            </Button>
          </DialogTrigger>
          <ReviewForm
            rev={{
              transactionId: transactionId,
              restaurantId: list.restaurant.id,
              star: 0,
              comment: '',
            }}
            onClose={() => setIsOpen(false)}
          />
        </Dialog>
      </div>
    </section>
  );
};

export default OrderList;
