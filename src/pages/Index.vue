<template>
  <q-page class="row items-center justify-evenly">
    <div><span v-t="'AbpUi.Welcome'"></span> {{ userName }}</div>
  </q-page>
</template>

<script lang="ts">
import { AbpConfigurationService, AbpConfigurationServiceDescriptor } from 'src/services';
import { useInject } from 'src/utils';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const abpConfigurationService = useInject<AbpConfigurationService>(AbpConfigurationServiceDescriptor);
    const currentUser = abpConfigurationService.currentUser;
    const userName = ref(currentUser.value.isAuthenticated ? currentUser.value.userName : 'Anonymous');

    return { currentUser, userName };
  }
});
</script>
