import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { productServices } from './product.service';

const addProduct = catchAsync(async (req, res) => {
  const { userId } = req.user;
  req.body.user = userId;
  const result = await productServices.addProduct(req.body);
  sendResponse(res, {
    statusCode: 209,
    message: 'Product Added Successfully',
    data: result,
  });
});

// Pass The Query For Sort Filter Pagination And Get All Product
const getProducts = catchAsync(async (req, res) => {
  const result = await productServices.getProducts(req.query);
  sendResponse(res, {
    statusCode: 200,
    message: 'Products Retrieved Successfully',
    data: result,
  });
});

// Pass The Id From Params To Get Single Product
const getProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await productServices.getProduct(id);
  sendResponse(res, {
    statusCode: 200,
    message: 'Product Retrieved Successfully',
    data: result,
  });
});

const getMyProduct = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await productServices.getMyProducts(userId);
  sendResponse(res, {
    statusCode: 200,
    message: 'Product Retrieved Successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await productServices.deleteProduct(id);
  sendResponse(res, {
    statusCode: 200,
    message: 'Product Deleted Successfully',
    data: result,
  });
});

export const productController = { addProduct, getProducts, getProduct, getMyProduct,deleteProduct };
