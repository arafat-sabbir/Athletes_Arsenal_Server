import { Types } from 'mongoose';

export type TAddress = {
  fullName: string;
  email: string;
  phone: string;
  region: string;
  city: string;
  area: string;
  address: string;
  buildingNo: string;
  user: Types.ObjectId;
};
