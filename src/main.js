import '@/assets/fonts/iconfont.css';
import '@/assets/icons/components'; // svg 图标
import '@/assets/styles/theme/dark-night/index.scss'; // 暗夜模式样式
import { EventBus } from '@/utils/event-bus';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import SvgIcon from 'vue-svgicon';
import App from './app.vue';
import i18n from './lang'; //国际化 internationalization
import router from './router';
import store from './store';

Vue.prototype.$EventBus = EventBus; // 事件总线
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(SvgIcon, { tagName: 'svg-icon', defaultWidth: '1rem', defaultHeight: '1rem' });

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
