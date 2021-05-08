<template>
  <q-page class="row items-center justify-evenly">
    {{ configureValue }}
    <q-btn @click="btnAction">{{ btnName }}</q-btn>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { abpConfigurationService, authService } from 'src/services';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const $q = useQuasar();
    let configureValue = ref('');

    onMounted(async () => {
      $q.loading.show();
      await abpConfigurationService.loadConfiguration();
      configureValue.value = JSON.stringify(abpConfigurationService.configuration.currentUser);
      $q.loading.hide();
    });

    const btnName = authService.authenticated ? 'logout' : 'login';
    const btnAction = () => authService.authenticated ? authService.logout() : authService.login();

    return { btnAction, btnName, configureValue };
  }
});
</script>
