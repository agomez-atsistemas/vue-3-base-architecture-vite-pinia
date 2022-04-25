import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupI18n } from './i18n';
import { createPinia } from 'pinia'
import es from './locales/es.json';
import en from './locales/en.json';

const i18n = setupI18n({
  globalInjection: true,
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es,
    en
  }
});
const router = setupRouter(i18n);

createApp(App).use(createPinia()).use(i18n).use(router).mount('#app');
