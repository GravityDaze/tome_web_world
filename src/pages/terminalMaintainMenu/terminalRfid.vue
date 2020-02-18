<template>
  <div>
    <mySearchs
      :sign="sign"
      :affiliatedScenery="affiliatedScenery"
      :affiliatedSpot="affiliatedSpot"
      :rfidSerialNum="rfidSerialNum"
      :rfidType="rfidType"
      :reset="reset"
      :sceneryState="sceneryState"
      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      :isImportRfid="isImportRfid"
      :isImportParam="isImportParam"
      @getExcel="getExcel"
      @importf="importf"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @clearAddInfo="clearAddInfo"
      @queryInfos="queryInfos"
      ref="mysearchs"
    ></mySearchs>
    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowAudio="isShowAudio"
      :isShowVideo="isShowVideo"
      :isInstallPlace="isInstallPlace"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    >
    </myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.terminalRfidSign" width="50%" align="left" :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="10">
              <el-form-item label="发射源类型">
                <el-col class="select_style">
                  <el-select v-model="ruleForm.type" placeholder="请选择发射源类型" class="select_style1">
                    <el-option label="RFID" value="1"></el-option>
                    <el-option label="位置版" value="2"></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="发射源编号">
                <el-col>
                  <el-input v-model="ruleForm.no"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="发射源名称">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="10" :offset="3">
              <el-form-item label="播报半径">
                <el-col>
                  <el-input v-model="ruleForm.radius"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="安装位置">
                <el-col>
                  <el-input v-model="ruleForm.installLocation"></el-input>
                </el-col>

              </el-form-item>
            </el-col>


            <el-col :span="10">
              <el-form-item label="是否复位源">
                <el-radio-group v-model="ruleForm.isReset">
                  <el-radio label="是"></el-radio>
                  <el-radio label="否"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3" v-if="ruleForm.type=='2'">
              <el-form-item label="海拔高度">
                <el-col>
                  <el-input v-model="ruleForm.altitude"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="10" :offset="3" v-if="ruleForm.type=='1'">
              <el-form-item label="安装位置图片">
                <el-col class="position_center up_img_icon_place">
                  <div>
                    <div class="upload_header"
                         :style="{backgroundImage:'url('+ruleForm.installPictureUrl+')',backgroundSize:'100% 100%'}"></div>
                    <input class="upload_input my_hover" type="file" @change="chooseHeaderPicture2">
                  </div>

                </el-col>

                <el-col class="position_center">
                  <span class="tip_info">推荐尺寸为 64(宽) * 64(高)，大小不超过 50KB</span>
                </el-col>
              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item>
            <!--<el-col :span="3">-->
              <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            <!--</el-col>-->
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
    name: "terminal-rfid",
    data() {
      return {
        apiUploadImage: '/mis/upload/uploadImage',
        apiQuery:'/mis/launchSource/query',
        apiAdd:'/mis/launchSource/add',
        apiEditor:'/mis/launchSource/edit',
        apiEditorGet:'/mis/launchSource/get',
        apiEnable:'/mis/launchSource/enable',
        apiDisable:'/mis/launchSource/disable',
        apiImportDownload:'/mis/launchSource/downLaunchSourceExcelTemplate',
        apiImportUpload:'/mis/launchSource/upload',
        sign:'terminalRfid',
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        imageUrl: '',
        affiliatedScenery:false,
        affiliatedSpot:false,
        rfidSerialNum: true,//发射源编号
        rfidType:true,//发射源类型
        reset:true,//是否复位点
        sceneryState:true,
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        isImportRfid:true,//导入发射源
        isImportParam:true,//下载模板
        isShowAudio:false,//是否显示下载音频
        isShowVideo:false,//是否显示下载视频
        isInstallPlace:true,//是否显示安装位置

        tableTitle: [

          {
            prop: 'no',
            label: '发射源编号',
            // width: '90',
            align: 'center'
          },
          {
            prop: 'name',
            label: '发射源名称',
            // width: '100',
            align: 'center'
          },
          // {
          //   prop: 'affiliatedScenery',
          //   label: '所属景区',
          //   width: '100',
          //   align: 'center'
          // },
          // {
          //   prop: 'affiliatedSpot',
          //   label: '所属景点',
          //   width: '100',
          //   align: 'center'
          // },
          {
            prop: 'type',
            label: '发射源类型',
            // width: '100',
            align: 'center',
            formatter:function (row) {
              return row.type == '1'? 'rfid':'位置版'
            }
          },
          {
            prop: 'radius',
            label: '播报半径(米)',
            // width: '90',
            align: 'center'
          },
          {
            prop: 'altitude',
            label: '海拔高度(米)',
            width: '90',
            align: 'center'
          },
          {
            prop: 'lonLat',
            label: '坐标',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'isReset',
            label: '复位点',
            width: '70',
            align: 'center',
            formatter:function (row) {
              return row.isReset == '0'?'否':'是'
            }
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
            // width: '140',
            align: 'center'
          },
        ],
        tableData: [
          {
            no: 'E00000001',
            name: '青城山大门RFID01',
            affiliatedScenery: '青城山',
            affiliatedSpot: '老君阁',
            type: '位置版',
            reportRadius: '15',
            altitude: '3200',
            installLocation: '老君阁假山下',
            installPictureUrl: '',
            lonLat: '106,39',
            audio: '1005.mp3',
            video: '1005.mp4',
            isReset: '',
            updator: '张大宝',
            updateDatetime: '2019-5-14 17:47:48',
            status: 1,//是否启用状态
            // imgUrl:[
            //   '../../../static/logos.png',
            //   '../../../static/logo.png',
            //   '../../../static/timg.gif'
            // ]
          },
        ],

        ruleForm: {
          "no":"",
          "name":"",
          "type":"",
          "radius":"",
          "installLocation":"",
          "installPictureUrl":"",
          "altitude":"",
          "isReset":""

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

      //上传位置图片
      chooseHeaderPicture2(e) {
        this.ruleForm.installPictureUrl = e.target.files[0]
        var formdata = new FormData()
        formdata.append('file', this.ruleForm.installPictureUrl)
        this.$axios(
          {
            method: 'post',
            url: this.apiUploadImage,
            data: formdata
          }
        ).then(res => {
          console.log('景区图层管理上传图片返回了什么', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm.installPictureUrl = res.data.value.url
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
              "no":'',
              "type":'',
              "isReset":'',
              "status": '',
              "pageNum": 1,
              // "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('返回的数据', res.data, res.data.value.total)
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
      //打开新增模态框之前先清空模态框内部的数据(仅限于新增的时候，编辑不做处理，而是会有默认获取对应数据的接口)
      clearAddInfo(n){
        if(n == '新增'){
          for(var i in this.ruleForm){
            this.ruleForm[i]=''
          }
          this.ruleForm.isReset = '是'
        }else if(n == '编辑'){

        }


        this.$store.state.terminalRfidSign = true
      },
      //开始提交新增信息
      addInfo() {
        console.log('开始提交新增信息')
        this.ruleForm.isReset = this.ruleForm.isReset == '否'?'0':'1'
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.terminalRfidSign = false
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
            this.ruleForm.isReset = res.data.value.isReset =='0'?'否':'是'

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
        this.ruleForm.isReset = this.ruleForm.isReset =='否'?'0':'1'
        this.$axios(
          {
            method: 'post',
            url: this.apiEditor,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.terminalRfidSign = false
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
        //           no: _this.excelData[j]['发射源编号（可空）'],
        //           name: _this.excelData[j]['发射源名称'],
        //           type: _this.excelData[j]['发射源类型（RFID/SITE）'],
        //           radius: _this.excelData[j]['播放半径（可空）'],
        //           altitude: _this.excelData[j]['海拨（可空）'],
        //           installLocation: _this.excelData[j]['放置位置（可空）'],
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

      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "no":this.$store.state.rfidSerialNumParam,
              "type":this.$store.state.rfidTypeParam,
              "isReset":this.$store.state.isResetParam,
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
        this.$store.state.terminalRfidSign = false
      },
      //element单张上传图片自带方法函数等，如下
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

    }
  }
</script>

<style scoped>
  .up_img_icon_place {
    /*border:1px solid green;*/
    padding: 0 1.05rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
</style>
