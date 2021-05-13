<template>
  <q-btn dense flat icon="translate" round>
    <q-menu>
      <q-list style="min-width: 100%;">
        <q-item
          v-for="lang of allLanguages"
          :key="lang.displayName"
          v-close-popup
          v-ripple
          :active="lang.cultureName === currentLanguage.cultureName"
          clickable
          @click="switchLanguage(lang)"
        >
          <q-item-section>{{ lang.displayName }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { LanguageInfo } from 'src/models';
import {
  AbpConfigurationService,
  AbpConfigurationServiceProvider,
  LanguageService,
  LanguageServiceProvider
} from 'src/services';
import { injectFrom } from 'src/utils';
import { defineComponent, UnwrapRef } from 'vue';

export default defineComponent({
  name: 'LanguageSwitcher',
  setup() {
    const abpConfigurationService = injectFrom<AbpConfigurationService>(AbpConfigurationServiceProvider.token);
    const languageService = injectFrom<LanguageService>(LanguageServiceProvider.token);

    const allLanguages = languageService.languages.value as LanguageInfo[];
    const currentLanguage = languageService.currentCulture;
    const switchLanguage = async (language: UnwrapRef<LanguageInfo>) => {
      languageService.switchLanguage(language);
      await abpConfigurationService.loadConfiguration();
    };

    window.addEventListener('beforeunload', () => languageService.saveState());

    return { allLanguages, currentLanguage, switchLanguage };
  }
});
</script>
