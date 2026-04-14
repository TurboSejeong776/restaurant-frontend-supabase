import React from 'react';
import { useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import type { RestaurantDetail } from '@/types/RestoTypes';

type ImgCarouselProps = {
  images: RestaurantDetail['images'];
};

const ImgCarousel: React.FC<ImgCarouselProps> = ({ images }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section>
      <Carousel className='flex flex-col gap-[12px]' setApi={setApi}>
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <img
                src={img}
                alt='R.I.P IMG'
                className='w-[361px] h-[260.63px] rounded-[16px]'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div id='dots' className='flex flex-row justify-center gap-[4px]'>
          {images.map((_, i) => (
            <Button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'w-[8px] h-[8px] rounded-full transition-all',
                current === i ? 'bg-[#C12116]' : 'bg-[#D9D9D9]'
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default ImgCarousel;
