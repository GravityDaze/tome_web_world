<template>
  <div>
    <mySearchs
      :sign="sign"
      :serviceProviderSerialNum="serviceProviderSerialNum"
      :serviceProviderName="serviceProviderName"
      :serviceProviderLinkMan="serviceProviderLinkMan"
      :sceneryState="sceneryState"

      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    ></myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.sceneryServiceProviderSign" width="30%"
                 align="left" :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="服务商名称">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="负责人">
                <el-col>
                  <el-input v-model="ruleForm.chargeName"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="负责人电话">
                <el-col>
                  <el-input v-model="ruleForm.chargePhone"></el-input>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="联系地址">
                <el-col>
                  <el-input type="textarea" :autosize="{minRows:3,maxRows:6}" v-model="ruleForm.address"></el-input>
                </el-col>
              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item>
            <el-col :span="10" :offset="6" style="display: flex;flex-wrap: nowrap">
              <el-button @click="cancelForm('ruleForm')">关闭</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "scenery-service-provider",
    data() {
      return {
        apiQuery: '/mis/sceneryService/query',
        apiEditorGet: '/mis/sceneryService/get',
        apiAdd: '/mis/sceneryService/add',
        apiEditor: '/mis/sceneryService/edit',
        apiEnable: '/mis/sceneryService/enable',
        apiDisable: '/mis/sceneryService/disable',
        sign: 'sceneryServiceProviderSign',
        serviceProviderSerialNum: true,
        serviceProviderName: true,
        serviceProviderLinkMan: true,
        sceneryState: true,
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮

        tableTitle: [
          {
            prop: 'no',
            label: '服务商编号',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'name',
            label: '服务商名称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'chargeName',
            label: '负责人姓名',
            width: '90',
            align: 'center'
          },
          {
            prop: 'chargePhone',
            label: '负责人电话',
            // width: '100',
            align: 'center'
          },

          {
            prop: 'address',
            label: '联系地址',
            // width: '100',
            align: 'center'
          },

          {
            prop: 'updator',
            label: '最后更新者',
            // width: '90',
            align: 'center'
          },
          {
            prop: 'updateDatetime',
            label: '更新时间',
            width: '180',
            align: 'center'
          },
        ],
        tableData: [],
        ruleForm: {
          name: '',
          chargeName: '',
          chargePhone: '',
          address: '',
        },
        rules: {
          reallyName: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          affiliatedOrganization: [
            {required: true, message: '请选择所属机构', trigger: 'change'}
          ],
          sureSex: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          userTel: [
            {required: true, message: '请填写联系电话', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],

        }

      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //编辑信息前先获取相关信息
      chooseInfo(n) {
        // console.log('到底会给我什么样的信息呢',n)
        this.commonId = n.id
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGet + '?id=' + n.id,
            data: {}
          }
        ).then(res => {
          console.log('嘻嘻获取的是什么信息', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm = res.data.value
            this.ruleForm.areaName = res.data.value.parentName


            this.$message.success('获取信息成功，可进行信息编辑')
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },

      //新增信息
      addInfo() {
        console.log('开始提交新增信息')
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.sceneryServiceProviderSign = false
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },
      //编辑信息之后提交信息
      editorInfo() {
        console.log('开始提交编辑信息')
        this.$axios(
          {
            method: 'post',
            url: this.apiEditor,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.sceneryServiceProviderSign = false
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
      //服务商启用
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
      //服务商禁用
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

      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "no": "",
              "name": "",
              "chargeName": "",
              "status": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('景区服务商管理返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            console.log('返回的数据', that.$store.state.totalParam)
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

      //查询按钮返回列表数据
      queryInfos(n) {

        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "no":this.$store.state.serviceProviderNoParam,
              "name": this.$store.state.serviceProviderNameParam,
              "chargeName": this.$store.state.serviceProviderLinkManParam,
              "status": this.$store.state.sceneryStateParam,
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
            if (this.$store.state.titleHeader === '新增') {
              this.addInfo()
            } else if (this.$store.state.titleHeader === '编辑') {
              this.editorInfo()
            }
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
        this.$store.state.sceneryServiceProviderSign = false
      },

    }
  }
</script>

<style scoped>

</style>
