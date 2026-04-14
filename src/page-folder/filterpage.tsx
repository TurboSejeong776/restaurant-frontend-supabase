import { useEffect, useRef } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { fetchRestaurants } from '@/api/restaurantService';

import { useDispatch } from 'react-redux';
import { setFilters } from '@/redux/filterSlice';

import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { ListFilter } from 'lucide-react';
import { Star } from 'lucide-react';

import RestoCard from '@/reusables/RestoCard';

{
  /* Due to no specification on what determines "delivery, nearby, lunch, etc" the filter will be based on All Restaurant */
}

const priceSchema = z.object({
  minPrice: z
    .number()
    .min(1000, {
      message: 'Bro, with inflation around ye still expect 4-digit prices?',
    })
    .max(10000000000, {
      message: 'You tryna order food or buying a luxury penthouse?',
    })
    .nullable()
    .optional(),

  maxPrice: z
    .number()
    .min(1000, {
      message: 'Bro, with inflation around ye still expect 4-digit prices?',
    })
    .max(10000000000, {
      message: 'You tryna order food or buying a luxury penthouse?',
    })
    .nullable()
    .optional(),
});

const Filter = () => {
  const priceForm = useForm<z.infer<typeof priceSchema>>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      minPrice: null,
      maxPrice: null,
    },
    mode: 'onChange',
  });

  const filters = useSelector((state: RootState) => state.filters.filters);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { watch } = priceForm;
  const minPrice = watch('minPrice');
  const maxPrice = watch('maxPrice');

  useEffect(() => {
    console.log('Filter changed', { minPrice, maxPrice });
    // add logic later!
  }, [minPrice, maxPrice]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setFilters({
        range: null,
        priceMin: minPrice ?? null,
        priceMax: maxPrice ?? null,
        rating: null,
      })
    );
  }, [minPrice, maxPrice, dispatch]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['restaurants', filters],
    queryFn: ({ pageParam }) => fetchRestaurants(pageParam, 10, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      if (pagination.page < pagination.totalPages) {
        return pagination.page + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { root: document.querySelector('#desktopFilteredListField') }
    );
    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Error loading restaurants</p>;

  return (
    <section className='flex flex-col w-[361px] h-screen gap-[16px] mt-[80px] mx-auto sm:mt-[128px] sm:gap-[32px] sm:w-[1200px]'>
      <p className='font-extrabold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] text-black'>
        All Restaurant
      </p>
      <div
        id='filterHeaderMOBILE'
        className='sm:hidden flex flex-row w-full h-[52px] justify-between p-[12px]'
      >
        <p className='font-extrabold text-sm text-black'>FILTER</p>

        {/* This is for the mobile's filter left tab */}
        <Sheet>
          <SheetTrigger asChild>
            <ListFilter className='text-black w-[20px] h-[20px] sm:hidden' />
          </SheetTrigger>
          <SheetContent
            className='flex flex-col w-[298px] p-[16px] gap-[8px] bg-white text-black'
            side='left'
          >
            <div
              id='filterBody'
              className='mt-[50px] flex flex-col w-[266px] py-[16px] gap-[12px]'
            >
              <div
                id='filterTOP'
                className='flex flex-col w-full gap-[10px] justify-center'
              >
                <p className='font-bold text-base tracking-tight'>FILTER</p>
                <p className='font-extrabold text-base'>Distance</p>

                {/* These are technically useless because backend doesn't provide coordination in the  */}
                <div
                  id='nearbyFilter'
                  className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
                >
                  <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                  <p className='text-sm tracking-tight'>Nearby</p>
                </div>
                <div
                  id='1kmFilter'
                  className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
                >
                  <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                  <p className='text-sm tracking-tight'>Within 1 km</p>
                </div>
                <div
                  id='3kmFilter'
                  className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
                >
                  <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                  <p className='text-sm tracking-tight'>Within 3 km</p>
                </div>
                <div
                  id='5kmFilter'
                  className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
                >
                  <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                  <p className='text-sm tracking-tight'>Within 5 km</p>
                </div>
              </div>

              <div className='w-full h-[1px] bg-[#D5D7DA]' />

              <div
                id='filterMid'
                className='flex flex-col w-full gap-[10px] justify-center'
              >
                <p className='font-extrabold text-base'>Price</p>
                <Form {...priceForm}>
                  <div
                    id='minPriceWrap'
                    className='flex flex-row w-full h-[48px] rounded-[8px] border-[1px] border-[#D5D7DA] p-[8px] gap-[8px] items-center'
                  >
                    <div className='flex w-[38px] h-[38px] bg-[#E9EAEB] gap-[8px] p-[8px] rounded-[4px]'>
                      <p className='font-semibold text-sm tracking-tight text-black'>
                        Rp
                      </p>
                    </div>
                    <FormField
                      control={priceForm.control}
                      name='minPrice'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='Minimum Price'
                              className='text-[#717680] text-sm tracking-tight w-[204px] h-[48px] bg-transparent border-none'
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ''
                                    ? null
                                    : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div
                    id='maxPriceWrap'
                    className='flex flex-row w-full h-[48px] rounded-[8px] border-[1px] border-[#D5D7DA] p-[8px] gap-[8px] items-center'
                  >
                    <div className='flex w-[38px] h-[38px] bg-[#E9EAEB] gap-[8px] p-[8px] rounded-[4px]'>
                      <p className='font-semibold text-sm tracking-tight text-black'>
                        Rp
                      </p>
                    </div>
                    <FormField
                      control={priceForm.control}
                      name='maxPrice'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type='number'
                              placeholder='Maximum Price'
                              className='text-[#717680] text-sm tracking-tight w-[204px] h-[48px] bg-transparent border-none'
                              {...field}
                              value={field.value ?? ''}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ''
                                    ? null
                                    : Number(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Form>
              </div>

              <div className='w-full h-[1px] bg-[#D5D7DA]' />

              <div
                id='filterBottom'
                className='flex flex-col w-full gap-[10px]'
              >
                <p className='font-extrabold text-base'>Rating</p>
                <div id='ratingList' className='flex flex-col w-full'>
                  {/* To avoid OCD peeps from seeing the 8px making the stars not aligned with the distance checklist above, I decided not to put the paddings */}

                  <div
                    id='5star'
                    className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
                  >
                    <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                    <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
                    <p className='text-sm tracking-tight'>5</p>
                  </div>
                  <div
                    id='4star'
                    className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
                  >
                    <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                    <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
                    <p className='text-sm tracking-tight'>4</p>
                  </div>
                  <div
                    id='3star'
                    className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
                  >
                    <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                    <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
                    <p className='text-sm tracking-tight'>3</p>
                  </div>
                  <div
                    id='2star'
                    className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
                  >
                    <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                    <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
                    <p className='text-sm tracking-tight'>2</p>
                  </div>
                  <div
                    id='1star'
                    className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
                  >
                    <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                    <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
                    <p className='text-sm tracking-tight'>1</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <ScrollArea
        id='filteredMenuFieldMOBILE'
        className='sm:hidden flex flex-col w-full max-h-[634px] gap-[16px]'
      >
        {data?.pages
          .flatMap((page) => page.restaurants)
          .map((resto) => (
            <RestoCard key={resto.id} resto={resto} />
          ))}

        <div
          ref={loadMoreRef}
          className='h-10 w-full flex justify-center items-center'
        >
          {isFetchingNextPage && <p>Loading more…</p>}
        </div>
      </ScrollArea>

      <div
        id='desktopFilterWrapper'
        className='hidden sm:flex flex-row w-full h-[792px] gap-[40px]'
      >
        <div
          id='filterBodyDESK'
          className='flex flex-col w-[266px] h-full py-[16px] gap-[24px]'
        >
          <div
            id='filterTOPDESK'
            className='flex flex-col w-full px-[16px] gap-[10px]'
          >
            <p className='font-bold text-base'>FILTER</p>
            <p className='font-extrabold text-lg tracking-tight'>Distance</p>

            {/* These are technically useless because backend doesn't provide coordination in the API response */}
            <div
              id='nearbyFilterDESK'
              className='bg-none flex flex-row w-full h-[30px] gap-[8px]'
            >
              <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
              <p className='text-base tracking-tight'>Nearby</p>
            </div>
            <div
              id='1kmFilterDESK'
              className='bg-none flex flex-row w-full h-[30px] gap-[8px]'
            >
              <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
              <p className='text-base tracking-tight'>Within 1 km</p>
            </div>
            <div
              id='3kmFilterDESK'
              className='bg-none flex flex-row w-full h-[30px] gap-[8px]'
            >
              <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
              <p className='text-base tracking-tight'>Within 3 km</p>
            </div>
            <div
              id='5kmFilterDESK'
              className='bg-none flex flex-row w-full h-[30px] gap-[8px]'
            >
              <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
              <p className='text-base tracking-tight'>Within 5 km</p>
            </div>
          </div>

          <div className='w-full h-[1px] bg-[#D5D7DA]' />

          <div
            id='filterMidDESK'
            className='flex flex-col w-full px-[16px] gap-[10px] '
          >
            <p className='font-extrabold text-lg tracking-tight'>Price</p>
            <Form {...priceForm}>
              <div
                id='minPriceWrapDESK'
                className='flex flex-row w-full h-[54px] rounded-[8px] border-[1px] border-[#D5D7DA] p-[8px] gap-[8px] items-center'
              >
                <div className='flex w-[38px] h-[38px] bg-[#F5F5F5] gap-[8px] p-[8px] rounded-[4px]'>
                  <p className='font-semibold text-base tracking-tight text-black'>
                    Rp
                  </p>
                </div>
                <FormField
                  control={priceForm.control}
                  name='minPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Minimum Price'
                          className='text-[#717680] text-base tracking-tight w-[172px] h-[30px] bg-transparent border-none'
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ''
                                ? null
                                : Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                id='maxPriceWrapDESK'
                className='flex flex-row w-full h-[54px] rounded-[8px] border-[1px] border-[#D5D7DA] p-[8px] gap-[8px] items-center'
              >
                <div className='flex w-[38px] h-[38px] bg-[#F5F5F5] gap-[8px] p-[8px] rounded-[4px]'>
                  <p className='font-semibold text-base tracking-tight text-black'>
                    Rp
                  </p>
                </div>
                <FormField
                  control={priceForm.control}
                  name='maxPrice'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Maximum Price'
                          className='text-[#717680] text-base tracking-tight w-[172px] h-[30px] border-none bg-transparent'
                          {...field}
                          value={field.value ?? ''}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ''
                                ? null
                                : Number(e.target.value)
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Form>
          </div>

          <div className='w-full h-[1px] bg-[#D5D7DA]' />

          <div
            id='filterBottomDESK'
            className='flex flex-col w-full gap-[10px] px-[16px]'
          >
            <p className='font-extrabold text-lg tracking-tight'>Rating</p>
            <div id='ratingListDESK' className='flex flex-col w-full'>
              {/* To avoid OCD peeps from seeing the 8px making the stars not aligned with the distance checklist above, I decided not to put the paddings */}

              <div
                id='5star'
                className='bg-none flex flex-row w-full h-[46px] gap-[8px] items-center'
              >
                <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
                <p className='text-base tracking-tight'>5</p>
              </div>
              <div
                id='4star'
                className='bg-none flex flex-row w-full h-[46px] gap-[8px] items-center'
              >
                <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
                <p className='text-base tracking-tight'>4</p>
              </div>
              <div
                id='3star'
                className='bg-none flex flex-row w-full h-[46px] gap-[8px] items-center'
              >
                <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
                <p className='text-base tracking-tight'>3</p>
              </div>
              <div
                id='2star'
                className='bg-none flex flex-row w-full h-[46px] gap-[8px] items-center'
              >
                <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
                <p className='text-base tracking-tight'>2</p>
              </div>
              <div
                id='1star'
                className='bg-none flex flex-row w-full h-[46px] gap-[8px] items-center'
              >
                <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
                <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
                <p className='text-base tracking-tight'>1</p>
              </div>
            </div>
          </div>
        </div>
        <ScrollArea
          id='desktopFilteredListField'
          className='flex flex-wrap w-full gap-[20px]'
        >
          <div className='flex flex-wrap gap-[20px]'>
            {data?.pages
              .flatMap((page) => page.restaurants)
              .map((resto) => (
                <RestoCard key={resto.id} resto={resto} />
              ))}
          </div>
          <div
            ref={loadMoreRef}
            className='h-10 w-full flex justify-center items-center'
          >
            {isFetchingNextPage && <p>Loading more…</p>}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};

export default Filter;
