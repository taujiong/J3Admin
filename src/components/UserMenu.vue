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
import { AuthService, AuthServiceProvider } from 'src/services';
import { UserService, UserServiceProvider } from 'src/services/user-service';
import { injectFrom, provideIn } from 'src/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserMenu',
  setup() {
    const authService = injectFrom<AuthService>(AuthServiceProvider.token);
    const userService = provideIn<UserService>(UserServiceProvider);

    const currentUser = userService.currentUser;
    const login = () => authService.login();
    const logout = () => authService.logout();

    return { currentUser, login, logout };
  }
});
</script>
