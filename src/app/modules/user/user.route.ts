import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from '../../../enums/user';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { getSingleFilePath } from '../../../shared/getFilePath';
import auth from '../../middleware/auth';
import fileUploadHandler from '../../middleware/fileUploadHandler';
import validateRequest from '../../middleware/validateRequest';
const router = express.Router();

router
  .route('/profile')
  .get(
    auth(USER_ROLES.ADMIN, USER_ROLES.USER, USER_ROLES.SUPER_ADMIN),
    UserController.getUserProfile,
  )
  .patch(
    auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
    fileUploadHandler(),
    (req: Request, res: Response, next: NextFunction) => {
      const image = getSingleFilePath(req.files, 'image');
      const data = JSON.parse(req.body.data);
      req.body = { image, ...data };
      next();
    },
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateProfile,
  );

router.route('/').post(
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    const driverLicense = getSingleFilePath(req.files, 'driverLicense');
    const insurance = getSingleFilePath(req.files, 'insurance');
    const permits = getSingleFilePath(req.files, 'permits');
    const documents = {
      driverLicense,
      insurance,
      permits,
    };
    const data = JSON.parse(req.body.data);
    const vehicles = JSON.parse(req.body.vehicleInfo);
    req.body = { documents, vehicles, ...data };
    next();
  },
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.delete('/delete', auth(USER_ROLES.USER), UserController.deleteProfile);

export const UserRouter = router;
