<template>
  <q-page class="row items-center justify-evenly">
    <q-btn @click="login">login</q-btn>
  </q-page>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const store = useStore();
    const login = () => store.dispatch('user/signIn');

    return { login };
  }
});
</script>
