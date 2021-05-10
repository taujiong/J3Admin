import { AxiosRequestConfig } from 'axios';
import { i18n } from 'boot/i18n';
import { LocalStorage } from 'quasar';
import { defaultLanguageKey } from 'src/i18n';
import { ApplicationLocalizationConfigurationDto, LanguageInfo } from 'src/models';
import { HttpRequestInterceptor } from 'src/services/http-service';
import { ServiceDescriptor } from 'src/utils';
import { computed, readonly, Ref, ref } from 'vue';

export class LanguageService {
  private readonly storageName = 'current.language';
  private _localization = ref(<ApplicationLocalizationConfigurationDto>{});

  initialize(localization: Ref<ApplicationLocalizationConfigurationDto>) {
    this._localization = localization;
    this._languageHeader.value = LocalStorage.getItem<string>(this.storageName)
      ?? defaultLanguageKey;
  }

  private _languageHeader = ref('');

  get languageHeader() {
    return readonly(this._languageHeader);
  }

  get currentCulture() {
    return computed(() => this._localization.value?.currentCulture);
  }

  get languages() {
    return computed(() => this._localization.value?.languages);
  }

  get messages() {
    return computed(() => this._localization.value?.values);
  }

  switchLanguage(language: LanguageInfo) {
    if (!language.cultureName) return;
    if (language.cultureName === this.currentCulture.value.cultureName) return;
    this._languageHeader.value = language.cultureName;
  }

  updateI18n() {
    const locale = this.currentCulture.value.cultureName ?? defaultLanguageKey;
    const i18nRoot = i18n.global;
    i18nRoot.mergeLocaleMessage(locale, this.messages.value);
    i18nRoot.locale = locale;
  }

  saveState() {
    LocalStorage.set(this.storageName, this.currentCulture.value?.cultureName ?? defaultLanguageKey);
  }
}

export const LanguageServiceTokenDescriptor: ServiceDescriptor<LanguageService> = {
  tokenKey: LanguageService.name,
  create: () => new LanguageService()
};

export const LanguageRequestInterceptor: HttpRequestInterceptor = {
  name: LanguageService.name,
  target: 'request',
  intercept: (...dependencies) => {
    if (dependencies.length !== 1) throw new Error('LanguageRequestInterceptor requires exactly 1 parameter with type "LanguageService"');

    const languageService = dependencies[0] as LanguageService;
    return (config: AxiosRequestConfig) => {
      config.headers['Accept-Language'] = languageService.languageHeader.value;
      return config;
    };
  }
};
