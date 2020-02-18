<template>
  <div id="sidebar_box">
    <div class="shrink_menu">
      <i class="iconfont icon-category icon_color my_hover" @click="resizeMenu"></i>
    </div>
    <el-row class="tac">
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

          <!--<template v-for="item in this.menuVar">-->
            <!--<el-submenu :index=item.num>-->
              <!--<template slot="title">-->
                <!--<i class="iconfont icon-Dollar font18 icon_color"></i>-->
                <!--<span>{{item.title}}</span>-->
              <!--</template>-->
              <!--<template v-for="item1 in item.childInfo">-->
                <!--<el-menu-item :index=item1.url>{{item1.titleChild}}</el-menu-item>-->
              <!--</template>-->
            <!--</el-submenu>-->
          <!--</template>-->

            <!--此页面就只有两种选择，要么上面注释的代码为授权以前的，否则就是下面的加入授权控制后的更改-->

          <template v-for="item in this.menuVar">
            <el-submenu :index=String(item.id)>
              <template slot="title">
                <i class="iconfont icon-Dollar font18 icon_color"></i>
                <span>{{item.name}}</span>
              </template>
              <template v-for="item1 in item.children">
                <el-menu-item :index=item1.url>{{item1.name}}</el-menu-item>
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
    name: "sidebar",
    data() {
      return {
        state:true,
        isCollapse: false,//是否收起侧边栏导航

        // menuInfo:[
        //
        //   {
        //     num:'1',
        //     title:'首页',
        //     childInfo:[
        //       {
        //         titleChild:'地图首页',
        //         url:'/baidumap'
        //       }
        //     ]
        //   },
        //   {
        //     num:'2',
        //     title:'景区服务商',
        //     childInfo:[
        //       {
        //         titleChild:'景区服务商',
        //         url:'/scenicservice'
        //       }
        //     ]
        //   },
        //   {
        //     num:'3',
        //     title:'设备管理',
        //     childInfo:[
        //       {
        //         titleChild:'设备信息',
        //         url:'/helloworld'
        //       },
        //     ]
        //   },
        //   {
        //     num:'4',
        //     title:'发射源管理',
        //     childInfo:[
        //       {
        //         titleChild:'发射源统计',
        //         url:'/rightcontent'
        //       },
        //       {
        //         titleChild:'机器码统计',
        //         url:'/helloworld'
        //       },
        //       {
        //         titleChild:'发射源访问日志',
        //         url:'/rightcontents'
        //       },
        //       {
        //         titleChild:'发射源',
        //         url:'/helloworlds'
        //       },
        //       {
        //         titleChild:'位置版',
        //         url:'/rightcontent'
        //       },
        //
        //
        //     ]
        //   },
        //   {
        //     num:'5',
        //     title:'数据统计',
        //     childInfo:[
        //       {
        //         titleChild:'设备租赁次数统计',
        //         url:'/helloworld'
        //       },
        //       {
        //         titleChild:'sos统计',
        //         url:'/rightcontents'
        //       },
        //       {
        //         titleChild:'人流统计',
        //         url:'/helloworlds'
        //       },
        //       {
        //         titleChild:'电子围栏统计',
        //         url:'/rightcontent'
        //       },
        //     ]
        //   },
        //   {
        //     num:'6',
        //     title:'设备升级',
        //     childInfo:[
        //       {
        //         titleChild:'升级情况',
        //         url:'/helloworld'
        //       },
        //       {
        //         titleChild:'升级日志',
        //         url:'/rightcontents'
        //       }
        //     ]
        //   },
        //   {
        //     num:'7',
        //     title:'账号分配',
        //     childInfo:[
        //       {
        //         titleChild:'账号管理',
        //         url:'/helloworld'
        //       },
        //       {
        //         titleChild:'角色分配',
        //         url:'/rightcontents'
        //       }
        //     ]
        //   },
        // ]
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
