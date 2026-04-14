import React from 'react';
import type { ReviewCardType } from '@/types';

import Man from '../assets/Man.png';
import { Star } from 'lucide-react';

type ReviewCardProp = {
  data: ReviewCardType;
};

const ReviewCard: React.FC<ReviewCardProp> = ({ data }) => {
  return (
    <section className='flex flex-col w-[361px] h-[222px] sm:h-[204px] p-[16px] rounded-[16px] gap-[16px] bg-white'>
      <div className='flex flex-row w-[212px] h-[58px] gap-[12px] text-black sm:w-[238px] sm:h-[64px]'>
        <img
          src={data.user.image}
          alt={Man}
          className='w-[58px] h-[58px] sm:w-[64px] sm:h-[64px]'
        />
        <div className='flex flex-col w-[142px] sm:w-[162px] h-[58px] sm:h-[62px] justify-center sm:tracking-tight'>
          <p className='font-extrabold text-base sm:text-lg'>
            {data.user.name}
          </p>
          <p className='font-medium text-sm sm:text-base tracking-tight'>
            {data.createdAt}
          </p>
        </div>
      </div>

      <div className='flex flex-col w-full h-[116px] sm:h-[92px] gap-[8px]'>
        <div className='flex flex-row'>
          {Array.from({ length: data.star }).map((_, i) => (
            <Star
              key={i}
              className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]'
            />
          ))}
        </div>

        <p className='text-sm sm:text-base tracking-tight text-black'>
          {data.comment}
        </p>
      </div>
    </section>
  );
};

export default ReviewCard;
