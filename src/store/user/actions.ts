import OidcUserManager from 'src/utils/oidc-user-manager';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from './state';

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async signIn() {
    await OidcUserManager.clearStaleState();
    await OidcUserManager.signinRedirect();
  },

  async handleSignIn({ commit }) {
    await OidcUserManager.signinRedirectCallback();
    const user = await OidcUserManager.getUser();
    console.log(user);
    commit('updateUserState', user);
  }
};

export default actions;
