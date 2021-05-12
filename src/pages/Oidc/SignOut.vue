<template>
  <div>Logout success, redirecting</div>
</template>

<script lang="ts">
import {
  AbpConfigurationService,
  AbpConfigurationServiceProvider,
  AuthService,
  AuthServiceProvider
} from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SignOut',
  setup() {
    const authService = injectFrom<AuthService>('root', AuthServiceProvider.token);
    const abpConfigurationService = injectFrom<AbpConfigurationService>('root', AbpConfigurationServiceProvider.token);
    const router = useRouter();

    onMounted(() => {
      authService.handleLogout()
        .then(async () => {
          await abpConfigurationService.loadConfiguration();
          await router.push({ name: 'home' });
        })
        .catch(() => router.push({ name: 'error', params: { code: '500' } }));
    });
  }
});
</script>
