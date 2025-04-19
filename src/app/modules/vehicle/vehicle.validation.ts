import { z } from 'zod';

const vehicleSchema = z.object({
  body: z.object({
    type: z.string().min(1, 'Vehicle type is required'),
    model: z.string().min(1, 'Model is required'),
    year: z.string().min(1, 'Year is required'),
    licensePlate: z.string().min(1, 'License plate is required'),
    vin: z.string().min(1, 'VIN is required'),
    status: z.enum(['Available', 'In Use']).optional(),
  }),
});
const updateVehicleSchema = z.object({
  body: z.object({
    type: z.string().min(1, 'Vehicle type is required').optional(),
    model: z.string().min(1, 'Model is required').optional(),
    year: z.string().min(1, 'Year is required').optional(),
    licensePlate: z.string().min(1, 'License plate is required').optional(),
    vin: z.string().min(1, 'VIN is required').optional(),
    status: z.enum(['Available', 'In Use']).optional(),
  }),
});

export const VehicleValidationSchema = {
  vehicleSchema,
  updateVehicleSchema
};
