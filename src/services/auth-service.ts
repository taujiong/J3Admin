import { UserManager, UserManagerSettings } from 'oidc-client';
import { readonly, ref } from 'vue';

export const authServiceToken = Symbol('auth-service');

export class AuthService {
  private readonly userManager: UserManager;
  private _authorizationHeader = ref('');

  constructor(oidcSettings: UserManagerSettings) {
    this.userManager = new UserManager(oidcSettings);
  }

  get authorizationHeader() {
    return readonly(this._authorizationHeader);
  }

  async login() {
    await this.userManager.clearStaleState();
    await this.userManager.signinRedirect();
  }

  async handleLogin() {
    await this.userManager.signinCallback();
    await this.refreshUser();
  }

  async refreshUser() {
    const user = await this.userManager.getUser();
    this._authorizationHeader.value = user
      ? `${ user.token_type } ${ user.access_token }`
      : '';
  }

  async logout() {
    await this.userManager.signoutRedirect();
  }

  async handleLogout() {
    await this.userManager.signoutCallback();
    await this.refreshUser();
  }
}

export function createAuthService(oidcSettings: UserManagerSettings) {
  return new AuthService(oidcSettings);
}
