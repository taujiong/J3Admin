<template>
  <router-view v-if="finished" />
</template>

<script lang="ts">
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
  HttpService,
  httpServiceToken
} from 'src/services';
import { createLanguageService, LanguageService, languageServiceToken } from 'src/services/language-service';
import { useProvider } from 'src/utils';
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const authService = createAuthService(oidcSettings);
    useProvider<AuthService>(authServiceToken, authService);

    const httpService = createHttpService(axiosConfig);
    httpService.interceptRequest((config) => {
      config.headers['Authorization'] = authService.authorizationHeader.value;
      return config;
    });
    useProvider<HttpService>(httpServiceToken, httpService);

    const abpConfigurationService = createAbpConfigurationService(httpService);
    useProvider<AbpConfigurationService>(abpConfigurationServiceToken, abpConfigurationService);

    const languageService = createLanguageService(abpConfigurationService.localization);
    useProvider<LanguageService>(languageServiceToken, languageService);
    httpService.interceptRequest((config) => {
      config.headers['Accept-Language'] = languageService.languageHeader.value;
      return config;
    });

    watch(
      () => languageService.currentCulture.value,
      () => languageService.updateI18n()
    );

    const onBeforeUnload = () => {
      languageService.saveState();
    };

    const finished = ref(false);
    onMounted(async () => {
      window.addEventListener('beforeunload', onBeforeUnload);

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
