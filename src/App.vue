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
    const authService = provideIn<AuthService>('root', AuthServiceProvider);
    const authRequestInterceptor = provideIn<HttpRequestInterceptor>('root', AuthRequestInterceptorProvider);

    const languageService = provideIn<LanguageService>('root', LanguageServiceProvider);
    const languageRequestInterceptor = provideIn<HttpRequestInterceptor>('root', LanguageRequestInterceptorProvider);

    const abpConfigurationService = injectFrom<AbpConfigurationService>('root', AbpConfigurationServiceProvider.token);

    const httpService = injectFrom<HttpService>('root', HttpServiceProvider.token);
    httpService.useInterceptor(authRequestInterceptor);
    httpService.useInterceptor(languageRequestInterceptor);

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
