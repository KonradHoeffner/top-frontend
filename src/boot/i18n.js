import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { LocalStorage } from 'quasar';
import messages from 'src/i18n';

const datetimeFormats = {
  en: {
    short: {
      year: 'numeric', month: 'numeric', day: 'numeric'
    },
    shortWithTime: {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    }
  },
  de: {
    short: {
      year: 'numeric', month: 'numeric', day: 'numeric'
    },
    shortWithTime: {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    },
    long: {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric'
    }
  }
};

const language = LocalStorage.getItem('language') || navigator.language.split('-')[0];

const i18n = createI18n({
  legacy: false,
  locale: language,
  messages,
  datetimeFormats
});

export default boot(({ app }) => {
  app.use(i18n)
});

export { i18n };
