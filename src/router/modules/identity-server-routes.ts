import { RouteRecordRaw } from 'vue-router';

export const identityServerRoutes: RouteRecordRaw = {
  path: '/identity-server',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      name: 'ids-client',
      path: 'client',
      component: () => import('pages/IdentityServer/ClientManagement.vue')
    },
    {
      name: 'ids-api-resource',
      path: 'api-resource',
      component: () => import('pages/IdentityServer/ApiResourceManagement.vue')
    },
    {
      name: 'ids-identity-resource',
      path: 'identity-resource',
      component: () => import('pages/IdentityServer/IdentityResourceManagement.vue')
    },
    {
      name: 'ids-api-scope',
      path: 'api-scope',
      component: () => import('pages/IdentityServer/ApiScopeManagement.vue')
    }
  ]
};
