import { Model } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';
import { IVehicle } from '../vehicle/vehicle.interface';
export interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [ longitude, latitude ]
}
export type IUser = {
  name: string;
  role: USER_ROLES;
  email: string;
  password: string;
  contactNumber: string;
  image?: string;
  isDeleted: boolean;
  address: string;
  vehicles: string[];
  defaultVehicle: IVehicle | null;
  location: ILocation;
  documents: {
    driverLicense: string;
    insurance: string;
    permits: string;
  };
  status: 'active' | 'blocked';
  verified: boolean;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
};

export type UserModel = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isExistUserByPhone(contact: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
