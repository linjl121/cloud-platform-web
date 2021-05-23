// 获取主题名称
const theme = 'theme-type';
export const getLocalTheme = () => window.localStorage.getItem(theme) || 'dark-night';
export const setLocalTheme = (content) => window.localStorage.setItem(theme, content);
// 获取国际化语言
const lang = 'lang';
export const getLocalLang = () => window.localStorage.getItem(lang) || 'zh';
export const setLocalLang = (content) => window.localStorage.setItem(lang, content);

// 是否显示面包屑
const isShowBreadcrumb = 'isShowBreadcrumb';
export const getIsShowBreadcrumb = () => window.localStorage.getItem(isShowBreadcrumb) || 'true';
export const setIsShowBreadcrumb = (content) => window.localStorage.setItem(isShowBreadcrumb, content);
// 是否显示标签页
const isShowTagsView = 'isShowTagsView';
export const getIsShowTagsView = () => window.localStorage.getItem(isShowTagsView) || 'true';
export const setIsShowTagsView = (content) => window.localStorage.setItem(isShowTagsView, content);

// 进入系统菜单是否展开
const isShowMenu = 'isShowMenu';
export const getIsShowMenu = () => window.localStorage.getItem(isShowMenu) || 'true';
export const setIsShowMenu = (content) => window.localStorage.setItem(isShowMenu, content);

// 设置token信息
export const setToken = (token) => window.sessionStorage.setItem('token', token);
export const getToken = () => window.sessionStorage.getItem('token') || '';
export const removeToken = () => window.sessionStorage.removeItem('token');
