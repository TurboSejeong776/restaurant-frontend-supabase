//For user stuff
export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  image?: string | null;
};

//For review stuff

export type ReviewCardType = {
  id: number;
  user: {
    id: number;
    name: string;
    image?: string;
  };
  star: number;
  comment: string;
  createdAt: string;
};
