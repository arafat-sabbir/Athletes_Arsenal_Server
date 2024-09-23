/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TProduct } from './product.interface';
import ProductModel from './product.model';
import AppError from '../../errors/AppError';
import path from 'path';
import fs from 'fs';
// Add New Product To Database
const addProduct = async (product: TProduct) => {
  const newProduct = await ProductModel.create(product);
  return newProduct;
};

// Get All The Available Product From Database
const getProducts = async (query: Record<string, unknown>) => {
  console.log('query', query);
  // Handle categories filter
  const categories = (query.categories as string)?.split(',');
  let filterQuery = {};
  if (categories?.length > 0 && !categories.includes('all')) {
    filterQuery = { category: { $in: categories } };
  }

  // Construct sort query
  const sortQuery: { [key: string]: SortOrder | { $meta: any } } = {};
  const sortField = 'price';
  const sortOrder = query.sort as 'asc' | 'desc';

  if (query?.sort) {
    sortQuery[sortField] = sortOrder === 'asc' ? 1 : -1;
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

const getMyProducts = async (id: string) => {
  const products = await ProductModel.find({ user: id }).select('-user');
  return products;
};

// Get Single Cart Product For User By User And CartProduct _id

const getProduct = async (id: string) => {
  if (!id) throw new Error('Provide And Product Id');
  const product = await ProductModel.findOne({ _id: id });
  if (!product) throw new Error('Product Not Found');
  return product;
};

const deleteProduct = async (id: string) => {
  // Find the product by id
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new AppError(404, 'Product not found');
  }

  // Extract the image paths from the product data
  const thumbnailPath = product.thumbnail;
  const imagePaths = product.productImages; // Assuming productImages is an array of image file names/paths

  // Define the absolute path to the folder where the images are stored
  const uploadDirectory = path.join(__dirname, '../../../../public');

  // Helper function to safely delete an image
  const deleteFile = (filePath: string) => {
    const fullFilePath = path.join(uploadDirectory, filePath);

    // Check if the file exists before attempting to delete
    if (fs.existsSync(fullFilePath)) {
      try {
        fs.unlinkSync(fullFilePath);
        console.log(`Successfully deleted file: ${fullFilePath}`);
      } catch (err) {
        console.error(`Failed to delete file: ${fullFilePath}`, err);
      }
    } else {
      console.warn(`File not found: ${fullFilePath}`);
    }
  };

  // Delete the thumbnail image
  if (thumbnailPath) {
    deleteFile(thumbnailPath);
  }

  // Delete each product image
  if (imagePaths && Array.isArray(imagePaths)) {
    imagePaths.forEach((imagePath) => {
      deleteFile(imagePath);
    });
  }

  // Now, delete the product from the database
  await ProductModel.findByIdAndDelete(id);

  return 'Product deleted successfully';
};

export const productServices = { addProduct, getProducts, getProduct, getMyProducts,deleteProduct };
