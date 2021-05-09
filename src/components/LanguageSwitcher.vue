<template>
  <q-btn dense flat icon="translate" round>
    <q-menu>
      <q-list style="min-width: 100%;">
        <q-item
          v-for="lang in allLanguages"
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
import { AbpConfigurationService, abpConfigurationServiceToken } from 'src/services';
import { LanguageService, languageServiceToken } from 'src/services/language-service';
import { useInject } from 'src/utils';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LanguageSwitcher',
  setup() {
    const abpConfigurationService = useInject<AbpConfigurationService>(abpConfigurationServiceToken);
    const languageService = useInject<LanguageService>(languageServiceToken);

    const allLanguages = languageService.languages;
    const currentLanguage = languageService.currentCulture;
    const switchLanguage = async (language: LanguageInfo) => {
      languageService.switchLanguage(language);
      await abpConfigurationService.loadConfiguration();
    };

    return { allLanguages, currentLanguage, switchLanguage };
  }
});
</script>
