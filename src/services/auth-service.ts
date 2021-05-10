import { AxiosRequestConfig } from 'axios';
import { UserManager, UserManagerSettings } from 'oidc-client';
import { HttpRequestInterceptor } from 'src/services/http-service';
import { ServiceDescriptor } from 'src/utils';
import { readonly, ref } from 'vue';

export class AuthService {
  private _userManager: UserManager;
  private _authorizationHeader = ref('');

  constructor(oidcSettings: UserManagerSettings) {
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

export const AuthServiceDescriptor: ServiceDescriptor<AuthService> = {
  tokenKey: AuthService.name,
  create: (...dependency: unknown[]) => {
    if (dependency.length !== 1) throw new Error('dependency should be of type UserManagerSettings');
    const oidcSettings = dependency[0] as UserManagerSettings;
    return new AuthService(oidcSettings);
  }
};

export const AuthRequestInterceptor: HttpRequestInterceptor = {
  name: AuthService.name,
  target: 'request',
  intercept: (...dependencies: unknown[]) => {
    if (dependencies.length !== 1) throw new Error('AuthRequestInterceptor requires exactly 1 parameter with type "AuthService"');

    const authService = dependencies[0] as AuthService;
    return (config: AxiosRequestConfig) => {
      config.headers['Authorization'] = authService.authorizationHeader.value;
      return config;
    };
  }
};
