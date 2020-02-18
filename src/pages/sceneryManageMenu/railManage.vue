<template>
  <div>
    <mySearchs
      :sign="sign"
      :affiliatedScenery="affiliatedScenery"
      :affiliatedSceneryRRR="affiliatedSceneryRRR"
      :railName="railName"
      :sceneryState="sceneryState"

      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      :isRailTips="isRailTips"
      @openRailMap="openRailMap"
      @railTips="railTips"
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


    <!--此处重点注意，围栏提示语设置还需要在此页面建一个表格，因为层级过深有待商榷，此处暂时不做这个页面-->


    <!--以下是此页面对应的新增编辑模态框-->
    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.railSign" width="50%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="10">
              <el-form-item label="所属景区">
                <!--<el-col class="select_style">-->
                <!--<el-select v-model="ruleForm.region" placeholder="请选择所属景区" class="select_style1">-->
                <!--<el-option label="青城山" value="shanghai"></el-option>-->
                <!--<el-option label="张家界" value="beijing"></el-option>-->
                <!--</el-select>-->
                <!--</el-col>-->
                <el-col>
                  <el-input v-model="ruleForm.sceneryName" @focus="openEditorSceneryDialog"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="围栏名称">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="报警方式">
                <el-col class="select_style">
                  <el-select v-model="ruleForm.warnType" placeholder="请选择报警方式" class="select_style1">
                    <el-option
                      v-for="item in warnTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="提醒方式">
                <el-col class="select_style">
                  <el-select v-model="ruleForm.remindType" placeholder="请选择提醒方式" class="select_style1">
                    <el-option
                      v-for="item in remindTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="手动输入坐标">
                <el-col>
                  <el-input type="textarea" v-model="ruleForm.railPointText"
                            placeholder="备注：手动输入坐标为非百度坐标时，需要点击红色按钮进行坐标转换"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="坐标功能按钮">
                <el-col>
                  <el-button type="warning" round size="mini" @click="clearAll">清空坐标</el-button>

                  <el-button type="warning" round size="mini" @click="add_overlay">确认输入</el-button>

                  <el-button type="danger" round size="mini" @click="changeGpsToBaidu">GPS转百度</el-button>

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
    <!--以下是此页面对应的围栏提示语设置模态框-->
    <div id="userInfoForm">
      <el-dialog title="新增/编辑" :visible.sync="railTipsDialog" width="30%" align="left" :close-on-click-modal="false">
        <el-form :model="ruleFormTips" ref="ruleFormTips" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>

            <el-col :span="18" :offset="2">
              <el-form-item label="所属景区" prop="affiliatedScenery">
                <el-col>
                  <el-input v-model="ruleFormTips.affiliatedScenery" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="围栏名称" prop="railName">
                <el-col>
                  <el-input v-model="ruleFormTips.railName" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="提示方式" prop="remindType">
                <el-col>
                  <el-input v-model="ruleFormTips.remindType" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="报警方式" prop="alarmType">
                <el-col>
                  <el-input v-model="ruleFormTips.alarmType" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="18" :offset="2">
              <el-form-item label="语言" prop="language">
                <el-col class="select_style">
                  <el-select v-model="ruleFormTips.language" placeholder="请选语言" class="select_style1">
                    <el-option label="中文" value="Chinese"></el-option>
                    <el-option label="英文" value="English"></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="18" :offset="2">
              <el-form-item label="进围栏提示语" prop="importRailTip">
                <el-col>
                  <el-input v-model="ruleFormTips.importRailTip"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="出围栏提示语" prop="exportRailTip">
                <el-col>
                  <el-input v-model="ruleFormTips.exportRailTip"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-col :span="10" :offset="6" style="display: flex;flex-wrap: nowrap">
              <el-button @click="cancelForm('ruleFormTips')">关闭</el-button>
              <el-button type="primary" @click="submitForm('ruleFormTips')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!--以下是弹出的选择景区模态框-->
    <chooseSceneryDialog
      :dataScenery="dataScenery"
      @transferSceneryId="transferSceneryId"
    ></chooseSceneryDialog>
  </div>
</template>

<script>
  export default {
    name: "rail-manage",
    data() {
      return {
        warnTypeArr: [
          {
            id: '1',
            name: '出围栏报警',
            value: '1'
          },
          {
            id: '2',
            name: '进围栏报警',
            value: '2'
          },
          {
            id: '3',
            name: '进出围栏报警',
            value: '3'
          },
        ],
        remindTypeArr: [
          {
            id: '0',
            name: '不提示',
            value: '0'
          },
          {
            id: '1',
            name: '振动',
            value: '1'
          },
          {
            id: '2',
            name: '语音',
            value: '2'
          },
          {
            id: '3',
            name: '语音+振动',
            value: '3'
          },
        ],
        apiQuery: '/mis/electronicFence/query',
        apiEditorGet: '/mis/electronicFence/get',//编辑信息前先获取对应信息
        apiEnable: '/mis/electronicFence/enable',
        apiDisable: '/mis/electronicFence/disable',
        apiAdd: '/mis/electronicFence/add',
        apiEditor: '/mis/electronicFence/edit',
        apiChooseScenery: '/mis/scenery/queryChoose',
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
        maps: {},
        overlays: [],
        centerPoint: '',//添加遮盖物图层后，定位地图中心点参数
        overlaycomplete: {},
        polygon: {},//创建多边形变量
        polygonArr: [],//所有创建的多边形，存放在此数组中
        //以上的参数是百度地图对应参数
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        commonSceneryId: '',//此处的参数仅用于围栏的启用多传一个景区id
        sign: 'railSign',
        affiliatedScenery: false,//代表所属景区
        affiliatedSceneryRRR: true,//代表归属景区
        railTipsDialog: false,//点击围栏提示语按钮切换对应模态框显示影藏
        railName: true,//代表围栏名称
        sceneryState: true,//代表状态，启用禁用

        //以下为查询框下方对应的tab功能键是否显示的参数
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        isRailTips: false,//显示围栏提示语设置

        tableTitle: [
          {
            prop: 'sceneryName',
            label: '所属景区',
            width: '140',
            align: 'center'
          },
          {
            prop: 'name',
            label: '围栏名称',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'type',
            label: '围栏归属',
            width: '120',
            align: 'center',
            formatter: function (row) {
              return row.type == '1' ? '景区' : '导游'
            }
          },
          {
            prop: 'customerName',
            label: '导游',
            width: '120',
            align: 'center'
          },
          {
            prop: 'warnType',
            label: '报警方式',
            width: '160',
            align: 'center',
            formatter: function (row) {
              if (row.warnType == '1') {
                return '出围栏报警'
              } else if (row.warnType == '2') {
                return '进围栏报警'
              } else if (row.warnType == '3') {
                return '进出围栏报警'
              }
            }
          },
          {
            prop: 'remindType',
            label: '提醒方式',
            width: '160',
            align: 'center',
            formatter: function (row) {
              if (row.remindType == '1') {
                return '振动'
              } else if (row.remindType == '2') {
                return '语音'
              } else if (row.remindType == '3') {
                return '语音+振动'
              } else if (row.remindType == '0') {
                return '不提示'
              }
            }
          },
          {
            prop: 'updator',
            label: '最后更新者',
            width: '120',
            align: 'center'
          },
          {
            prop: 'updateDatetime',
            label: '更新时间',
            // width: '180',
            align: 'center'
          },
        ],
        tableData: [
          {
            affiliatedScenery: '青城山',
            railName: '野生动物保护区',
            railOwner: '导游',
            guide: '张大宝',
            updatePerson: '李四',
            alarmType: '进围栏报警',
            remindType: '语音',
            updateDate: '2019-5-14',
            isEnabled: true,//是否启用状态
          },
          {
            affiliatedScenery: '张家界',
            railName: '危险区',
            railOwner: '景区',
            guide: '大宝',
            updatePerson: '张三',
            alarmType: '进出围栏报警',
            remindType: '震动+语音',
            updateDate: '2019-5-14',
            isEnabled: true,//是否启用状态
          },

        ],

        ruleForm: {
          sceneryName: '',//所属景区名称
          sceneryId: '',//所属景区id
          name: '',//围栏名称
          warnType: '进围栏报警',//报警方式
          remindType: '',//提醒方式
          scope: '',//围栏范围
          railPointTextDefault: '依次输入坐标点，并用‘;’隔开,末尾务必以坐标点结束）：100,22;116.1,66.1;116.2,39.3;118,39;119,33',
          // railPointText: '104,30;104.2,33;114.1,38;114,30',
          railPointText: '',
          railPoints: [],
          type: [],
          resource: '',
          desc: ''
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
        ruleFormTips: {
          affiliatedScenery: '青城山景区',
          railName: '围栏名称1',
          alarmType: '报警方式1',
          remindType: '提醒方式2',
          language: '中文',
          importRailTip: '进围栏危险哦',
          exportRailTip: '出围栏更危险哦'

        }
      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //手动输入的坐标为非百度坐标时需要进行转换
      changeGpsToBaidu() {

        this.$confirm('请确定手动输入的坐标为GPS坐标，' + '否则请取消操作' + ', 是否继续?', '危险警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // this.$emit('cancelRelationTravelAgency')
          this.$axios(
            {
              method: 'post',
              url: '/mis/electronicFence/coordsChange',
              data: {
                coords: this.ruleForm.railPointText,
                from: 1
              }
            }
          ).then(res => {

            console.log('百度坐标转换', res.data)

            if (res.data.resultStatus.resultCode === '0000') {
              this.ruleForm.railPointText = res.data.value
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }


          }).catch(error => {

          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });

      },

      //所属景区：获取焦点打开新增编辑状态下的选择景区模态框
      openEditorSceneryDialog() {
        this.$store.state.editorOrSearch = '编辑'
        console.log(this.$store.state.editorOrSearch)
        this.openSceneryDialog()
      },
      //所属景区input框获取焦点时打开景区选择模态框并返回所有景区信息
      openSceneryDialog() {
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
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },

      //选择了具体景区信息以后，返回针对性的id和name
      transferSceneryId(n) {
        // console.log('猜我收到了什么哦',n)
        if (this.$store.state.editorOrSearch == '编辑') {
          this.ruleForm.sceneryId = n.id
          this.ruleForm.sceneryName = n.name
        } else if (this.$store.state.editorOrSearch == '查询') {
          // this.areaSearchParam = n
          this.$refs['mysearchs'].intoInputSceneryName(n)
        }

      },

      //编辑信息前先获取相关信息
      chooseInfo(n) {
        // console.log('到底会给我什么样的信息呢',n)
        this.commonId = n.id
        this.commonSceneryId = n.sceneryId
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
            if (this.ruleForm.warnType == '1') {
              this.ruleForm.warnType = '出围栏报警'
            } else if (this.ruleForm.warnType == '2') {
              this.ruleForm.warnType = '进围栏报警'
            } else if (this.ruleForm.warnType == '3') {
              this.ruleForm.warnType = '进出围栏报警'
            }
            if (this.ruleForm.remindType == '1') {
              this.ruleForm.remindType = '振动'
            } else if (this.ruleForm.remindType == '2') {
              this.ruleForm.remindType = '语音'
            } else if (this.ruleForm.remindType == '3') {
              this.ruleForm.remindType = '语音+振动'
            } else if (this.ruleForm.remindType == '0') {
              this.ruleForm.remindType = '不提示'
            }
            this.ruleForm.railPointText = this.ruleForm.scope

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
        this.ruleForm.scope = this.ruleForm.railPointText

        if (this.ruleForm.warnType == '出围栏报警') {
          this.ruleForm.warnType = '1'
        } else if (this.ruleForm.warnType == '进围栏报警') {
          this.ruleForm.warnType = '2'
        } else if (this.ruleForm.warnType == '进出围栏报警') {
          this.ruleForm.warnType = '3'
        }
        if (this.ruleForm.remindType == '振动') {
          this.ruleForm.remindType = '1'
        } else if (this.ruleForm.remindType == '语音') {
          this.ruleForm.remindType = '2'
        } else if (this.ruleForm.remindType == '语音+振动') {
          this.ruleForm.remindType = '3'
        } else if (this.ruleForm.remindType == '不提示') {
          this.ruleForm.remindType = '0'
        }
        // if(this.ruleForm.warnType ==)
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.railSign = false
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
        this.ruleForm.scope = this.ruleForm.railPointText
        if (this.ruleForm.warnType == '出围栏报警') {
          this.ruleForm.warnType = '1'
        } else if (this.ruleForm.warnType == '进围栏报警') {
          this.ruleForm.warnType = '2'
        } else if (this.ruleForm.warnType == '进出围栏报警') {
          this.ruleForm.warnType = '3'
        }
        if (this.ruleForm.remindType == '振动') {
          this.ruleForm.remindType = '1'
        } else if (this.ruleForm.remindType == '语音') {
          this.ruleForm.remindType = '2'
        } else if (this.ruleForm.remindType == '语音+振动') {
          this.ruleForm.remindType = '3'
        } else if (this.ruleForm.remindType == '不提示') {
          this.ruleForm.remindType = '0'
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
            this.$store.state.railSign = false
            this.getDefaultInfo()
          } else {
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
            url: this.apiEnable,
            data: {
              'id': this.commonId,
              'sceneryId': this.commonSceneryId,
            }
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

      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName": "",//景区名称
              "name": "",//围栏名称
              "status": '',
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
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

      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName": this.$store.state.affiliatedSceneryRRRParam,
              "name": this.$store.state.railNameParam,
              "status": this.$store.state.sceneryStateParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
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

        this.$confirm('请确定即将上传的坐标信息为百度坐标，' + '否则请取消本次' + '操作, 是否继续?', '危险警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {

          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              if (formName === 'ruleForm') {
                // this.$store.state.railSign = false
                if (this.$store.state.titleHeader === '新增') {
                  this.addInfo()
                } else if (this.$store.state.titleHeader === '编辑') {
                  this.editorInfo()
                }

              } else if (formName === 'ruleFormTips') {
                this.railTipsDialog = false
              }

            } else {
              console.log('error submit!!');
              return false;
            }
          });



        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });



      },

//以下是原本正常的新增编辑提交方法，以上是增加一个提交前的警告信息

      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       // alert('submit!');
      //       if (formName === 'ruleForm') {
      //         // this.$store.state.railSign = false
      //         if (this.$store.state.titleHeader === '新增') {
      //           this.addInfo()
      //         } else if (this.$store.state.titleHeader === '编辑') {
      //           this.editorInfo()
      //         }
      //
      //       } else if (formName === 'ruleFormTips') {
      //         this.railTipsDialog = false
      //       }
      //
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancelForm(formName) {
        this.$refs[formName].resetFields();
        if (formName === 'ruleForm') {
          this.$store.state.railSign = false
        } else if (formName === 'ruleFormTips') {
          this.railTipsDialog = false
        }

      },

      //地图围栏对应的方法函数
      openRailMap(n) {
        console.log('新增打开渲染地图，并获得了n为：', n)
        this.$nextTick(this.map)
        // this.$nextTick(this.add_overlay)
      },
      map() {
        var that = this
        var map = new BMap.Map("railMap", {minZoom: 5, maxZoom: 18}); // 创建Map实例,设置地图允许的最小/大级别
        that.maps = map
        var point = new BMap.Point(104.346071, 33.678385);
        map.centerAndZoom(point, 13);
        map.enableScrollWheelZoom();//启用滚轮放大缩小


        //鼠标绘制图层方法函数如下
        that.overlaycomplete = function (e) {
          that.overlays.push(e.overlay);
          var path = e.overlay.getPath();//Array<Point> 返回多边型的点数组
          var pointArr = []
          for (var i = 0; i < path.length; i++) {
            // console.log(path[i].lng+","+path[i].lat)
            pointArr.push(path[i].lng + "," + path[i].lat)
          }
          console.log('最终的坐标点集合', pointArr, pointArr.join(';'))

          //鼠标绘制图层后的数据赋值
          that.ruleForm.railPointText = pointArr.join(';')

        };
        var styleOptions = {
          strokeColor: "red",    //边线颜色。
          fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 3,       //边线的宽度，以像素为单位。
          strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
          fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid' //边线的样式，solid或dashed。
        }
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(map, {
          isOpen: false, //是否开启绘制模式
          enableDrawingTool: true, //是否显示工具栏
          drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            drawingModes: [
              BMAP_DRAWING_POLYGON,
              BMAP_DRAWING_RECTANGLE
            ]
          },
          circleOptions: styleOptions, //圆的样式
          polylineOptions: styleOptions, //线的样式
          polygonOptions: styleOptions, //多边形的样式
          rectangleOptions: styleOptions //矩形的样式
        });
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', that.overlaycomplete);

      },
      clearAll() {


        for (var i = 0; i < this.overlays.length; i++) {
          this.maps.removeOverlay(this.overlays[i]);
        }

        for (var k = 0; k < this.polygonArr.length; k++) {
          this.maps.removeOverlay(this.polygonArr[k]);
        }


      },
      //添加手动围栏覆盖物方法
      add_overlay() {
        this.clearAll()
        // console.log('点击覆盖物',this.ruleForm.railPointText)
        var pointArr = this.ruleForm.railPointText.split(';')
        var usedArr = [] //创建多边形围栏时，需要用到的点坐标集合
        console.log(pointArr)
        for (let i = 0; i < pointArr.length; i++) {
          if (i == 0) {
            this.centerPoint = new BMap.Point(pointArr[0].split(',')[0], pointArr[0].split(',')[1])
          }
          usedArr.push(new BMap.Point(pointArr[i].split(',')[0], pointArr[i].split(',')[1]),)
        }
        this.maps.centerAndZoom(this.centerPoint, 12);

        //创建多边形
        this.polygon = new BMap.Polygon(usedArr, {
          strokeColor: "blue",
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: "blue"
        });  //创建多边形
        this.polygonArr.push(this.polygon)//此处是吧所有的添加的多边形图形存储到一个数组中，方便清空地图图层的时候可用此数组
        this.maps.addOverlay(this.polygon);           //增加多边形

      },
      //点击围栏提示语设置按钮弹出对应模态框事件
      railTips() {
        this.railTipsDialog = true
      }


    }
  }
</script>

<style scoped>
  #railMap {
    border: 1px solid #ececec;
    width: 100%;
    height: 4.5rem;
    min-height: 300px;
    margin: 20px 0;
  }
</style>
