<template>
  <q-page class="row items-center justify-evenly">
    <div><span v-t="'AbpUi.Welcome'"></span> {{ userName }}</div>
    <q-btn @click="add">add</q-btn>
    <q-btn @click="remove">remove</q-btn>
    <q-btn @click="patch">patch</q-btn>
  </q-page>
</template>

<script lang="ts">
import {
  AuthService,
  AuthServiceProvider,
  NavbarService,
  NavbarServiceProvider,
  UserService,
  UserServiceProvider
} from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const authService = injectFrom<AuthService>(AuthServiceProvider);
    const userService = injectFrom<UserService>(UserServiceProvider);

    const userName = ref(authService.isAuthenticated.value
      ? userService.currentUser.value.userName
      : 'Anonymous');

    const navbarService = injectFrom<NavbarService>(NavbarServiceProvider);

    const add = () => {
      navbarService.addItem([
        {
          key: 'test',
          iconName: 'dashboard',
          displayNameKey: 'AbpUi.Welcome'
        },
        {
          key: 'test1',
          iconName: 'dashboard',
          parentKey: 'test',
          displayNameKey: 'AbpUi.Login',
          path: { name: 'user-management' }
        },
        {
          key: 'test2',
          iconName: 'dashboard',
          parentKey: 'test',
          displayNameKey: 'AbpUi.Logout',
          path: { name: 'role-management' }
        }]);
    };

    const remove = () => {
      navbarService.removeItem(['test1']);
      navbarService.removeItem(['route:user-management']);
    };

    const patch = () => {
      navbarService.patchItem('route:identity', { iconName: 'dashboard' });
    };

    return { userName, add, remove, patch };
  }
});
</script>
