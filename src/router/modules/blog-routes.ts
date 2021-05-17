import { RouteRecordRaw } from 'vue-router';

export const blogRoutes: RouteRecordRaw = {
  name: 'blogging',
  path: '/blogging',
  component: () => import('layouts/MainLayout.vue'),
  meta: {
    requiredPolicy: 'Blogging.Post || Blogging.Blob',
    showInNavbar: true,
    iconName: 'rss_feed',
    displayNameKey: 'Blogging.Permission:BlogManagement'
  },
  children: [
    {
      name: 'post-list',
      path: 'posts',
      component: () => import('pages/Blog/PostList.vue'),
      meta: {
        requiredPolicy: 'Blogging.Post',
        showInNavbar: true,
        iconName: 'feed',
        parentName: 'blogging',
        displayNameKey: 'Blogging.Permission:PostManagement'
      }
    },
    {
      name: 'post-detail',
      path: 'post/preview/:postId',
      component: () => import('pages/Blog/PostDetail.vue'),
      props: true
    },
    {
      name: 'post-create',
      path: 'post/create',
      component: () => import('pages/Blog/PostEdit.vue')
    },
    {
      name: 'post-edit',
      path: 'post/edit/:postId',
      component: () => import('pages/Blog/PostEdit.vue'),
      props: true
    }
  ]
};
