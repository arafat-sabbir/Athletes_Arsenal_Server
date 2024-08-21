import { Router } from 'express';
import { productRoutes } from '../modules/Product/product.route';
import userRoutes from '../modules/user/user.route';

const router = Router();

const allRoutes = [
  { path: '/product', route: productRoutes },
  { path: '/user', route: userRoutes },
];
allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
