import errorRoutes from 'src/router/modules/error-routes';
import oidcRoutes from 'src/router/modules/oidc-routes';
import { RouteRecordRaw } from 'vue-router';

export const constantRoutes: RouteRecordRaw[] = [
  oidcRoutes,
  ...errorRoutes
];
