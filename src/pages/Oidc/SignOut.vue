<template>
  <div>Logout success, redirecting</div>
</template>

<script lang="ts">
import { AuthService, authServiceToken } from 'src/services';
import { useInject } from 'src/utils';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SignOut',
  setup() {
    const authService = useInject<AuthService>(authServiceToken);
    const router = useRouter();

    onMounted(() => {
      authService.handleLogout()
        .then(() => router.push({ name: 'home' }))
        .catch(() => router.push({ name: 'error', params: { code: '500' } }));
    });
  }
});
</script>
