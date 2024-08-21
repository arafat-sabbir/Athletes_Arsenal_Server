import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { userControllers } from './user.controller';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createUserSchema),
  userControllers.createNewUser
);
router.post('/login', validateRequest(userValidation.loginUserSchema), userControllers.loginUser);

const userRoutes = router;
export default userRoutes;
