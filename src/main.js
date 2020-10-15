import Vue from 'vue';
import store from './store';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueClipboard from 'vue-clipboard2';
import routes from './Router';
import App from './App';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import GL_Component from './utils/globalComponents';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(VueClipboard);
Vue.use(ElementUI);
Vue.use(GL_Component);

import './utils/formatTime.js';

const app = Vue.extend(App);
const router = new VueRouter({
  // mode:'history',
  // https://router.vuejs.org/zh-cn/essentials/history-mode.html
  // 配置 history 需要去 配置后端环境 ，让用户去访问一个地址，映射到我这个地址

  // server {
  //         listen       80;
  //         server_name  www.m-example.com;
  //         root   "E:/UED/eagle/branch/eagle201510/m-example";
  //         location / {
  //             try_files $uri $uri/ /index.html =404;
  //         }
  // }
  base: __dirname,
  routes: routes
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(app)
}).$mount('#app');