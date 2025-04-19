import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ShipmentsService } from './shipments.service';

const availableShipments = catchAsync(async (req, res) => {
  const { id } = req.user;

  const result = await ShipmentsService.getAvailableShipmentsNearDriver(id,  req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Available shipments retrieved successfully',
    data: result,
  });
});

export const ShipmentsControiler = {availableShipments};
