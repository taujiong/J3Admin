import { constantRoutes } from 'src/router/modules';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name: 'home', path: '', component: () => import('pages/Index.vue') }]
  },
  ...constantRoutes
];

export default routes;
