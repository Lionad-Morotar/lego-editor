import Vue from 'vue';
import App from './App.vue';
import '../../registerServiceWorker';
import router from '../../router/edit';
import store from '../../store/edit';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
