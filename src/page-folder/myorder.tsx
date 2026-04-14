import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getMyOrders } from '@/api/orderService';
import type { OrderListGET, Order } from '@/types/OrderTypes';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import OrderList from '@/my-components/OrderList';
import Searchbar from '@/my-components/Searchbar';

const MyOrder = () => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<string | undefined>(undefined);

  const { data, isLoading, isError } = useQuery<OrderListGET>({
    queryKey: ['myOrders', status],
    queryFn: () => getMyOrders(status),
  });
  const filteredOrders = data?.orders.filter((order) =>
    order.restaurants.some((r) =>
      r.restaurant.name?.toLowerCase().includes(keyword.toLowerCase())
    )
  );
  return (
    <section
      id='myOrderBase'
      className='flex flex-row w-[361px] sm:w-[1000px] mt-[80px] mx-auto gap-[16px] bg-white justify-center'
    >
      <div className='flex flex-col w-full justify-center'>
        <div
          id='myOrderBody'
          className='flex flex-col w-full p-[16px] gap-[20px]'
        >
          <p className='font-extrabold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] text-black'>
            My Orders
          </p>

          <Searchbar keyword={keyword} setKeyword={setKeyword} />
          <div className='flex flex-row w-[329px] h-[40px] gap-[8px] items-center sm:w-full'>
            <p className='font-bold text-sm tracking-tight'>Status</p>
            <ScrollArea className='flex flex-row w-[329px] sm:w-full h-[40px] gap-[8px] whitespace-nowrap'>
              {[
                'preparing',
                'on_the_way',
                'delivered',
                'done',
                'cancelled',
              ].map((s) => (
                <Button
                  key={s}
                  variant={status === s ? 'default' : 'outline'}
                  className='h-[40px] rounded-[100px] px-[16px] py-[8px] font-semibold text-sm tracking-tight'
                  onClick={() => setStatus(s)}
                >
                  {s.replace('_', ' ')}
                </Button>
              ))}
            </ScrollArea>
          </div>
          <div className='flex flex-col w-full justify-center items-center'>
            {/*Render all OrderList here */}
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong loading orders.</p>}
            {filteredOrders?.length
              ? filteredOrders.map((order: Order) => (
                  <OrderList
                    key={order.id}
                    list={order.restaurants[0]}
                    transactionId={order.transactionId}
                  />
                ))
              : !isLoading && <p>No orders found.</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrder;
