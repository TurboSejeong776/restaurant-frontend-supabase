export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
