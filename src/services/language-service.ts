import { i18n } from 'boot/i18n';
import { ApplicationLocalizationConfigurationDto, LanguageInfo } from 'src/models';
import { computed, readonly, Ref, ref } from 'vue';

export const languageServiceToken = Symbol('language-service');

export class LanguageService {
  private _localization = ref(<ApplicationLocalizationConfigurationDto>{});

  constructor(localization: Ref<ApplicationLocalizationConfigurationDto>) {
    this._localization = localization;
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
    const locale = this.currentCulture.value.cultureName ?? 'zh-Hans';
    const i18nRoot = i18n.global;
    i18nRoot.mergeLocaleMessage(locale, this.messages.value);
    i18nRoot.locale = locale;
  }
}

export function createLanguageService(localization: Ref<ApplicationLocalizationConfigurationDto>) {
  return new LanguageService(localization);
}
