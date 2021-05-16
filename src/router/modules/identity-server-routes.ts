import { RouteRecordRaw } from 'vue-router';

export const identityServerRoutes: RouteRecordRaw = {
  name: 'identity-server',
  path: '/identity-server',
  component: () => import('layouts/MainLayout.vue'),
  meta: {
    requiredPolicy: 'IdentityServer.Client || IdentityServer.ApiResource || IdentityServer.IdentityResource',
    showInNavbar: true,
    iconName: 'assistant_direction',
    displayNameKey: 'AbpIdentityServer.Permission:IdentityServerManagement'
  },
  children: [
    {
      name: 'ids-client',
      path: 'client',
      component: () => import('pages/IdentityServer/ClientManagement.vue'),
      meta: {
        requiredPolicy: 'IdentityServer.Client',
        showInNavbar: true,
        iconName: 'computer',
        parentName: 'identity-server',
        displayNameKey: 'AbpIdentityServer.Permission:ClientManagement'
      }
    },
    {
      name: 'ids-api-resource',
      path: 'api-resource',
      component: () => import('pages/IdentityServer/ApiResourceManagement.vue'),
      meta: {
        requiredPolicy: 'IdentityServer.ApiResource',
        showInNavbar: true,
        iconName: 'api',
        parentName: 'identity-server',
        displayNameKey: 'AbpIdentityServer.Permission:ApiResourceManagement'
      }
    },
    {
      name: 'ids-identity-resource',
      path: 'identity-resource',
      component: () => import('pages/IdentityServer/IdentityResourceManagement.vue'),
      meta: {
        requiredPolicy: 'IdentityServer.IdentityResource',
        showInNavbar: true,
        iconName: 'card_membership',
        parentName: 'identity-server',
        displayNameKey: 'AbpIdentityServer.Permission:IdentityResourceManagement'
      }
    },
    {
      name: 'ids-api-scope',
      path: 'api-scope',
      component: () => import('pages/IdentityServer/ApiScopeManagement.vue'),
      meta: {
        requiredPolicy: 'IdentityServer.ApiScope',
        showInNavbar: true,
        iconName: 'fact_check',
        parentName: 'identity-server',
        displayNameKey: 'AbpIdentityServer.Permission:IdentityResourceManagement'
      }
    }
  ]
};
