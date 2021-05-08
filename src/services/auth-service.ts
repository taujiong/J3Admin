import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { readonly, ref } from 'vue';

export const authServiceToken = Symbol('auth-service');

export class AuthService {
  private readonly userManager: UserManager;

  constructor(oidcSettings: UserManagerSettings) {
    this.userManager = new UserManager(oidcSettings);
  }

  private _user = ref<User | null>();
  get user() {
    return readonly(this._user);
  }

  get authenticated() {
    return this.user.value !== null;
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
    this._user.value = await this.userManager.getUser();
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
