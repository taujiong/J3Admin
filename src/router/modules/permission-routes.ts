import { RouteRecordRaw } from 'vue-router';

export const permissionRoutes: RouteRecordRaw = {
  path: '/permission',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      name: 'permission',
      path: '',
      component: () => import('pages/PermissionManagement.vue')
    }
  ]
};
