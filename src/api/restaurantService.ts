import { api } from './api';
import type {
  Restaurants,
  RestaurantDetail,
  RestauFilters,
  RestoFilterResponse,
  Recommendation,
  CustomDetailforDetailPage,
} from '@/types/RestoTypes';

export const fetchRestaurants = async (
  page = 1,
  limit = 10,
  filters?: RestauFilters
): Promise<RestoFilterResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters?.priceMin !== null && filters?.priceMin !== undefined) {
    params.append('priceMin', String(filters.priceMin));
  }
  if (filters?.priceMax !== null && filters?.priceMax !== undefined) {
    params.append('priceMax', String(filters.priceMax));
  }
  if (filters?.rating !== null && filters?.rating !== undefined) {
    params.append('rating', String(filters.rating));
  }

  const res = await api.get<{
    success: boolean;
    data: RestoFilterResponse;
  }>(`/functions/v1/resto?${params.toString()}`);

  return res.data.data;
};

export const fetchRestaurantDetail = async (id: number) => {
  const res = await api.get<RestaurantDetail>(`/functions/v1/resto/${id}`);
  return res.data;
};

export const fetchRecommendations = async (
  keyword: string
): Promise<Recommendation[]> => {
  try {
    const res = await api.get(
      `/functions/v1/resto/recommended?ts=${Date.now()}&keyword=${encodeURIComponent(keyword)}`,
      { headers: { 'Cache-Control': 'no-cache' } }
    );

    const maybe =
      res?.data?.data?.recommendations ??
      res?.data?.recommendations ??
      res?.data;

    return Array.isArray(maybe) ? maybe : [];
  } catch (err) {
    console.error('Failed to fetch recommendations:', err);
    return [];
  }
};

export const fetchRestaurantForDetailPage = async (
  id: number
): Promise<CustomDetailforDetailPage> => {
  const [detailRes, listRes] = await Promise.all([
    api.get<{ data: RestaurantDetail }>(`/functions/v1/resto/${id}`),
    api.get<{ data: { restaurants: Restaurants[] } }>('/functions/v1/resto'),
  ]);

  const detail = detailRes.data.data;
  const fromList = listRes.data.data.restaurants.find((r) => r.id === id);

  return {
    ...detail,
    distance: fromList?.distance ?? 0,
  };
};
