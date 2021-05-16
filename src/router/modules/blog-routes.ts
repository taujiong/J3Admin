import { RouteRecordRaw } from 'vue-router';

export const blogRoutes: RouteRecordRaw = {
  name: 'blog',
  path: '/blog',
  component: () => import('layouts/MainLayout.vue'),
  meta: {
    requiredPolicy: 'Blogging.Post || Blogging.Blob',
    showInNavbar: true,
    iconName: 'rss_feed',
    displayNameKey: 'Blogging.Permission:BlogManagement'
  },
  children: [
    {
      name: 'post',
      path: 'post',
      component: () => import('pages/Blog/Post.vue'),
      meta: {
        requiredPolicy: 'Blogging.Post',
        showInNavbar: true,
        iconName: 'feed',
        parentName: 'blog',
        displayNameKey: 'Blogging.Permission:PostManagement'
      }
    }
  ]
};
