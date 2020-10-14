/**
 * 全局组件
 */
import Loading from '../components/loading/index.vue';

function plugins(Vue) {
  Vue.component('Loading', Loading);
}
export default plugins;