import express from 'express';
import { VehicleController } from './vehicle.controller';
import auth from '../../middleware/auth';
import { USER_ROLES } from '../../../enums/user';
import validateRequest from '../../middleware/validateRequest';
import { VehicleValidationSchema } from './vehicle.validation';
const router = express.Router();

// Route to add a new vehicle
router.post(
  '/add',
  auth(USER_ROLES.USER),
  validateRequest(VehicleValidationSchema.vehicleSchema),
  VehicleController.addVehicle,
);

// Route to edit a vehicle
router.put(
  '/edit/:vehicleId',
  auth(USER_ROLES.USER),
  validateRequest(VehicleValidationSchema.vehicleSchema),
  VehicleController.editVehicle,
);

// Route to delete a vehicle
router.delete(
  '/delete/:vehicleId',
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
