import catchAsync from '../../utils/catchAsync';
import { cartServices, userServices } from './cart.service';
import sendResponse from '../../utils/sendResponse';

const addNewProductToCart = catchAsync(async (req, res) => {
  const result = await cartServices.addNewProductToCart(req.body);
  sendResponse(res, { message: 'Product Added To Cart SuccessFully', data: result });
});

export const cartControllers = { addNewProductToCart};
