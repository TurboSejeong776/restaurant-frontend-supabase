import React from 'react';
import type { Restaurants } from '@/types/RestoTypes';
import { Star } from 'lucide-react';

type RestoTypePicker = Pick<
  Restaurants,
  'name' | 'star' | 'place' | 'logo' | 'distance'
>;

type RestoCardProps = {
  resto: RestoTypePicker;
};

const RestoCard: React.FC<RestoCardProps> = ({ resto }) => {
  return (
    <section className='flex flex-row w-[361px] sm:w-[370px] h-[114px] sm:h-[152px] rounded-[16px] p-[12px] sm:p-[16px] gap-[8px] sm:gap-[12px] bg-white'>
      <img
        src={resto.logo}
        alt={resto.name}
        className='w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] rounded-[12px]'
      />
      <div className='flex flex-col w-[239px] sm:w-[311px] h-[90px] sm:h-full gap-[2px] justify-center'>
        <p className='font-extrabold text-base sm:text-lg sm:tracking-tight text-left'>
          {resto.name}
        </p>
        <div className='flex flex-row w-full gap-[4px] items-center'>
          <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
          <p className='font-medium text-sm sm:text-base sm:tracking-tight'>
            {resto.star}
          </p>
        </div>
        <div className='flex flex-row w-full h-[28px] sm:h-[30px] gap-[6px] text-sm sm:text-base tracking-tight items-center'>
          <p>{resto.place}</p>
          <p>•</p>
          <p>{resto.distance} km</p>
        </div>
      </div>
    </section>
  );
};

export default RestoCard;
