import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/layout/index.vue';

const routeFiles = require.context('./modules', true, /\.js$/);

const routes = routeFiles.keys().reduce((modules, modulePath) => {
  let value = routeFiles(modulePath);
  return value.default ? modules.concat(value.default) : modules;
}, []);
Vue.use(VueRouter);

const asyncRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/redirect/:path*', // 刷新路由
    component: () => import(/* webpackChunkName: "login" */ '@/views/redirect/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: routes
  }
];

const router = new VueRouter({
  routes: asyncRoutes
});

export default router;
