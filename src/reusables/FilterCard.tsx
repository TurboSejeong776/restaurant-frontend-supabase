import React from 'react';

type FilterCardProps = {
  name: string;
  image: string;
};

const FilterCard: React.FC<FilterCardProps> = ({ name, image }) => {
  return (
    <section className='flex flex-col w-[106px] h-[132px] gap-[4px] bg-white sm:w-[161px] sm:h-[138px] sm:gap-[6px] items-center'>
      <div className='flex w-full h-[100px] rounded-[16px] p-[8px] gap-[8px] items-center justify-center'>
        <img
          src={image}
          alt={name}
          className='w-[48px] h-[48px] sm:w-[65px] sm:h-[65px]'
        />
      </div>
      <p className='text-sm font-bold tracking-tight text-center text-black sm:text-lg'>
        {name}
      </p>
    </section>
  );
};

export default FilterCard;
