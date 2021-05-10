import { UserManager, UserManagerSettings } from 'oidc-client';
import { ServiceDescriptor } from 'src/utils';
import { readonly, ref } from 'vue';

export const AuthServiceDescriptor: ServiceDescriptor<AuthService> = {
  token: Symbol('auth-service'),
  create: () => new AuthService()
};

export class AuthService {
  private _userManager!: UserManager;
  private _authorizationHeader = ref('');

  initialize(oidcSettings: UserManagerSettings) {
    this._userManager = new UserManager(oidcSettings);
  }

  get authorizationHeader() {
    return readonly(this._authorizationHeader);
  }

  async login() {
    await this._userManager.clearStaleState();
    await this._userManager.signinRedirect();
  }

  async handleLogin() {
    await this._userManager.signinCallback();
    await this.refreshUser();
  }

  async refreshUser() {
    const user = await this._userManager.getUser();
    this._authorizationHeader.value = user
      ? `${ user.token_type } ${ user.access_token }`
      : '';
  }

  async logout() {
    await this._userManager.signoutRedirect();
  }

  async handleLogout() {
    await this._userManager.signoutCallback();
    await this.refreshUser();
  }
}
