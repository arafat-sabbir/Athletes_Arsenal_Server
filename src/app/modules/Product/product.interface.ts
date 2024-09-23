import { Types } from "mongoose";

export type TProduct = {
  user:Types.ObjectId;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stockCount: number;
  vendor: string;
  productImages: string[];
};
