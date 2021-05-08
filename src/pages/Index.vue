<template>
  <q-page class="row items-center justify-evenly">
    {{ configureValue }}
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
    let configureValue = abpConfigurationService.configuration.value.currentUser;
    let btnName = authService.user.value?.profile.name;
    const btnAction = () => authService.authenticated ? authService.logout() : authService.login();

    return { btnAction, btnName, configureValue };
  }
});
</script>
