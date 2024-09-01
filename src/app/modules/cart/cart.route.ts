import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { cartValidation } from './cart.validation';
import { cartControllers } from './cart.controller';
import AuthorizeRequest from '../../middlewares/auth';


const router = express.Router();


router.post('/add-to-cart',AuthorizeRequest("user"), validateRequest(cartValidation.addToCartSchema), cartControllers.addNewProductToCart);
router.get('/get-my-cart',AuthorizeRequest("user"), cartControllers.getCartProduct);

const cartRoutes = router;
export default cartRoutes;
