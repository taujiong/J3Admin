import { AxiosRequestConfig } from 'axios';
import { i18n } from 'boot/i18n';
import { LocalStorage } from 'quasar';
import { defaultLanguageKey } from 'src/i18n';
import {
  ApplicationLocalizationConfigurationDto,
  FactoryProvider,
  LanguageInfo,
  TypeProvider,
  VueComputedReadonlyRef
} from 'src/models';
import { AbpConfigurationService, AbpConfigurationServiceProvider, HttpRequestInterceptor } from 'src/services';
import { computed, ref } from 'vue';

export class LanguageService {
  private readonly storageName = 'current.language';
  currentCulture = computed(() => this._localization.value.currentCulture);
  private _localization: VueComputedReadonlyRef<ApplicationLocalizationConfigurationDto>;

  constructor(abpConfigurationService: AbpConfigurationService) {
    this._localization = computed(() => abpConfigurationService.configuration.value.localization);
    this._languageHeader.value = LocalStorage.getItem<string>(this.storageName)
      ?? defaultLanguageKey;
  }

  languages = computed(() => this._localization.value.languages);
  messages = computed(() => this._localization.value.values);
  private _languageHeader = ref('');
  languageHeader = computed(() => this._languageHeader.value);

  switchLanguage(language: LanguageInfo) {
    if (!language.cultureName) return;
    if (language.cultureName === this.currentCulture.value?.cultureName) return;
    this._languageHeader.value = language.cultureName;
  }

  updateI18n() {
    if (!this.messages) return;
    const locale = this.currentCulture.value?.cultureName ?? defaultLanguageKey;
    const i18nRoot = i18n.global;
    i18nRoot.mergeLocaleMessage(locale, this.messages.value);
    i18nRoot.locale = locale;
  }

  saveState() {
    LocalStorage.set(this.storageName, this.currentCulture.value?.cultureName ?? defaultLanguageKey);
  }
}

export const LanguageServiceProvider = new TypeProvider<LanguageService>(
  Symbol.for(LanguageService.name),
  LanguageService,
  [AbpConfigurationServiceProvider]
);

export const LanguageRequestInterceptorProvider = new FactoryProvider<HttpRequestInterceptor, LanguageService>(
  Symbol.for('LanguageRequestInterceptor'),
  (languageService) => {
    return {
      name: 'LanguageRequestInterceptor',
      target: 'request',
      interception: (config: AxiosRequestConfig) => {
        config.headers['Accept-Language'] = languageService.languageHeader.value;
        return config;
      }
    };
  },
  [LanguageServiceProvider]
);
