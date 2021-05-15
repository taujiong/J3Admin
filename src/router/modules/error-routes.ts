import { RouteRecordRaw } from 'vue-router';

export const errorRoutes: RouteRecordRaw[] = [
  {
    name: 'error',
    path: '/error/:code',
    component: () => import('pages/Error.vue'),
    props: true
  },
  {
    path: '/:catchAll(.*)*',
    redirect: '/error/404'
  }
];

export const errorMessages: Record<string, string> = {
  '401': 'Sorry, but you are not authenticated...',
  '403': 'Sorry, but you are not authorized...',
  '404': 'Oops. Nothing here...',
  '500': 'Oops. Something went wrong with the server...'
};
