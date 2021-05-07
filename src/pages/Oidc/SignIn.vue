<template>
  <div>Login success, redirecting</div>
</template>

<script lang='ts'>
import { useStore } from 'src/store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'SignIn',
  setup() {
    const store = useStore();
    const router = useRouter();
    onMounted(() => {
      store.dispatch('user/handleSignIn')
        .then(() => router.push({ name: 'home' }))
        .catch(() => console.log('error'));
    });
  }
};
</script>

<style scoped>

</style>
