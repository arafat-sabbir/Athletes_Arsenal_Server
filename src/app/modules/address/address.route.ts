import express from 'express';
import AuthorizeRequest from '../../middlewares/auth';

import { addressControllers } from './address.controller';

const router = express.Router();

router.post(
  '/add-new-address',
  AuthorizeRequest(),
  // validateRequest(AddressValidations.createAddressValidation),
  addressControllers.createAddress
);


router.get("/get-my-addresses", AuthorizeRequest(), addressControllers.getMyAddress);

const addressRoutes = router;
export default addressRoutes;
