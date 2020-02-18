<template>
  <div>
    <mySearchs
    :userTel="userTel"
    :sceneryName="sceneryName"
    :imeiNum="imeiNum"
    :dateShow="dateShow"
    :sign="sign"
    @queryInfos="queryInfos"
    v-if="$store.state.userOrOperatorOrbusinessLog==1"
    @getDefaultInfo="getDefaultInfo"
    ></mySearchs>
    <mySearchs
      :operatorName="operatorName"
      :loginName="loginName"
      :userTel="userTel"
      :dateShow="dateShow"
      :sign="sign"
      @queryInfos="queryInfos"
      v-if="$store.state.userOrOperatorOrbusinessLog==2"
      @getDefaultInfo="getDefaultInfo"
    ></mySearchs>
    <mySearchs
      :businessType="businessType"
      :operatorName="operatorName"
      :dateShow="dateShow"
      :sign="sign"
      @queryInfos="queryInfos"
      v-if="$store.state.userOrOperatorOrbusinessLog==3"
      @getDefaultInfo="getDefaultInfo"
    ></mySearchs>
    <myTables
      :isShowEnabled="isShowEnabled"
      :tableTitle="tableTitle"
      :tableData="tableData"
      @queryInfos="queryInfos"
    ></myTables>
  </div>
</template>

<script>
  export default {
    name: "system-log-manage",
    data() {
      return {
        apiQuery1:'/mis/log/customerLoginLogQuery',//用户日志查询
        apiQuery2:'/mis/log/operatorLoginLogQuery',//操作员日志查询
        apiQuery3:'/mis/log/businessLogQuery',//业务日志查询
        sign:'systemlogmanage',
        userTel:true,
        sceneryName:true,
        imeiNum:true,
        dateShow:true,
        isShowEnabled:true,
        operatorName:true,
        businessType:true,
        loginName:true,
        tableTitle: [
          {
            prop: 'customerName',
            label: '用户名',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'customerPhone',
            label: '手机号',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'type',
            label: '事件类型',
            // width: '100',
            align: 'center',
            formatter:function (row) {
              if(row.type=='1'){
                return '登录'
              }else if(row.type=='2'){
                return '退出'
              }
            }
          },
          {
            prop: 'sceneryName',
            label: '景区',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'lonLat',
            label: '经纬度',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'ip',
            label: 'IP',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'loginType',
            label: '登录类型',
            // width: '100',
            align: 'center',
            formatter:function (row) {
              return row.loginType=='1'?'短信验证码':'人脸识别'
            }
          },
          {
            prop: 'imei',
            label: '设备IMEI',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'createDatetime',
            label: '时间',
            // width: '100',
            align: 'center'
          },
        ],
        //切换为用户日志的时候，tableTitle使用一号数组
        tableTitle1:[
          {
            prop: 'customerName',
            label: '用户名',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'customerPhone',
            label: '手机号',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'type',
            label: '事件类型',
            // width: '100',
            align: 'center',
            formatter:function (row) {
              if(row.type=='1'){
                return '登录'
              }else if(row.type=='2'){
                return '退出'
              }
            }
          },
          {
            prop: 'sceneryName',
            label: '景区',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'lonLat',
            label: '经纬度',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'ip',
            label: 'IP',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'loginType',
            label: '登录类型',
            // width: '100',
            align: 'center',
            formatter:function (row) {
              return row.loginType=='1'?'短信验证码':'人脸识别'
            }
          },
          {
            prop: 'imei',
            label: '设备IMEI',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'createDatetime',
            label: '时间',
            // width: '100',
            align: 'center'
          },
        ],
        //切换为操作员日志的时候，tableTitle使用二号数组
        tableTitle2:[
          {
            prop: 'operatorName',
            label: '操作员名称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'operatorLoginName',
            label: '登录名',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'operatorPhone',
            label: '操作员手机',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'type',
            label: '事件类型',
            // width: '100',
            align: 'center',
            formatter:function (row) {
              if(row.type=='1'){
                return '登录'
              }else if(row.type=='2'){
                return '退出'
              }
            }
          },
          {
            prop: 'ip',
            label: 'IP',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'createDatetime',
            label: '时间',
            // width: '100',
            align: 'center'
          },
        ],
        //切换为业务日志的时候，tableTitle使用三号数组
        tableTitle3:[
          {
            prop: 'businessType',
            label: '业务类型',
            // width: '100',
            align: 'center',
            formatter:function (row) {
              if(row.businessType=='1'){
                return '用户管理'
              }else if(row.businessType=='2'){
                return '操作员管理'
              }else if(row.businessType=='3'){
                return '一键关机'
              }else if(row.businessType=='4'){
                return '资源打包'
              }else if(row.businessType=='5'){
                return '资源包管理'
              }else if(row.businessType=='6'){
                return '终端设备管理'
              }else if(row.businessType=='7'){
                return '发射源管理'
              }else if(row.businessType=='8'){
                return '导游管理'
              }else if(row.businessType=='9'){
                return '游团管理'
              }
            }
          },
          {
            prop: 'actionType',
            label: '事件类型',
            // width: '100',
            align: 'center',
            formatter:function (row) {
              if(row.actionType=='1'){
                return '新建'
              }else if(row.actionType=='2'){
                return '编辑'
              }else if(row.actionType=='3'){
                return '删除'
              }else if(row.actionType=='4'){
                return '启用'
              }else if(row.actionType=='5'){
                return '禁用'
              }else if(row.actionType=='6'){
                return '操作'
              }else if(row.actionType=='99'){
                return '其他'
              }
            }
          },
          {
            prop: 'operator',
            label: '操作人员',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'dataId',
            label: '数据ID',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'message',
            label: '操作内容',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'operateResult',
            label: '操作结果',
            // width: '100',
            align: 'center',
            formatter:function (row) {
              return row.operateResult=='0'?'失败':'成功'
            }
          },
          {
            prop: 'operateDatetime',
            label: '操作时间',
            // width: '100',
            align: 'center'
          },
        ],

        tableData: [],
      }
    },
    mounted(){
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //获取默认列表信息方法
      getDefaultInfo() {

        var that = this
        var apiQueryParam = ''
        if(this.$store.state.userOrOperatorOrbusinessLog==1){
          apiQueryParam = this.apiQuery1
          this.tableTitle = [...this.tableTitle1]
        }else if(this.$store.state.userOrOperatorOrbusinessLog==2){
          apiQueryParam = this.apiQuery2
          this.tableTitle = [...this.tableTitle2]
        }else if(this.$store.state.userOrOperatorOrbusinessLog==3){
          apiQueryParam = this.apiQuery3
          this.tableTitle = [...this.tableTitle3]
        }
        this.$axios(
          {
            method: 'post',
            url: apiQueryParam,
            data: {
              "customerPhone": "",
              "sceneryName": "",
              "imei": "",
              "startDatetime": "",
              "endDatetime": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('系统用户日志的数据列表信息返回的数据', res.data)
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

      //查询按钮返回列表数据
      queryInfos(n) {
        var apiQueryParam = ''

        //以下三个变量是在不同日志状况下查询，传的对应的参数数据
        var data1={
          //用户日志
          "customerPhone": this.$store.state.userTelParam,
          "sceneryName": this.$store.state.sceneryNameParam,
          "imei": this.$store.state.imeiNumParam,
          "startDatetime": this.$store.state.myRentStartDatetimeParam,//和租用时间共用一个查询框
          "endDatetime": this.$store.state.myRentEndDatetimeParam,//和租用时间共用一个查询框
          "pageNum": this.$store.state.pageNumParam,
          "pageSize": this.$store.state.pageSizeParam,
        }
        var data2={
          "operatorName": this.$store.state.operatorNameParam,
          "operatorLoginName": this.$store.state.loginNameParam,
          "operatorPhone": this.$store.state.userTelParam,
          "startDatetime": this.$store.state.myRentStartDatetimeParam,//和租用时间共用一个查询框
          "endDatetime": this.$store.state.myRentEndDatetimeParam,//和租用时间共用一个查询框
          "pageNum": this.$store.state.pageNumParam,
          "pageSize": this.$store.state.pageSizeParam,
        }
        var data3={
          "businessType": this.$store.state.businessTypeParam,
          "operator": this.$store.state.operatorNameParam,
          "startDatetime": this.$store.state.myRentStartDatetimeParam,//和租用时间共用一个查询框
          "endDatetime": this.$store.state.myRentEndDatetimeParam,//和租用时间共用一个查询框
          "pageNum": this.$store.state.pageNumParam,
          "pageSize": this.$store.state.pageSizeParam,
        }
        var chooseData = {}

        if(this.$store.state.userOrOperatorOrbusinessLog==1){
          apiQueryParam = this.apiQuery1
          this.tableTitle = [...this.tableTitle1]
          chooseData = data1
        }else if(this.$store.state.userOrOperatorOrbusinessLog==2){
          apiQueryParam = this.apiQuery2
          this.tableTitle = [...this.tableTitle2]
          chooseData = data2
        }else if(this.$store.state.userOrOperatorOrbusinessLog==3){
          apiQueryParam = this.apiQuery3
          this.tableTitle = [...this.tableTitle3]
          chooseData = data3
        }



        this.$axios(
          {
            method: 'post',
            url: apiQueryParam,
            data: chooseData
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            // console.log('返回的数据', res.data.value.list)
            this.tableData = [...res.data.value.list]
            this.$store.state.totalParam = res.data.value.total
            // console.log('赋值的数据', this.tableData)

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
