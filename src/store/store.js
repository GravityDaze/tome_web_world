import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  showChinaOrEnglish:false,//A2后台管理系统展示英文还是中文，默认展示中文
  addparamsss:false,//此参数作为A2后台系统页面顶部是否展示查询和警报按钮的参数

  roleStatusNum:'',//此参数用于判断登录账号是什么角色身份
  //权限控制以后，获取到的菜单数据数组
  menuVarArr: localStorage.getItem('menuVarArr') ? localStorage.getItem('menuVarArr') : '',
  // isGoParam:false,//这个参数是为了阻止数据没有成功获取到，就直接跳转页面，导致数据用的是上一次的数据

  // 存储token
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
  // 代表全局用户名
  // allScopeUserName: '默认用户名',
  allScopeUserName: localStorage.getItem('allScopeUserName') ? localStorage.getItem('allScopeUserName') : '重新登录',
  //代表可以授权的景区数据数组
  tntArr: [],
  //用于显示一键关机操作的对应景区名称
  shutDownSceneryName:'',
  //type代表管理员类型
  type: '1',
  //查询统计大菜单下，有部分页面表格左上方需要展示一些数据，
  allCountP: '99',//此参数代表设备统计页面页头上展示的对应设备总台数数据
  onlineCountP: '55',//此参数代表设备统计页面页头上展示的对应设备总台数数据
  offlineCountP: '44',//此参数代表设备统计页面页头上展示的对应设备总台数数据
  chooseParam2:false,//由于景区管理--景区图层管理里面层级太深，所有用到了更多的参数去控制模态框，此参数是用于控制图层元素管理里面的新增编辑模态框
  chooseParam3:false,//景区图层管理里面的点击语言配置按钮后，弹出语言配置列表等详情
  chooseParam4:false,//景区图层管理最后层级的语言配置新增编辑模态框

  //首页展示的在线，离线，报警数据
  isShowHomeCountParam: true,//此全集变量用于展示首页数据栏和下拉栏
  onLineCountParam: '',//在线数
  offLineCountParam: '',//离线数
  sosCountParam: '',//报警数
  centerPointLngParam: '104.346071',//地图中心点
  centerPointLatParam: '33.678385',//地图中心点
  mapSizeParam: '6',//地图默认展示尺寸大小
  showSceneryIconOrShowCatIcon: true,//此参数表示全国状态下展示所有景区图标，景区状态下展示具体猫咪设备图标(默认显示全国状态即景区的图标)
  titleHeader: '等待传值',
  downloadSuccessParam: false,//这个参数用于控制下载excel模板成功后，再将对应的链接赋值给a标签，避免下载的模板是上一次的模板
  tabsCheckedParam: 0,//全局控制面包屑按钮的显示编号
  //以下为查询的对应参数数据
  sceneryNameParam: '',//代表查询条件里的景区名称
  sceneryIdParam: '',//代表查询条件里的景区id
  scenerySpotNameParam: '',//代表查询条件里的景点名称
  sceneryGradeParam: '',//代表景区级别
  areaIdParam: '',//代表归属地区
  messageHeaderParam: '',//代表消息标题
  publishTypeParam: '',//代表消息发布类型
  publishDateParam: '',//代表消息发布时间
  publishStateParam: '',//代表消息发布状态
  publishStateKParam: '',//代表资源包发布状态
  facilityTypeParam: '',//代表服务设施类型
  facilityNameParam: '',//代表服务设施名称
  imeiNumParam: '',//代表imei号
  sosTimeParam: '',//代表呼救时间
  codeMachineParam: '',//代表设备编号
  sceneryStateParam: '',//代表状态
  rfidSerialNumParam: '',//代表发射源编号
  rfidTypeParam: '',//代表发射源类型
  isResetParam: '',//代表是否为复位点
  userSerialNumParam: '',//代表用户编号
  guideCardParam: '',//代表导游证号
  userTelParam: '',//代表用户手机号
  areaManageIdParam: '',//代表系统管理--区域管理时，传递对应id，获取对应区域的列表信息
  startDatetimeParam: '',//代表开始时间点
  endDatetimeParam: '',//代表结束时间点

  startDatetimeParam2: '',//代表A2开始时间点
  endDatetimeParam2: '',//代表A2结束时间点
  monthDateParam2:'',//代表A2查询月份
  searchIfInfoParam2:'',//代表A2人员管理页面里面的综合查询条件参数

  organizationParentIdParam: '1',//代表组织机构父级id参数
  serviceProviderNoParam: '',//景区服务商编号
  serviceProviderNameParam: '',//景区服务商名称
  serviceProviderLinkManParam: '',//景区服务商负责人
  loginNameParam: '',//代表登录名
  deptNameParam: '',//代表机构名称
  tourcompanyParam: '',//旅行社名称
  tourcompanyLinkManParam: '',//旅行社联系人
  roleNameParam:'',//代表角色名称
  jurisdictionTagParam:'',//代表权限标识
  editorScopeParam:'',//代表是否可以编辑
  paramKeyParam:'',//代表参数键
  paramValueParam:'',//代表参数值
  operatorNameParam:'',//代表操作员名称
  businessTypeParam:'',//代表业务日志中的业务类型
  railNameParam:'',//代表围栏管理页面中的围栏名称
  versionParam:'',//代表查询input框中的版本号
  mediaFileSerialNumParam:'',//代表媒体文件编号
  mediaFileNameParam:'',//代表媒体文件的。。文件名
  mediaTypeParam:'',//代表媒体文件的类型
  ridershipStartDatetimeParam: '',//代表客流量统计里面访问开始时间点
  ridershipEndDatetimeParam: '',//代表客流量统计里面访问结束时间点
  updateStateParam: '',//代表资源包管理中的更新状态

  mySosStartDatetimeParam: '',//代表sos统计里面开始时间点
  mySosEndDatetimeParam: '',//代表sos统计里面结束时间点

  myRentStartDatetimeParam: '',//代表设备租用统计里面开始时间点
  myRentEndDatetimeParam: '',//代表设备租用统计里面结束时间点
  coverageNameParam:'',//代表查询里面的景区图层名称


  affiliatedTourCompanyParam: '',//代表所属旅行社
  affiliatedSceneryRRRParam: '',//代表归属景区，此处特别要注意归属景区和所属景区的区别是在于所属是选择景区方式的，而归属是输入景区名方式的
  affiliatedAreaParamRRR:'',//代表A2的归属区域及A2 的所属区域
  groupNumParam: '',//代表团号
  touristStateParam: '',//代表出行状态，和普通状态还是有区别的
  guideTelParam: '',//代表用户中的具体导游手机号
  registerDateParam: '',//代表用户注册日期
  pageNumParam: 1,//代表当前页数
  pageSizeParam: 5,//代表每页显示多少条
  totalParam: 90,//代表总条数

  pageNumParamX: 1,//代表X当前页数X
  pageSizeParamX: 8,//代表X每页显示多少条
  totalParamX: 190,//代表X总条数
  //以上为查询对应参数数据
  showLoading: false,
  tablesDialogTitle: '标题变量',
  dialogFormVisible: false,//是否显示编辑个人信息模态框
  dialogFormVisibleAlterPassword: false,//是否显示用户修改密码模态框
  //以下是分别控制不同页面内的具体表格内可点击的项对应弹出相应内容模态框的参数
  //scenery景区管理子菜单表格内部点击事件参数
  isShowTablesDialog: false,//在点击景区管理表格内的景区编号时，显示或隐藏景区详情模态框的参数
  //message信息管理子菜单表格内部点击事件参数
  isShowMessageInfos: false,
  //选择区域input框获取焦点是打开模态框参数
  chooseAreaDialog: false,
  //选择景区input框获取焦点是打开模态框参数
  chooseSceneryDialog: false,
  //选择景区服务商input框获取焦点是打开模态框参数
  chooseSceneryServiceDialog: false,
  //选择所属机构input框获取焦点是打开模态框参数
  chooseOrganizationDialog: false,
  //选择调整归属旅行社input框获取焦点是打开模态框参数
  chooseTourGroupDialog: false,

  //选择区域模态框是查询里面的input获取焦点事件还是编辑里面的inpu获取焦点事件，由下面这个参数控制
  editorOrSearch: '查询',

  //以下为对应页面的新增编辑模态框展示参数(以下也包含了少部分的特殊按钮的模态框弹出隐藏)
  //景区管理主目录下的菜单

       //中间的添加的是A2的sign相关参数

  isShowAlert:false,//此参数用于控制首页警报版块的显示和隐藏

  facilityTotalA2:'',//A2首页地图设备总数
  onLineCountA2:'',//A2首页地图在线设备数
  onlineCountPercentageA2:'',//A2首页地图设备在线率
  sceneryServiceProviderListSign2:false,
  sceneryScopeList2:false,//A2景区范围页面新增编辑模态框
  personManageSign2:false,//A2权限管理--人员管理编辑模态框
  areaManageListSign2:false,//A2片区管理列表新增编辑模态框
  facilityInfo2:false,//A2设备信息新增编辑模态框
  rfid2:false,//A2rfid发射源新增编辑模态框
  rfid2child:false,//A2景点rfid发射源新增编辑模态框
  siteRfid2:false,//A2位置版rfid发射源新增编辑模态框
  siteRfid2child:false,//A2景点位置版rfid发射源新增编辑模态框
  areaSceneryList2:false,//A2片区管理员身份下的--片区景区列表新增编辑模态框
  areaFacilityInfo2:false,//A2片区管理员身份下的--片区设备信息新增编辑模态框
  sceneryGroupPersonList2:false,//A2片区管理员身份下的--片区团员信息新增编辑模态框
  sceneryGroupPersonList2222:false,//A2景区---管理员身份下的--景区团员信息新增编辑模态框
  areaMemberInfo2:false,//A2片区管理员身份下的--片区成员信息新增编辑模态框
  groupPersonInfo2:false,//A2景区管理员身份下的--设备信息--成员信息新增编辑模态框
  roadLineInfo2:false,//A2景区管理员身份下的--线路信息--新增编辑模态框
  roadLineScenerySpotInfo2:false,//A2景区管理员身份下的--线路信息--线路景点信息新增编辑模态框
  railInfo2:false,//A2景区管理员身份下的--线路信息--电子围栏信息新增编辑模态框
  travelInfo2:false,//A2景区管理员身份下的--行程管理--行程信息新增编辑模态框
  travelInfo2SSS:false,//A2景区管理员身份下的--行程管理--行程信息查看详情模态框

  myTouristTeamID:'',//A2片区管理员身份--片区团员信息列表默认查询必须带的一个团ID参数
  isSuccessGetEditInfo:false,//A2片区管理员--片区团编辑团之前确定是否成功获取默认信息，获取到了再显示编辑框

  a2ChooseServiceProviderParam2:'',//A2条件查询选择服务商信息参数
  groupPersonTypeParam2:'',//A2条件查询成员类型信息参数
  sexTypeParam2:'',//A2条件查询性别信息参数
  roadLineTypeParam2:'',//A2条件查询线路类型信息参数
  roadLineNameParam2:'',//A2条件查询线路名称信息参数
  alertTypeParam2:'',//A2条件查询报警类型信息参数
  touristGroup2Param2:'',//A2条件查询旅游团信息参数
  travelInfoNameParam2:'',//A2条件查询行程名称信息参数
  allocationStateParam2:'',//A2条件查询设备是否分配

  isOnLineStateParam2:'',//A2条件查询选择在线状态信息参数
       //中间的添加的是A2的sign相关参数

  scenerySign: false,//景区管理
  sceneryCoverageSign: false,//图层管理
  scenerySpotSign: false,//景点管理
  sceneryFacilitySign: false,//服务设施管理
  railSign: false,//围栏管理
  sceneryScopeSign:false,//代表景区管理里面景区范围按钮控制的模态框是否显示的参数
  chooseParam999:false,//景区语言配置详情列表里面的新增编辑模态框控制是否显示参数
  chooseParam999Pack:false,//景区语言配置详情列表里面的资源打包模态框控制是否显示参数

  chooseParam999Spot:false,//景点语言配置详情列表里面的新增编辑模态框控制是否显示参数
  chooseParam999Facility:false,//服务设施语言配置详情列表里面的新增编辑模态框控制是否显示参数

  //终端维护主目录下的菜单
  terminalFacilitySign: false,//终端设备
  terminalRfidSign: false,//终端RFID

  downloadUrl: 'http://tomepicture.zhihuiquanyu.com/devices.xlsx',
  // 导入设备时默认先获取excel模板链接参数

  // downloadUrl: '',

  //message管理主目录下的菜单
  messageSign: false,//信息管理
  //business业务管理主目录下的菜单
  guideManageSign: false,//导游管理
  guideRelevanceSign: false,//备注：这个参数在此处属于特殊，其余的都是控制编辑新增模态框参数，此处它控制关联导游模态框的显示影藏
  tourGroupManageSign: false,//同上备注：调整归属于哪个旅行社的模态框的显示隐藏
  sosDisposeSign: false,//点击求救处理按钮以后弹出隐藏对应模态框参数
  mediaFileManageSign: false,//媒体文件管理

  //system系统管理主目录菜单下的子菜单
  districtManageSign: false,//区域管理
  organizationManageSign: false,//组织机构
  sceneryServiceProviderSign: false,//景区服务商
  tourCompanyManageSign: false,//旅行社管理
  operatorManageSign: false,//操作员管理
  operatorImpowerSign: false,//操作员授权
  impowerScenerySign: false,//操作员管理菜单下的授权景区按钮显示隐藏模态框
  roleManageSign: false,//角色管理
  roleManageSign2: false,//A2角色管理
  roleImpowerSign: false,//角色授权模态框
  roleFunctionImpowerSign: false,//角色管理的功能授权模态框
  roleFunctionImpowerSign2: false,//A2角色管理的功能授权模态框
  menuManageSign: false,//菜单管理
  systemParamSign: false,//系统参数
  dictionaryManageSign: false,//字典管理
  userOrOperatorOrbusinessLog:1,//日志管理具体显示用户日志，操作员日志或是业务日志（1代表用户日志，2代表操作员日志，3代表业务日志）
}
const mutations = {
  // 修改token，并将token存入localStorage
  getToken(state, obj) {
    console.log('触发了机关', obj, obj.token)
    this.state.token = obj.token;
    this.state.allScopeUserName = obj.needName;
    localStorage.setItem('token', obj.token);
    localStorage.setItem('allScopeUserName', obj.needName);
  },

  // 登录成功后，默认获取后台返回的菜单权限数据数组，并放入缓存

  getMenuVarArr(state, obj) {
    // console.log('全局获取菜单数组数据，并存入缓存', obj)
    if(localStorage.getItem('menuVarArr')){
      localStorage.removeItem('menuVarArr')
    }
    var myString= JSON.stringify(obj.menuVarArr)
    // console.log('全局获取菜单数组数据，并存入缓存', obj,'myString:',myString)
    localStorage.setItem('menuVarArr', myString);

  },


  loginOut(state) {
    this.state.token = ''
    console.log('此时的token是：', this.state.token)
    localStorage.removeItem('token')
  },

}
const actions = {}
// 以下是将对象注册到Vuex实例中({state,mutations,actions})
export default new Vuex.Store({
  state,
  mutations,
  actions
})

