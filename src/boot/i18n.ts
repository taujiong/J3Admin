import { boot } from 'quasar/wrappers';

import messages from 'src/i18n';
import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: 'zh-Hans',
  fallbackLocale: 'en',
  messages
});

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});

export { i18n };
