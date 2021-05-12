import { AxiosRequestConfig } from 'axios';
import { UserManager, UserManagerSettings } from 'oidc-client';
import { FactoryProvider, TypeProvider } from 'src/models';
import { oidcSettings } from 'src/presets';
import { HttpRequestInterceptor } from 'src/services/http-service';
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

export const AuthServiceProvider = new TypeProvider<AuthService>(
  Symbol.for(AuthService.name),
  AuthService,
  [oidcSettings]
);

export const AuthRequestInterceptorProvider = new FactoryProvider<HttpRequestInterceptor, AuthService>(
  Symbol.for('AuthRequestInterceptor'),
  (authService) => {
    return {
      name: 'AuthRequestInterceptor',
      target: 'request',
      interception: (config: AxiosRequestConfig) => {
        config.headers['Authorization'] = authService.authorizationHeader.value;
        return config;
      }
    };
  },
  [AuthServiceProvider]
);
