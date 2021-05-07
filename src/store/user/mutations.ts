import { User } from 'oidc-client';
import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';

const mutation: MutationTree<UserStateInterface> = {
  updateUserState(state: UserStateInterface, user: User) {
    state.profile = user.profile;
    state.idToken = user.id_token;
    state.accessToken = user.access_token;
    state.refreshToken = user.refresh_token;
  }
};

export default mutation;
