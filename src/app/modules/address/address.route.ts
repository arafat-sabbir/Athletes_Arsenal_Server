import express from 'express';
import AuthorizeRequest from '../../middlewares/auth';
import { AddressValidations } from './address.validation';
import validateRequest from '../../middlewares/validateRequest';
import { addressControllers } from './address.controller';

const router = express.Router();

router.post(
  '/create-address',
  AuthorizeRequest(),
  validateRequest(AddressValidations.createAddressValidation),
  addressControllers.createAddress
);

const addressRoutes = router;
export default addressRoutes;
