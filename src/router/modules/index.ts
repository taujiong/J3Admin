import { RouteRecordRaw } from 'vue-router';
import { errorRoutes } from './error-routes';
import { identityRoutes } from './identity-routes';
import { identityServerRoutes } from './identity-server-routes';
import { oidcRoutes } from './oidc-routes';
import { permissionRoutes } from './permission-routes';

export const constantRoutes: RouteRecordRaw[] = [
  identityRoutes,
  identityServerRoutes,
  oidcRoutes,
  permissionRoutes
];

export const fallbackRoutes = errorRoutes;
