<template>
  <router-view v-if="finished" />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import {
  AbpConfigurationService,
  AbpConfigurationServiceProvider,
  AuthRequestInterceptorProvider,
  AuthService,
  AuthServiceProvider,
  HttpRequestInterceptor,
  HttpService,
  HttpServiceProvider,
  LanguageRequestInterceptorProvider,
  LanguageService,
  LanguageServiceProvider
} from 'src/services';
import { injectFrom, provideIn } from 'src/utils';
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const authService = provideIn<AuthService>(AuthServiceProvider);
    const authRequestInterceptor = provideIn<HttpRequestInterceptor>(AuthRequestInterceptorProvider);

    const languageService = provideIn<LanguageService>(LanguageServiceProvider);
    const languageRequestInterceptor = provideIn<HttpRequestInterceptor>(LanguageRequestInterceptorProvider);

    const abpConfigurationService = injectFrom<AbpConfigurationService>(AbpConfigurationServiceProvider.token);

    const httpService = injectFrom<HttpService>(HttpServiceProvider.token);
    httpService.useInterceptor(authRequestInterceptor);
    httpService.useInterceptor(languageRequestInterceptor);

    watch(
      () => abpConfigurationService.configuration.value,
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
