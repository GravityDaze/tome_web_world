<template>
  <div id="layout">
    <el-container>
      <el-header>
        <!--轮播-->
        <carousel @giveInfo="giveInfo"></carousel>
      </el-header>
      <el-container>
        <el-aside :id="'sidebar_outbox'+resizeNum">
          <!--侧边导航栏-->
          <sidebar
            :menuVar="menuVar"
            @resizeMenu="resizeMenu"
          ></sidebar>
        </el-aside>
        <el-main id="el_main_box">
          <div class="white_bg">
            <router-view class="right_box" ref="choosemap" @changeSceneryChangeSelectId="changeSceneryChangeSelectId"></router-view>
            <div class="left_and_right_div" v-if="$store.state.isShowHomeCountParam">
              <div class="left_div">
                <el-select v-model="homeShowScenery" placeholder="请选择展示景区" @change="changeHomeScenery">
                  <el-option
                    v-for="item in homeChooseSceneryArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="right_div">
                <div class="div1">
                  <span>在线:</span><span>{{$store.state.onLineCountParam}}</span>
                </div>
                <div class="div2">
                  <span>离线:</span><span>{{$store.state.offLineCountParam}}</span>
                </div>
                <div class="div3">
                  <span>报警:</span><span>{{$store.state.sosCountParam}}</span>
                </div>
              </div>
            </div>

            <div :class="'loading_bg'+resizeNum" v-if="$store.state.showLoading">
              <!--<h1 style="opacity: 0">加载特效页面</h1>-->
              <img src="../../static/load7.gif" alt="" style="width:4.5rem;height: 4.5rem;">
            </div>
          </div>

        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  export default {
    //整体布局
    name: "layout",
    data() {
      return {
        apiHomeDropDown:'/mis/scenery/queryIndexDropDown',//首页下拉框内容获取信息
        memberNum: 1,//代表管理员相关身份，1代表超级管理，2代表片区管理，3代表景区管理
        homeShowScenery:'',
        homeChooseSceneryArr: [
          {
            id: 1,
            lonLat: "39.1236542,103.3265",
            name: "圆明园",
            no: "S00001"
          },
        ],
        //以下注释的菜单数据数组为授权控制以前的代码
        // menuVar: [
        //
        //   {
        //     num: '1',
        //     title: '首页',
        //     childInfo: [
        //       {
        //         titleChild: '地图展示（全国）',
        //         url: '/baidumap'
        //       },
        //       // {
        //       //   titleChild: '地图展示（景区）',
        //       //   url: '/baidumap'
        //       // },
        //     ]
        //   },
        //   {
        //     num: '2',
        //     title: '景区管理',
        //     childInfo: [
        //       {
        //         titleChild: '景区管理',
        //         url: '/scenerymanage'
        //       },
        //       {
        //         titleChild: '景区图层管理',
        //         url: '/scenerycoveragemanage'
        //       },
        //       {
        //         titleChild: '景点管理',
        //         url: '/sceneryspotmanage'
        //       },
        //       {
        //         titleChild: '服务设施管理',
        //         url: '/servicefacilitymanage'
        //       },
        //       {
        //         titleChild: '围栏管理',
        //         url: '/railmanage'
        //       },
        //       {
        //         titleChild: '资源包管理',
        //         url: '/resourcebundlemanage'
        //       },
        //     ]
        //   },
        //   {
        //     num: '3',
        //     title: '终端维护',
        //     childInfo: [
        //       {
        //         titleChild: '终端设备',
        //         url: '/terminalfacility'
        //       },
        //       {
        //         titleChild: '发射源',
        //         url: '/terminalrfid'
        //       },
        //     ]
        //   },
        //   {
        //     num: '4',
        //     title: '信息管理',
        //     childInfo: [
        //       {
        //         titleChild: '信息管理',
        //         url: '/messagemanage'
        //       }
        //     ]
        //   },
        //   {
        //     num: '5',
        //     title: '业务管理',
        //     childInfo: [
        //       {
        //         titleChild: '用户管理',
        //         url: '/usermanage'
        //       },
        //       {
        //         titleChild: '导游管理',
        //         url: '/guidemanage'
        //       },
        //       {
        //         titleChild: '旅游团管理',
        //         url: '/tourgroupmanage'
        //       },
        //       {
        //         titleChild: '救援管理',
        //         url: '/sosmanage'
        //       },
        //       {
        //         titleChild: '媒体文件管理',
        //         url: '/mediafilemanage'
        //       },
        //     ]
        //   },
        //   {
        //     num: '6',
        //     title: '查询统计',
        //     childInfo: [
        //       {
        //         titleChild: '设备统计',
        //         url: '/facilitystatistics'
        //       },
        //       {
        //         titleChild: '发射源统计',
        //         url: '/rfidstatistics'
        //       },
        //       {
        //         titleChild: '发射源访问日志',
        //         url: '/rfidtriggerlog'
        //       },
        //       {
        //         titleChild: '设备租用统计',
        //         url: '/facilityrentstatistics'
        //       },
        //       {
        //         titleChild: 'SOS统计',
        //         url: '/sosstatistics'
        //       },
        //       {
        //         titleChild: '客流量统计',
        //         url: '/ridershipstatistics'
        //       },
        //     ]
        //   },
        //   {
        //     num: '7',
        //     title: '系统管理',
        //     childInfo: [
        //       {
        //         titleChild: '区域管理',
        //         url: '/districtmanage'
        //       },
        //       {
        //         titleChild: '组织机构',
        //         url: '/organizationmanage'
        //       },
        //       {
        //         titleChild: '景区服务商管理',
        //         url: '/sceneryserviceprovidermanage'
        //       },
        //       {
        //         titleChild: '旅行社管理',
        //         url: '/tourcompanymanage'
        //       },
        //       {
        //         titleChild: '操作员管理',
        //         url: '/operatormanage'
        //       },
        //       {
        //         titleChild: '角色管理',
        //         url: '/rolemanage'
        //       },
        //       {
        //         titleChild: '菜单管理',
        //         url: '/menumanage'
        //       },
        //       {
        //         titleChild: '系统参数',
        //         url: '/systemparammanage'
        //       },
        //       {
        //         titleChild: '字典管理',
        //         url: '/dictionarymanage'
        //       },
        //       {
        //         titleChild: '日志',
        //         url: '/systemlogmanage'
        //       },
        //     ]
        //   },
        // ],
        resizeNum: '1',
        //加入授权控制以后，数组数据变为默认空，然后去获取对应的全局菜单数据
        menuVar:[]
      }
    },
    methods: {
      changeSceneryChangeSelectId(n){
        // console.log('小儿子改变了大父亲',n)
        this.homeShowScenery = n

      },
      //此方法是触发router-view内部的相关方法，这里具体指选择首页下拉景区选择框以后切换地图景区
      changeHomeScenery(){
        // console.log('第一步发生改变',this.homeShowScenery)
        let obj = {}
        for(var i=0;i<this.homeChooseSceneryArr.length;i++){
          if(this.homeShowScenery == this.homeChooseSceneryArr[i].id){
            obj = this.homeChooseSceneryArr[i]
          }
        }
        // console.log('obj:',obj)
        this.$refs['choosemap'].chooseMap(obj)
      },
      giveInfo() {
        // console.log('子组件触发父组件事件了', this.$store.state.type)
        if (this.$store.state.type == 2) {
          this.$store.state.type = 1
          this.menuVar = [
            {
              num: '1',
              title: '首页',
              childInfo: [
                {
                  titleChild: '地图首页',
                  url: '/baidumap'
                }
              ]
            },
            {
              num: '2',
              title: '登录测试也',
              childInfo: [
                {
                  titleChild: '登录页',
                  url: '/test'
                }
              ]
            },
          ]
          this.$router.push('/layout')
        } else if (this.$store.state.type == 1) {
          this.$store.state.type = 2
          this.menuVar = [

            {
              num: '1',
              title: '首页',
              childInfo: [
                {
                  titleChild: '地图首页',
                  url: '/baidumap'
                }
              ]
            },
            {
              num: '2',
              title: '景区管理',
              childInfo: [
                {
                  titleChild: '景区管理',
                  url: '/scenicservice'
                },
                {
                  titleChild: '景区图层管理',
                  url: '/scenicservice'
                },
                {
                  titleChild: '景点管理',
                  url: '/scenicservice'
                },
                {
                  titleChild: '服务设施管理',
                  url: '/scenicservice'
                },
                {
                  titleChild: '围栏管理',
                  url: '/scenicservice'
                },
                {
                  titleChild: '资源包管理',
                  url: '/scenicservice'
                },
              ]
            },
            {
              num: '3',
              title: '终端维护',
              childInfo: [
                {
                  titleChild: '设备信息',
                  url: '/helloworld'
                },
              ]
            },
            {
              num: '4',
              title: '信息管理',
              childInfo: [
                {
                  titleChild: '发射源统计',
                  url: '/rightcontent'
                }
              ]
            },
            {
              num: '5',
              title: '业务管理',
              childInfo: [
                {
                  titleChild: '发射源统计',
                  url: '/rightcontent'
                }
              ]
            },
            {
              num: '6',
              title: '查询管理',
              childInfo: [
                {
                  titleChild: '发射源统计',
                  url: '/rightcontent'
                }
              ]
            },
            {
              num: '7',
              title: '系统管理',
              childInfo: [
                {
                  titleChild: '发射源统计',
                  url: '/rightcontent'
                }
              ]
            },
          ]
          this.$router.push('/layout')
        }
      },
      //改变侧边栏是否收起的事件
      resizeMenu(n) {
        // console.log('zhende o ')
        if (n) {
          this.resizeNum = 2
        } else {
          this.resizeNum = 1
        }
      },
      hiddenLoading() {
        // let that = this
        // setTimeout(function () {
        //   that.$store.state.showLoading = false
        // }, 500)
      },
      //初始化时，默认获取首页选择景区下拉框内容
      getHomeChooseSceneryInfo(){
        this.$axios(
          {
            method:'post',
            url:this.apiHomeDropDown,
            data:{}
          }
        ).then(res => {
          // console.log('首页下拉信息',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.homeChooseSceneryArr = [...res.data.value]
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      }
    },
    created(){
      var kkkk = this.$store.state.menuVarArr
      // console.log('kkkkkkkkkk:',kkkk)

      var sureType = typeof kkkk

      // console.log('sureType:',sureType,sureType==='string',)

     if(sureType === 'string'){
       this.menuVar = Object.assign({},this.menuVar,JSON.parse(kkkk))
     }else{
       this.menuVar = Object.assign({},this.menuVar,kkkk)
     }



      // console.log('this.menuVar',this.menuVar)
    },
    mounted() {
      // alert('子组件触发父组件事件了'+this.$store.state.type)

      // this.menuVar = [
      //
      //   {
      //     num: '1',
      //     title: '首页',
      //     childInfo: [
      //       {
      //         titleChild: '地图首页',
      //         url: '/baidumap'
      //       }
      //     ]
      //   },
      //   {
      //     num: '2',
      //     title: '景区管理',
      //     childInfo: [
      //       {
      //         titleChild: '景区管理',
      //         url: '/scenicservice'
      //       },
      //       {
      //         titleChild: '景区图层管理',
      //         url: '/scenicservice'
      //       },
      //       {
      //         titleChild: '景点管理',
      //         url: '/scenicservice'
      //       },
      //       {
      //         titleChild: '服务设施管理',
      //         url: '/scenicservice'
      //       },
      //       {
      //         titleChild: '围栏管理',
      //         url: '/scenicservice'
      //       },
      //       {
      //         titleChild: '资源包管理',
      //         url: '/scenicservice'
      //       },
      //     ]
      //   },
      //   {
      //     num: '3',
      //     title: '终端维护',
      //     childInfo: [
      //       {
      //         titleChild: '设备信息',
      //         url: '/helloworld'
      //       },
      //     ]
      //   },
      //   {
      //     num: '4',
      //     title: '信息管理',
      //     childInfo: [
      //       {
      //         titleChild: '发射源统计',
      //         url: '/rightcontent'
      //       }
      //     ]
      //   },
      //   {
      //     num: '5',
      //     title: '业务管理',
      //     childInfo: [
      //       {
      //         titleChild: '发射源统计',
      //         url: '/rightcontent'
      //       }
      //     ]
      //   },
      //   {
      //     num: '6',
      //     title: '查询管理',
      //     childInfo: [
      //       {
      //         titleChild: '发射源统计',
      //         url: '/rightcontent'
      //       }
      //     ]
      //   },
      //   {
      //     num: '7',
      //     title: '系统管理',
      //     childInfo: [
      //       {
      //         titleChild: '发射源统计',
      //         url: '/rightcontent'
      //       }
      //     ]
      //   },
      // ],

      // this.$store.state.showLoading = true
      // this.hiddenLoading()
      this.getHomeChooseSceneryInfo()

    },
  }
</script>

<style scoped lang="scss">
  @import "../common_css/scss_style";

  #layout {
    /*border:1px solid purple;*/
  }

  .right_box {
    /*border: 2px solid rgba(238, 238, 238, 1);*/
    /*border: 2px solid green;*/
    /*height: 802px;*/
    height: calc(802px - 0.5rem);
  }

  .loading_bg1, .loading_bg2 {
    /*border:1px solid red!important;*/
    background-color: white;
    height: 8.02rem;
    min-height: 802px;
    position: absolute;
    top: 116px;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading_bg1 {
    width: calc(19.00rem - 3.3rem);
    /*border:1px solid red;*/
    /*border:1px solid red;*/
  }

  .loading_bg2 {
    /*区别在于是否将侧边栏收起*/
    width: calc(19.00rem - 0.84rem);
    /*border:1px solid red;*/
    min-width: 1206px;
    /*border:1px solid red;*/
  }

  .white_bg {
    /*border:1px solid red;*/
    background-color: white;
    position: relative;
    padding: 0.25rem 0.25rem;
  }

  .left_and_right_div {
    /*border: 1px solid blue;*/
    background-color: lightblue;
    width:100%;
    height: 50px;
    position: absolute;
    top:0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .left_div {
    /*border:1px solid red;*/
    width: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .right_div {
    /*border:1px solid green;*/
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .right_div>div{
    /*border:1px solid blue;*/
    width:30%;
    font-size: 18px;
    color: $orange;
  }

</style>
