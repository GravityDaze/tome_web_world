<template>
  <div>
    <mySearchs
      :affiliatedScenery="affiliatedScenery"
      :affiliatedSceneryRRR="affiliatedSceneryRRR"
      :userTel="userTel"
      :sosTime="sosTime"
      :imeiNum="imeiNum"
      :isSureMessage="isSureMessage"
      :isSosDispose="isSosDispose"
      @queryInfos="queryInfos"
      @sureMessage="sureMessage"
    ></mySearchs>
    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowSosSure="isShowSosSure"
      :isShowEnabled="isShowEnabled"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    ></myTables>

    <div id="userInfoForm">
      <el-dialog title="求救处理" :visible.sync="$store.state.sosDisposeSign" width="25%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="24">
              <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}" v-model="ruleForm.messageInfos"></el-input>
            </el-col>

          </el-row>
          <el-form-item>
            <el-col :span="9" :offset="12">
              <el-button @click="cancelForm('ruleForm')">取消</el-button>
              <el-button type="warning" @click="submitForm('ruleForm')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sos-manage",
    data() {
      return {
        apiQuery:'/mis/sos/query',
        apiSureMessage:'/mis/sos/confirm',
        apiSosDispose:'mis/sos/dealSos',
        userTel: true,
        sosTime: true,//呼救时间
        imeiNum: true,
        affiliatedScenery: false,//代表所属景区
        affiliatedSceneryRRR: true,//归属景区
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        isSureMessage:true,
        isSosDispose:true,
        isShowSosSure:true,
        isShowEnabled:true,
        tableTitle: [
          {
            prop: 'sceneryName',
            label: '所属景区',
            width: '100',
            align: 'center'
          },
          {
            prop: 'phone',
            label: '游客手机',
            // width: '80',
            align: 'center'
          },
          {
            prop: 'imei',
            label: '设备IMEI',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sosType',
            label: '求救方式',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sosDateTime',
            label: '求救时间',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'touristTeamNo',
            label: '游团编码',
            width: '100',
            align: 'center'
          },

          {
            prop: 'guidePhone',
            label: '导游手机号',
            width: '100',
            align: 'center'
          },

          {
            prop: 'result',
            label: '处理结果',
            width: '100',
            align: 'center'
          },
          {
            prop: 'updator',
            label: '最后更新者',
            width: '90',
            align: 'center'
          },
          {
            prop: 'updateDatetime',
            label: '更新时间',
            // width: '180',
            align: 'center'
          },
          {
            prop: 'confirmDateTime',
            label: '确认时间',
            width: '100',
            align: 'center'
          },
        ],
        tableData: [],
        ruleForm: {
          messageInfos:''
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
              "sceneryName":"",//归属景区名称
              "phone":"",//游客手机号
              "sosDateTime":"",//sos求救时间
              "imei":"",//imei号码
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

            console.log('赋值的数据', this.tableData)
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //确认处理消息时都需要先获取相关信息id
      chooseInfo(n) {
        console.log('到底会给我什么样的信息呢',n)
        this.commonId = n.id
        this.ruleForm.messageInfos = n.result
        // this.commonUserId = n.no
      },
      //确认消息事件
      sureMessage(){
        this.$axios(
          {
            method:'post',
            url:this.apiSureMessage+'?id='+this.commonId,
            data:{}
          }
        ).then(res => {
          console.log(res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
      //求救处理事件
      sosDispose(){
        this.$axios(
          {
            method:'post',
            url:this.apiSosDispose,
            data:{
              id:this.commonId,
              result:this.ruleForm.messageInfos
            }
          }
        ).then(res => {
          if(res.data.resultStatus.resultCode === '0000'){
            this.$store.state.sosDisposeSign = false
            this.getDefaultInfo()
          }else {
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
              "sceneryName":this.$store.state.affiliatedSceneryRRRParam,//归属景区名称
              "phone":this.$store.state.userTelParam,//游客手机号
              "sosDateTime":this.$store.state.sosTimeParam,//sos求救时间
              "imei":this.$store.state.imeiNumParam,//imei号码
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

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.sosDispose()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancelForm(formName) {
        this.$refs[formName].resetFields();
        this.$store.state.sosDisposeSign = false

      },

    }
  }
</script>

<style scoped>

</style>
