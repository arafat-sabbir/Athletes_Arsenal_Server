import express, { NextFunction, Request, Response } from 'express';
import { productValidation } from './product.validation';
import { productController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/multer';

const router = express.Router();

router.post(
  '/add-product',
  upload.single('thumbnail'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(productValidation.addProductSchema),
  productController.addProduct
);

export const productRoutes = router;
