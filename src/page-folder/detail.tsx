import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import type { CustomDetailforDetailPage } from '@/types/RestoTypes';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/redux/store';
import { setFilter } from '@/redux/detailMenuSlice';

import { useParams } from 'react-router-dom';

import RestoCard from '@/reusables/RestoCard';
import MenuCard from '@/reusables/MenuCard';
import ReviewCard from '@/reusables/ReviewCard';
import ImgCarousel from '@/my-components/ImgCarousel';
import CheckoutDrawer from '@/my-components/CheckoutDrawer';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { Star } from 'lucide-react';

import { fetchRestaurantForDetailPage } from '@/api/restaurantService';

const Detail = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { id } = useParams<{ id: string }>();
  const restaurantId = Number(id);

  const cart = useSelector((state: RootState) => state.cart);
  const restaurantCart = cart.restaurants.find(
    (r) => r.restaurantId === restaurantId
  );

  useEffect(() => {
    if (restaurantCart && restaurantCart.items.length > 0) {
      setDrawerOpen(true);
    } else {
      setDrawerOpen(false);
    }
  }, [restaurantCart]);

  {
    /*Since the backend's menu type is messy, gotta map them into food / drink like what the figma suggests */
  }
  const mapTypeToFilter = (type: string) => {
    switch (type.toLowerCase()) {
      case 'drink':
        return 'drink';
      case 'food':
      case 'main':
      case 'side':
      default:
        return 'food';
    }
  };

  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.menuFilter.filter);

  const {
    data: restaurantDetail,
    isLoading,
    error,
  } = useQuery<CustomDetailforDetailPage>({
    queryKey: ['restaurantDetail', restaurantId],
    queryFn: () => fetchRestaurantForDetailPage(restaurantId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  if (!restaurantDetail) return null;

  const filteredMenus = restaurantDetail.menus.filter(
    (menu) => filter === 'all' || mapTypeToFilter(menu.type) === filter
  );

  return (
    <section
      id='baseBody'
      className='flex flex-col w-full px-[16px] py-[40px] gap-[16px] sm:px-[120px] sm:py-0 sm:gap-[32px]'
    >
      <div className='sm:hidden'>
        <ImgCarousel images={restaurantDetail.images} />
      </div>

      <div
        id='desktopImages'
        className='hidden sm:flex flex-row w-full max-w-[1200px] h-[470px] gap-[20px]'
      >
        <img
          src={restaurantDetail.images[0]}
          alt='Bruh, no image?'
          className='w-[651px] h-[470px] rounded-[16px]'
        />
        <div
          id='splitDisplay'
          className='flex flex-col w-full h-full gap-[20px]'
        >
          <img
            src={restaurantDetail.images[1]}
            alt='No image here'
            className='w-[529px] h-[302px] rounded-[16px]'
          />
          <div
            id='splitDisplay2'
            className='flex flex-row w-full h-full gap-[20px]'
          >
            <img
              src={restaurantDetail.images[2]}
              alt='Plz ask the backend to add 3rd image'
              className='w-[254.5px] h-[148px] rounded-[16px]'
            />
            <img
              src={restaurantDetail.images[3]}
              alt='I said image, you said Lalilulelo'
              className='w-[254.5px] h-[148px] rounded-[16px]'
            />
          </div>
        </div>
      </div>

      <div
        id='retaurantCard'
        className='flex flex-row w-full h-[90px] sm:h-[120px] sm:gap-[16px] justify-between items-center'
      >
        <RestoCard resto={restaurantDetail} />
        <Button className='flex w-[44px] h-[44px] sm:w-[140px] rounded-[100px] border-[1px] border-[#D5D7DA] px-[16px] py-[12px] gap-[12px] bg-transparent hover:bg-gray-400'>
          <Share2 className='w-[20px] h-[20px] text-black sm:w-[24px] sm:h-[24px]' />
          <p className='font-bold text-base text-black tracking-tight hidden sm:flex'>
            Share
          </p>
        </Button>
      </div>

      <div id='liner1' className='w-full h-[1px] bg-[#D5D7DA]' />

      <div
        id='menuList'
        className='flex flex-col w-full pb-[24px] gap-[16px] sm:pb-0 sm:gap-[32px]'
      >
        <p className='font-extrabold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] text-black'>
          Menu
        </p>

        <div
          id='filterButtons'
          className='flex flex-row w-full h-[40px] gap-[8px] sm:h-[46px] sm:gap-[12px]'
        >
          <Button
            onClick={() => dispatch(setFilter('all'))}
            className={`flex h-[40px] rounded-[100px] border-[1px] px-[16px] py-[8px] gap-[8px] ${
              filter === 'all'
                ? 'border-[#C12116] text-[#C12116] bg-[#FFECEC]'
                : 'border-[#D5D7DA] text-black bg-transparent'
            } sm:h-[46px] sm:px-[16px]`}
          >
            All Menu
          </Button>
          <Button
            onClick={() => dispatch(setFilter('food'))}
            className={`flex h-[40px] rounded-[100px] border-[1px] px-[16px] py-[8px] gap-[8px] ${
              filter === 'food'
                ? 'border-[#C12116] text-[#C12116] bg-[#FFECEC]'
                : 'border-[#D5D7DA] text-black bg-transparent'
            } sm:h-[46px] sm:px-[16px]`}
          >
            Food
          </Button>
          <Button
            onClick={() => dispatch(setFilter('drink'))}
            className={`flex h-[40px] rounded-[100px] border-[1px] px-[16px] py-[8px] gap-[8px] ${
              filter === 'drink'
                ? 'border-[#C12116] text-[#C12116] bg-[#FFECEC]'
                : 'border-[#D5D7DA] text-black bg-transparent'
            } sm:h-[46px] sm:px-[16px]`}
          >
            Drink
          </Button>
        </div>

        <div
          id='menuField'
          className='flex flex-row flex-wrap w-full gap-[16px] sm:gap-[20px]'
        >
          {filteredMenus.map((menu) => (
            <MenuCard key={menu.id} item={menu} restaurant={restaurantDetail} />
          ))}
        </div>
      </div>

      <div id='liner1' className='w-full h-[1px] bg-[#D5D7DA]' />

      <div
        id='reviewList'
        className='flex flex-col w-full gap-[16px] sm:gap-[24px]'
      >
        <div
          id='reviewHeader'
          className='flex flex-col w-full h-[74px] gap-[8px] sm:h-[90px] sm:gap-[12px]'
        >
          <p className='font-extrabold text-[24px] leading-[36px] text-black sm:text-[36px] sm:leading-[44px]'>
            Review
          </p>
          <div className='flex flex-row w-full gap-[4px]'>
            <Star className='w-[24px] h-[24px] sm:w-[34px] sm:h-[34px] text-yellow-500' />
            <p className='font-extrabold text-base sm:text-xl'>
              {`${restaurantDetail.averageRating} (${restaurantDetail.totalReviews} Ulasan)`}
            </p>
          </div>
        </div>

        <div
          id='reviewField'
          className='flex flex-row flex-wrap w-full gap-[16px] sm:gap-[20px]'
        >
          {restaurantDetail.reviews.map((rev) => (
            <ReviewCard key={rev.id} data={rev} />
          ))}
        </div>
      </div>

      <CheckoutDrawer
        restaurantId={restaurantDetail.id}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </section>
  );
};

export default Detail;
