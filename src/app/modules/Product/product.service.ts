/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
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
  console.log('query', query);
  // Handle categories filter
  const categories = (query.categories as string)?.split(',');
  let filterQuery = {};
  if (categories?.length > 0 && !categories.includes('all')) {
    filterQuery = { category: { $in: categories } };
  }

  // Construct sort query
  const sortQuery: { [key: string]: SortOrder | { $meta: any; }; } = {};
  const sortField = "price";
  const sortOrder = query.sort as "asc" | "desc";

  if (query?.sort) {
    sortQuery[sortField] = sortOrder === "asc" ? 1 : -1;
  }
  // Create QueryBuilder instance
  const data = new QueryBuilder(
    ProductModel.find(filterQuery).sort(sortQuery), // Pass the correct sort query
    query
  )
    .paginate()
    .search(['title']);

  const products = await data.modelQuery;
  const totalProduct = await ProductModel.countDocuments(filterQuery);

  return { products, totalProduct };
};


export const productServices = { addProduct, getProducts };
