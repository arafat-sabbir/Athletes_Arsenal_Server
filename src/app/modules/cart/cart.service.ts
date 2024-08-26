import { TCart } from './cart.interface';
import CartModel from './cart.model';

  const addNewProductToCart = async(payload:TCart)=>{
    const cartProduct = await CartModel.create(payload);
    return cartProduct;
  }

export const cartServices = { addNewProductToCart};
