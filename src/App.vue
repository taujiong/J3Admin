<template>
  <router-view v-if="finished" />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import {
  AbpConfigurationService,
  AbpConfigurationServiceProvider,
  AuthRequestInterceptor,
  AuthService,
  AuthServiceProvider,
  HttpService,
  HttpServiceProvider,
  LanguageRequestInterceptor,
  LanguageService,
  LanguageServiceProvider
} from 'src/services';
import { injectFrom, provideIn } from 'src/utils';
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const authService = provideIn<AuthService>('component', AuthServiceProvider);
    const languageService = provideIn<LanguageService>('root', LanguageServiceProvider);
    const abpConfigurationService = injectFrom<AbpConfigurationService>('root', AbpConfigurationServiceProvider.token);
    const httpService = injectFrom<HttpService>('root', HttpServiceProvider.token);
    httpService.useInterceptor(AuthRequestInterceptor, authService);
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
