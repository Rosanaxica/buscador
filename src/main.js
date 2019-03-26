import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import {routes} from './routes';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faAt, faEllipsisV, faEnvelope, faUser, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(faAt)
library.add(faEnvelope)
library.add(faUser)
library.add(faExternalLinkAlt)


Vue.use(require('vue-moment'));
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({routes});


new Vue({
  el: '#app',
  router,
  render: h => h(App)
 
  
})
