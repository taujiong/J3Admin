import { CurrentCultureDto, LanguageInfo, TimingDto } from './culture';
import { CurrentTenantDto, MultiTenancyInfoDto } from './multi-tenancy';
import { ObjectExtensionsDto } from './object-extension';

export interface ApplicationAuthConfigurationDto {
  policies: Record<string, boolean>;
  grantedPolicies: Record<string, boolean>;
}

export interface ApplicationConfigurationDto {
  localization: ApplicationLocalizationConfigurationDto;
  auth: ApplicationAuthConfigurationDto;
  setting: ApplicationSettingConfigurationDto;
  currentUser: CurrentUserDto;
  features: ApplicationFeatureConfigurationDto;
  multiTenancy: MultiTenancyInfoDto;
  currentTenant: CurrentTenantDto;
  timing: TimingDto;
  clock: ClockDto;
  objectExtensions: ObjectExtensionsDto;
}

export interface ApplicationFeatureConfigurationDto {
  values: Record<string, string>;
}

export interface ApplicationLocalizationConfigurationDto {
  values: Record<string, Record<string, string>>;
  languages: LanguageInfo[];
  currentCulture: CurrentCultureDto;
  defaultResourceName?: string;
  languagesMap: Record<string, NameValue[]>;
  languageFilesMap: Record<string, NameValue[]>;
}

export interface ApplicationSettingConfigurationDto {
  values: Record<string, string>;
}

export interface ClockDto {
  kind?: string;
}

export interface CurrentUserDto {
  isAuthenticated: boolean;
  id?: string;
  tenantId?: string;
  userName?: string;
  name?: string;
  surName?: string;
  email?: string;
  emailVerified: boolean;
  phoneNumber?: string;
  phoneNumberVerified: boolean;
  roles: string[];
}

export interface NameValue<T = string> {
  name: string;
  value: T;
}
