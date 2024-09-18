import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { addressServices } from './address.service';

const createAddress = catchAsync(async (req, res) => {
  const result = await addressServices.createAddress(req.body);
  sendResponse(res, {
    statusCode: 209,
    message: 'Address Added Successfully',
    data: result,
  });
});

export const addressControllers = { createAddress };
