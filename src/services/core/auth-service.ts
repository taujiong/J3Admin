import { AxiosRequestConfig } from 'axios';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { FactoryProvider, TypeProvider } from 'src/models';
import { oidcSettings } from 'src/presets';
import { HttpRequestInterceptor } from 'src/services';
import { computed, ref } from 'vue';

export class AuthService {
  private _userManager: UserManager;
  private _oidcUser = ref<User>();

  constructor(oidcSettings: UserManagerSettings) {
    this._userManager = new UserManager(oidcSettings);
  }

  isAuthenticated = computed(() => this._oidcUser.value != undefined);

  authorizationHeader = computed(() => {
    const user = this._oidcUser.value;
    return user ? `${ user.token_type } ${ user?.access_token }` : '';
  });

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
    this._oidcUser.value = user ?? undefined;
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
        if (authService.isAuthenticated)
          config.headers['Authorization'] = authService.authorizationHeader.value;
        return config;
      }
    };
  },
  [AuthServiceProvider]
);
