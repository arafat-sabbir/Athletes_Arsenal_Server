import { Router } from 'express';
import { productRoutes } from '../modules/Product/product.route';
import userRoutes from '../modules/user/user.route';
import cartRoutes from '../modules/cart/cart.route';
import addressRoutes from '../modules/address/address.route';

const router = Router();

const allRoutes = [
  { path: '/product', route: productRoutes },
  { path: '/user', route: userRoutes },
  { path: '/cart', route: cartRoutes },
  { path: '/address', route: addressRoutes },
];
allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
