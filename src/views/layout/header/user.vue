<!--L.Dragon-->
<template>
  <div>
    <el-popover v-model="userVisible" placement="top-end" :width="280">
      <div class="user-content">
        <div class="user-info">
          <div class="user-info--avatar">
            <svg-icon name="user-header" class="user-fill" style="width: 3rem; height: 3rem" />
            <!-- nickname -->
            <span class="text--normal">
              {{ user.name ? user.name : user.account }}
            </span>
          </div>
        </div>
        <div class="user-content-item" @click="turnToSetting">
          <i class="iconfont icon-user-config"></i>
          {{ $t('navbar.personelSetting') }}
        </div>
        <div class="user-content-item" @click="turnToSystemSetting">
          <i class="iconfont icon-systemManage"></i>
          {{ $t('navbar.systemSetting') }}
        </div>
        <div class="user-content-item" @click="showPassWord">
          <i class="iconfont icon-lock"></i>
          {{ $t('navbar.changePassword') }}
          <el-tooltip
            v-if="user.passwordExpireMsg"
            class="item"
            content="您的密码即将过期，请重置密码"
            placement="top"
            :open-delay="500"
          >
            <i class="iconfont el-icon-warning-outline place"></i>
          </el-tooltip>
        </div>
        <div class="user-content-item" @click="logout">
          <i class="iconfont icon-exit"></i>
          {{ $t('navbar.logout') }}
        </div>
      </div>

      <div slot="reference" class="navbar-user padding">
        <el-tooltip class="item" :content="$t('navbar.user')" placement="top" :open-delay="1000">
          <span>
            <el-badge v-if="user.passwordExpireMsg" is-dot class="badgeItem">
              <i class="iconfont icon-user"></i>
            </el-badge>
            <i v-else class="iconfont icon-user"></i>
            <span class="user-name">
              {{ user.name ? user.name : user.account }}
            </span>
          </span>
        </el-tooltip>
      </div>
    </el-popover>
    <!-- <reset-password-form
      :visible="isShowResetPwd"
      :loading="passwordLoading"
      :show-old-password="true"
      :account-info="accountInfo"
      :password-length="passwordLength"
      @cancel="cancelChangePassWord"
      @changePassWord="changePassWord"
    ></reset-password-form> -->
    <el-dialog title="界面设置" :visible.sync="systemDialogVisible" width="25%">
      <el-row>
        <el-col :span="10" class="sys-lable">面包屑</el-col>
        <el-col :span="14" class="sys-value">
          <el-switch v-model="isShowBreadcrumb" :width="40" active-text="开启" inactive-text="不开启"></el-switch>
        </el-col>
        <el-col :span="10" class="sys-lable">标签页</el-col>
        <el-col :span="14" class="sys-value">
          <el-switch v-model="isShowTagsView" :width="40" active-text="开启" inactive-text="不开启"></el-switch>
        </el-col>
        <el-col :span="10" class="sys-lable">默认左侧菜单</el-col>
        <el-col :span="14" class="sys-value">
          <el-switch v-model="isShowMenu" :width="40" active-text="开启" inactive-text="不开启"></el-switch>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="systemDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  // import { updatePassword } from '@/api/common/login';
  // import ResetPasswordForm from '@/views/login/modules/reset-password-form.vue';
  // import { TagsViewStore } from '@/store/modules/public/tags-view';

  export default {
    name: 'header-user',
    // components: { ResetPasswordForm },
    data() {
      return {
        userVisible: false,
        systemDialogVisible: false,
        isShowResetPwd: false,
        passwordLoading: false,
        accountInfo: {}
      };
    },
    computed: {
      user() {
        return this.$store.getters.userData;
      },
      isShowTagsView: {
        get() {
          return this.$store.getters.isShowTagsView;
        },
        set(bool) {
          // if (bool) {
          //   TagsViewStore.addView(this.$route);
          // } else {
          //   TagsViewStore.delAllViews();
          // }
          this.$store.commit('setIsShowTagsView', bool);
        }
      },
      isShowBreadcrumb: {
        get() {
          return this.$store.getters.isShowBreadcrumb;
        },
        set(bool) {
          this.$store.commit('setIsShowBreadcrumb', bool);
        }
      },
      isShowMenu: {
        get() {
          return this.$store.getters.isShowMenu;
        },
        set(bool) {
          this.$store.commit('setIsShowMenu', bool);
        }
      }
    },
    methods: {
      turnToSetting() {
        this.userVisible = false;
        this.$router.push({ path: '/settings' });
      },
      showPassWord() {
        this.userVisible = false;
        this.accountInfo = { account: this.user.account };
        this.isShowResetPwd = true;
      },
      turnToSystemSetting() {
        this.systemDialogVisible = true;
      },

      cancelChangePassWord() {
        this.isShowResetPwd = false;
      },
      // changePassWord(data) {
      //   this.passwordLoading = true;

      //   const temp = {
      //     username: this.accountInfo.account,
      //     password: data.password,
      //     newPassword: data.newPassword,
      //     checkPassword: data.confirmPassword
      //   };
      //   updatePassword(temp)
      //     .then(() => {
      //       this.passwordLoading = false;
      //       this.isShowResetPwd = false;
      //       this.$message.success('密码修改成功！');
      //     })
      //     .catch(() => {
      //       this.passwordLoading = false;
      //     });
      // },
      logout() {
        this.userVisible = false;
        this.$EventBus.$emit('login.login-out', 'login');
      }
    }
  };
</script>
<style lang="scss" scoped>
  .twinkle {
    color: #606266;
    animation: twinkleAction 1s forwards infinite linear;
  }
  .place {
    position: absolute;
    right: 0;
    top: 0.5rem;
  }
  .sys-lable {
    text-align: right;
    padding-right: 1rem;
    margin: 1rem 0;
  }
  .sys-value {
    text-align: left;
    margin: 1rem 0;
  }
  .user-content {
    padding: 0.5rem;
    &-item {
      height: 2rem;
      line-height: 2rem;
      cursor: pointer;
      position: relative;
    }

    .user-info {
      &--avatar {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
      }
      &--role {
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        margin-bottom: 1rem;
        .circle {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2rem;
          height: 2rem;
          border-radius: 2rem;
          border: 1px solid white;
          margin: 0.5rem 1rem;
        }
      }
      &--time {
        // border: 1px solid gray;
        // background: hotpink;
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
        .time-gap {
          margin-top: 0.5rem;
        }
      }
    }
  }
  .navbar-user {
    display: flex;
    align-items: center;
    cursor: pointer;
    .user-name {
      display: inline-grid;
      padding-left: 0.5rem;
      max-width: 5rem;
      //text-overflow: ellipsis;
      // font-size: 14px;
      font-size: 0.875rem;
      overflow: hidden;
      white-space: nowrap;
    }
    .el-tooltip {
      display: flex;
    }
  }
  .padding {
    padding: 0.5rem 0.8rem;
  }
  .badgeItem {
    .is-dot {
      margin-top: 10px;
      margin-left: -3px;
    }
  }
</style>
