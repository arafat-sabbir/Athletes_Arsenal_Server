import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { cartValidation } from './cart.validation';
import { cartControllers } from './cart.controller';
import AuthorizeRequest from '../../middlewares/auth';

const router = express.Router();

// Add PRoduct TO Cart
router.post(
  '/add-to-cart',
  AuthorizeRequest(),
  validateRequest(cartValidation.addToCartSchema),
  cartControllers.addNewProductToCart
);

// Get All CartPRoducts
router.get('/get-my-cart', AuthorizeRequest(), cartControllers.getCartProduct);

// Update Cart Product Quantity
router.patch(
  '/update-cart-product/:id',
  AuthorizeRequest(),
  validateRequest(cartValidation.updateQuantitySchema),
  cartControllers.updateCartProductQuantity
);

// Delete Single Product From Cart
router.delete(
  '/delete-cart-product/:id',
  AuthorizeRequest(),
  cartControllers.deleteProductFromCart
);

const cartRoutes = router;
export default cartRoutes;
