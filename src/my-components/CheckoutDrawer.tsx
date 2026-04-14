import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

import { ShoppingBag } from 'lucide-react';

type CheckoutDrawerProps = {
  restaurantId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CheckoutDrawer: React.FC<CheckoutDrawerProps> = ({
  restaurantId,
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);

  const restaurantCart = cart.restaurants.find(
    (r) => r.restaurantId === restaurantId
  );

  if (!restaurantCart) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className='flex flex-row w-[393px] sm:w-full h-[64px] sm:h-[80px] justify-between px-[16px] sm:px-[120px] bg-white'>
          <div className='flex flex-col w-[107px] h-[60px] sm:h-[66px] gap-[2px]'>
            <div className='flex flex-row gap-[4px] text-sm sm:text-base tracking-tight text-black'>
              <ShoppingBag className='w-[20px] h-[20px] text-black' />
              <p>
                {restaurantCart.items.length}{' '}
                {restaurantCart.items.length > 1 ? 'Items' : 'Item'}
              </p>
            </div>
            <p className='font-extrabold text-base sm:text-xl text-black'>
              Rp. {restaurantCart.subtotal}
            </p>
          </div>
          <Button
            onClick={() => {
              navigate('/Checkout');
            }}
            className='bg-[#C12116] w-[160px] sm:w-[230px] h-[40px] sm:h-[44px] flex rounded-[200px] p-[8px] gap-[8px] font-bold text-sm sm:text-base tracking-tight'
          >
            Checkout
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckoutDrawer;
