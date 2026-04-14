import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import type { CartState } from '@/types/CartTypes';
import type { OrderRequest } from '@/types/OrderTypes';
import { placeOrder } from '@/api/orderService';

import BNI from '@/assets/BNI.png';
import BRI from '@/assets/BRI.png';
import BCA from '@/assets/BCA.png';
import BMD from '@/assets/BMD.png';

const transactSchema = z.object({
  type: z.string().min(1, 'Please select a payment method'),
});

type TransactForm = z.infer<typeof transactSchema>;

type TransactProps = {
  trans: CartState;
  orderInfo: { deliveryAddress: string; notes?: string; phone?: string } | null;
};

const Transaction: React.FC<TransactProps> = ({ trans, orderInfo }) => {
  const navigate = useNavigate();
  const transactForm = useForm<TransactForm>({
    resolver: zodResolver(transactSchema),
    defaultValues: {
      type: '',
    },
  });

  const onSubmit = async (data: TransactForm) => {
    if (!orderInfo) {
      alert('Please fill in delivery info');
      return;
    }

    const orderPayload: OrderRequest = {
      paymentMethod: data.type,
      deliveryAddress: orderInfo.deliveryAddress,
      notes: orderInfo.notes,
      phone: orderInfo.phone,
      restaurants: trans.restaurants.map((restaurant) => ({
        restaurant: {
          id: restaurant.restaurantId,
          name: restaurant.restaurantName,
        },
        items: restaurant.items.map((item) => ({
          menuId: item.id,
          quantity: item.quantity,
          menuName: item.name,
          price: item.price,
          itemTotal: item.price * item.quantity,
        })),
        subtotal: restaurant.subtotal,
      })),
    };

    try {
      const res = await placeOrder(orderPayload);
      console.log('Order placed successfully', res);
      if (res.success) {
        navigate('/Receipt', { state: res.data.order ?? res.data.orders?.[0] });
      }
    } catch (err) {
      console.error('Order failed', err);
    }
  };
  return (
    <section
      id='transactBase'
      className='flex flex-col w-[361px] h-[586px] py-[16px] gap-[16px] bg-white text-black sm:w-[390px] sm:h-[658px] sm:py-[20px]'
    >
      <Form {...transactForm}>
        <form onSubmit={transactForm.handleSubmit(onSubmit)}>
          <div
            id='transactTop'
            className='flex flex-col w-full px-[16px] gap-[12px] sm:px-0 sm:gap-[16px] sm:h-[304px]'
          >
            <p className='text-base sm:text-lg font-bold tracking-tight'>
              Payment Method
            </p>

            <FormField
              control={transactForm.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col'
                    >
                      <FormItem className='flex flex-row w-full h-[40px] gap-[8px]'>
                        <FormControl>
                          <RadioGroupItem value='Bank Negeri Indonesia' />
                        </FormControl>
                        <img
                          src={BNI}
                          alt='BNI'
                          className='w-[40px] h-[40px]'
                        />
                        <p className='text-sm tracking-tight'>
                          Bank Negeri Indonesia
                        </p>
                      </FormItem>
                      <FormItem className='flex flex-row w-full h-[40px] gap-[8px]'>
                        <FormControl>
                          <RadioGroupItem value='Bank Republik Indonesia' />
                        </FormControl>
                        <img
                          src={BRI}
                          alt='BRI'
                          className='w-[40px] h-[40px]'
                        />
                        <p className='text-sm tracking-tight'>
                          Bank Republik Indonesia
                        </p>
                      </FormItem>
                      <FormItem className='flex flex-row w-full h-[40px] gap-[8px]'>
                        <FormControl>
                          <RadioGroupItem value='Bank Central Asia' />
                        </FormControl>
                        <img
                          src={BCA}
                          alt='BCA'
                          className='w-[40px] h-[40px]'
                        />
                        <p className='text-sm tracking-tight'>
                          Bank Central Asia
                        </p>
                      </FormItem>
                      <FormItem className='flex flex-row w-full h-[40px] gap-[8px]'>
                        <FormControl>
                          <RadioGroupItem value='Bank Mandiri' />
                        </FormControl>
                        <img
                          src={BMD}
                          alt='BMD'
                          className='w-[40px] h-[40px]'
                        />
                        <p className='text-sm tracking-tight'>Bank Mandiri</p>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='w-full h-[1px] bg-[#D5D7DA] my-2' />

          <div
            id='transactBottom'
            className='flex flex-col w-full h-[248px] px-[16px] gap-[12px] sm:h-[282px] sm:px-[20px] sm:gap-[16px]'
          >
            <p className='text-base sm:text-lg font-bold tracking-tight'>
              Payment Summary
            </p>
            <div
              id='itemQty'
              className='flex flex-row w-full justify-between text-sm sm:tracking-tight sm:text-base sm:font-medium'
            >
              <p>{`Price (${
                trans.totalItems > 1
                  ? `${trans.totalItems} items`
                  : `${trans.totalItems} item`
              })`}</p>
              <p className='font-bold tracking-tight'>{trans.totalPrice}</p>
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
                {trans.totalPrice + 10000}
              </p>
            </div>
            <Button
              type='submit'
              className='bg-[#C12116] w-full sm:w-[240px] h-[44px] sm:h-[48px] flex rounded-[200px] p-[8px] gap-[8px] font-bold text-sm sm:text-base tracking-tight text-white'
            >
              Buy
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Transaction;
