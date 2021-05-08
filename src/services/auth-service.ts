import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { readonly } from 'vue';

class AuthService {
  private readonly userManager: UserManager;

  constructor(oidcSettings: UserManagerSettings) {
    this.userManager = new UserManager(oidcSettings);
  }

  private _user: User | null = null;

  get user() {
    return this._user ? readonly<User>(this._user) : null;
  }

  get authenticated() {
    return this._user !== null;
  }

  async login() {
    await this.userManager.clearStaleState();
    await this.userManager.signinRedirect();
  }

  async handleLogin() {
    await this.userManager.signinCallback();
    this.refreshUser();
  }

  refreshUser() {
    this.userManager.getUser()
      .then(user => this._user = user)
      .catch(error => console.log(error));
  }

  async logout() {
    await this.userManager.signoutRedirect();
  }

  async handleLogout() {
    await this.userManager.signoutCallback();
    this.refreshUser();
  }
}

const appBaseUrl = process.env.APP_BASE_URL;
const oidcSettings: UserManagerSettings = {
  authority: process.env.AUTHORITY_URL,
  client_id: 'J3Admin',
  client_secret: process.env.DEV ? 'dev_admin' : 'secret',
  redirect_uri: `${ appBaseUrl }/oidc/signin`,
  post_logout_redirect_uri: `${ appBaseUrl }/oidc/signout`,
  silent_redirect_uri: `${ appBaseUrl }/oidc/renew`,
  automaticSilentRenew: true,
  response_type: 'code',
  scope: 'openid profile offline_access J3Admin J3Blogging J3Guard'
};

export const authService = new AuthService(oidcSettings);
