<template>
  <div>Login success, redirecting</div>
</template>

<script lang="ts">
import { authService } from 'src/services';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SignIn',
  setup() {
    const router = useRouter();
    onMounted(() => {
      authService.handleLogin()
        .then(() => router.push({ name: 'home' }))
        .catch(() => router.push({ name: 'error', params: { code: '401' } }));
    });
  }
});
</script>
