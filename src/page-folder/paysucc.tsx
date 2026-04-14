import { useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import type { Order } from '@/types/OrderTypes';

import { CheckIcon } from 'lucide-react';
import Lazy from '@/assets/LazyLogo.png';

const PaySucc = () => {
  const location = useLocation();
  const transaction = location.state as Order;

  if (!transaction) {
    return <p>No transaction data. Please place an order first.</p>;
  }
  return (
    <section className='flex flex-col m-auto gap-[28px] w-[361px] h-[588px] items-center justify-center bg-white text-black sm:w-[428px]'>
      <img src={Lazy} alt='importLogoHere!!' className='w-[149px] h-[42px]' />

      <div
        id='receipt'
        className='shadow-[#CBCACA40] shadow-lg drop-shadow flex flex-col w-full h-[518px] p-[16px] gap-[16px] rounded-[16px] bg-white items-center'
      >
        <div
          id='topPart'
          className='flex flex-col w-full sm:h-[132px] gap-[4px] items-center justify-between'
        >
          <div className='flex w-[64px] h-[64px] bg-[#44AB09] rounded-full items-center justify-center'>
            <CheckIcon className='text-white w-[48px] h-[48px]' />
          </div>
          <p className='font-extrabold text-lg tracking-tight text-center sm:text-xl sm:tracking-normal'>
            Payment Success
          </p>
          <p className='text-sm sm:text-base text-center tracking-tight'>
            Your payment has been successfully processed.
          </p>
        </div>

        <div className='w-full h-[1px] bg-[#D5D7DA] my-2' />

        {/*Data Fields*/}
        <div
          id='date'
          className='flex flex-row w-full justify-between text-sm sm:tracking-tight sm:text-base sm:font-medium'
        >
          <p>Date</p>
          <p className='font-bold tracking-tight'>
            {new Date(transaction.createdAt).toLocaleString()}
          </p>
        </div>
        <div
          id='payMethod'
          className='flex flex-row w-full justify-between text-sm sm:tracking-tight sm:text-base sm:font-medium'
        >
          <p>Payment Method</p>
          <p className='font-bold tracking-tight'>
            {transaction.paymentMethod}
          </p>
        </div>
        <div
          id='itemQty'
          className='flex flex-row w-full justify-between text-sm sm:tracking-tight sm:text-base sm:font-medium'
        >
          <p>{`Price (${
            transaction.restaurants[0]?.items.length ?? 0
          } items)`}</p>
          <p className='font-bold tracking-tight'>
            {' '}
            {transaction.pricing.subtotal}
          </p>
        </div>
        <div
          id='deliFee'
          className='flex flex-row w-full justify-between sm:tracking-tight sm:text-base sm:font-medium'
        >
          <p>Delivery Fee</p>
          <p className='font-bold tracking-tight'>Rp.10000</p>
        </div>
        <div
          id='serFee'
          className='flex flex-row w-full justify-between sm:tracking-tight sm:text-base sm:font-medium'
        >
          <p>Service Fee</p>
          <p className='font-bold tracking-tight'>Rp.1000</p>
        </div>
        <div id='total' className='flex flex-row w-full justify-between '>
          <p className='text-base sm:text-lg'>Total</p>
          <p className='font-bold text-base sm:text-lg tracking-tight sm:font-extrabold'>
            {transaction.pricing.totalPrice}
          </p>
        </div>

        <div className='w-full h-[1px] bg-[#D5D7DA] my-2' />

        <Button className='bg-[#C12116] w-full h-[44px] sm:h-[48px] flex rounded-[200px] p-[8px] gap-[8px] font-bold text-sm sm:text-base tracking-tight text-white'>
          See My Orders
        </Button>
      </div>
    </section>
  );
};

export default PaySucc;
