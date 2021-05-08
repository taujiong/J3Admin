<template>
  <router-view v-if="finished" />
</template>

<script lang="ts">
import { AxiosInstance } from 'axios';
import { useQuasar } from 'quasar';
import { axiosConfig, oidcSettings } from 'src/presets';
import {
  AbpConfigurationService,
  abpConfigurationServiceToken,
  AuthService,
  authServiceToken,
  createAbpConfigurationService,
  createAuthService,
  createHttpService,
  httpServiceToken
} from 'src/services';
import { useProvider } from 'src/utils';
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const authService = createAuthService(oidcSettings);
    const axiosInstance = createHttpService(axiosConfig);
    const abpConfigurationService = createAbpConfigurationService(axiosInstance);

    useProvider<AuthService>(authServiceToken, authService);
    useProvider<AxiosInstance>(httpServiceToken, axiosInstance);
    useProvider<AbpConfigurationService>(abpConfigurationServiceToken, abpConfigurationService);

    const finished = ref(false);
    onMounted(async () => {
      const $q = useQuasar();
      $q.loading.show();
      await authService.refreshUser();
      await abpConfigurationService.loadConfiguration();
      $q.loading.hide();
      finished.value = true;
    });

    return { finished };
  }
});
</script>
