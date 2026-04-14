export type Restaurants = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  reviewCount: number;
  menuCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  distance: number;
};

export type RestauPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type RestauFilters = {
  range: number | null;
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
};

export type RestaurantDetail = {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates: {
    lat: number;
    long: number;
  };
  logo: string;
  images: string[];
  totalMenus: number;
  totalReviews: number;

  menus: {
    id: number;
    foodName: string;
    price: number;
    type: string;
    image: string;
  }[];

  reviews: {
    id: number;
    star: number;
    comment: string;
    createdAt: string;
    user: {
      id: number;
      name: string;
      image?: string;
    };
  }[];
};

export type Recommendation = Omit<Restaurants, 'menuCount' | 'priceRange'> & {
  sampleMenus: {
    id: number;
    foodName: string;
    price: number;
    type: string;
    image: string;
  }[];
  isFrequentlyOrdered: boolean;
};

export type CustomDetailforDetailPage = RestaurantDetail &
  Pick<Restaurants, 'distance'>;

export type RestoFilterResponse = {
  restaurants: Restaurants[];
  pagination: RestauPagination;
  filters: RestauFilters;
};
