<template>
  <div class="layout-container full-screen">
    <div class="layout-container__header">
      <div class="layout-container__header--title">
        <img src="@/assets/images/logo.png" />
      </div>
      <div class="navbar-menu"></div>
      <navbar class="layout-container__header--navbar" />
    </div>
    <div class="layout-container__body body-bg">
      <el-scrollbar
        wrap-class="layout-container__body__aside left-menu__container left-menu"
        :class="isCollapse ? 'layout-container__body__aside--none' : 'layout-container__body__aside--show'"
      >
        <pub-menu></pub-menu>
      </el-scrollbar>
      <div class="layout-container__body__main">
        <svg-icon
          v-show="!isCollapse"
          name="menu-in"
          class="menu-fill menu-img"
          style="width: 0.75rem; height: 5.5rem"
          @click="changeCollapse"
        />

        <svg-icon
          v-show="isCollapse"
          name="menu-out"
          class="menu-fill menu-img"
          style="width: 0.75rem; height: 5.5rem"
          @click="changeCollapse"
        />

        <!-- <pub-breadcrumb v-show="isShowBreadcrumb" /> -->
        <tags-view v-show="isShowTagsView" />

        <div class="layout-container__body__main__center">
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <!-- 发布模式添加key,防止新增编辑重复，开发模式去掉key，用于热更新 -->
              <!-- <router-view :key="key" /> -->
              <router-view v-if="isProMode" :key="routePath" />
              <router-view v-else />
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getIsShowMenu } from '@/utils/storage';

  import PubMenu from './menu/menu.vue';
  import Navbar from './header/navbar.vue';
  import TagsView from './tags-view/index.vue';
  export default {
    name: 'layout',
    components: {
      PubMenu,
      Navbar,
      TagsView
    },
    data() {
      return {
        isProMode: process.env.NODE_ENV === 'production', //是否是发布模式
        isCollapse: getIsShowMenu() !== 'true'
      };
    },
    computed: {
      routePath() {
        return this.$route.path;
      },
      isShowBreadcrumb() {
        return this.$store.getters.isShowBreadcrumb;
      },
      isShowTagsView() {
        return this.$store.getters.isShowTagsView;
      }
    },
    methods: {
      resize() {
        this.$EventBus.$emit('visible.window.resize'); //可视区域大小变换
      },
      changeCollapse() {
        this.isCollapse = !this.isCollapse;
        this.resize();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .layout-container {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    &__header {
      height: 60px;
      width: 100%;
      display: flex;
      flex-direction: row;
      background-color: black;
      &--title {
        width: 12rem;
        display: flex;
        align-items: center;
        padding-left: 1rem;
        user-select: none;
        img {
          height: 80%;
          width: auto;
        }
      }
      .navbar-menu {
        flex: 1;
        width: 0;
        overflow: hidden;
      }
      &--navbar {
        width: 22rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }
    }
    &__body {
      flex-grow: 1;
      height: 0;
      min-height: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      &__aside {
        max-height: 100%;
      }
      &__aside--show {
        // width: 12.5rem;
        overflow: hidden !important;
        flex: 0 0 12.5rem;
        ::-webkit-scrollbar {
          display: none;
        }
      }
      &__aside--none {
        // width: auto;
        flex: 0 0 0;
      }

      &__main {
        flex-grow: 1;
        width: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        &__center {
          flex-grow: 1;
          height: 0;
          min-height: 0;
        }
        &_footer {
          font-size: 12px;
          height: 30px;
          line-height: 30px;
        }
      }
      .el-menu {
        border-right: 0;
      }
    }

    .menu-img {
      position: absolute;
      top: 40%;
      cursor: pointer;
      z-index: 999;
    }
  }
</style>
