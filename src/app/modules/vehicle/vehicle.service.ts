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
  user.vehicles.push(vehicle?._id);
  await user.save();

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
  user.vehicles = user.vehicles.filter(
    (veh: any) => veh.toString() !== vehicleId,
  );
  await user.save();

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

  // Set the default vehicle
  user.defaultVehicle = vehicleId;
  vehicle.status = 'In Use';
  await vehicle.save();
  await user.save();

  return;
};

export const VehicleService = {
  addVehicle,
  editVehicle,
  deleteVehicle,
  setDefaultVehicle,
};
