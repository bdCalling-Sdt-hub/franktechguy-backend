import { Types } from 'mongoose';

export interface IVehicle {
  _id: Types.ObjectId;
  type: string;
  model: string;
  year: string;
  licensePlate: string;
  vin: string;
  status: 'Available' | 'In Use';
}
