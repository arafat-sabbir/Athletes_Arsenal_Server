import { TCart } from './cart.interface';
import CartModel from './cart.model';

const addNewProductToCart = async (payload: TCart) => {
  const cartProduct = await CartModel.create(payload);

  return cartProduct;
};
const getMyCartProducts = async (id: string) => {
  const cartProduct = await CartModel.find({ user: id }).populate('product');
  return cartProduct;
};

export const cartServices = { addNewProductToCart, getMyCartProducts };
