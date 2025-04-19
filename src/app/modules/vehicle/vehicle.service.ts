import { StatusCodes } from 'http-status-codes';
import AppError from '../../../errors/AppError';
import { User } from '../user/user.model';
import { IVehicle } from './vehicle.interface';
import { Vehicle } from './vehicle.model';

const addVehicle = async (userId: string, vehicleData: IVehicle) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Create and save the vehicle
  const vehicle: any = new Vehicle(vehicleData);
  await vehicle.save();
  // Add vehicle ID to the user's vehicles array
  await User.findByIdAndUpdate(
    userId,
    { $push: { vehicles: vehicle._id } },
    { new: true },
  );
  return vehicle;
};

// Edit vehicle information
const editVehicle = async (
  userId: string,
  vehicleId: string,
  updatedData: Partial<IVehicle>,
) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Vehicle not found');
  }

  // Update vehicle data
  Object.assign(vehicle, updatedData);
  await vehicle.save();

  return vehicle;
};

// Delete a vehicle
const deleteVehicle = async (userId: string, vehicleId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // Remove the vehicle from user's vehicles array
  await User.findByIdAndUpdate(userId, {
    $pull: { vehicles: vehicleId },
  });

  // Delete the vehicle from the database
  const result = await Vehicle.findByIdAndDelete(vehicleId);
  return result;
};

// Mark a vehicle as default
const setDefaultVehicle = async (userId: string, vehicleId: string) => {
  const user: any = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Vehicle not found');
  }

  // Update vehicle status
  await Vehicle.findByIdAndUpdate(vehicleId, { status: 'In Use' });

  // Update default vehicle on user
  await User.findByIdAndUpdate(userId, { defaultVehicle: vehicleId });

  return;
};

export const VehicleService = {
  addVehicle,
  editVehicle,
  deleteVehicle,
  setDefaultVehicle,
};
