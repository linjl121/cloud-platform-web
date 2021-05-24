import { setIsShowBreadcrumb, setIsShowMenu, setIsShowTagsView, setLocalLang } from '@/utils/storage';
export default {
  state: {
    // token
    token: localStorage.getItem('token') || '',
    lang: 'zh', // 国际化 语言：zh-中文；en：英文
    isShowBreadcrumb: true, // 是否显示面包屑
    isShowTagsView: true, // 是否显示标签页
    isShowMenu: true, // 进入系统菜单是否展开
    userData: {
      name: 'test',
      account: 'test'
    }
  },
  getters: {
    userData: (state) => state.userData,
    lang: (state) => state.lang,
    isShowBreadcrumb: (state) => state.isShowBreadcrumb,
    isShowTagsView: (state) => state.isShowTagsView,
    isShowMenu: (state) => state.isShowMenu
  },
  mutations: {
    setLang(state, newVal) {
      state.lang = newVal;
      setLocalLang(newVal);
    },
    setUserData(state, newVal) {
      state.userData = newVal;
      setLocalLang(newVal);
    },
    setIsShowBreadcrumb(state, newVal) {
      state.isShowBreadcrumb = newVal;
      setIsShowBreadcrumb(newVal);
    },
    setIsShowMenu(state, newVal) {
      state.isShowTagsView = newVal;
      setIsShowMenu(newVal);
    },
    setIsShowTagsView(state, newVal) {
      state.isShowMenu = newVal;
      setIsShowTagsView(newVal);
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
