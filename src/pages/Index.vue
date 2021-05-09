<template>
  <q-page class="row items-center justify-evenly">
    Welcome {{ userName }}
  </q-page>
</template>

<script lang="ts">
import { AbpConfigurationService, abpConfigurationServiceToken } from 'src/services';
import { useInject } from 'src/utils';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const abpConfigurationService = useInject<AbpConfigurationService>(abpConfigurationServiceToken);
    const currentUser = abpConfigurationService.currentUser;
    const userName = ref(currentUser.value.isAuthenticated ? currentUser.value.userName : 'Anonymous');

    return { currentUser, userName };
  }
});
</script>
