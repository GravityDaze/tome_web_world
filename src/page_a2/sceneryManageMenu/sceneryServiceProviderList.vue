<template>
  <div>
    <mySearchs
      :sign="sign"
      :loginName="loginName"
      :serviceProviderName="serviceProviderName"
      :isAdd="isAdd"
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
      @getEditorInfos="getEditorInfos"
      @delListInfo="delListInfo"
    >
    </myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.sceneryServiceProviderListSign2"
                 width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="23">
              <el-form-item label="景区服务商">
                <el-col>
                  <el-input v-model="ruleForm.Name" placeholder="请输入景区服务商"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="登录名">
                <el-col>
                  <el-input v-model="ruleForm.UserAccount" placeholder="请输入登录名"></el-input>
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
            <!--<el-col :span="23">-->
            <!--<el-form-item label="是否可展示">-->
            <!--<el-radio-group v-model="ruleForm.showTypeInfo">-->
            <!--<el-radio label="可以展示"></el-radio>-->
            <!--<el-radio label="不可展示"></el-radio>-->
            <!--</el-radio-group>-->

            <!--</el-form-item>-->
            <!--</el-col>-->


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
    name: "scenery-service-provider-list",
    data() {
      return {
        sign: 'sceneryServiceProviderList2',
        // sceneryServiceProviderListSign2:true,
        apiQuery2: '/a2guider/travelGency/query',
        apiAdd2: '/a2guider/travelGency/add',
        apiEditor2: '/a2guider/travelGency/update',
        apiDel2: 'a2guider/travelGency/delete',
        loginName: true,
        serviceProviderName: true,
        isAdd: true,
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
            align: 'center'
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
          //   ID: '101',
          //   Name: '四姑娘山服务商',
          //   UserAccount: '印度阿三',
          //   DeviceCount: 108,
          //   OnlineCount: 98,
          //   OfflineCount: 10,
          //   DutyName: '一号联系人',
          //   DutyPhone: '13345811137',
          //   Address: '印度某角落'
          // }
        ],
        ruleForm: {
          "Name": "",
          "UserAccount": "",
          "UserPwd": "",
          "Address": "",
          "DutyName": "",
          "DutyPhone": "",
          "lngLat": ""
        },
        rules: {
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },

      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.$store.state.isShowAlert = false
      this.$store.state.addparamsss = false

      this.getDefaultInfo()
    },
    methods: {
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
          console.log('A2统计返回+', res.data)
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

      //点击编辑时获取默认的对应相关信息
      getEditorInfos(n) {
        console.log('jiajia', n)
        this.$store.state.titleHeader = '编辑'
        n.lngLat = n.LngBD09ll + ',' + n.LatBD09ll
        this.ruleForm = n

      },

      //点击删除按钮事件
      delListInfo(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiDel2 + '?travelGencyId=' + n.ID,
            data: {}
          }
        ).then(res => {
          console.log('A2删除', res.data)
          if (res.data.resultStatus.resultCode === '0000') {

            this.getDefaultInfo()

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        })

      },

      //获取坐标点
      getLonLatInfo() {
        window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html')
      },


      //开始提交新增信息
      addInfo() {
        console.log('开始提交新增信息')
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd2,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.sceneryServiceProviderListSign2 = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //开始提交编辑信息
      editorInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiEditor2,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('编辑的信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.sceneryServiceProviderListSign2 = false
            this.getDefaultInfo()

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // if (this.$store.state.titleHeader === '新增') {
            //   this.addInfo()
            // } else if (this.$store.state.titleHeader === '编辑') {
            //   this.editorInfo()
            // }

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
        this.$store.state.sceneryServiceProviderListSign2 = false
      },
    }
  }
</script>

<style scoped>

</style>
