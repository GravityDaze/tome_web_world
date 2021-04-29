import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const router = new Router({
  routes: [
    //以下为组件路由
    {
      //测试页面上传视频
      path: '/upvideo',
      name: 'up-video',
      component: resolve => require(['@/pages/testFiles/upVideo'], resolve),
    },
    {
      //测试页面
      path: '/choosecityplug',
      name: 'choose-city-plug',
      component: resolve => require(['@/page_a2/testpage/chooseCityPlug'], resolve),
    },
    {
      //新增编辑form表单组件
      path: '/addeditorform',
      name: 'add-editor-form',
      component: resolve => require(['@/components/addEditorForm'], resolve),
    },
    {
      //用户信息编辑form表单组件
      path: '/editoruserinfoform',
      name: 'editorUserInfoForm',
      component: resolve => require(['@/components/editorUserInfoForm'], resolve),
    },
    {
      //模态框表格公共组件
      path: '/mytablesdialog',
      name: 'my-tables-dialog',
      component: resolve => require(['@/components/myTablesDialog'], resolve),
    },

    //以下为页面路由
    {
      //登录页路由
      path: '/',
      name: 'login',
      component: resolve => require(['@/pages/login'], resolve),
    },
    {
      path: '/layout',
      name: 'layout',
      component: resolve => require(['@/pages/layout'], resolve),
      children: [
        {
          path: '/',
          redirect: '/baidumap'
        },
        {
          path: '/baidumap',
          name: 'baiduMap',
          component: resolve => require(['@/components/baiduMap'], resolve)
        },
        {
          path: '/scenerymanage',
          name: 'sceneryManage',
          component: resolve => require(['@/pages/sceneryManageMenu/sceneryManage2'], resolve)
        },
        {
          path: '/scenerycoveragemanage',
          name: 'sceneryCoverManage',
          component: resolve => require(['@/pages/sceneryManageMenu/sceneryCoverageManage'], resolve)
        },
        {
          path: '/sceneryspotmanage',
          name: 'scenerySpotManage',
          component: resolve => require(['@/pages/sceneryManageMenu/scenerySpotManage2'], resolve)
        },
        {
          path: '/servicefacilitymanage',
          name: 'serviceFacilityManage',
          component: resolve => require(['@/pages/sceneryManageMenu/serviceFacilityManage'], resolve)
        },
        {
          path: '/railmanage',
          name: 'railManage',
          component: resolve => require(['@/pages/sceneryManageMenu/railManage'], resolve)
        },
        {
          path: '/resourcebundlemanage',
          name: 'resourceBundleManage',
          component: resolve => require(['@/pages/sceneryManageMenu/resourceBundleManage'], resolve)
        },
        {
          path: '/terminalfacility',
          name: 'terminalFacility',
          component: resolve => require(['@/pages/terminalMaintainMenu/terminalFacility'], resolve)
        },
        {
          path: '/terminalrfid',
          name: 'terminalRfid',
          component: resolve => require(['@/pages/terminalMaintainMenu/terminalRfid'], resolve)
        },
        {
          path: '/messagemanage',
          name: 'messageManage',
          component: resolve => require(['@/pages/messageManageMenu/messageManage'], resolve)
        },
        {
          path: '/usermanage',
          name: 'userManage',
          component: resolve => require(['@/pages/businessManageMenu/userManage'], resolve)
        },
        {
          path: '/guidemanage',
          name: 'guideManage',
          component: resolve => require(['@/pages/businessManageMenu/guideManage'], resolve)
        },
        {
          path: '/tourgroupmanage',
          name: 'tourGroupManage',
          component: resolve => require(['@/pages/businessManageMenu/tourGroupManage'], resolve)
        },
        {
          path: '/sosmanage',
          name: 'sosManage',
          component: resolve => require(['@/pages/businessManageMenu/sosManage'], resolve)
        },
        {
          path: '/mediafilemanage',
          name: 'mediaFileManage',
          component: resolve => require(['@/pages/businessManageMenu/mediaFileManage'], resolve)
        },
        {
          path: '/facilitystatistics',
          name: 'facilityStatistics',
          component: resolve => require(['@/pages/queryStatisticsMenu/facilityStatistics'], resolve)
        },
        {
          path: '/rfidstatistics',
          name: 'rfidStatistics',
          component: resolve => require(['@/pages/queryStatisticsMenu/rfidStatistics'], resolve)
        },
        {
          path: '/rfidtriggerlog',
          name: 'rfidTriggerLog',
          component: resolve => require(['@/pages/queryStatisticsMenu/rfidTriggerLog'], resolve)
        },
        {
          path: '/facilityrentstatistics',
          name: 'facilityRentStatistics',
          component: resolve => require(['@/pages/queryStatisticsMenu/facilityRentStatistics'], resolve)
        },
        {
          path: '/sosstatistics',
          name: 'sosStatistics',
          component: resolve => require(['@/pages/queryStatisticsMenu/sosStatistics'], resolve)
        },
        {
          path: '/ridershipstatistics',
          name: 'ridershipStatistics',
          component: resolve => require(['@/pages/queryStatisticsMenu/ridershipStatistics'], resolve)
        },
        {
          path: '/sceneryserviceprovidermanage',
          name: 'sceneryServiceProviderManage',
          component: resolve => require(['@/pages/systemManageMenu/sceneryServiceProviderManage'], resolve)
        },
        {
          path: '/tourcompanymanage',
          name: 'tourCompanyManage',
          component: resolve => require(['@/pages/systemManageMenu/tourCompanyManage'], resolve)
        },
        {
          path: '/operatormanage',
          name: 'operatorManage',
          component: resolve => require(['@/pages/systemManageMenu/operatorManage'], resolve)
        },
        {
          path: '/rolemanage',
          name: 'roleManage',
          component: resolve => require(['@/pages/systemManageMenu/roleManage'], resolve)
        },
        {
          path: '/systemparammanage',
          name: 'systemParamManage',
          component: resolve => require(['@/pages/systemManageMenu/systemParamManage'], resolve)
        },
        {
          path: '/districtmanage',
          name: 'districtManage',
          component: resolve => require(['@/pages/systemManageMenu/districtManage'], resolve)
        },
        {
          path: '/organizationmanage',
          name: 'organizationManage',
          component: resolve => require(['@/pages/systemManageMenu/organizationManage'], resolve)
        },
        {
          path: '/menumanage',
          name: 'menuManage',
          component: resolve => require(['@/pages/systemManageMenu/menuManage'], resolve)
        },
        {
          path: '/dictionarymanage',
          name: 'dictionaryManage',
          component: resolve => require(['@/pages/systemManageMenu/dictionaryManage'], resolve)
        },
        {
          path: '/systemlogmanage',
          name: 'systemLogManage',
          component: resolve => require(['@/pages/systemManageMenu/systemLogManage'], resolve)
        },

      ]


    },

    //  A2的所有相关路由配置
    {
      path: '/layout2',
      name: 'layout2',
      component: resolve => require(['@/page_a2/layout2'], resolve),
      children: [
        {
          //首页
          path: '/',
          redirect: '/baidumap2'
        },
        {
          //首页
          path: '/baidumap2',
          name: 'baiduMap2',
          component: resolve => require(['@/components2/baiduMap2'], resolve)
        },
        {
          //景区服务商列表
          // path: '/sceneryserviceproviderlist2',
          path: '/Scenic/Index',
          name: 'sceneryServiceProviderList',
          component: resolve => require(['@/page_a2/sceneryManageMenu/sceneryServiceProviderList'], resolve)
        },
        {
          //景区范围列表
          // path: '/sceneryscopelist2',
          path: '/Scenic/RubbIndex',
          name: 'sceneryScopeList',
          component: resolve => require(['@/page_a2/sceneryManageMenu/sceneryScopeList'], resolve)
        },
        {
          //景区成员列表
          // path: '/scenerygrouppersonlist2',
          path: '/Scenic/TravelAgency',
          name: 'sceneryGroupPersonList',
          component: resolve => require(['@/page_a2/sceneryManageMenu/sceneryGroupPersonList'], resolve)
        },
        {
          //线路信息
          // path: '/roadlineinfo2',
          path: '/TourLine/Index',
          name: 'roadLineInfo',
          component: resolve => require(['@/page_a2/roadLineManageMenu/roadLineInfo'], resolve)
        },
        {
          //景点信息
          // path: '/roadlinesceneryspotinfo2',
          path: '/TourLine/ScenicMang',
          name: 'roadLineScenerySpotInfo',
          component: resolve => require(['@/page_a2/roadLineManageMenu/roadLineScenerySpotInfo'], resolve)
        },
        {
          //电子围栏
          // path: '/railinfo2',
          path: '/TourLine/ElectronicFence',
          name: 'railInfo',
          component: resolve => require(['@/page_a2/roadLineManageMenu/railInfo'], resolve)
        },
        {
          //景区设备信息
          // path: '/facilityinfo2',
          path: '/UserEquipment/UserIndex',
          name: 'facilityInfo',
          component: resolve => require(['@/page_a2/facilityManage/facilityInfo'], resolve)
        },
        {
          //成员信息
          // path: '/grouppersoninfo2',
          path: '/UserEquipment/MenberManger',
          name: 'groupPersonInfo',
          component: resolve => require(['@/page_a2/facilityManage/groupPersonInfo'], resolve)
        },

        {
          //行程信息
          // path: '/travelinfo2',
          path: '/Trip/Index',
          name: 'travelInfo',
          component: resolve => require(['@/page_a2/operationManageMenu/travelInfo'], resolve)
        },
        {
          //警报信息
          // path: '/alertinfo2',
          path: '/Trip/Alarlist',
          name: 'alertInfo',
          component: resolve => require(['@/page_a2/operationManageMenu/alertInfo'], resolve)
        },
        {
          //发射源（Rfid发射源统计）
          // path: '/rfid2',
          path: '/RFIDOuter/Index',
          name: 'rfid',
          component: resolve => require(['@/page_a2/rfidManageMenu/rfid'], resolve)
        },
        {
          //发射源（景点Rfid发射源统计）
          // path: '/rfid2child',
          path: '/Trip/MeRFIDCode',
          name: 'rfidChild',
          component: resolve => require(['@/page_a2/operationManageMenu/rfidChild'], resolve)
        },
        {
          //机器码统计
          // path: '/machinecode2',
          path: '/RFIDOuter/RFIDCode',
          name: 'machineCode',
          component: resolve => require(['@/page_a2/rfidManageMenu/machineCode'], resolve)
        },
        {
          //发射源访问日志
          // path: '/rfidlog2',
          path: '/RFIDOuter/RFIDTest',
          name: 'rfidLog',
          component: resolve => require(['@/page_a2/rfidManageMenu/rfidLog'], resolve)
        },
        {
          //位置版发射源（位置版发射源统计）
          // path: '/siterfid2',
          path: '/RFIDOuter/locaSource',
          name: 'siteRfid',
          component: resolve => require(['@/page_a2/rfidManageMenu/siteRfid'], resolve)
        },
        {
          //位置版发射源（景点位置版发射源统计）
          // path: '/siterfid2child',
          path: '/Trip/WeRFIDCode',
          name: 'siteRfidChild',
          component: resolve => require(['@/page_a2/operationManageMenu/siteRfidChild'], resolve)
        },
        {
          //复位计次数据列表
          // path: '/resetamountlist2',
          path: '/DataCount/Index',
          name: 'resetAmountList',
          component: resolve => require(['@/page_a2/dataStatisticsMenu/resetAmountList'], resolve)
        },
        {
          //复位计次数据图表
          // path: '/resetamountchart2',
          path: '/DataCount/CharCount',
          name: 'resetAmountChart',
          component: resolve => require(['@/page_a2/dataStatisticsMenu/resetAmountChart'], resolve)
        },
        {
          //角色管理
          // path: '/rolemanage2',
          path: '/Rights/RightRole',
          name: 'roleManage',
          component: resolve => require(['@/page_a2/authorityManageMenu/roleManage'], resolve)
        },
        {
          //人员管理
          // path: '/personmanage2',
          path: '/Rights/PersonnelMg',
          name: 'personManage',
          component: resolve => require(['@/page_a2/authorityManageMenu/personManage'], resolve)
        },
        {
          //片区列表
          // path: '/areamanagelist2',
          path: '/Area/Index',
          name: 'areaManageList',
          component: resolve => require(['@/page_a2/areaManageMenu/areaManageList'], resolve)
        },
        {
          //片区景区列表
          // path: '/areascenerylist2',
          path: '/Area/IndexSenic',
          name: 'areaSceneryList',
          component: resolve => require(['@/page_a2/areaManageMenu/areaSceneryList'], resolve)
        },
        {
          //片区团员列表
          // path: '/areagrouppersonlist2',
          path: '/Area/TravelAgency',
          name: 'areaGroupPersonList',
          component: resolve => require(['@/page_a2/areaManageMenu/areaGroupPersonList'], resolve)
        },
        {
          //片区设备信息
          // path: '/areafacilityinfo2',
          path: '/Area/UserIndex',
          name: 'areaFacilityInfo',
          component: resolve => require(['@/page_a2/areaManageMenu/areaFacilityInfo'], resolve)
        },
        // {
        //   //admin设备信息更改以前的
        //   // path: '/areafacilityinfo2',
        //   path: '/Equipment/Index',
        //   name: 'areaFacilityInfo',
        //   component: resolve => require(['@/page_a2/areaManageMenu/areaFacilityInfo'], resolve)
        // },

        {
          //admin设备信息更改以后的
          // path: '/areafacilityinfo2',
          path: '/Equipment/Index',
          name: 'adminFacilityInfo',
          component: resolve => require(['@/page_a2/facilityManage/adminFacilityInfo'], resolve)
        },

        {
          //片区成员信息
          // path: '/areamemberinfo2',
          path: '/Area/MenberManger',
          name: 'areaMemberInfo',
          component: resolve => require(['@/page_a2/areaManageMenu/areaMemberInfo'], resolve)
        },
        {
          //片区复位次数列表
          // path: '/arearesetdatalist2',
          path: '/Area/DataCount',
          name: 'areaResetDataList',
          component: resolve => require(['@/page_a2/areaManageMenu/areaResetDataList'], resolve)
        },
      ]


    },

  ]
})
// 全局路由守卫
// router.beforeEach((to, from, next) => {
//   let isLogin = localStorage.getItem('token')
//   console.log(isLogin,'前面可以看到是否获取了token')
//   if(to.path==='/consolenav'||to.path==='/rightmain'||to.path==='/rechargedrawings'||to.path==='/ordermanage'||to.path==='/rightbasicinfo'||to.path==='/mymember'||to.path==='/myvoucher'||to.path==='/messagecenter'){
//     //这里的判断是用于控制控制台页面的查看消息的显示隐藏切换
//     console.log('进了相关页面')
//     localStorage.setItem('isControl',false)
//   }else {
//     console.log('没进相关页面，无需改变值')
//     localStorage.setItem('isControl',true)
//   }
//   if (to.meta.needLogin) {  // 判断该路由是否需要登录权限
//     if (isLogin) { // 判断是否已经登录
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   }
//   else {
//     next()
//   }
// })

export default router;

