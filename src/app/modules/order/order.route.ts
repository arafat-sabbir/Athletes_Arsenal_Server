import express from 'express';
import AuthorizeRequest from '../../middlewares/auth';
import { orderControllers } from './order.controller';
import { OrderValidations } from './order.validation';
import validateRequest from '../../middlewares/validateRequest';


const router = express.Router();

router.post(
  '/add-new-order',
  AuthorizeRequest(),
  validateRequest(OrderValidations.addNewOrderSchema),
  orderControllers.addNewOrder
);



const orderRoutes = router;
export default orderRoutes;
