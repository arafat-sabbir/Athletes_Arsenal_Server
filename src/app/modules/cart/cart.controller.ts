import catchAsync from '../../utils/catchAsync';
import { cartServices } from './cart.service';
import sendResponse from '../../utils/sendResponse';

// Add New Product To Cart If The Product Exist Increase The Quantity
const addNewProductToCart = catchAsync(async (req, res) => {
  const user = req.user.userId;
  const result = await cartServices.addNewProductToCart({ user, ...req.body });
  sendResponse(res, { message: 'Product Added To Cart SuccessFully', data: result });
});

// Get All The Cart Product For A User By The User _id From Token
const getCartProduct = catchAsync(async (req, res) => {
  const result = await cartServices.getMyCartProducts(req.user.userId);
  sendResponse(res, { message: 'Product Added To Cart SuccessFully', data: result });
});

// Update Cart Product Quantity
const updateCartProductQuantity = catchAsync(async (req, res) => {
  const result = await cartServices.updateCartProductQuantity(
    req.user.userId,
    req.params.id,
    req.body.quantity
  );
  sendResponse(res, { message: 'Product Quantity Updated SuccessFully', data: result });
});

// Delete Single Product From Cart By User And CartProduct _id
const deleteProductFromCart = catchAsync(async (req, res) => {
  const result = await cartServices.deleteProductFromCart(req.user.userId, req.params.id);
  sendResponse(res, { message: 'Product Deleted From Cart SuccessFully', data: result });
});

export const cartControllers = {
  addNewProductToCart,
  getCartProduct,
  deleteProductFromCart,
  updateCartProductQuantity,
};
