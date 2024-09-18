import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { userControllers } from './user.controller';
import convertFilePath from '../../utils/convertFilePath';
import { upload } from '../../utils/multer';

const router = express.Router();

router.post(
  '/register',
  upload.single('photo'),
  convertFilePath,
  (req: Request, res: Response, next: NextFunction) => {
    req.body = { ...req.body, photo: req.file?.path };
    next();
  },
  validateRequest(userValidation.createUserSchema),
  userControllers.createNewUser
);
router.post('/login', validateRequest(userValidation.loginUserSchema), userControllers.loginUser);

const userRoutes = router;
export default userRoutes;
