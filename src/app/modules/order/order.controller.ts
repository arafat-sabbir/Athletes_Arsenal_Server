import sendResponse from '../../utils/sendResponse';
import orderServices from './order.service';
import catchAsync from '../../utils/catchAsync';

const addNewOrder = catchAsync(async (req, res) => {
  const { userId } = req.user;
  req.body.user = userId;
  const result = await orderServices.addNewOrder(req.body);
  sendResponse(res, {
    message: 'Order Added Successfully',
    data: result,
  });
});

export const orderControllers = { addNewOrder };
