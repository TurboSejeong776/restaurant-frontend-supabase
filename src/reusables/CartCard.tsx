import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/redux/cartSlice';
import type { AppDispatch, RootState } from '@/redux/store';
import { Button } from '@/components/button';

import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';

import type { CartItem } from '@/types/CartTypes.ts';
import { updateCartItem } from '@/api/cartService';

export type CartCardProps = {
  item: CartItem;
  restaurant: {
    id: number;
    name: string;
    logo?: string;
  };
};

const CartCard: React.FC<CartCardProps> = ({ item, restaurant }) => {
  const cartItem = useSelector((state: RootState) =>
    state.cart.restaurants
      .find((r) => r.restaurantId === restaurant.id)
      ?.items.find((i) => i.id === item.id)
  );
  const dispatch = useDispatch<AppDispatch>();
  const quantity = cartItem?.quantity ?? 0;
  const handleAdd = async () => {
    try {
      await updateCartItem({
        restaurantId: restaurant.id,
        menuId: item.id,
        quantity: 1,
      });

      dispatch(
        addItem({
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          restaurantLogo: restaurant.logo,
          item: {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
          },
        })
      );
    } catch (err) {
      console.error('Failed to update cart:', err);
    }
  };

  const handleRemove = async () => {
    if (quantity > 0) {
      try {
        await updateCartItem({
          restaurantId: restaurant.id,
          menuId: item.id,
          quantity: -1,
        });

        dispatch(
          addItem({
            restaurantId: restaurant.id,
            restaurantName: restaurant.name,
            restaurantLogo: restaurant.logo,
            item: {
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: -1,
              image: item.image,
            },
          })
        );
      } catch (err) {
        console.error('Failed to remove item from cart:', err);
      }
    }
  };

  return (
    <section className='flex flex-row justify-between w-full h-[84px] sm:h-[84px] items-center'>
      <div className='flex flex-row w-[172px] sm:w-[188px] h-[64px] sm:h-[80px] gap-[17px]'>
        <img
          src={item.image}
          alt={item.name}
          className='w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] rounded-[12px]'
        />
        <div className='flex flex-col w-[91px] h-[58px] sm:h-[62px] justify-center sm:tracking-tight'>
          <p className='text-sm sm:text-base font-medium text-right'>
            {item.name}
          </p>
          <p className='text-base sm:text-lg font-extrabold text-right'>
            {item.price}
          </p>
        </div>
      </div>

      <div className='flex w-[157px] sm:w-[273.5px] h-[84px] sm:h-[88px] py-[24px] gap-[16px] justify-end'>
        <div className='flex flex-row w-[114px] sm:w-[123px] h-[36px] sm:h-[40px] gap-[16px] items-center'>
          <Button
            onClick={handleRemove}
            className='flex w-[36px] h-[36px]  rounded-[812.5px] border-[0.81px] p-[6.5px] gap-[6.5px] justify-center bg-transparent items-center border-[#D5D7DA] sm:w-[40px] sm:h-[40px] sm:rounded-[1000px] sm:border-[1px] sm:p-[8px] sm:gap-[8px]'
          >
            <Minus className='text-black w-[19.5px] h-[19.5px] sm:w-[24px] sm:h-[24px]' />
          </Button>
          <p className='font-semibold text-base sm:text-lg text-black'>
            {item.quantity}
          </p>
          <Button
            onClick={handleAdd}
            className='flex w-[36px] h-[36px] rounded-[812.5px] border-[0.81px] p-[6.5px] gap-[6.5px] justify-center items-center bg-[#C12116] sm:w-[40px] sm:h-[40px] sm:rounded-[1000px] sm:p-[8px] sm:gap-[8px]'
          >
            <Plus className='text-white w-[19.5px] h-[19.5px] sm:w-[24px] sm:h-[24px]' />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CartCard;
