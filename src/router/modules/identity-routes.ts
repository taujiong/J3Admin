import { RouteRecordRaw } from 'vue-router';

export const identityRoutes: RouteRecordRaw = {
  name: 'identity',
  path: '/identity',
  component: () => import('layouts/MainLayout.vue'),
  meta: {
    requiredPolicy: 'AbpIdentity.Roles || AbpIdentity.Users',
    showInNavbar: true,
    iconName: 'group',
    displayNameKey: 'AbpIdentity.Permission:IdentityManagement'
  },
  children: [
    {
      name: 'user-management',
      path: 'users',
      component: () => import('pages/Identity/UserManagement.vue'),
      meta: {
        requiredPolicy: 'AbpIdentity.Users',
        showInNavbar: true,
        iconName: 'perm_identity',
        parentName: 'identity',
        displayNameKey: 'AbpIdentity.Permission:UserManagement'
      }
    },
    {
      name: 'role-management',
      path: 'roles',
      component: () => import('pages/Identity/RoleManagement.vue'),
      meta: {
        requiredPolicy: 'AbpIdentity.Roles',
        showInNavbar: true,
        iconName: 'face',
        parentName: 'identity',
        displayNameKey: 'AbpIdentity.Permission:RoleManagement'
      }
    },
    {
      name: 'user-profile',
      path: 'profile',
      component: () => import('pages/Identity/UserProfile.vue')
    }
  ]
};
