import { string, z } from 'zod';
const vehicleSchema = z.object({
  type: z.string().min(1, 'Vehicle type is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.string().min(1, 'Year of manufacture is required'),
  licensePlate: z.string().min(1, 'License plate is required'),
  vin: z.string().min(1, 'VIN is required'),
});

export const createUserZodSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .min(2, 'Name must be at least 2 characters long'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address'),

    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long'),
    phone: string().default('').optional(),
    profile: z.string().optional(),
    vehicles: vehicleSchema,
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
    email: z.string().email('Invalid email address').optional(),
    password: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
