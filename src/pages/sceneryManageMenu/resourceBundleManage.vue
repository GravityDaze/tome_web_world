<template>
  <div>
    <mySearchs
      :sign="sign"
      :sceneryName="sceneryName"
      :versionNum="versionNum"
      :sceneryState="sceneryState"
      :publishStateK="publishStateK"
      :isPublish="isPublish"
      :isTerminalUpdateInfo="isTerminalUpdateInfo"
      @queryInfos="queryInfos"
      @publishResourceInfo="publishResourceInfo"
      @openUpdateInfoDialog="openUpdateInfoDialog"
    ></mySearchs>
    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isLanguage="isLanguage"
      :isScenerySerialNumMore="isScenerySerialNumMore"
      :isShowPublishK="isShowPublishK"
      :isShowEnabled="isShowEnabled"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    ></myTables>
    <!--<myTablesDialog-->
    <!--:tableTitleDialog="tableTitleDialog"-->
    <!--:tableDataDialog="tableDataDialog"-->
    <!--&gt;</myTablesDialog>-->
    <!--点击终端更新情况按钮后，对应弹出终端更新情况模态框-->
    <div id="myTablesDialog">
      <el-dialog :title="'终端更新情况--'+commonName+'(资源包)'" :visible.sync="chooseParam1" align="left" width="60%">
        <mySearchs
          :imeiNum="imeiNum"
          :codeMachine="codeMachine"
          :myUpdateState="myUpdateState"
          :isQueryInfosX="isQueryInfosX"
          @queryInfosX="queryInfosX"
        ></mySearchs>
        <myTables
          :tableTitle="tableTitleParam1"
          :tableData="tableDataParam1"
          :isShowEnabled="isShowEnabled"
          :isPagePageShow="isPagePageShow"
          :isUpdateState="isUpdateState"
          @chooseInfoX="chooseInfoX"
          @queryInfosX="queryInfosX"
        ></myTables>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    name: "resource-bundle-manage",
    data() {
      return {
        //终端更新情况模态框列表表头数据
        tableTitleParam1: [
          {
            prop: 'no',
            label: '设备编号',
            // width: '100',
            align: 'center',
          },
          {
            prop: 'imei',
            label: '设备IMEI',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'currentPackageName',
            label: '设备当前资源包名',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'currentVersion',
            label: '设备当前版本',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'updateDatetime',
            label: '更新时间',
            // width: '120',
            align: 'center',
          },
        ],
        tableDataParam1: [],
        apiUpdateListInfos: '/mis/resourcePackage/queryUpdate',//点击终端更新情况按钮后获取对应情况列表信息接口
        imeiNum: true,
        codeMachine: true,//设备编号
        myUpdateState: true,//二级查询里的更新状态
        isUpdateState: true,//二级列表列里是否显示更新状态
        isQueryInfosX: true,//在二级列表里面查询是用于判断是点击的一级查询按钮还是二级查询按钮
        chooseParam1: false,//是否展示终端更新情况模态框列表
        isPagePageShow: true,//XXX此处特殊，不要常规分页控件显示出来所有用了true，
        sign: 'resourcebundlemanageSign',
        apiQuery: '/mis/resourcePackage/query',
        apiPublishResource: '/mis/resourcePackage/publish',//资源包发布接口
        sceneryName: true,//代表该页面是否显示对应的景区名称筛选功能input框
        versionNum: true,//代表该页面是否显示对应的版本号筛选功能input框
        sceneryState: false,//代表状态，启用禁用
        publishStateK: true,//代表资源包状态
        isPublish: true,//代表发布按钮tab
        isTerminalUpdateInfo: true,//代表终端更新情况tab
        commonId: '',
        commonName:'',
        commonIdX:'',
        isLanguage: true,//是否显示语言f
        isScenerySerialNum: false,//是否显示景区编号
        isScenerySerialNumMore: true,//是否显示景区编号
        isShowPublishK: true,//代表资源包发布状态
        isShowEnabled: true,//常规的状态
        tableTitle: [
          {
            prop: 'language',
            label: '语言',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sceneryName',
            label: '景区名称',
            width: '100',
            align: 'center'
          },

          {
            prop: 'name',
            label: '资源包名',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'size',
            label: '资源包大小',
            width: '120',
            align: 'center'
          },
          {
            prop: 'version',
            label: '版本',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'publishDateTime',
            label: '发布时间',
            width: '280',
            align: 'center'
          },

          {
            prop: 'updator',
            label: '最后更新者',
            width: '90',
            align: 'center'
          },
        ],
        tableData: [],

        tableTitleDialog: [
          {
            prop: 'onlineAmount',
            label: '在线总数',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'offlineAmount',
            label: '离线总数',
            width: '100',
            align: 'center'
          },
          {
            prop: 'scenicId',
            label: '景区Id',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'personName',
            label: '负责人姓名',
            width: '120',
            align: 'center'
          },
          {
            prop: 'personTel',
            label: '负责人电话',
            width: '180',
            align: 'center'
          },
          {
            prop: 'address',
            label: '通讯地址',
            width: '300',
            align: 'center'
          },
        ],
        tableDataDialog: [
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '9999',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },

        ],

      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //点击终端更新情况按钮显示对应模态框
      openUpdateInfoDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiUpdateListInfos,
            data: {
              "id": this.commonId,
              "imei": '',
              "no": '',
              "status": '',
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParamX,
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('终端设备更新信息出没：', res.data)
            this.tableDataParam1 = [...res.data.value.list]
            this.$store.state.totalParamX = res.data.value.total
            this.chooseParam1 = true
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })

      },

      //编辑信息前先获取相关信息
      chooseInfo(n) {
        // console.log('到底会给我什么样的信息呢',n)
        this.commonId = n.id
        this.commonName = n.sceneryName
      },

      //点击二级列表行以后获取的相关二级列表行内容（因为层级过深，所以才会出现特殊的X版本事件）
      chooseInfoX(n) {
        console.log('XX二级到底会给我什么样的信息呢', n)
        this.commonIdX = n.id


      },

      //查询(游团)XXXXX按钮返回列表数据
      queryInfosX(n) {
        // console.log('我要传值了哦', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiUpdateListInfos,
            data: {
              "id": this.commonId,
              "imei": this.$store.state.imeiNumParam,
              "no": this.$store.state.codeMachineParam,
              "status": this.$store.state.updateStateParam,
              "pageNum": this.$store.state.pageNumParamX,
              "pageSize": this.$store.state.pageSizeParamX,
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('终端设备更新信息出没：', res.data)
            this.tableDataParam1 = [...res.data.value.list]
            this.$store.state.totalParamX = res.data.value.total
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })


      },

      //发布资源包消息
      publishResourceInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiPublishResource + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.$message.success('资源包发布成功')
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName": '',
              "version": '',
              "sceneryId": '',
              "status": '',
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('返回的数据', res.data, res.data.value.total)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            // console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },

      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        // alert(this.$store.state.publishStateKParam)
        if (this.$store.state.publishStateKParam == '10') {
          this.$store.state.publishStateKParam = ''
        }
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName": this.$store.state.sceneryNameParam,
              "version": this.$store.state.versionParam,
              "status": this.$store.state.publishStateKParam,//代表资源包发布状态
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('返回的数据', res.data.value.list)
            this.tableData = [...res.data.value.list]
            this.$store.state.totalParam = res.data.value.total
            console.log('赋值的数据', this.tableData)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
    }
  }
</script>

<style scoped>

</style>
