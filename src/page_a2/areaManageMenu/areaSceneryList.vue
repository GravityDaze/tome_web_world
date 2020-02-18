<template>
  <div>
    <mySearchs
      :loginName="loginName"
      :serviceProviderName="serviceProviderName"
      @queryInfos="queryInfos"
    >
    </mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowEnabled="isShowEnabled"
      :isHandle="isHandle"
      @queryInfos="queryInfos"
      @delListInfo="delListInfo"
      @getEditorInfos="getEditorInfos"
    >
    </myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.areaSceneryList2"
                 width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="23">
              <el-form-item label="景区服务商">
                <el-col>
                  <el-input v-model="ruleForm.Name" placeholder="请输入景区服务商" :disabled='true'></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="登录名">
                <el-col>
                  <el-input v-model="ruleForm.UserAccount" placeholder="请输入登录名" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="登录密码">
                <el-col>
                  <el-input v-model="ruleForm.UserPwd" placeholder="请输入登录密码"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="通讯地址">
                <el-col>
                  <el-input v-model="ruleForm.Address" placeholder="请输入通讯地址"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="负责人">
                <el-col>
                  <el-input v-model="ruleForm.DutyName" placeholder="请输入负责人姓名"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="负责人电话">
                <el-col>
                  <el-input v-model="ruleForm.DutyPhone" placeholder="请输入负责人电话"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="经纬度">
                <el-col :span="20">
                  <el-input v-model="ruleForm.lngLat" placeholder="例如:104.313456,33.269869"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-button type="warning" @click="getLonLatInfo">拾取坐标</el-button>
                </el-col>

              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-col :span="9" :offset="12">
              <el-button @click="cancelForm('ruleForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "area-scenery-list",
    data() {
      return {
        sign: 'areaSceneryList2',
        apiQuery2:'/a2guider/travelGency/areaQuery',
        apiEditor2:'/a2guider/travelGency/update',
        apiDel2:'/a2guider/travelGency/delete',
        loginName: true,
        serviceProviderName: true,
        isShowEnabled: true,
        isHandle: true,
        tableTitle: [
          {
            prop: 'ID',
            label: '景区服务商ID',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'Name',
            label: '景区服务商名称',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'UserAccount',
            label: '登录名',
            // width: '120',
            align: 'center'
          },

          {
            prop: 'DeviceCount',
            label: '设备总数',
            // width: '120',
            align: 'center',
          },

          {
            prop: 'OnlineCount',
            label: '在线总数',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'OfflineCount',
            label: '离线总数',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'DutyName',
            label: '负责人姓名',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'DutyPhone',
            label: '负责人电话',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'Address',
            label: '通讯地址',
            // width: '120',
            align: 'center'
          },
        ],
        tableData: [
          // {
          //   "Address": "dsd",
          //   "Name": "2019091602",
          //   "ID": 1261,
          //   "Status": 1,
          //   "OnlineCount": 0,
          //   "OfflineCount": 0,
          //   "LatBD09ll": 37.89787,
          //   "UserAccount": "20190916test5",
          //   "LngBD09ll": 108.97868,
          //   "DeviceCount": 0,
          //   "ComplainPhone": null,
          //   "DutyName": "dd",
          //   "DutyPhone": "152635400123"
          //
          // }
        ],
        ruleForm: {
          "ID": "",
          "Name": "",
          "UserAccount": "",
          "UserPwd": "",
          "Address": "",
          "DutyName": "",
          "DutyPhone": "",
          "lngLat": ""
        },

      }
    },
    mounted(){
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.$store.state.isShowAlert = false
      this.$store.state.addparamsss = false
      this.getDefaultInfo()
    },
    methods: {
      //获取坐标点
      getLonLatInfo() {
        window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html')
      },

      //点击删除按钮事件
      delListInfo(n){
        console.log('删除N信息是：',n)
        this.$axios(
          {
            method:'post',
            url:this.apiDel2 + '?travelGencyId=' + n.ID,
            data:{}
          }
        ).then(res => {
          console.log('A2删除',res.data)
          if(res.data.resultStatus.resultCode === '0000'){

            this.getDefaultInfo()

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        })

      },

      //编辑时默认先获取之前的信息
      getEditorInfos(n){
        console.log('点击编辑时能够获取到什么',n)
        this.ruleForm.ID = n.ID
        this.ruleForm.Name = n.Name
        this.ruleForm.UserAccount = n.UserAccount
        this.ruleForm.Address = n.Address
        this.ruleForm.DutyName = n.DutyName
        this.ruleForm.DutyPhone = n.DutyPhone
        this.ruleForm.lngLat = n.LngBD09ll + ',' + n.LatBD09ll

        this.isChange1 = n.Name

        this.$store.state.areaSceneryList2 = true
        this.$store.state.titleHeader = '编辑'

      },

      //提交编辑信息
      editorInfo(){

        //如果编辑时，可以选择景区服务商那么久需要注释的这段代码，此处是静止选择所有不要
        // if( this.ruleForm.Name != this.isChange1){
        //   this.ruleForm.ID = this.ruleForm.Name
        // }

        this.$axios(
          {
            method:'post',
            url:this.apiEditor2,
            data:this.ruleForm
          }
        ).then(res => {
          console.log('提交编辑信息',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.$store.state.areaSceneryList2 = false
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },

      getDefaultInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "Name": "",
              "UserAccount": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('pianqujingquliebiao统计返回+', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.totalParam = res.data.value.total
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
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "UserAccount": this.$store.state.loginNameParam,
              "Name": this.$store.state.serviceProviderNameParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('返回的数据', res.data.value.list)
            if (res.data.value.length == '0') {
              this.tableData = []
              this.$store.state.totalParam = 0
            } else {
              this.tableData = [...res.data.value.list]
              this.$store.state.totalParam = res.data.value.total
            }

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

            if (formName === 'ruleForm') {

              if (this.$store.state.titleHeader === '新增') {
                this.addInfo()
              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfo()
              }

            }


          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancelForm(formName) {
        this.$refs[formName].resetFields();
        this.$store.state.areaSceneryList2 = false
      },
    }
  }
</script>

<style scoped>

</style>
