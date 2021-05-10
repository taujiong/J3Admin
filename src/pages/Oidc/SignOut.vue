<template>
  <div>Logout success, redirecting</div>
</template>

<script lang="ts">
import {
  AbpConfigurationService,
  AbpConfigurationServiceDescriptor,
  AuthService,
  AuthServiceDescriptor
} from 'src/services';
import { useInject } from 'src/utils';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SignOut',
  setup() {
    const authService = useInject<AuthService>(AuthServiceDescriptor);
    const abpConfigurationService = useInject<AbpConfigurationService>(AbpConfigurationServiceDescriptor);
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
