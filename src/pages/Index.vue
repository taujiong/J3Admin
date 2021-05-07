<template>
  <q-page class="row items-center justify-evenly">
    <q-btn @click="btnAction">{{ btnName }}</q-btn>
  </q-page>
</template>

<script lang="ts">
import { authService } from 'src/services';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const btnName = authService.authenticated ? 'logout' : 'login';
    const btnAction = () => authService.authenticated ? authService.logout() : authService.login();

    return { btnAction, btnName };
  }
});
</script>
