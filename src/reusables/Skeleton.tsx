import { Skeleton } from '@/components/ui/skeleton';

export const NormSkeleton = () => {
  return (
    <section className='flex flex-row w-[361px] sm:w-[370px] h-[114px] sm:h-[152px] rounded-[16px] p-[12px] sm:p-[16px] gap-[8px] sm:gap-[12px] bg-white'>
      <Skeleton className='w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] rounded-[12px]' />
      <div className='flex flex-col w-full gap-[8px] sm:gap-[12px] justify-between'>
        <Skeleton className='flex flex-col w-full h-[28px] sm:h-[30px]' />
        <Skeleton className='flex flex-col w-full h-[28px] sm:h-[30px]' />
        <Skeleton className='flex flex-col w-full h-[28px] sm:h-[30px]' />
      </div>
    </section>
  );
};
