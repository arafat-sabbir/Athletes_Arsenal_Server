import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { cartValidation } from './cart.validation';
import { cartControllers } from './cart.controller';


const router = express.Router();


router.post('/add-to-cart', validateRequest(cartValidation.addToCartSchema), cartControllers.addNewProductToCart);

const cartRoutes = router;
export default cartRoutes;
