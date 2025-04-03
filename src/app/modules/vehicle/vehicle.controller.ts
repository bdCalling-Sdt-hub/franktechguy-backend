import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import { VehicleService } from './vehicle.service';
import sendResponse from '../../../shared/sendResponse';

const addVehicle = catchAsync(async (req, res) => {
  const { id } = req.user;
  const payload = req.body;
  const result = await VehicleService.addVehicle(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Vehicle added successfully',
    data: result,
  });
});
// Edit vehicle information
const editVehicle = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { vehicleId } = req.params;
  const updatedData = req.body;
  const result = await VehicleService.editVehicle(id, vehicleId, updatedData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Vehicle updated successfully',
    data: result,
  });
});
// Delete a vehicle
const deleteVehicle = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { vehicleId } = req.params;
  const result = await VehicleService.deleteVehicle(id, vehicleId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Vehicle deleted successfully',
    data: result,
  });
});
// Mark a vehicle as default
const setDefaultVehicle = catchAsync(async (req, res) => {
  const { id } = req.user;
  const { vehicleId } = req.params;
  const result = await VehicleService.setDefaultVehicle(id, vehicleId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Default vehicle updated successfully',
    data: result,
  });
});

export const VehicleController = {
  addVehicle,
  editVehicle,
  deleteVehicle,
  setDefaultVehicle,
};
