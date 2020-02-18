<template>
  <div>
    <mySearchs
      :sign="sign"
      :affiliatedScenery="affiliatedScenery"
      :facilitySort="facilitySort"
      :facilityName="facilityName"
      :sceneryState="sceneryState"
      :sceneryName="sceneryName"
      :isLanguageSet="isLanguageSet"
      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      @queryInfos="queryInfos"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @openSceneryDialog="openSceneryDialog"
      @openLanguageSetDialog="openLanguageSetDialog"
      ref="mysearchs"
    ></mySearchs>
    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    ></myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.sceneryFacilitySign" width="30%"
                 align="left" :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>

            <el-col :span="18" :offset="2">
              <el-form-item label="所属景区">
                <el-col>
                  <el-input v-model="ruleForm.sceneryName" @focus="openEditorSceneryDialog"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="设施名称">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="设施类别">
                <el-col class="select_style">
                  <el-select v-model="ruleForm.type" placeholder="请选择设施类别" class="select_style1">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="FAC_WC-厕所" value="FAC_WC"></el-option>
                    <el-option label="FAC_SELL-售卖点" value="FAC_SELL"></el-option>
                    <el-option label="FAC_DOOR-景区门" value="FAC_DOOR"></el-option>
                    <el-option label="FAC_SERVICE-服务站" value="FAC_SERVICE"></el-option>
                    <el-option label="FAC_ALM-报警点" value="FAC_ALM"></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset=2>
              <el-form-item label="经纬度" prop="name">
                <el-col :span="24">
                  <el-input v-model="ruleForm.lonLat"></el-input>
                </el-col>
                <!--<el-col :span="9" style="text-align: center;display: flex;">-->
                  <!--<span style="flex-grow: 1;background-color: #ececec;white-space: nowrap;font-size: 12px">拾取坐标</span>-->
                <!--</el-col>-->

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="位置">
                <el-col>
                  <el-input v-model="ruleForm.location"></el-input>
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
    <!--以下是提供选择所属景区模态框的-->
    <chooseSceneryDialog
      :dataScenery="dataScenery"
      @transferSceneryId="transferSceneryId"
    ></chooseSceneryDialog>


    <!--点击语言配置按钮后，对应弹出语言配置列表情况模态框-->
    <div id="myTablesDialog" class="scenery_language_set_box">
      <el-dialog :title="'服务设施语言配置--'+commonName" :visible.sync="chooseParam1" align="left" width="60%">
        <mySearchs
          :sign="sign"
          :sceneryLanguageSetTwoEventParam="sceneryLanguageSetTwoEventParam"
          :isAdd="isAdd"
          :isEditor="isEditor"
          :isEnabled="isEnabled"
          :isDisabled="isDisabled"
          @enableInfoX="enableInfoX"
          @disableInfoX="disableInfoX"
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


    <!--语言配置按钮点击后，进入到二层模态框列表后，里面的新增编辑模态框-->
    <div id="publicAddEditorDialog" class="scenery_language_set_box">
      <el-dialog title="新增/编辑" :visible.sync="$store.state.chooseParam999Facility" align="left" width="35%">
        <el-form :model="ruleFormX" ref="ruleFormX" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="20">
              <el-form-item label="语言">
                <!--<el-col>-->
                <!--<el-input type="textarea" v-model="ruleFormX.railPointText"></el-input>-->
                <!--</el-col>-->
                <el-select v-model="ruleFormX.language" size="small" placeholder="请选择语言类型">
                  <el-option
                    v-for="item in setLanguageTypeArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="设施名称">
                <el-col>
                  <el-input v-model="ruleFormX.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="20">
              <el-form-item label="位置">
                <el-col>
                  <el-input v-model="ruleFormX.location"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

          </el-row>

          <el-form-item>
            <el-col :span="9" :offset="12">
              <el-button @click="cancelForm('ruleFormX')">取消</el-button>
              <el-button type="warning" @click="submitForm('ruleFormX')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>


  </div>
</template>

<script>
  export default {
    name: "service-facility-manage",
    data() {
      return {
        //以下是语言配置相关的参数信息


        sceneryLanguageSetTwoEventParam: 'isTwoEvent',//此参数代表二级模态框里面出现的对应功能按钮点击后触发事件的区分（比如到底是第一层级的启用禁用，还是第二层级的启用禁用）
        ruleFormX: {
          "facilityId":"",//所属服务设施ID
          "language":"zh_CN",//语言类型：language：zh_CN-中文，zh_TW 繁体中文，en_US-英文，ko_KR-韩
          "name":"火车南站厕所",
          "location":"火车南站厕所"

        },
        setLanguageTypeArr: [
          {
            id: 'zh_CN',
            name: '中文'
          },
          {
            id: 'en_US',
            name: 'English'
          },
        ],

        apiSceneryLanguageSet: '/mis/facilityLang/query',//服务设施语言设置列表获取接口
        apiAddX: '/mis/facilityLang/add',
        apiEditorX: '/mis/facilityLang/edit',
        apiEnableX: '/mis/facilityLang/enable',
        apiDisableX: '/mis/facilityLang/disable',
        apiEditorGetX: '/mis/facilityLang/get',//XXXX编辑信息前先获取对应信息


        isQueryInfosX: true,//在二级列表里面查询是用于判断是点击的一级查询按钮还是二级查询按钮
        isShowEnabled: false,//常规的状态
        isPagePageShow: true,//XXX此处特殊，不要常规分页控件显示出来所以用了true，
        tableTitleParam1: [
          {
            prop: 'sceneryName',
            label: '所属景区',
            // width: '100',
            align: 'center',
          },
          {
            prop: 'language',
            label: '语言',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'name',
            label: '设施名称',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'location',
            label: '设施位置',
            // width: '120',
            align: 'center'
          }, {
            prop: 'updator',
            label: '最后更新者',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'updateDatetime',
            label: '最后更新时间',
            // width: '120',
            align: 'center',
          },
        ],
        tableDataParam1: [],
        commonName: '',
        commonFacilityId:'',//进行服务设施语言配置时，新增编辑都需要传递的服务设施id
        chooseParam1: false,//点击了景点语言配置按钮后是否展示语言配置详情列表模态框
        isLanguageSet: true,

        //以上是语言配置相关的参数信息


        apiQuery: '/mis/facility/query',//默认获取服务设施列表信息接口
        apiAdd: '/mis/facility/add',
        apiEditor: '/mis/facility/edit',
        apiEditorGet: '/mis/facility/get',
        apiEnable: '/mis/facility/enable',
        apiDisable: '/mis/facility/disable',
        apiChooseScenery: '/mis/scenery/queryChoose',
        commonId: '',
        sign: 'sceneryFacility',
        affiliatedScenery: true,//代表所属景区
        sceneryName: false,
        facilitySort: true,//代表设施类别
        facilityName: true,//代表设施名称
        sceneryState: true,//代表状态，启用禁用
        //以下为查询框下方对应的tab功能键是否显示的参数
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
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

        tableTitle: [

          {
            prop: 'sceneryName',
            label: '所属景区',
            width: '140',
            align: 'center'
          },
          {
            prop: 'type',
            label: '设施类别',
            width: '160',
            align: 'center'
          },
          {
            prop: 'name',
            label: '设施名称',
            width: '160',
            align: 'center'
          },
          {
            prop: 'lonLat',
            label: '经纬度',
            width: '220',
            align: 'center',
            // formatter: function (row) {
            //   return row.lon + ',' + row.lat
            // }
          },
          {
            prop: 'location',
            label: '设施位置',
            // width: '120',
            align: 'center'
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
            // width: '200',
            align: 'center'
          },
        ],
        tableData: [
          {
            affiliatedScenery: '青城山',
            facilitySort: '售卖点',
            facilityName: '老君阁售卖点',
            lnglat: '106,50',
            facilityPlace: '设施位置',
            updatePerson: '张大宝',
            updateDate: '2019-5-14',
            isEnabled: true,//是否启用状态
          },
          {
            affiliatedScenery: '青城山',
            facilitySort: '厕所',
            facilityName: '老君阁厕所',
            lnglat: '106,50',
            facilityPlace: '设施位置',
            updatePerson: '张大宝',
            updateDate: '2019-5-14',
            isEnabled: false,//是否启用状态
          },
          {
            affiliatedScenery: '青城山',
            facilitySort: '景区门',
            facilityName: '张家界大门',
            lnglat: '106,50',
            facilityPlace: '设施位置',
            updatePerson: '张大宝',
            updateDate: '2019-5-14',
            isEnabled: true,//是否启用状态
          },
          {
            affiliatedScenery: '青城山',
            facilitySort: '售卖点',
            facilityName: '老君阁售卖点',
            lnglat: '106,50',
            facilityPlace: '设施位置',
            updatePerson: '张大宝',
            updateDate: '2019-5-14',
            isEnabled: false,//是否启用状态
          },

        ],

        ruleForm: {
          "sceneryId": "",
          "sceneryName": "",
          "type": "",
          "name": "",
          "lon": "",
          "lat": "",
          "lonLat": "例如:104,33;106,45",
          "location": ""
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
      //以下服务设施语言配置相关方法函数

      //点击服务设施语言配置按钮显示对应语言配置模态框
      openLanguageSetDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiSceneryLanguageSet + '?facilityId=' + this.commonId,
            data: {}
          }
        ).then(res => {
          console.log('服务设施语言配置信息出没：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            // console.log('语言配置信息出没：', res.data)
            this.tableDataParam1 = [...res.data.value]
            // this.$store.state.totalParamX = res.data.value.total
            this.chooseParam1 = true
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })

      },

      //点击二级列表行以后获取的相关二级列表行内容（因为层级过深，所以才会出现特殊的X版本事件）
      chooseInfoX(n) {
        console.log('XX二级到底会给我什么样的信息呢', n)
        this.commonIdX = n.id

        this.ruleFormX = n
        // this.languageXPack = n.language

        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGetX + '?id=' + this.commonIdX,
            data: {}
          }
        ).then(res => {
          console.log('编辑前先获取到相关信息哦：---', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleFormX = res.data.value

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })


      },


      //XXX新增信息
      addInfoX() {
        console.log('开始提交新增信息')
        this.ruleFormX.facilityId = this.commonFacilityId
        this.$axios(
          {
            method: 'post',
            url: this.apiAddX,
            data: this.ruleFormX
          }
        ).then(res => {
          console.log('景点语言配置新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.chooseParam999Facility = false
            this.openLanguageSetDialog()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //XXXX编辑信息之后提交信息
      editorInfoX() {
        console.log('开始提交编辑信息')
        this.ruleFormX.facilityId = this.commonFacilityId
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorX,
            data: this.ruleFormX
          }
        ).then(res => {
          console.log('景区语言配置编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.chooseParam999Facility = false
            this.openLanguageSetDialog()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },


      //XXXX启用
      enableInfoX() {
        // alert('你选择了继续操作XX哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiEnableX + '?id=' + this.commonIdX,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.openLanguageSetDialog()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

          // console.log(res.data,'前面是后台返回的启用之后的信息')
        }).catch(error => {

        })
      },
      //XXXX禁用
      disableInfoX() {
        // alert('你选择了继续操作XX哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiDisableX + '?id=' + this.commonIdX,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.openLanguageSetDialog()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },


      //查询(服务设施语言配置详情)XXXXX按钮返回列表数据
      queryInfosX(n) {
        // console.log('我要传值了哦', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiSceneryLanguageSet + '?sceneryId=' + this.commonId,
            data: {
              // "sceneryId": '',
              // "pageNum": this.$store.state.pageNumParamX,
              // "pageSize": this.$store.state.pageSizeParamX,
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('终端设备更新信息出没：', res.data)
            this.tableDataParam1 = [...res.data.value]
            // this.$store.state.totalParamX = res.data.value.total
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })


      },


      //以上服务设施语言配置相关方法函数


      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "name": '',
              "type": '',
              "sceneryId": '',
              "status": '',
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('返回的数据', res.data, res.data.value.total)
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
            this.$store.state.sceneryFacilitySign = false
            this.getDefaultInfo()
          } else {
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

        this.commonFacilityId = n.id

        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGet + '?id=' + n.id,
            data: {}
          }
        ).then(res => {
          console.log('获取的是什么信息', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            res.data.value.lnglat = res.data.value.lon + ',' + res.data.value.lat
            res.data.value.sosPhone = Number(res.data.value.sosPhone)
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
            this.$store.state.sceneryFacilitySign = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //服务设施启用
      enableInfo() {
        // alert('你选择了继续操作哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiEnable + '?id=' + this.commonId,
            data: {
              id: this.commonId
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
      //服务设施禁用
      disableInfo() {
        // alert('你选择了继续操作哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiDisable + '?id=' + this.commonId,
            data: {
              id: this.commonId
            }
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
      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "type": this.$store.state.facilityTypeParam,
              "sceneryId": this.$store.state.sceneryIdParam,
              "name": this.$store.state.facilityNameParam,
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

            } else if (formName === 'ruleFormX') {

              if (this.$store.state.titleHeader === '新增') {
                this.addInfoX()
              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfoX()
              }

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

        if(formName === 'ruleForm'){
          this.$store.state.sceneryFacilitySign = false
        }else if(formName === 'ruleFormX'){
          this.$store.state.chooseParam999Facility = false

        }

      },

    }
  }
</script>

<style scoped>

</style>
