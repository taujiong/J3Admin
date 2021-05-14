<template>
  <q-page class="row items-center justify-evenly">
    <div><span v-t="'AbpUi.Welcome'"></span> {{ userName }}</div>
  </q-page>
</template>

<script lang="ts">
import { AuthService, AuthServiceProvider, UserService, UserServiceProvider } from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const authService = injectFrom<AuthService>(AuthServiceProvider.token);
    const userService = injectFrom<UserService>(UserServiceProvider.token);

    const userName = ref(authService.isAuthenticated.value
      ? userService.currentUser.value.userName
      : 'Anonymous');

    return { userName };
  }
});
</script>
