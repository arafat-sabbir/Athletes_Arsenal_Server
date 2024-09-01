import catchAsync from '../../utils/catchAsync';
import { cartServices } from './cart.service';
import sendResponse from '../../utils/sendResponse';

const addNewProductToCart = catchAsync(async (req, res) => {
  const user = req.user.userId;
  const result = await cartServices.addNewProductToCart({ user, ...req.body });
  sendResponse(res, { message: 'Product Added To Cart SuccessFully', data: result });
});

const getCartProduct = catchAsync(async(req,res)=>{
  const result =await cartServices.getMyCartProducts(req.user.userId);
  sendResponse(res, { message: 'Product Added To Cart SuccessFully', data: result });
})

export const cartControllers = { addNewProductToCart,getCartProduct };
