<template>
  <q-page class="row items-center justify-evenly">
    <div><span v-t="'AbpUi.Welcome'"></span> {{ userName }}</div>
  </q-page>
</template>

<script lang="ts">
import { AbpConfigurationService, AbpConfigurationServiceProvider } from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const abpConfigurationService = injectFrom<AbpConfigurationService>('root', AbpConfigurationServiceProvider.token);
    const currentUser = abpConfigurationService.configuration.value.currentUser;
    const userName = ref(currentUser.isAuthenticated ? currentUser.userName : 'Anonymous');

    return { currentUser, userName };
  }
});
</script>
