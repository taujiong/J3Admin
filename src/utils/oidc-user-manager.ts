import { UserManager, UserManagerSettings } from 'oidc-client';

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

const OidcUserManager = new UserManager(oidcSettings);

export default OidcUserManager;
