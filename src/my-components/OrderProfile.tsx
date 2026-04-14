import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import Locate from '@/assets/Category/Location.png';

const orderProfSchema = z.object({
  deliveryAddress: z.string().min(5, 'Nobody has address that short!'),
  notes: z.string().optional(),
  phone: z.string().optional(),
});

export type OrderProfile = z.infer<typeof orderProfSchema>;

type OrderTypes = {
  address?: string;
  phone?: string;
  onSave?: (data: OrderProfile) => void;
};

const OrderProfile: React.FC<OrderTypes> = ({ address, phone, onSave }) => {
  const [orderData, setOrderData] = useState<OrderProfile>({
    deliveryAddress: '',
    notes: undefined,
    phone: undefined,
  });
  const profileForm = useForm<z.infer<typeof orderProfSchema>>({
    resolver: zodResolver(orderProfSchema),
    defaultValues: {
      deliveryAddress: '',
      notes: undefined,
      phone: undefined,
    },
  });

  const onSubmit = (data: OrderProfile) => {
    console.log(data); //for debugging!
    setOrderData(data);
    if (onSave) onSave(data);
  };
  return (
    <section
      id='base'
      className='flex flex-col w-full h-[178px] sm:h-[201px] p-[16px] gap-[16px] sm:p-[20px] sm:gap-[21px] bg-white text-black'
    >
      <div
        id='theField'
        className='flex flex-col w-full h-[94px] sm:h-[100px] gap-[4px] justify-around'
      >
        <div className='flex flex-row gap-[8px]'>
          <img
            src={Locate}
            alt='V'
            className='w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]'
          />
          <p className='font-extrabold text-base sm:text-lg sm:tracking-tight'>
            Delivery Address
          </p>
        </div>
        <p className='text-sm sm:text-base sm:tracking-tight'>
          {orderData.deliveryAddress || address || 'Please enter address'}
        </p>
        <p className='text-sm sm:text-base sm:tracking-tight'>
          {orderData.phone || phone || 'Please enter phone number'}
        </p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className='flex w-[120px] h-[36px] sm:h-[40px] rounded-[100px] p-[8px] gap-[8px] border-[1px] border-[#D5D7DA] bg-transparent text-black font-bold tracking-tight text-sm sm:text-base'>
            Change
          </Button>
        </DialogTrigger>
        <DialogContent
          showCloseButton={false}
          className='flex flex-col p-[8px] gap-[8px]'
        >
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onSubmit)}>
              <div
                id='addressWrap'
                className='flex flex-row w-full h-[48px] rounded-[8px] p-[8px] gap-[8px] items-center'
              >
                <p className='font-semibold text-sm tracking-tight text-black w-[70px]'>
                  Address
                </p>
                <div className='flex-1'>
                  <FormField
                    control={profileForm.control}
                    name='deliveryAddress'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type='string'
                            placeholder='Please enter your address'
                            className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div
                id='noteWrap'
                className='flex flex-row w-full h-[48px] rounded-[8px] p-[8px] gap-[8px] items-center'
              >
                <p className='font-semibold text-sm tracking-tight text-black w-[70px]'>
                  Note
                </p>
                <div className='flex-1'>
                  <FormField
                    control={profileForm.control}
                    name='notes'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type='string'
                            placeholder='Enter your personal message (eg. "No pickles")'
                            className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div
                id='phoneWrap'
                className='flex flex-row w-full h-[48px] rounded-[8px] p-[8px] gap-[8px] items-center'
              >
                <p className='font-semibold text-sm tracking-tight text-black w-[70px]'>
                  Phone
                </p>
                <div className='flex-1'>
                  <FormField
                    control={profileForm.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type='string'
                            placeholder='Enter your personal message (eg. "No pickles")'
                            className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type='submit'>Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default OrderProfile;
