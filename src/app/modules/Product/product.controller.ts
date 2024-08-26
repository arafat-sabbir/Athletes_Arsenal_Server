import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { productServices } from './product.service';

const addProduct = catchAsync(async (req, res) => {
  const result = await productServices.addProduct(req.files, req.body);
  sendResponse(res, {
    statusCode: 209,
    message: 'Product Added Successfully',
    data: result,
  });
});

const getProducts = catchAsync(async (req, res) => {
  const result = await productServices.getProducts(req.query);
  sendResponse(res, {
    statusCode: 209,
    message: 'Products Retrieved Successfully',
    data: result,
  });
});

export const productController = { addProduct,getProducts };