<template>
  <router-view v-if="finished" />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { axiosConfig, oidcSettings } from 'src/presets';
import {
  AbpConfigurationService,
  AbpConfigurationServiceDescriptor,
  AuthService,
  AuthServiceDescriptor,
  HttpService,
  HttpServiceDescriptor
} from 'src/services';
import { LanguageService, LanguageServiceTokenDescriptor } from 'src/services/language-service';
import { useProvider } from 'src/utils';
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const authService = useProvider<AuthService>(AuthServiceDescriptor, true);
    authService.initialize(oidcSettings);

    const httpService = useProvider<HttpService>(HttpServiceDescriptor, true);
    httpService.initialize(axiosConfig);
    httpService.interceptRequest((config) => {
      config.headers['Authorization'] = authService.authorizationHeader.value;
      return config;
    });

    const abpConfigurationService = useProvider<AbpConfigurationService>(AbpConfigurationServiceDescriptor, true);
    abpConfigurationService.initialize(httpService);

    const languageService = useProvider<LanguageService>(LanguageServiceTokenDescriptor, true);
    languageService.initialize(abpConfigurationService.localization);
    httpService.interceptRequest((config) => {
      config.headers['Accept-Language'] = languageService.languageHeader.value;
      return config;
    });

    watch(
      () => languageService.currentCulture.value,
      () => languageService.updateI18n()
    );

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
