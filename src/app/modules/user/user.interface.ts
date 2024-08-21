export type TUser = {
  name: string;
  email: string;
  password: string;
  role?: string;
  photo?: string;
};

export type TLogin = {
  email: string;
  password: string;
};
