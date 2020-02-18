<template>
  <div>
    <mySearchs
      :sign="sign"
      :imeiNum="imeiNum"
      :codeMachine="codeMachine"
      :sceneryState="sceneryState"
      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      :isImportDevice="isImportDevice"
      :isImportParam="isImportParam"
      @getExcel="getExcel"
      @importf="importf"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @clearAddInfo="clearAddInfo"
      @queryInfos="queryInfos"
      ref="mysearchs"
    >

    </mySearchs>
    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    >

    </myTables>
    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.terminalFacilitySign" width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="16" :offset="3">
              <el-form-item label="设备IMEI">
                <el-col>
                  <el-input v-model="ruleForm.imei"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item label="通讯号">
                <el-col>
                  <el-input v-model="ruleForm.phone"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item label="系统版本">
                <el-col>
                  <el-input v-model="ruleForm.version"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col>
              <div id="railMap"></div>
            </el-col>
          </el-row>

          <el-form-item>
            <!--<el-col :span="3">-->
              <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            <!--</el-col>-->
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
    name: "terminal-facility",
    data() {
      return {
        apiQuery:'/mis/terminal/query',
        apiAdd:'/mis/terminal/add',
        apiEditor:'/mis/terminal/edit',
        apiEditorGet:'/mis/terminal/get',
        apiEnable:'/mis/terminal/enable',
        apiDisable:'/mis/terminal/disable',
        apiImportDownload:'/mis/terminal/downTerminalExcelTemplate',
        apiImportUpload:'/mis/terminal/upload',
        sign: 'terminalFacility',
        imeiNum: true,//代表该页面是否显示对应的imei设备号筛选功能input框
        codeMachine: true,//代表该页面是否显示对应的机器码筛选功能input框
        sceneryState: true,//代表状态，启用禁用
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        isImportDevice: true,//显示导入设备
        isImportParam:true,


        tableTitle: [
          {
            prop: 'no',
            label: '设备编号',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'imei',
            label: '设备IMEI',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'phone',
            label: '设备通讯号码',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'version',
            label: '操作系统版本',
            width: '180',
            align: 'center'
          },
          {
            prop: 'updator',
            label: '最后更新者',
            width: '180',
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
        ruleForm: {
          "imei":"357403043690945",
          "phone":"13855654562",
          "version":" 9.0"
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
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
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
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
              "imei":'',
              "no":'',
              "status": '',
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
      //打开新增模态框之前先清空模态框内部的数据(仅限于新增的时候，编辑不做处理，而是会有默认获取对应数据的接口)
      clearAddInfo(n){
        if(n == '新增'){
          for(var i in this.ruleForm){
            this.ruleForm[i]=''
          }
        }else if(n == '编辑'){

        }


        this.$store.state.terminalFacilitySign = true
      },
      //开始提交新增信息
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
            this.$store.state.terminalFacilitySign = false
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },
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
          console.log('获取的是什么信息', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm = res.data.value

            this.$message.success('获取信息成功，可进行信息编辑')
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

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
            this.$store.state.terminalFacilitySign = false
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
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
      //导入设备前先获取对应excel模板
      getExcel(){

        this.$axios(
          {
            method:'get',
            url:this.apiImportDownload,
            data:{}
          }
        ).then(res => {
          console.log('导入设备下载模板接口获取的内容：',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.$store.state.downloadUrl = res.data.value.downUrl
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
        })
      },
      //导入设备
      importf(obj) {
        // console.log(obj)
        let _this = this;
        this.file = event.currentTarget.files[0];
        var rABS = false; //是否将文件读取为二进制字符串
        var file = this.file;

        // FileReader.prototype.readAsBinaryString = function (f) {
        //   var binary = "";
        //   var rABS = false; //是否将文件读取为二进制字符串
        //   var pt = this;
        //   var workbook; //读取完成的数据
        //   var reader = new FileReader();
        //   reader.onprogress = function (e) {
        //     let total = file.size;
        //     _this.progress = (e.loaded / total) * 100;
        //     console.log(_this.progress);
        //   };
        //   reader.onload = function (e) {
        //     try {
        //       var bytes = new Uint8Array(reader.result);
        //       var length = bytes.byteLength;
        //       for (var i = 0; i < length; i++) {
        //         binary += String.fromCharCode(bytes[i]);
        //       }
        //       if (rABS) {
        //         workbook = XLSX.read(btoa(fixdata(binary)), { //手动转化
        //           type: 'base64'
        //         });
        //       } else {
        //         workbook = XLSX.read(binary, {
        //           type: 'binary'
        //         });
        //       }
        //     } catch (e) {
        //       console.log('文件类型不正确');
        //       _this.$message.warning('导入数据失败')
        //       return;
        //     }
        //     var fromTo = '';
        //     for (var sheet in workbook.Sheets) {
        //       if (workbook.Sheets.hasOwnProperty(sheet)) {
        //         fromTo = workbook.Sheets[sheet]['!ref'];
        //         _this.excelData = (XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
        //       }
        //     }
        //     _this.tableDataAdd = []
        //
        //     for (let j = 0; j < _this.excelData.length; j++) {
        //       //将伪json格式数据转化为标准json格式数据
        //       _this.tableDataAdd.push(
        //         {
        //           version: _this.excelData[j]['操作系统版本'],
        //           imei: _this.excelData[j]['设备IMEI'],
        //           phone: _this.excelData[j]['设备通讯号码'],
        //
        //         }
        //       )
        //     }
        //     //更新表格数据，将新导入的excel数据数组添加到原来表格数据数组中去，形成新的表格数据
        //     _this.tableData = _this.tableData.concat(_this.tableDataAdd)
        //
        //     console.log(_this.excelData);
        //     console.log('数据已经导入了哦')
        //
        //     _this.$message.success('导入数据成功')
        //   };
        //
        //   reader.readAsArrayBuffer(f);
        //
        // }

        // var reader = new FileReader();
        // if (rABS) {
        //   reader.readAsArrayBuffer(file);
        // } else {
        //   reader.readAsBinaryString(file);
        // }
        // 以上的代码内容是纯前端实现导入数据之后的暂时数据回显

        //接下来的代码内容是直接将文档file传给后台保存，以便刷新后数据依旧存在
        //以下formdata的增加是调用后台接口是需要传入对应的参数用的
        // console.log('this.file:',this.file)
        var formdata = new FormData
        formdata.append('file',this.file)
        // console.log('formdata:',formdata)
        //以上formdata的增加是为了传给后台保存
        this.$axios(
          {
            method:'post',
            url:this.apiImportUpload,
            data:formdata
          }
        ).then(res => {
        console.log('到底传成功没有',res.data)
        }).catch(error => {

        })


      },
      //导入设备（上传excel）

      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "imei":this.$store.state.imeiNumParam,
              "no":this.$store.state.codeMachineParam,
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
            // alert('submit!');
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
        this.$store.state.terminalFacilitySign = false

      },


    }
  }
</script>

<style scoped>

</style>
