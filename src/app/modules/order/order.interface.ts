import { Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  amount: number;
};
