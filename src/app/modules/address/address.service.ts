import { TAddress } from './address.interface';
import AddressModel from './address.model';

const createAddress = async (payload: TAddress) => {
  const result = await AddressModel.create(payload);
  return result;
};

export const addressServices = { createAddress };
