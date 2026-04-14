import React from 'react';
import { useState } from 'react';
import type { ReviewPOST } from '@/types/RevTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReview } from '@/api/reviewService';

import { DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { CrossIcon } from 'lucide-react';
import { StarIcon } from 'lucide-react';

type ReviewFormProps = {
  rev: ReviewPOST;
  onClose: () => void;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ rev, onClose }) => {
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ReviewPOST) => postReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
      onClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = () => {
    if (!star) return; // require at least 1 star
    mutate({
      transactionId: rev.transactionId,
      restaurantId: rev.restaurantId,
      star,
      comment,
    });
  };
  return (
    <DialogContent
      id='reviewBase'
      className='flex flex-col w-[361px] rounded-[16px] p-[16px] gap-[16px] text-black bg-white'
    >
      <div id='reviewHead' className='flex flex-row w-full justify-between'>
        <p className='font-extrabold text-[20px] leading-[34px]'>Give Review</p>
        <CrossIcon className='w-[24px] h-[24px]' />
      </div>

      <div id='reviewRating' className='flex flex-col w-full'>
        <p className='font-extrabold text-base text-center'>Give Rating</p>
        <div id='stars' className='flex flex-row w-full gap-[4px]'>
          {[1, 2, 3, 4, 5].map((i) => (
            <Button
              key={i}
              type='button'
              variant='ghost'
              onClick={() => setStar(i)}
              className='p-0'
            >
              <StarIcon
                className={`w-[40px] h-[40px] ${
                  i <= star ? 'text-[#FFAB0D] fill-[#FFAB0D]' : 'text-gray-300'
                }`}
              />
            </Button>
          ))}
        </div>
      </div>

      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Please share your thoughts about our service!'
        className='flex w-full h-[235px] rounded-[12px] border-[1px] px-[12px] py-[8px] gap-[4px]'
      />

      <Button
        onClick={handleSubmit}
        disabled={isPending || star === 0}
        className='bg-[#C12116] w-full h-[44px] sm:h-[48px] flex rounded-[100px] p-[8px] gap-[8px] font-bold text-sm sm:text-base tracking-tight text-white'
      >
        {isPending ? 'Sending...' : 'Send'}
      </Button>
    </DialogContent>
  );
};

export default ReviewForm;
