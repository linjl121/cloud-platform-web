<script lang="jsx">
  import menuData from './menu-data';
  export default {
    data() {
      return {
        menuTreeList: [menuData]
      };
    },
    computed: {
      defaultActive() {
        return this.$route.path;
      }
    },
    methods: {
      hasChildMenu(menu) {
        return (
          menu &&
          menu.length &&
          menu.findIndex((e) => {
            return e && e.type === '1' && e.isShow === '1';
          }) > -1
        );
      },
      trunTo(href) {
        href && this.$router.push(href || '');
      },

      renderMenu(h, menuList) {
        console.log('menuList----', menuList);
        return menuList?.length
          ? menuList.map((item) => {
              let href = item.href;
              return this.hasChildMenu(item.childrenMenu) ? (
                <el-submenu key={item.id} index={item.id || item.href}>
                  <span slot="title">
                    <i class={'iconfont ' + item.icon}></i>
                    <span>{item.name}</span>
                  </span>
                  {this.renderMenu(h, item.childrenMenu)}
                </el-submenu>
              ) : item.type === '1' && item.isShow === '1' ? (
                <el-menu-item
                  key={item.id}
                  index={href || item.id}
                  route={href || ''}
                  on-click={() => this.trunTo(href)}
                >
                  <template slot="title">
                    <i class={'iconfont ' + item.icon}></i>
                    <span>{item.name}</span>
                  </template>
                </el-menu-item>
              ) : null;
            })
          : null;
      }
    },

    render(h) {
      return (
        <el-menu class="menu-container" unique-opened={true} default-active={this.defaultActive}>
          {this.renderMenu(h, this.menuTreeList)}
        </el-menu>
      );
    }
  };
</script>
