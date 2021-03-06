import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import DriverTable from './components/tables/DriverTable.vue';
import ConstructorTable from './components/tables/ConstructorTable.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/driverStandings' },
    {
      path: '/driverStandings',
      component: DriverTable
    },
    { path: '/constructorStandings', component: ConstructorTable },
    { path: '/:pathMatch(.*)', redirect: '/driverStandings' }
  ],
  linkActiveClass: 'active'
});

createApp(App)
  .component('base-card', BaseCard)
  .component('base-button', BaseButton)
  .component('pulse-loader', PulseLoader)
  .use(router)
  .mount('#app');
