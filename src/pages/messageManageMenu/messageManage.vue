<template>
  <div>
    <mySearchs
      :sign="sign"
      :messageHeader="messageHeader"
      :publishType="publishType"
      :publishDate="publishDate"
      :dateShow="dateShow"
      :publishState="publishState"
      :isAdd="isAdd"
      :isEditor="isEditor"
      :isPublish="isPublish"
      :isCancelPublish="isCancelPublish"
      @queryInfos="queryInfos"
      @messagePublish="messagePublish"
      @messageCancelPublish="messageCancelPublish"
    >
    </mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isMessageHeader="isMessageHeader"
      :isShowEnabled="isShowEnabled"
      :isShowSend="isShowSend"
      :isShowPublish="isShowPublish"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
      @getDefaultNewPageInfo="getDefaultNewPageInfo"
    >

    </myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.messageSign" width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="16" :offset="3">
              <el-form-item label="消息标题">
                <el-col>
                  <el-input v-model="ruleForm.titile"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item label="接收范围">
                <el-col>
                  <!--<el-input v-model="ruleForm.receiveScope"></el-input>-->

                  <el-select v-model="ruleForm.receivingRange" placeholder="请选择接收范围" class="select_style1"
                             @change="chooseReceiveScope">
                    <el-option
                      v-for="item in receiveScopeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item label="接收对象">
                <!--<el-col>-->
                <!--<el-select v-model="ruleForm.receiveObj" placeholder="请选择接收对象" class="select_style1">-->
                <!--<el-option-->
                <!--v-for="item in receiveObjArr"-->
                <!--:key="item.id"-->
                <!--:label="item.name"-->
                <!--:value="item.id"-->
                <!--&gt;</el-option>-->
                <!--</el-select>-->
                <!--</el-col>-->
                <el-col>
                  <el-input v-model="ruleForm.receiverName" @focus="openSceneryDialog"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item label="消息内容">
                <el-col>
                  <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 8}"
                            v-model="ruleForm.content"></el-input>
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
              <el-button type="warning" @click="submitForm('ruleForm')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--新增编辑里面选择了接收范围以后，对应弹出的第一个选择景区模态框-->
    <chooseSceneryDialog
      :dataScenery="dataScenery"
      @transferSceneryId="transferSceneryId"
    ></chooseSceneryDialog>

    <!--新增编辑里面选择了接收范围为指定游团后，对应弹出游团的模态框-->
    <div id="myTablesDialog">
      <el-dialog title="选择游团" :visible.sync="chooseParam1" align="left" width="60%">
        <mySearchs
          :affiliatedSceneryRRR="affiliatedSceneryRRR"
          :groupNum="groupNum"
          :guideTel="guideTel"
          :isQueryInfosX="isQueryInfosX"
          @queryInfosX="queryInfosX"
        ></mySearchs>
        <myTables
          :tableTitle="tableTitleParam1"
          :tableData="tableDataParam1"
          :isShowEnabled="isShowEnabled"
          :isPagePageShow="isPagePageShow"
          @chooseInfoX="chooseInfoX"
          @queryInfosX="queryInfosX"
        ></myTables>
      </el-dialog>
    </div>


    <!--新增编辑里面选择了接收范围为指定用户后，对应弹出用户选择的模态框-->
    <div id="publicAddEditorDialog">
      <el-dialog title="选择用户" :visible.sync="chooseParam2" align="left" width="60%">
        <mySearchs
          :userSerialNum="userSerialNum"
          :userTel="userTel"
          :isQueryInfosX="isQueryInfosX"
          @queryInfosX="queryInfosX"
        ></mySearchs>
        <myTables
          :tableTitle="tableTitleParam2"
          :tableData="tableDataParam2"
          :isShowEnabled="isShowEnabled"
          :isPagePageShow="isPagePageShow"
          @chooseInfoX="chooseInfoX"
          @queryInfosX="queryInfosX"
        ></myTables>
      </el-dialog>
    </div>

    <!---->
    <div id="userInfoForm">
      <el-dialog title="消息详情" :visible.sync="$store.state.isShowMessageInfos" width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleFormInfo" ref="ruleFormInfo" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="24">
              <el-input type="textarea" :disabled="true" :autosize="{ minRows: 5, maxRows: 8}"
                        v-model="ruleFormInfo.messageInfos"></el-input>
            </el-col>

          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "message-manage",
    data() {
      return {
        chooseParam1: false,//是否展示选择游团模态框列表
        chooseParam2: false,//是否展示选择用户模态框列表
        affiliatedSceneryRRR: true,//选择指定游团后需要的参数
        groupNum: true,//选择指定游团后需要的参数
        guideTel: true,//选择指定游团后需要的参数

        userSerialNum: true,//选择指定用户后需要的参数
        userTel: true,//选择指定用户后需要的参数
        //游团模态框列表表头数据
        tableTitleParam1: [
          {
            prop: 'sceneryName',
            label: '所属景区',
            width: '100',
            align: 'center',
          },
          {
            prop: 'guideName',
            label: '导游姓名',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'guidePhone',
            label: '导游手机',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'touristTeamCode',
            label: '游团号',
            width: '120',
            align: 'center'
          },
          {
            prop: 'touristTeamStatus',
            label: '出行状态',
            width: '120',
            align: 'center',
            formatter: function (row) {
              return row.touristTeamStatus == '1' ? '已完团' : '出行中'
            }
          },
        ],
        tableDataParam1: [],
        //选择用户模态框列表表头数据
        tableTitleParam2: [
          {
            prop: 'customerNo',
            label: '用户编号',
            // width: '100',
            align: 'center',
          },
          {
            prop: 'customerNickName',
            label: '用户昵称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'customerPhone',
            label: '用户手机',
            // width: '100',
            align: 'center'
          },
        ],
        tableDataParam2: [],
        isQueryInfosX: true,//在二级列表里面查询是用于判断是点击的一级查询按钮还是二级查询按钮
        apiQuery: '/mis/message/query',//消息列表查询
        apiNumParam: '1',//此参数用于控制apiMoreChooseInfo接口具体接收哪个模态框接口信息
        apiMoreChooseInfo: '',//用户接收不同的接口信息
        apiChooseScenery: '/mis/scenery/queryChoose',//选择对象时弹出的指定景区模态框
        apiChooseTourGroups: '/mis/touristTeam/queryChoose',//选择对象时弹出的指定游团的模态框
        apiChooseUser: '/uc/customer/queryChoose',//选择接收对象时弹出的指定用户的模态框
        apiPublish: '/mis/message/publish',
        apiCancelPublish: '/mis/message/unPublish',
        apiMessageInfos: '/mis/message/get',
        apiAdd: '/mis/message/add',
        apiEditor: '/mis/message/edit',
        apiEditorGet: '/mis/message/get',
        sign: 'messageSign',
        dataScenery: [
          {
            id: 1,
            name: '全国',
            children: [
              {
                id: 2,
                name: '中国',
                children: [
                  {
                    id: 3,
                    name: '四川',
                    children: [
                      {
                        id: 4,
                        name: '成都'
                      },
                      {
                        id: 5,
                        name: '自贡'
                      },
                      {
                        id: 6,
                        name: '宜宾'
                      }
                    ]
                  },
                  {
                    id: 7,
                    name: '江苏',
                    children: [
                      {
                        id: 8,
                        name: '苏州'
                      },
                      {
                        id: 9,
                        name: '南京'
                      },
                      {
                        id: 10,
                        name: '昆山'
                      }
                    ]
                  }
                ]
              },
              {
                name: '澳大利亚',
                children: [
                  {
                    name: '澳大利亚城市一'
                  },
                  {
                    name: '澳大利亚城市二'
                  }
                ]
              },
              {
                name: '越南',
                children: [
                  {
                    name: '越南城市一'
                  },
                  {
                    name: '越南城市二'
                  },
                ]
              }
            ]
          }
        ],
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        commonIdX: '',//仅服务于X版本相关（即二级列表相关事件及内容）
        messageHeader: true,//消息标题
        publishType: true,//消息发布类型
        publishDate: false,//消息发布时间
        dateShow: true,//消息发布时间
        publishState: true,//消息发布状态
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isPublish: true,//是否显示发布的按钮
        isCancelPublish: true,//是否显示取消发布的按钮
        isMessageHeader: true,//表格内容是否显示信息标题栏目
        isShowEnabled: true,//表格内部是否显示启用禁用列
        // isShowTravelState: true,//表格内部是否显示出行状态列
        isShowSend: true,//表格内部是否显示启用禁用列
        isShowPublish: true,//表格内部是否显示启用禁用列
        isPagePageShow: true,//XXX此处特殊，不要常规分页控件显示出来所有用了true，

        tableTitle: [
          {
            prop: 'sendType',
            label: '发布类型',
            width: '100',
            align: 'center',
            formatter: function (row) {
              if (row.sendType == '1') {
                return '平台消息'
              } else if (row.sendType == '2') {
                return '导游消息'
              } else if (row.sendType == '3') {
                return '景区消息'
              }
            }
          },
          {
            prop: 'publishDatetime',
            label: '消息发布时间',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'content',
            label: '消息内容',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'receivingRange',
            label: '发布范围',
            width: '120',
            align: 'center',
            formatter: function (row) {
              if (row.receivingRange == '1') {
                return '全部用户'
              } else if (row.receivingRange == '2') {
                return '指定景区'
              } else if (row.receivingRange == '3') {
                return '指定游团'
              } else if (row.receivingRange == '4') {
                return '指定用户'
              }
            }
          },
          {
            prop: 'receiver',
            label: '接收对象',
            width: '120',
            align: 'center'
          },
          {
            prop: 'readNum',
            label: '已读量',
            width: '120',
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
            width: '180',
            align: 'center'
          },
        ],
        tableData: [],
        receiveScopeArr: [
          {
            id: 1,
            name: '全部用户'
          },
          {
            id: 2,
            name: '指定景区'
          },
          {
            id: 3,
            name: '指定游团'
          },
          {
            id: 4,
            name: '指定用户'
          },
        ],
        receiveObjArr: [],
        ruleForm: {
          id: '',//编辑时会用到的id
          type: '1',//目前固定
          sendType: '1',//目前固定
          sceneryId: '',//临时用的
          sceneryName: '',//临时用的
          titile: '紧急求救',
          receivingRange: '',
          receiver: '',
          receiverName: '',
          content: '一组测试内容仅供参考，测试内容仅供参考哦，测试内容仅供参考哦，测试内容仅供参考哦，测试内容仅供参考哦，'
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
        //以下这个表单对象只是单纯的包含信息详情
        ruleFormInfo: {
          messageInfos: '一组测试内容仅供参考，测试内容仅供参考哦，测试内容仅供参考哦，测试内容仅供参考哦，测试内容仅供参考哦，'
        },
      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //根据选择的接收范围以后，对应获取接收对象的相关模态框信息

      openSceneryDialog() {

        console.log(this.ruleForm.receivingRange)
        this.apiNumParam = this.ruleForm.receivingRange
        if (this.apiNumParam == '1') {
          this.ruleForm.receiver = 'ALL'
          this.ruleForm.receiverName = 'ALL'
        } else if (this.apiNumParam == '2') {
          //接收范围选择了指定景区后发起一下景区选择模态框
          this.$axios(
            {
              method: 'post',
              url: this.apiChooseScenery + '?sceneryName=',
              data: {}
            }
          ).then(res => {
            console.log('注意查看景区信息', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              this.dataScenery = [...res.data.value]
              this.$store.state.chooseSceneryDialog = true
            }else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })

        } else if (this.apiNumParam == '3') {
          //接收范围选择了指定游团后发起以下游团选择模态框
          this.chooseParam1 = true

          this.$axios(
            {
              method: 'post',
              url: this.apiChooseTourGroups,
              data: {
                "sceneryName": "",
                "touristTeamCode": "",
                "guidePhone": "",
                "pageNum": this.$store.state.pageNumParamX,
                "pageSize": this.$store.state.pageSizeParamX,

              }
            }
          ).then(res => {
            if (res.data.resultStatus.resultCode === '0000') {
              console.log('鬼出没：', res.data)
              this.tableDataParam1 = [...res.data.value.list]
              this.$store.state.totalParamX = res.data.value.total
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          }).catch(error => {

          })
        } else if (this.apiNumParam == '4') {

          //接收范围选择了指定用户后发起以下用户选择模态框

          this.chooseParam2 = true

          this.$axios(
            {
              method: 'post',
              url: this.apiChooseUser,
              data: {
                "customerNo": "",
                "customerPhone": "",
                "pageNum": this.$store.state.pageNumParamX,
                "pageSize": this.$store.state.pageSizeParamX,

              }
            }
          ).then(res => {
            if (res.data.resultStatus.resultCode === '0000') {
              console.log('鬼出没2：', res.data)
              this.tableDataParam2 = [...res.data.value.list]
              this.$store.state.totalParamX = res.data.value.total
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          }).catch(error => {

          })

        }

      },

      //选择了具体景区信息以后，返回针对性的id和name
      transferSceneryId(n) {
        console.log('猜我收到了什么哦', n)
        this.ruleForm.sceneryId = n.id
        this.ruleForm.sceneryName = n.name
        this.ruleForm.receiverName = n.name
        this.ruleForm.receiver = n.no
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
            this.$store.state.messageSign = false
            this.getDefaultInfo()
          } else {
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
            this.$store.state.messageSign = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //选择接收范围后触发接收对象接口事件
      chooseReceiveScope() {
        console.log('选了接收范围准备触发接收对象接口')

      },
      //编辑信息前先获取相关信息
      chooseInfo(n) {
        console.log('到底会给我什么样的信息呢', n)
        this.commonId = n.id
        var k = n.receivingRange
        // this.$axios(
        //   {
        //     method: 'post',
        //     url: this.apiEditorGet + '?id=' + n.id,
        //     data: {}
        //   }
        // ).then(res => {
        //   console.log('获取的是什么信息', res.data.value)
        //   if (res.data.resultStatus.resultCode === '0000') {
        //     res.data.value.lnglat = res.data.value.lon + ',' + res.data.value.lat
        //     res.data.value.sosPhone = Number(res.data.value.sosPhone)
        //     this.ruleForm = res.data.value
        //     this.$message.success('获取信息成功，可进行信息编辑')
        //   } else {
        //
        //   }
        //
        // }).catch(error => {
        //
        // })
        this.ruleForm.id = n.id
        this.ruleForm.titile = n.titile
        this.ruleForm.receivingRange = n.receivingRange
        this.ruleForm.receiver = n.receiver
        this.ruleForm.receiverName = n.receiverName
        this.ruleForm.content = n.content

      },

      //点击二级列表行以后获取的相关二级列表行内容（因为层级过深，所以才会出现特殊的X版本事件）
      chooseInfoX(n) {
        console.log('XX二级到底会给我什么样的信息呢', n)
        // this.commonIdX = n.id
        if (this.apiNumParam == '3') {
          this.ruleForm.receiverName = n.touristTeamNo
          this.ruleForm.receiver = n.touristTeamNo
          this.chooseParam1 = false
        } else if (this.apiNumParam == '4') {
          this.ruleForm.receiverName = n.customerNickName
          this.ruleForm.receiver = n.customerNo
          this.chooseParam2 = false
        }


      },

      //消息发布事件
      messagePublish() {
        this.$axios(
          {
            method: 'post',
            url: this.apiPublish + '?id=' + this.commonId,
            data: {
              id: this.commonId
            }
          }
        ).then(res => {
          console.log('发布消息哦', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
      //取消消息发布事件
      messageCancelPublish() {
        this.$axios(
          {
            method: 'post',
            url: this.apiCancelPublish + '?id=' + this.commonId,
            data: {
              id: this.commonId
            }
          }
        ).then(res => {
          console.log('取消发布消息', res.data)
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
              "sendType": "",
              "titile": "",
              "status": "",
              // "publishDatetime": "",
              "startDateTime": "",
              "endDateTime": "",
              "pageNum": 1,
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

      //查询按钮返回列表数据
      queryInfos(n) {
        // console.log('我要传值了哦', n)
        // if (n.sceneryGrade == 0) {
        //   n.sceneryGrade = ''
        // }
        // if (n.sceneryState == 2) {
        //   n.sceneryState = ''
        // }
        this.$store.state.publishStateParam = this.$store.state.publishStateParam == '10' ? '' : this.$store.state.publishStateParam
        this.$store.state.publishTypeParam = this.$store.state.publishTypeParam == '0' ? '' : this.$store.state.publishTypeParam
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {

              "sendType": this.$store.state.publishTypeParam,
              "titile": this.$store.state.messageHeaderParam,
              "status": this.$store.state.publishStateParam,
              // "publishDatetime": this.$store.state.publishDateParam,
              "startDateTime": this.$store.state.myRentStartDatetimeParam,
              "endDateTime": this.$store.state.myRentEndDatetimeParam,
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

      //查询(游团)XXXXX按钮返回列表数据
      queryInfosX(n) {
        // console.log('我要传值了哦', n)

        if (this.apiNumParam == '3') {
          this.$axios(
            {
              method: 'post',
              url: this.apiChooseTourGroups,
              data: {
                "sceneryName": this.$store.state.affiliatedSceneryRRRParam,
                "touristTeamCode": this.$store.state.groupNumParam,
                "guidePhone": this.$store.state.guideTelParam,
                "pageNum": this.$store.state.pageNumParamX,
                "pageSize": this.$store.state.pageSizeParamX,
              }
            }
          ).then(res => {
            if (res.data.resultStatus.resultCode === '0000') {
              console.log('鬼出没：', res.data)
              this.tableDataParam1 = [...res.data.value.list]
              this.$store.state.totalParamX = res.data.value.total
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          }).catch(error => {

          })
        } else if (this.apiNumParam == '4') {
          this.$axios(
            {
              method: 'post',
              url: this.apiChooseUser,
              data: {
                "customerNo": this.$store.state.userSerialNumParam,
                "customerPhone": this.$store.state.userTelParam,
                "pageNum": this.$store.state.pageNumParamX,
                "pageSize": this.$store.state.pageSizeParamX,
              }
            }
          ).then(res => {
            if (res.data.resultStatus.resultCode === '0000') {
              console.log('鬼出没2：', res.data)
              this.tableDataParam2 = [...res.data.value.list]
              this.$store.state.totalParamX = res.data.value.total
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          }).catch(error => {

          })
        }


      },

      //默认第一初始化对应消息的详情数据获取事件（通过点击列表里的消息标题）
      getDefaultNewPageInfo(n) {
        console.log('触发了父级事件哦', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiMessageInfos + '?id=' + n,
            data: {
              id: 1
            }
          }
        ).then(res => {
          console.log('这里是信息详情结果', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            // this.ruleFormNewPage.scenerySerialNum = res.data.value.no
            // this.ruleFormNewPage.sceneryName = res.data.value.name
            // this.ruleFormNewPage.sceneryState = res.data.value.status == 0 ? '禁用' : '启用'
            // this.ruleFormNewPage.sceneryGrade = res.data.value.level
            // this.ruleFormNewPage.area = res.data.value.areaName
            // this.ruleFormNewPage.serviceProvider = res.data.value.sceneryServiceName
            // this.ruleFormNewPage.lnglat = res.data.value.lon + ',' + res.data.value.lat
            // this.ruleFormNewPage.grade = res.data.value.level
            // this.ruleFormNewPage.sosTel = res.data.value.sosPhone
            // this.ruleFormNewPage.linkMan = res.data.value.chargeName
            // this.ruleFormNewPage.linkTel = res.data.value.chargePhone
            // this.ruleFormNewPage.createMan = res.data.value.creator
            // this.ruleFormNewPage.createTime = res.data.value.createDatetime
            // this.ruleFormNewPage.updateMan = res.data.value.updator
            // this.ruleFormNewPage.updateTime = res.data.value.updateDatetime
            // this.ruleFormNewPage.rfid = res.data.value.rfidcount
            // this.ruleFormNewPage.rfidPlace = res.data.value.sifecount
            // this.ruleFormNewPage.linkAddress = res.data.value.url
            // this.ruleFormNewPage.address = res.data.value.address

            this.ruleFormInfo.messageInfos = res.data.value.content
            this.$store.state.isShowMessageInfos = true
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
            // this.$store.state.messageSign = false
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
        this.$store.state.messageSign = false

      },

    }
  }
</script>

<style scoped>

</style>
