/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import ProductModel from '../Product/product.model';
import { TCart } from './cart.interface';
import CartModel from './cart.model';

// Add New Product To Cart If The Product Exist Increase The Quantity
const addNewProductToCart = async (payload: TCart) => {
  const product = await ProductModel.findOne({ _id: payload.product });
  if (!product) throw new Error('Product Not Found');
  if (payload?.quantity <= product?.stockCount) {
    product.stockCount = product.stockCount - payload.quantity;
    await product.save();
  } else {
    throw new AppError(400, 'Insufficient Stock');
  }
  const existingCartProduct = await CartModel.findOne({
    user: payload.user,
    product: payload.product,
  });
  if (existingCartProduct) {
    existingCartProduct.quantity = existingCartProduct.quantity + payload.quantity;
    await existingCartProduct.save();
    return existingCartProduct;
  }
  const cartProduct = await CartModel.create(payload);
  return cartProduct;
};

// Get All The Cart Products Of A User By The User _id
const getMyCartProducts = async (id: string) => {
  const products = await CartModel.find({ user: id }).populate('product');

  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.quantity * (curr.product as any).price,
    0
  );
  console.log(totalPrice);
  return { products, totalPrice };
};

export const cartServices = { addNewProductToCart, getMyCartProducts };
