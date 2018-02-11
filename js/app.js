import 'babel-polyfill';
import Vue from 'vue';
import { mapMutations } from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

import store from './store';
import App from './components/App.vue';

// Vue.config.errorHandler = (e,component,event_name) => {
//   console.log(e, component, event_name)
// };

Vue.use(VueMaterial)

var MhwDmgListApp = new Vue({
  store, // inject store to all children
  el: '#vueApp',
  methods: {
    setWindowWidth(e) {
      this.$store.commit('changeWindowWidth',window.innerWidth);
    },
    ...mapMutations([
      'changeWindowWidth',
    ]),
  },
  created: function() {
    // インスタンスを作成した後、イベントリスナに登録
    console.log('created')
    window.addEventListener('resize', this.setWindowWidth, false);
  },
  beforeDestroy: function () {
    // インスタンスを破棄する前に、イベントリスナから削除
    window.removeEventListener('resize', this.setWindowWidth, false);
  },
  render: h => {
    return h( (App) )
  },
});

