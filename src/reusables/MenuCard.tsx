import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/redux/cartSlice';
import type { AppDispatch, RootState } from '@/redux/store';

import { updateCartItem } from '@/api/cartService';

import { Button } from '@/components/button.tsx';
import { Minus } from 'lucide-react';
import { Plus } from 'lucide-react';

import type { RestaurantDetail } from '@/types/RestoTypes';

type MenuCardProps = {
  item: RestaurantDetail['menus'][number];
  restaurant: RestaurantDetail;
};

const MenuCard: React.FC<MenuCardProps> = ({ item, restaurant }) => {
  const cartItem = useSelector((state: RootState) =>
    state.cart.restaurants
      .find((r) => r.restaurantId === restaurant.id)
      ?.items.find((i) => i.id === item.id)
  );
  console.log('cartItem from Redux:', cartItem);

  const quantity = cartItem?.quantity || 0;

  const dispatch = useDispatch<AppDispatch>();

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
            name: item.foodName,
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
              name: item.foodName,
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

  const cart = useSelector((state: RootState) => state.cart);
  console.log('Current cart state:', cart);
  return (
    <section className='flex flex-col w-[172px] sm:min-w-[277px] rounded-[16px] bg-white item-center justify-center overflow-hidden'>
      <img
        src={item.image}
        alt={item.foodName}
        className='w-[172.5px] h-[172.5px] sm:w-[277px] sm:h-[277px] '
      />
      <div className='flex flex-col sm:flex-row w-[172px] sm:w-[277px] h-[134px] sm:h-[94px] p-[12px] sm:p-[16px] gap-[16px] sm:gap-none sm:tracking-tight justify-center sm:justify-between sm:items-center'>
        <div className='flex flex-col w-[91px] h-[58px] sm:w-full sm:h-[62px] justify-between'>
          <p className='text-sm sm:text-base font-medium'>{item.foodName}</p>
          <p className='text-base sm:text-lg font-extrabold'>{item.price}</p>
        </div>

        {quantity === 0 ? (
          <Button
            onClick={handleAdd}
            className='bg-[#C12116] w-full sm:w-[79px] h-[36px] sm:h-[40px] flex rounded-[100px] p-[8px] gap-[8px]'
          >
            Add
          </Button>
        ) : (
          <div className='flex flex-row w-[114px] h-[36px] gap-[16px]'>
            <Button
              onClick={handleRemove}
              className='flex w-[36px] h-[36px] rounded-[812.5px] border-[0.81px] p-[6.5px] gap-[6.5px] justify-center bg-transparent items-center border-[#D5D7DA] sm:w-[40px] sm:h-[40px] sm:rounded-[1000px] sm:border-[1px] sm:p-[8px] sm:gap-[8px]'
            >
              <Minus className='text-black w-[19.5px] h-[19.5px] sm:w-[24px] sm:h-[24px]' />
            </Button>
            <p className='font-semibold text-base sm:text-lg text-black'>
              {quantity}
            </p>
            <Button
              onClick={handleAdd}
              className='flex w-[36px] h-[36px] rounded-[812.5px] border-[0.81px] p-[6.5px] gap-[6.5px] justify-center items-center bg-[#C12116] sm:w-[40px] sm:h-[40px] sm:rounded-[1000px] sm:p-[8px] sm:gap-[8px]'
            >
              <Plus className='text-white w-[19.5px] h-[19.5px] sm:w-[24px] sm:h-[24px]' />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuCard;
