<template>
  <div>
    <mySearchs
      :sign="sign"
      :travelInfoName="travelInfoName"
      :isClearTravelInfo="isClearTravelInfo"
      :isAdd="isAdd"
      @queryInfos="queryInfos"
      @addBeforeClear="addBeforeClear"
      @clearTravelInfos="clearTravelInfos"
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
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.travelInfo2" width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>


            <el-col :span="23">
              <el-form-item label="发布对象">
                <el-col>
                  <el-select v-model="ruleForm.Type" class="change_select_style" size="small" placeholder="请选择发布对象"><el-option
                    v-for="item in goToObjectArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>


            <el-col :span="23" v-if="this.ruleForm.Type == '1'">
              <el-form-item label="旅游团">
                <el-col>
                  <el-select v-model="ruleForm.TouristTeamID" class="change_select_style" size="small" placeholder="请选择发布对象"><el-option
                    v-for="item in touristGroup2DropDownList"
                    :key="item.ID"
                    :label="item.Name"
                    :value="item.ID"
                  ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>


            <el-col :span="23">
              <el-form-item label="行程名称">
                <el-col>
                  <el-input v-model="ruleForm.Subject" placeholder="请输入行程名称"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="行程内容">
                <el-col>
                  <el-input type="textarea" v-model="ruleForm.Content" placeholder="请输入行程名称"></el-input>
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

    <div id="userInfoForm">
      <el-dialog title="行程详情" :visible.sync="$store.state.travelInfo2SSS" width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleFormSSS" ref="ruleFormSSS" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>

            <el-col :span="23">
              <el-form-item label="行程名称">
                <el-col>
                  <el-input v-model="ruleFormSSS.Subject" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="行程内容">
                <el-col>
                  <el-input type="textarea" v-model="ruleFormSSS.Content" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>


          </el-row>
          <el-form-item>
            <el-col :span="9" :offset="12">
              <el-button @click="cancelForm('ruleFormSSS')">关闭</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  export default {
    name: "travel-info",
    data() {
      return {
        sign: 'travelInfo2',
        apiQuery2: '/a2guider/trip/query',
        apiAdd2: '/a2guider/trip/add',
        apiGetEditorInfo2:'/a2guider/trip/get',
        apiDel2:'/a2guider/trip/delete',
        apiClearTravelInfos:'/a2guider/trip/clear',
        apiDropDownTouristTeam2: '/a2guider/touristTeam/dropDown',
        travelInfoName:true,
        isClearTravelInfo:true,
        isAdd: true,
        isShowEnabled: true,
        isHandle: true,
        touristGroup2DropDownList: [
          {
            ID: '0',
            Name: '全部',

          },
          {
            ID: '1',
            Name: '旅游团',

          },
          {
            ID: '2',
            Name: '测试团',

          },
        ],
        goToObjectArr:[
          {
            id:0,
            name:'全部旅游团',
            value:'0'
          },
          {
            id:1,
            name:'指定旅游团',
            value:'1'
          },
        ],
        ruleForm: {
          "Type":'',
          "TouristTeamID":'',
          "Subject":'',
          "Content":''
        },
        ruleFormSSS: {
          "Content": "",
          "Subject": ""
        },
        // tableTitle: [
        //   {
        //     prop: 'Subject',
        //     label: '行程名称++',
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'TouristTeamName',
        //     label: '旅游团',
        //     // width: '120',
        //     align: 'center'
        //   },
        //
        //   {
        //     prop: 'Content',
        //     label: '行程内容',
        //     // width: '120',
        //     align: 'center',
        //     formatter: function(row){
        //
        //       if(row.Content.length > 20){
        //         return row.Content.substring(0,20)
        //       }else {
        //         return row.Content
        //       }
        //     }
        //   },
        //
        //   {
        //     prop: 'CreateTime',
        //     label: '添加时间',
        //     // width: '120',
        //     align: 'center'
        //   },
        //
        // ],
        tableData: [
          // {
          //   "Content": "333321313",
          //   "ID": 1262,
          //   "Subject": "123",
          //   "CreateTime": "2019-02-02 14:51:56",
          //   "TouristTeamID": 4,
          //   "TouristTeamName": "赤水"
          //
          // }
        ]

      }
    },
    computed: {
      tableTitle: function () {
        return  [
          {
            prop: 'Subject',
            label: this.$t('travelInfo.travelName'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'TouristTeamName',
            label: this.$t('travelInfo.touristTeamName'),
            // width: '120',
            align: 'center'
          },

          {
            prop: 'Content',
            label: this.$t('travelInfo.travelContent'),
            // width: '120',
            align: 'center',
            formatter: function(row){

              if(row.Content.length > 20){
                return row.Content.substring(0,20)
              }else {
                return row.Content
              }
            }
          },

          {
            prop: 'CreateTime',
            label: this.$t('travelInfo.createTime'),
            // width: '120',
            align: 'center'
          },

        ]
      }
    },
    mounted(){
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.$store.state.isShowAlert = false

      this.$store.state.addparamsss = false
      this.getDefaultInfo()
      this.getDropDownTouristTeamList()
    },
    methods: {

      //获取旅游团下拉数据列表方法函数
      getDropDownTouristTeamList() {
        this.$axios(
          {
            method: 'get',
            url: this.apiDropDownTouristTeam2,
            data: {}
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.touristGroup2DropDownList = [...res.data.value]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })

      },


      //新增之前清空表单数据函数
      addBeforeClear(){
        this.$store.state.travelInfo2 = true
        for(var i in this.ruleForm){
          this.ruleForm[i] = ''
        }
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
            this.$store.state.travelInfo2 = false
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //点击删除按钮事件
      delListInfo(n){
        console.log('删除N信息是：',n)
        this.$axios(
          {
            method:'get',
            url:this.apiDel2 + '?ID=' + n.ID,
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

      //清空行程
      clearTravelInfos(){
        this.$axios(
          {
            method:'get',
            url:this.apiClearTravelInfos,
            data:{}
          }
        ).then(res => {
          console.log('清空警报',res.data)
          if(res.data.resultStatus.resultCode === '0000'){

            this.getDefaultInfo()

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })
      },


      //此处较为特殊，不需要真的编辑，只是查看下详情
      getEditorInfos(n){
        this.$axios(
          {
            method:'get',
            url:this.apiGetEditorInfo2 + '?ID=' +n.ID,
            data:{}
          }
        ).then(res => {
          console.log('获取到的详情',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.ruleFormSSS = res.data.value
            this.$store.state.travelInfo2SSS = true

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })
      },



      getDefaultInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "Subject":"",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('A2rfid返回+', res.data)
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
              "Subject": this.$store.state.travelInfoNameParam2,
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
                // this.editorInfo()
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

        if(formName === 'ruleForm'){
          this.$store.state.travelInfo2 = false
        }else if(formName === 'ruleFormSSS'){
          this.$store.state.travelInfo2SSS = false
        }

      },

    }
  }
</script>

<style scoped>

</style>
