export type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
  restaurant: {
    id: number;
    name: string;
  };
};

export type ReviewPOST = {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
};
