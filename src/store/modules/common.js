import { setLocalLang } from '@/utils/storage';
export default {
  state: {
    // token
    token: localStorage.getItem('token') || '',
    lang: 'zh'
  },
  mutations: {
    // 初始化用户数据
    setLang(state, newVal) {
      state.lang = newVal;
      setLocalLang(newVal);
    },
    // 初始化用户数据
    initUserData(state, newVal) {
      state.token = newVal;
      localStorage.setItem('token', newVal);
    },
    //退出登录，销毁Token
    clearUserData(state, newVal) {
      state.token = '';
      localStorage.setItem('token', newVal);
    }
  },
  actions: {
    // 提交用户数据
    commitInitUserData(context, token) {
      token && context.commit('initUserData', token);
    },
    //用户退出登录
    clearInitUserData(context) {
      context.commit('clearUserData', '');
    }
  }
};
