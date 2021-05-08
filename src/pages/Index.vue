<template>
  <q-page class="row items-center justify-evenly">
    {{ configuration.currentUser.isAuthenticated }}
    <q-btn @click="btnAction">{{ btnName }}</q-btn>
  </q-page>
</template>

<script lang="ts">
import { AbpConfigurationService, abpConfigurationServiceToken, AuthService, authServiceToken } from 'src/services';
import { useInject } from 'src/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Index',
  setup() {
    const authService = useInject<AuthService>(authServiceToken);
    const abpConfigurationService = useInject<AbpConfigurationService>(abpConfigurationServiceToken);

    const configuration = abpConfigurationService.configuration;
    let btnName = configuration.value.currentUser.isAuthenticated ? 'Logout' : 'login';
    const btnAction = () => configuration.value.currentUser.isAuthenticated ? authService.logout() : authService.login();

    return { btnAction, btnName, configuration };
  }
});
</script>
