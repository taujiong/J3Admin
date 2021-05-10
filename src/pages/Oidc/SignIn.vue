<template>
  <div>Login success, redirecting</div>
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
  name: 'SignIn',
  setup() {
    const authService = useInject<AuthService>(AuthServiceDescriptor);
    const abpConfigurationService = useInject<AbpConfigurationService>(AbpConfigurationServiceDescriptor
    );
    const router = useRouter();

    onMounted(() => {
      authService.handleLogin()
        .then(async () => {
          await abpConfigurationService.loadConfiguration();
          await router.push({ name: 'home' });
        })
        .catch(() => router.push({ name: 'error', params: { code: '401' } }));
    });
  }
});
</script>
