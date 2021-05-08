<template>
  <div>Logout success, redirecting</div>
</template>

<script lang="ts">
import { authService } from 'src/services';
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SignOut',
  setup() {
    const router = useRouter();
    onMounted(() => {
      authService.handleLogout()
        .then(() => router.push({ name: 'home' }))
        .catch(() => router.push({ name: 'error', params: { code: '500' } }));
    });
  }
});
</script>
