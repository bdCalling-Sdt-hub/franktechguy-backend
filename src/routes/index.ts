import express from 'express';
import { UserRouter } from '../app/modules/user/user.route';
import { AuthRouter } from '../app/modules/auth/auth.route';
import { VehicleRouter } from '../app/modules/vehicle/vehicle.router';
import { BannerRoutes } from '../app/modules/banner/banner.routes';

const router = express.Router();
const routes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/vehicle',
    route: VehicleRouter,
  },
  {
    path: '/vehicle',
    route: VehicleRouter,
  },
  {
    path: '/admin/banner',
    route: BannerRoutes,
  },
  {
    path: '/banner',
    route: BannerRoutes,
  },
];

routes.forEach((element) => {
  if (element?.path && element?.route) {
    router.use(element?.path, element?.route);
  }
});

export default router;
