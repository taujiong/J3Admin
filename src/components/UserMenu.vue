<template>
  <q-btn flat round>
    <q-avatar size="26px">
      <img
        alt="avatar"
        src="favicon.ico"
      />
    </q-avatar>
    <q-menu>
      <q-list style="min-width: 100px;">
        <template v-if="currentUser.isAuthenticated">
          <q-item v-ripple clickable>
            <q-item-section v-t="'AbpUi.PersonalInfo'"></q-item-section>
          </q-item>
          <q-item v-ripple clickable @click="logout">
            <q-item-section v-t="'AbpUi.Logout'"></q-item-section>
          </q-item>
        </template>
        <template v-else>
          <q-item v-ripple clickable @click="login">
            <q-item-section v-t="'AbpUi.Login'"></q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import {
  AbpConfigurationService,
  AbpConfigurationServiceDescriptor,
  AuthService,
  AuthServiceDescriptor
} from 'src/services';
import { useInject } from 'src/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserMenu',
  setup() {
    const authService = useInject<AuthService>(AuthServiceDescriptor);
    const abpConfigurationService = useInject<AbpConfigurationService>(AbpConfigurationServiceDescriptor);
    const currentUser = abpConfigurationService.currentUser.value;
    const login = () => authService.login();
    const logout = () => authService.logout();

    return { currentUser, login, logout };
  }
});
</script>
