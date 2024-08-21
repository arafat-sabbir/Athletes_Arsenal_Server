/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadOnCloudinary } from '../../utils/cloudinary';
import { TProduct } from './product.interface';
import ProductModel from './product.model';

const addProduct = async (file: any, product: TProduct) => {
  if (file) {
    const imageName = `${product?.title}-${Date.now()}`;
    const path = file?.path;

    //send image to cloudinary
    const { secure_url } = await uploadOnCloudinary(imageName, path);
    product.thumbnail = secure_url as string;
  }
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

const getProducts = async () => {
  const products = await ProductModel.find();
  return products;
};

export const productServices = { addProduct,getProducts };
