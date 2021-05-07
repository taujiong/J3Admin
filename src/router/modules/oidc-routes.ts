import { RouteRecordRaw } from 'vue-router';

const oidcRoutes: RouteRecordRaw = {
  path: '/oidc',
  component: () => import('layouts/EmptyLayout.vue'),
  children: [
    {
      name: 'signin',
      path: 'signin',
      component: () => import('pages/Oidc/SignIn.vue')
    }
  ]
};

export default oidcRoutes;

export const errorMessages: Record<string, string> = {
  '401': 'Sorry, but you are not authenticated...',
  '403': 'Sorry, but you are not authorized...',
  '404': 'Oops. Nothing here...',
  '500': 'Oops. Something went wrong with the server...'
};
