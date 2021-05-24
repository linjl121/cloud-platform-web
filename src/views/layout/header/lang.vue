<!--L.Dragon-->
<template>
  <el-dropdown trigger="click" @command="langClick">
    <div>
      <el-tooltip class="item" :content="$t('navbar.lang')" placement="top" :open-delay="1000">
        <i class="iconfont icon-zhongyingwen padding icon-color"></i>
      </el-tooltip>
    </div>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh">
        <i class="iconfont icon-chinese"></i>
        中文
      </el-dropdown-item>
      <el-dropdown-item command="en">
        <i class="iconfont icon-english"></i>
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  import { setLocalLang } from '@/utils/storage';
  export default {
    methods: {
      langClick(command) {
        setLocalLang(command);
        this.$i18n.locale = command;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .padding {
    padding: 0.5rem 0.8rem;
  }
</style>
