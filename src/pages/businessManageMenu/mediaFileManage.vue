<template>
  <div>
    <mySearchs
      :sign="sign"
      :mediaFileSerialNum="mediaFileSerialNum"
      :mediaFileName="mediaFileName"
      :mediaType="mediaType"
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
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isDownFileName="isDownFileName"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    ></myTables>
    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.mediaFileManageSign" width="30%" align="left" :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="18" :offset="2">
              <el-form-item label="媒体类型">
                <el-col class="select_style">
                  <!--<el-select v-model="ruleForm.mediaType" placeholder="请选择媒体类型" class="select_style1">-->
                    <!--<el-option label="音频文件" value="audio"></el-option>-->
                    <!--<el-option label="视频文件" value="video"></el-option>-->
                  <!--</el-select>-->

                  <el-select v-model="ruleForm.type" placeholder="请选择媒体类型">
                    <el-option
                      v-for="item in mediaTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>

                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="媒体名称">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="19" :offset ="2">
              <el-form-item label="上传文件">
                <el-col :span="15">
                  <el-input v-model="ruleForm.originalName"></el-input>
                </el-col>
                <el-col :span="7" style="text-align: center;display: flex;">
                  <!--注释的是限制上传类型只能是图片类型，没有accept就允许所有类型-->
                  <!--<input type="file" accept="image/*" @change="upMediaInfos" ref="file" multiple="multiple">-->
                  <input type="file" @change="upMediaInfos" ref="file" multiple="multiple">
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="媒体文件">
                <el-col>
                  <el-input v-model="ruleForm.fileName"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="备注">
                <el-col>
                  <el-input type="textarea" :disabled="true" :autosize="{ minRows: 4, maxRows: 6}" v-model="ruleForm.mediaFileRemark"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item>
            <!--<el-col :span="6">-->
              <!--<el-button>上传媒体文件</el-button>-->
            <!--</el-col>-->
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
    name: "media-file-manage",
    data() {
      return {
        mediaTypeGive:'',//传给后台时在key后面加上资源类型是mp3还是mp4
        apiMediaUpUrl:'/mis/upload/uploadAudioOrVideo',
        apiQuery:'/mis/mediaFile/queryMediaFileList',
        apiAdd:'/mis/mediaFile/add',
        apiEditor:'/mis/mediaFile/edit',
        apiEditorGet:'/mis/mediaFile/getMediaFileInfo',
        apiEnable:'/mis/mediaFile/enable',
        apiDisable:'/mis/mediaFile/disable',
        sign:'mediaFileManageSign',
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        mediaFilesInfo:'',//点击文件上传input框获取到的初始信息
        mediaFileSerialNum: true,//媒体文件编号
        mediaFileName: true,
        mediaType: true,
        sceneryState: true,//代表状态，启用禁用
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮

        isDownFileName: true,//table中是否显示+下载+媒体文件名列
        tableTitle: [
          {
            prop: 'no',
            label: '媒体文件编号',
            width: '120',
            align: 'center'
          },
          {
            prop: 'type',
            label: '媒体类型',
            // width: '200',
            align: 'center',
            formatter:function (row) {
              return row.type == '1'?'音频':'视频'
            }
          },
          {
            prop: 'name',
            label: '媒体文件名称',
            width: '100',
            align: 'center'
          },
          {
            prop: 'originalName',
            label: '原文件名',
            width: '100',
            align: 'center'
          },
          {
            prop: 'fileSize',
            label: '文件大小',
            width: '100',
            align: 'center'
          },
          {
            prop: 'creator',
            label: '创建者',
            width: '100',
            align: 'center'
          },
          {
            prop: 'createDatetime',
            label: '创建时间',
            // width: '100',
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
        ],
        tableData: [],
        mediaFileInfo:'',//在选择媒体文件的时候储存文件相关流信息
        ruleForm: {
          "type":'',
          "name":'',//媒体文件名称，即介绍的名称
          "fileName":'',//上传成功后，后台解析处理后返回的新的文件名
          "originalName":'',//原文件名，即本地上传时候的文件名字
          "fileSize":'',//文件大小
          "mediaFileUrl":'',//文件后台返回的路径
          "mediaFileRemark":'媒体文件目前只支持:' +
          '\n' +
          '1、音频文件(*.mp3)，大小不超过5M' +
          '\n' +
          '2、视频文件(*.mp4)，大小不超过50M',
        },
        mediaTypeArr: [
          {
            id: '1',
            name: '音频'
          },
          {
            id: '2',
            name: '视频'
          }
        ],
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
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
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
      //上传媒体文件事件
      //（以下的方法是前端将音视频文件传到七牛云）
      upMediaInfos(e) {

        this.mediaFilesInfo = e.target.files[0]


        this.ruleForm.originalName=this.mediaFilesInfo.name

        let myString = this.mediaFilesInfo.name

        if(myString.split('.').length != 0){

          this.mediaTypeGive = myString.split('.')[myString.split('.').length-1]

        }else {
          this.mediaTypeGive = ''
        }

        console.log('音视频上传信息',this.mediaFilesInfo,this.mediaTypeGive)

        this.ruleForm.fileSize=parseInt(this.mediaFilesInfo.size/1024)

        // console.log('wenjianxinxi', this.ruleForm.originalName, this.ruleForm.fileSize)
        let tokenInfo = ''
        let formdata = new FormData()
        formdata.append('file', this.mediaFilesInfo)

        //前端上传音视频等文件到七牛云时关键三步
        //1，向后台调用特定获取token接口，以便获取与七牛云相关的对应token
        //2，自己服务器存储文件空间（即绑定的存储域名）在哪个大区，就调用哪个大区的七牛云共用接口，如华东：http://upload.qiniup.com
        //3，接口调用成功后，后台返回key后，将上述的存储域名与key结合到一块就成为最终的下载地址
        this.$axios.get('/mis/upload/uploadAuth?fileName='+this.ruleForm.originalName)
          .then(res => {
            // console.log('+++++++',res)
            tokenInfo = res.data.value.token
            formdata.append('token', tokenInfo)

            this.$axios.post('http://upload.qiniup.com', formdata, {emulateJSON: true}).then(res => {
               // console.log('猪扒皮',res.data)
              this.ruleForm.fileName = res.data.key //原来可以的
              // this.ruleForm.fileName = res.data.key + '.' + this.mediaTypeGive
              console.log('格式是否带在了后面',this.ruleForm.fileName)

              this.ruleForm.mediaFileUrl = 'http://tomepicture.zhihuiquanyu.com/' + res.data.key
              // console.log('媒体资源上传重要传输环节+++', this.ruleForm.mediaFileUrl)

            }).catch(error => {
              console.log(error)
            })

          })

        // console.log(this.mediaFilesInfo, '点击了上传媒体文件', e.target.files[0].name)

      },


      // upMediaInfos(e){
      //
      //   this.mediaFilesInfo = e.target.files[0]
      //   console.log(this.mediaFilesInfo,'点击了上传媒体文件',e.target.files[0].name)
      //   let formdata = new FormData()
      //   formdata.append('file', this.mediaFilesInfo)
      //   this.$axios(
      //     {
      //       method:'post',
      //       url:this.apiMediaUpUrl,
      //       data:formdata
      //     }
      //   ).then(res => {
      //     // console.log('媒体资源上传重要传输环节+++',res.data)
      //     if(res.data.resultStatus.resultCode === '0000'){
      //       // alert('媒体资源上传成功')
      //       // this.$message.success(res.data.resultStatus.resultMessage)
      //       this.ruleForm.fileName=res.data.value.fileName
      //       this.ruleForm.originalName=res.data.value.originalName
      //       this.ruleForm.fileSize=res.data.value.fileSize
      //       this.ruleForm.mediaFileUrl=res.data.value.mediaFileUrl
      //
      //     }else {
      //       this.$message.warning(res.data.resultStatus.resultMessage)
      //     }
      //   }).catch(error => {
      //
      //   })
      //
      // },
      //以上注释的方法是通过后台将音视频文件传到七牛云

      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "no":'',
              "fileName":'',
              "type":'',
              "status":'',
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('媒体文件查询返回的数据', res.data)
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
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "fileName": this.$store.state.mediaFileNameParam ,
              "type":this.$store.state.mediaTypeParam,
              "no": this.$store.state.mediaFileSerialNumParam,
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
          console.log('hhhhh获取的是什么信息', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm = res.data.value
            this.ruleForm.mediaFileRemark = '媒体文件目前只支持:' +
              '\n' +
              '1、音频文件(*.mp3)，大小不超过5M' +
              '\n' +
              '2、视频文件(*.mp4)，大小不超过50M'
            this.ruleForm.type = res.data.value.type == '1'?'音频':'视频'

            this.$message.success('获取信息成功，可进行信息编辑')
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

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
          console.log('新增媒体文件接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.mediaFileManageSign = false
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
        if(this.ruleForm.type == '音频'){
          this.ruleForm.type =1
        }else if(this.ruleForm.type == '视频'){
          this.ruleForm.type = 2
        }
        this.$axios(
          {
            method: 'post',
            url: this.apiEditor,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.mediaFileManageSign = false
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // this.$store.state.mediaFileManageSign = false
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
        this.$store.state.mediaFileManageSign = false
      },

    }
  }
</script>

<style scoped>

</style>
