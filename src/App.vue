<template>
  <router-view v-if="finished" />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { axiosConfig, oidcSettings } from 'src/presets';
import {
  AbpConfigurationService,
  AbpConfigurationServiceDescriptor,
  AuthRequestInterceptor,
  AuthService,
  AuthServiceDescriptor,
  HttpService,
  HttpServiceDescriptor,
  LanguageRequestInterceptor,
  LanguageService,
  LanguageServiceTokenDescriptor
} from 'src/services';
import { useProvider } from 'src/utils';
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const authService = useProvider<AuthService>(AuthServiceDescriptor, 'root', oidcSettings);

    const httpService = useProvider<HttpService>(HttpServiceDescriptor, 'root', axiosConfig);
    httpService.useInterceptor(AuthRequestInterceptor, authService);

    const abpConfigurationService = useProvider<AbpConfigurationService>(AbpConfigurationServiceDescriptor, 'root', httpService);

    const languageService = useProvider<LanguageService>(LanguageServiceTokenDescriptor, 'root', abpConfigurationService.localization);
    httpService.useInterceptor(LanguageRequestInterceptor, languageService);

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
