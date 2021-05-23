import Vue from 'vue';
import VueI18n from 'vue-i18n';
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'; // element-ui lang
import enLocale from './en/index';
import zhLocale from './zh/index';
import { getLocalLang } from '@/utils/storage';
import store from '@/store';

Vue.use(VueI18n);

const messages = {
  zh: {
    ...elementZhLocale,
    ...zhLocale
  },
  en: {
    ...elementEnLocale,
    ...enLocale
  }
};

console.log('messages-------', messages);
// 初始化获取语言
export function getLanguage() {
  let lang = getLocalLang() || 'zh';
  store.commit('setLang', lang);
  return lang;
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage(),
  // set locale messages
  messages
});

export default i18n;
