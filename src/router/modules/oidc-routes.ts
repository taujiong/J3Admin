import { RouteRecordRaw } from 'vue-router';

export const oidcRoutes: RouteRecordRaw = {
  path: '/oidc',
  component: () => import('layouts/SinglePageLayout.vue'),
  children: [
    {
      name: 'signin',
      path: 'signin',
      component: () => import('pages/Oidc/SignIn.vue')
    },
    {
      name: 'signout',
      path: 'signout',
      component: () => import('pages/Oidc/SignOut.vue')
    }
  ]
};
