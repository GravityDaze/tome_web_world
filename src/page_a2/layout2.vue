<template>
  <div id="layout">
    <el-container>
      <el-header>
        <!--轮播-->
        <carousel2
          @goToSearchFacilityFn="goToSearchFacilityFn"
          @openAlertArea="openAlertArea"
        ></carousel2>
      </el-header>
      <el-container>
        <el-aside :id="'sidebar_outbox'+resizeNum">
          <!--侧边导航栏-->
          <sidebar2
            :menuVar="menuVar"
            @resizeMenu="resizeMenu"
          ></sidebar2>
        </el-aside>
        <el-main id="el_main_box">
          <div class="white_bg">
            <router-view class="right_box" ref="choosemap"
                         @changeSceneryChangeSelectId="changeSceneryChangeSelectId"></router-view>
            <!--<router-view></router-view>-->
            <div class="left_and_right_div" v-if="$store.state.isShowHomeCountParam" style="display: none">
              <div class="right_div">
                <div class="div1">
                  <span style="color: black">总设备数:</span><span>{{$store.state.facilityTotalA2}}</span>
                </div>
                <div class="div2">
                  <span style="color: black">在线设备数:</span><span>{{$store.state.onLineCountA2}}</span>
                </div>
                <div class="div3">
                  <span style="color: black">设备在线率:</span><span>{{$store.state.onlineCountPercentageA2}}%</span>
                </div>

                <div class="div4" style="display: flex;flex-wrap: nowrap">
                  <input v-model="searchContent" placeholder="请输入机器码查询"></input>
                  <button @click="searchCodeFunction">查询</button>
                </div>

                <div class="div5">
                  <div class="my_hover"
                       style="width:35%;border:1px solid black;border-radius: 5px;margin: 0 auto;background-color: orange"
                       @click="openAlertArea">
                    <span style="color: black">警报</span>
                  </div>

                </div>
              </div>
            </div>
            <div v-show="$store.state.isShowAlert"
                 style="width:3rem;height:8.35rem;min-height:802px;max-height:835px;position: absolute;top:0;right:0;background-color: #bedbf9;overflow-y: scroll">
              <div>
                <ul class="myUl">
                  <li class="my_hover" v-for="(item,index) in sosInfoArr" :key="index" @click="openSosDialog(item)">
                    <span>{{item.CodeMachine}}手机号码:</span><span>{{item.MemberPhone}}</span>
                    <br>
                    <span>{{item.Content}}</span>
                    <br>
                    <span style="color: blue">{{item.CreateTime}}</span>
                  </li>
                </ul>
              </div>


            </div>

            <el-dialog
              :title="dialogNum+'手机号码：'"
              :visible.sync="dialogVisible"
              width="30%"
              align="center">
              <span style="color: red">{{dialogTel}}</span>
              <br>
              <br>
              <br>
              <span>{{dialogContent}}</span>
              <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
            </el-dialog>


          </div>

        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  export default {
    //整体布局
    name: "layout2",
    data() {
      return {
        sosInfoArr: [
          {
            CodeMachine: "Q000864",
            Content: "呼救地址:四川省成都市都江堰市XN20(青城山路)-雨亭附近20米 (经过的景区:雨亭)",
            CreateTime: "2018-10-18 14:02:51",
            GuiderName: "明dd",
            GuiderPhone: "13548161234",
            ID: 231945,
            MemberName: "Q000864",
            MemberPhone: "20659353010",
            TouristTeamID: 81,
            TouristTeamName: "熊猫乐园一日游"
          },
        ],
        searchContent: '',//查询内容参数
        dialogVisible: false,
        dialogNum: 'Q110',
        dialogTel: '13345811137',
        dialogContent: '我是举例内容展示哦',
        // isShowAlert: false,//是否展示警报信息板块
        apiHomeDropDown: '/mis/scenery/queryIndexDropDown',//
        apiAlertInfo: '/a2guider/alarm/query',//警报信息查询
        memberNum: 1,//代表管理员相关身份，1代表超级管理，2代表片区管理，3代表景区管理
        homeShowScenery: '',
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
        menuVar: []
      }
    },
    methods: {
      goToSearchFacilityFn(n){
        console.log('儿子触发父亲事件是传递了什么参数过来',n)
        this.searchCodeFunction(n)
      },


      //查询机器码事件
      searchCodeFunction(n) {
        this.$refs['choosemap'].getAllFacilityInfos(n)
      },
      //展开警报信息列表区域
      openAlertArea() {
        if (this.$store.state.isShowAlert) {
          this.$store.state.isShowAlert = false
        } else if (!this.$store.state.isShowAlert) {
          this.$store.state.isShowAlert = true
        }

      },
      //获取警报信息列表数据
      getAlertInfoList() {
        this.$axios(
          {
            method: 'post',
            url: this.apiAlertInfo,
            data: {
              "Type": 0,
              "pageNum": 1,
              "pageSize": 500

            }
          }
        ).then(res => {
          console.log('警报信息是什么：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.sosInfoArr = [...res.data.value.list]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
      //点击具体sos信息是弹出信息模态框（放大查看信息的做用而已）
      openSosDialog(n) {
        // console.log('n:', n)
        this.dialogNum = n.CodeMachine
        this.dialogTel = n.MemberPhone
        this.dialogContent = n.Content
        this.dialogVisible = true
      },

      changeSceneryChangeSelectId(n) {
        // console.log('小儿子改变了大父亲',n)
        this.homeShowScenery = n

      },
      //此方法是触发router-view内部的相关方法，这里具体指选择首页下拉景区选择框以后切换地图景区
      changeHomeScenery() {
        // console.log('第一步发生改变',this.homeShowScenery)
        let obj = {}
        for (var i = 0; i < this.homeChooseSceneryArr.length; i++) {
          if (this.homeShowScenery == this.homeChooseSceneryArr[i].id) {
            obj = this.homeChooseSceneryArr[i]
          }
        }
        // console.log('obj:',obj)
        this.$refs['choosemap'].chooseMap(obj)
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
      //初始化时，默认获取首页选择景区下拉框内容
      getHomeChooseSceneryInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiHomeDropDown,
            data: {}
          }
        ).then(res => {
          // console.log('首页下拉信息',res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.homeChooseSceneryArr = [...res.data.value]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      }
    },
    created() {
      var kkkk = this.$store.state.menuVarArr
      console.log('kkkkkkkkkk:', kkkk)

      var sureType = typeof kkkk

      console.log('sureType:', sureType, sureType === 'string',)

      if (sureType === 'string') {
        this.menuVar = Object.assign({}, this.menuVar, JSON.parse(kkkk))
      } else {
        this.menuVar = Object.assign({}, this.menuVar, kkkk)
      }


      //以下注释不要删除，包含了所有页面路由及配置，可以查询对应路由信息
      // this.menuVar = [
      //
      //   {
      //     id: '1',
      //     name: '首页',
      //     children: [
      //       {
      //         name: '地图首页',
      //         url: '/baidumap2'
      //       }
      //     ]
      //   },
      //   {
      //     id: '2',
      //     name: '景区管理',
      //     children: [
      //       {
      //         name: '景区服务商列表',
      //         url: '/sceneryserviceproviderlist2'
      //       },
      //       {
      //         name: '景区范围列表',
      //         url: '/sceneryscopelist2'
      //       },
      //       {
      //         name:'景区团员列表',
      //         url:'/scenerygrouppersonlist2'
      //       }
      //     ]
      //   },
      //   {
      //     id: '3',
      //     name: '路线管理',
      //     children: [
      //       {
      //         name: '线路信息',
      //         url: '/roadlineinfo2'
      //       },
      //       {
      //         name: '景点信息',
      //         url: '/roadlinesceneryspotinfo2'
      //       },
      //       {
      //         name: '电子围栏',
      //         url: '/railinfo2'
      //       },
      //     ]
      //   },
      //   {
      //     id: '4',
      //     name: '设备管理',
      //     children: [
      //       {
      //         name: '设备信息',
      //         url: '/facilityinfo2'
      //       },
      //       {
      //         name: '成员信息',
      //         url: '/grouppersoninfo2'
      //       },
      //     ]
      //   },
      //   {
      //     id: '5',
      //     name: '运营管理',
      //     children: [
      //       {
      //         name: '行程信息',
      //         url: '/travelinfo2'
      //       },
      //       {
      //         name: 'RFID发射源统计',
      //         url: '/rfid2'
      //       },
      //       {
      //         name: '位置版发射源统计',
      //         url: '/siterfid2'
      //       },
      //       {
      //         name: '警报',
      //         url: '/alertinfo2'
      //       },
      //     ]
      //   },
      //   {
      //     id: '6',
      //     name: 'RFID管理',
      //     children: [
      //       {
      //         name: '发射源',
      //         url: '/rfid2'
      //       },
      //       {
      //         name: '机器码统计',
      //         url: '/machinecode2'
      //       },
      //       {
      //         name: '发射源访问日志',
      //         url: '/rfidlog2'
      //       },
      //       {
      //         name: '位置版发射源',
      //         url: '/siterfid2'
      //       },
      //     ]
      //   },
      //   {
      //     id: '7',
      //     name: '数据统计',
      //     children: [
      //       {
      //         name: '复位计次数据列表',
      //         url: '/resetamountlist2'
      //       },
      //       {
      //         name: '复位计次数据图表',
      //         url: '/resetamountchart2'
      //       },
      //     ]
      //   },
      //   {
      //     id: '8',
      //     name: '权限管理',
      //     children: [
      //       {
      //         name: '角色管理',
      //         url: '/rolemanage2'
      //       },
      //       {
      //         name: '人员管理',
      //         url: '/personmanage2'
      //       },
      //     ]
      //   },
      //   {
      //     id: '9',
      //     name: '片区管理',
      //     children: [
      //       {
      //         name: '片区列表',
      //         url: '/areamanagelist2'
      //       },
      //       {
      //         name: '片区景区列表',
      //         url: '/areascenerylist2'
      //       },
      //       {
      //         name: '片区团员列表',
      //         url: '/areagrouppersonlist2'
      //       },
      //       {
      //         name: '片区设备信息',
      //         url: '/areafacilityinfo2'
      //       },
      //       {
      //         name: '片区成员信息',
      //         url: '/areamemberinfo2'
      //       },
      //       {
      //         name: '片区复位次数列表',
      //         url: '/arearesetdatalist2'
      //       },
      //     ]
      //   },
      // ]


    },
    mounted() {
      // alert('子组件触发父组件事件了'+this.$store.state.type)
      // this.$store.state.showLoading = true
      // this.getHomeChooseSceneryInfo()

      this.getAlertInfoList()//获取警报信息

    },
  }
</script>

<style scoped lang="scss">
  @import "../common_css/scss_style";

  #layout {
    /*border: 1px solid purple;*/
  }

  #el_main_box {
    /*border: 1px solid red;*/
    padding: 0!important;
  }

  .right_box {
    /*border: 2px solid rgba(238, 238, 238, 1);*/
    /*border: 2px solid green;*/

    /*height: calc(802px - 0.5rem);*/
    /*height: 8.35rem;*/
    height: 8.35rem;
    min-height: 802px;
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
    /*padding: 0.25rem 0.25rem;*/
  }

  .left_and_right_div {
    /*border: 1px solid blue;*/
    background-color: lightblue;
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
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
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .right_div > div {
    /*border:1px solid blue;*/
    width: 30%;
    font-size: 18px;
    color: $orange;
  }

  .myUl {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .myUl > li {
    border: 1px solid white;
    text-align: left;
    padding: 5px 8px;
  }

</style>
