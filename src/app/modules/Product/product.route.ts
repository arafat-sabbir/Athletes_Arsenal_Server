/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express';
import { productValidation } from './product.validation';
import { productController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { upload } from '../../utils/multer';
import convertFilePath from '../../utils/convertFilePath';
import AuthorizeRequest from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/add-product',
  AuthorizeRequest(),
  upload.fields([
    { name: 'image', maxCount: 1 }, // Accept 1 file for 'thumbnail'
    { name: 'images', maxCount: 10 }, // Accept up to 10 files for 'photos'
  ]),
  convertFilePath,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = {
      ...req.body,
      thumbnail: req.files?.['image']?.[0]?.path, // Access thumbnail file path
      productImages: req.files?.['images']?.map((file: any) => file.path), // Access photo paths
    };
    next();
  },
  validateRequest(productValidation.addProductSchema),
  productController.addProduct
);

// get All Products
router.get('/products', productController.getProducts);
router.get('/get-my-products',AuthorizeRequest(), productController.getMyProduct);
router.delete('/delete-product/:id',AuthorizeRequest(), productController.deleteProduct);

// get Single Product

router.get('/get-product/:id', productController.getProduct);

export const productRoutes = router;
