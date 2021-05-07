import { RouteRecordRaw } from 'vue-router';

const errorRoutes: RouteRecordRaw[] = [
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

export default errorRoutes;
