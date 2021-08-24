import { createApp } from 'vue';
import App from './App.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';

createApp(App)
  .component('base-card', BaseCard)
  .component('base-button', BaseButton)
  .mount('#app');
