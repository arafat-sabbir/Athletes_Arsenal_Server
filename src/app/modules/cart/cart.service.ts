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

// Get All The Cart Products Of A User By The User _id And The Total Price Also
const getMyCartProducts = async (id: string) => {
  const products = await CartModel.find({ user: id }).populate('product');
  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.quantity * (curr.product as any).price,
    0
  );
  return { products, totalPrice };
};

// Increase Or Decrease Product Quantity
const updateCartProductQuantity = async (user: string, cartProductId: string, quantity: number) => {
  const cartProduct = await CartModel.findOne({ user, _id: cartProductId }).populate("product");
  if((cartProduct?.product as any)?.stockCount < quantity){
    throw new Error('Insufficient Stock');
  }
  if (!cartProduct) throw new Error('Product Not Found');
  const result = await CartModel.updateOne(
    { user, _id: cartProductId },
    { quantity: Number(quantity) }
  );
  return result;
};

// Delete Product From Cart By User And Product _id
const deleteProductFromCart = async (user: string, product: string) => {
  const result = await CartModel.deleteOne({ user, _id: product });
  return result;
};

export const cartServices = {
  addNewProductToCart,
  getMyCartProducts,
  deleteProductFromCart,
  updateCartProductQuantity,
};
