import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { addressServices } from './address.service';

const createAddress = catchAsync(async (req, res) => {
  const { userId } = req.user;
  req.body.user = userId;
  const result = await addressServices.createAddress(req.body);
  sendResponse(res, {
    statusCode: 209,
    message: 'Address Added Successfully',
    data: result,
  });
});

const getMyAddress = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await addressServices.getAddress(userId);
  sendResponse(res, {
    statusCode: 200,
    message: 'Address Retrieved Successfully',
    data: result,
  });
});

export const addressControllers = { createAddress,getMyAddress };
