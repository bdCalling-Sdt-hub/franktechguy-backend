import express from 'express';
import { VehicleController } from './vehicle.controller';
import auth from '../../middleware/auth';
import { USER_ROLES } from '../../../enums/user';
const router = express.Router();

// Route to add a new vehicle
router.post(
  '/add-vehicle',
  auth(USER_ROLES.USER),
  VehicleController.addVehicle,
);

// Route to edit a vehicle
router.put(
  '/edit-vehicle/:vehicleId',
  auth(USER_ROLES.USER),
  VehicleController.editVehicle,
);

// Route to delete a vehicle
router.delete(
  '/delete-vehicle/:vehicleId',
  auth(USER_ROLES.USER),
  VehicleController.deleteVehicle,
);

// Route to mark a vehicle as default
router.put(
  '/set-default/:vehicleId',
  auth(USER_ROLES.USER),
  VehicleController.setDefaultVehicle,
);

export const VehicleRouter = router;
