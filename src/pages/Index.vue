<template>
  <q-page class="row items-center justify-evenly">
    <div><span v-t="'AbpUi.Welcome'"></span> {{ userName }}</div>
  </q-page>
</template>

<script lang="ts">
import { AuthService, AuthServiceProvider } from 'src/services';
import { UserService, UserServiceProvider } from 'src/services/user-service';
import { injectFrom } from 'src/utils';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const authService = injectFrom<AuthService>('root', AuthServiceProvider.token);
    const userService = injectFrom<UserService>('root', UserServiceProvider.token);

    const userName = ref(authService.isAuthenticated.value
      ? userService.currentUser.value.userName
      : 'Anonymous');

    return { userName };
  }
});
</script>
