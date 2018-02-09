import 'babel-polyfill';
import Vue from 'vue';
import VeeValidate from 'vee-validate';
import store from './store';
import App from './components/App.vue';

// Vue.config.errorHandler = (e,component,event_name) => {
//   console.log(e, component, event_name)
// };

Vue.use(VeeValidate)

var MhwDmgListApp = new Vue({
  store, // inject store to all children
  el: '#vueApp',
  render: h => {
    return h( (App) )
  }
});

