import { RouteRecordRaw } from 'vue-router';
import errorRoutes from './error-routes';
import oidcRoutes from './oidc-routes';

export const constantRoutes: RouteRecordRaw[] = [
  oidcRoutes,
  ...errorRoutes
];
