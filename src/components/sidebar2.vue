<template>
  <div id="sidebar_box">
    <div class="shrink_menu">
      <i class="iconfont icon-category icon_color my_hover" @click="resizeMenu"></i>
    </div>
    <el-row class="tac" v-if="!$store.state.showChinaOrEnglish">
      <el-col>
        <el-menu
          :default-active="$route.path"
          :unique-opened=state
          class="el-menu-vertical-demo"
          background-color="#202D3D"
          @select="handleSelect"
          router
          text-color="#fff"
          active-text-color="#FA8819"
          :collapse="isCollapse"
        >

          <template v-for="item in this.menuVar">
            <el-submenu :index=String(item.ID)>
              <template slot="title">
                <i class="iconfont icon-Dollar font18 icon_color"></i>
                <span>{{item.Name}}</span>
              </template>
              <template v-for="item1 in item.children">
                <el-menu-item :index=item1.Link>{{item1.Name}}</el-menu-item>
              </template>
            </el-submenu>
          </template>

        </el-menu>
      </el-col>
    </el-row>


    <el-row class="tac" v-if="$store.state.showChinaOrEnglish">
      <el-col>
        <el-menu
          :default-active="$route.path"
          :unique-opened=state
          class="el-menu-vertical-demo"
          background-color="#202D3D"
          @select="handleSelect"
          router
          text-color="#fff"
          active-text-color="#FA8819"
          :collapse="isCollapse"
        >

          <template v-for="item in this.menuVar">
            <el-submenu :index=String(item.ID)>
              <template slot="title">
                <i class="iconfont icon-Dollar font18 icon_color"></i>
                <span>{{item.NameEn}}</span>
              </template>
              <template v-for="item1 in item.children">
                <el-menu-item :index=item1.Link>{{item1.NameEn}}</el-menu-item>
              </template>
            </el-submenu>
          </template>

        </el-menu>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "sidebar2",
    data() {
      return {
        state:true,
        isCollapse: false,//是否收起侧边栏导航

      }
    },
    props:['menuVar'],
    methods: {
      //收缩侧边栏导航
      resizeMenu(){
        // var sidebarDom = document.getElementById('sidebar_outbox1')
        console.log('改变侧边栏尺寸事件')
        if(this.isCollapse){
          this.isCollapse = !this.isCollapse
        }else {
          this.isCollapse = !this.isCollapse
        }
        this.$emit('resizeMenu',this.isCollapse)


      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(this);
        console.log(key, keyPath);
      }
    },
    mounted(){
    }
  }
</script>

<style scoped lang="scss">
  @import '../common_css/scss_style.scss';

  #sidebar_box{
    /*border:1px solid $blue;*/
    /*padding-top: 78px;*/
    overflow-y: scroll;
    height: 842px;
    background-color: $menu_black;

  }
  .shrink_menu{
    /*border:1px solid red;*/
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon_color {
    color: $white;
  }
  .icon-category{
    font-size: $font24;
  }
</style>
