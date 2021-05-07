import { Profile } from 'oidc-client';

export interface UserStateInterface {
  profile: Profile | undefined;
  idToken: string;
  accessToken: string;
  refreshToken: string | undefined;
}

function state(): UserStateInterface {
  return {
    profile: undefined,
    idToken: '',
    accessToken: '',
    refreshToken: undefined
  };
}

export default state;
