import AppError from '../../errors/AppError';
import { TOrder } from './order.interface';
import OrderModel from './order.model';
import ProductModel from '../Product/product.model';

const addNewOrder = async (payload: TOrder) => {
  const product = await ProductModel.findById(payload.product);
  if (!product) {
    throw new AppError(404, 'Product Not Found ');
  }
  product.stockCount = product.stockCount - payload.quantity;
  await product.save();
  const result = await OrderModel.create(payload);
  return result;
};

const orderServices = { addNewOrder };
export default orderServices;
