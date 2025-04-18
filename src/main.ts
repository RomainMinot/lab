import App from '~/App.vue';
import router from '~/router/index';
import '@unocss/reset/tailwind-compat.css';
import 'virtual:uno.css';

const pinia = createPinia();
const app = createApp(App);

app
  .use(router)
  .use(pinia)
  .mount('#app');
