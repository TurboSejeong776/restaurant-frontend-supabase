import { api } from './api';
import type { Review, ReviewPOST } from '@/types/RevTypes';

export const postReview = async (body: ReviewPOST): Promise<Review> => {
  const { data } = await api.post('/review', body);
  return data.data.review;
};
