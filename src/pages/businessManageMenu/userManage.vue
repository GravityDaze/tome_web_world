<template>
  <div>
    <mySearchs
      :sign="sign"
      :userTel="userTel"
      :userSerialNum="userSerialNum"
      :registerDate="registerDate"
      :sceneryState="sceneryState"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isUserSerialNum="isUserSerialNum"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
      @getDefaultNewPageInfo="getDefaultNewPageInfo"
    ></myTables>
    <myTablesDialog
      :tableTitleDialog="tableTitleDialog"
      :tableDataDialog="tableDataDialog"
      :ruleFormNewPage="ruleFormNewPage"
      :titleList="titleList"
      :sign="sign"
      @getNewPageInfo="getNewPageInfo"
    ></myTablesDialog>

  </div>
</template>

<script>
  export default {
    name: "user-manage",
    data() {
      return {
        apiQuery:'/uc/customer/query',
        apiEnable:'/uc/customer/enable',
        apiDisable:'/uc/customer/disable',
        apiUserInfos:'uc/customer/get',
        apiUseTerminalInfoList:'/uc/customer/queryCustomerUseTerminalList',
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        commonUserId: '',//代表用户编号此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        sign: 'userManageSign',
        userTel: true,
        userSerialNum: true,
        registerDate: true,
        isUserSerialNum: true,
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        sceneryState: true,
        tableTitle: [
          {
            prop: 'id',
            label: '用户ID',
            width: '100',
            align: 'center'
          },
          {
            prop: 'realName',
            label: '真实姓名',
            width: '100',
            align: 'center'
          },
          {
            prop: 'nickName',
            label: '昵称',
            width: '100',
            align: 'center'
          },
          {
            prop: 'phone',
            label: '手机号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sex',
            label: '性别',
            width: '100',
            align: 'center',
            formatter:function (row) {
              return row.sex == '0'?'女':'男'
            }
          },
          {
            prop: 'registerIp',
            label: '注册IP',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'lastLoginDatetime',
            label: '最后登录时间',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'updateDatetime',
            label: '更新时间',
            // width: '180',
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
        titleList: [
          {
            id: 1,
            title: '用户信息'
          },
          {
            id: 2,
            title: '设备使用信息'
          }
        ],
        //此参数表示点击对应tables里面的详情信息时，呈现的信息内容对象
        ruleFormNewPage: {
          userId:'',
          userSerialNum:'',
          nickname:'',
          userTel:'',
          email:'',
          userSex:'',
          reallyName:'',
          identificationId:'',
          registerIp:'',
          registerImei:'',
          registerTime:'',
          updateTime:'',
          lastOnlineTime:'',
          state:'',
        },

      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "phone":"",//手机号
              "no":"",//用户编号
              "createDatetime ":"",//注册时间
              "status":"",//状态
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            // console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]

            // console.log('赋值的数据', this.tableData)
            that.$store.state.showLoading = false
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //禁用启用都需要先获取相关信息id
      chooseInfo(n) {
        console.log('到底会给我什么样的信息呢',n)
        this.commonId = n.id
        this.commonUserId = n.no
      },
      //启用
      enableInfo() {
        // alert('你选择了继续操作哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiEnable + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

          // console.log(res.data,'前面是后台返回的启用之后的信息')
        }).catch(error => {

        })
      },
      //禁用
      disableInfo() {
        // alert('你选择了继续操作哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiDisable + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },
      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "phone":this.$store.state.userTelParam,//手机号
              "no":this.$store.state.userSerialNumParam,//用户编号
              "createDateTime":this.$store.state.registerDateParam,//注册时间
              "status":this.$store.state.sceneryStateParam,//状态
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
      //点击详情页面里面的tabs按钮获取详情接口
      getNewPageInfo(n) {
        console.log('触发了父级事件哦', n)
        var k = 0
        if (n) {
          k = n
        } else {
          k = 0
        }
        if (k == 0) {
          this.$axios(
            {
              method: 'post',
              url: this.apiUserInfos + '?id=' + this.commonId,
              data: {}
            }
          ).then(res => {
            console.log(res.data)
            if (res.data.resultStatus.resultCode === '0000') {

            }

          }).catch(error => {

          })
        } else{
          alert('其实我要掉1接口,用户详情-设备使用信息列表')
          var requestApi=''
          if(k==1){
            //用户详情-设备使用信息列表
            requestApi =this.apiUseTerminalInfoList
          }

          this.$axios(
            {
              method: 'post',
              url: requestApi,
              data: {
                "customerNo": this.commonUserId,
                "pageNum": 1,
                "pageSize": 10000
              }
            }
          ).then(res => {
            console.log('复杂数据', res.data.value)
            //for in 是为了循环出表头
            var obj = res.data.value.cnHeads
            var arr = []
            for (var t in obj) {
              var needJson = {
                prop: '',
                label: '',
                align: 'center'
              }
              needJson.prop = t
              needJson.label = obj[t]
              arr.push(needJson)
            }
            console.log('到底是什么鬼', arr)
            this.tableTitleDialog = [...arr]
            this.tableDataDialog = [...res.data.value.list]

          }).catch(error => {

          })
        }
      },
      //默认第一初始化对应景区的详情数据获取事件（通过点击景区编码触发）
      getDefaultNewPageInfo(n) {
        console.log('触发了父级事件哦，获取用户详情', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiUserInfos + '?id=' + n,
            data: {}
          }
        ).then(res => {
          console.log('获取用户详情',res.data)
          if (res.data.resultStatus.resultCode === '0000') {

            this.ruleFormNewPage.userId = res.data.value.id
            this.ruleFormNewPage.userSerialNum = res.data.value.no
            this.ruleFormNewPage.nickname = res.data.value.nickName
            this.ruleFormNewPage.userTel = res.data.value.phone
            this.ruleFormNewPage.email = res.data.value.email
            this.ruleFormNewPage.userSex = res.data.value.sex == '1'?'男':'女'
            this.ruleFormNewPage.reallyName = res.data.value.realName
            this.ruleFormNewPage.identificationId = res.data.value.credentialsNumber
            this.ruleFormNewPage.registerIp = res.data.value.registerIp
            this.ruleFormNewPage.registerImei = res.data.value.imei
            this.ruleFormNewPage.registerTime = res.data.value.createDatetime
            this.ruleFormNewPage.lastOnlineTime = res.data.value.lastLoginDatetime
            this.ruleFormNewPage.state = res.data.value.status == '1'?'启用':'禁用'

            this.ruleFormNewPage.updateTime = res.data.value.updateDatetime

            this.$store.state.isShowTablesDialog = true

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      }
    }
  }
</script>

<style scoped>

</style>
