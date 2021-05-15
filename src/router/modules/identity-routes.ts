import { RouteRecordRaw } from 'vue-router';

export const identityRoutes: RouteRecordRaw = {
  path: '/identity',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      name: 'user-management',
      path: 'users',
      component: () => import('pages/Identity/UserManagement.vue')
    },
    {
      name: 'role-management',
      path: 'roles',
      component: () => import('pages/Identity/RoleManagement.vue')
    },
    {
      name: 'user-profile',
      path: 'profile',
      component: () => import('pages/Identity/UserProfile.vue')
    }
  ]
};
