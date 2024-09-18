import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createNewUser = catchAsync(async (req, res) => {
  const result = await userServices.createNewUser(req.body);
  sendResponse(res, {
    statusCode: 209,
    message: 'Registration Successful',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: 209,
    message: 'Logged In Successfully',
    data: result,
  });
});

export const userControllers = { createNewUser, loginUser };
