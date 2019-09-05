// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import ElementUI from 'element-ui';
import DataTableColumn from '../src';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(DataTableColumn);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
