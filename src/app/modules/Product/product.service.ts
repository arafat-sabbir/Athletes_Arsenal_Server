/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { uploadOnCloudinary } from '../../utils/cloudinary';
import { TProduct } from './product.interface';
import ProductModel from './product.model';

const addProduct = async (files: any, product: TProduct) => {
  const { photos, thumbnail } = files;
  if (files) {
    const imageName = `${product?.title}-${Date.now()}`;
    const path = thumbnail[0]?.path;
    //send image to cloudinary
    const { secure_url } = await uploadOnCloudinary(imageName, path);
    product.thumbnail = secure_url as string;
  }
  const productImages = [];
  for (let i = 0; i < photos.length; i++) {
    const imageName = `${photos[i]?.originalname}-${Date.now()}`;
    const { secure_url } = await uploadOnCloudinary(imageName, photos[i]?.path);
    productImages.push(secure_url);
  }
  product.productImages = productImages as string[];
  const newProduct = await ProductModel.create(product);
  // return newProduct;
  return { newProduct };
};

const getProducts = async (query: Record<string, unknown>) => {
  const data = new QueryBuilder(ProductModel.find(), query).paginate();
  const products = await data.modelQuery;
  const totalProduct = await ProductModel.countDocuments();
  return { products, totalProduct };
};

export const productServices = { addProduct, getProducts };
