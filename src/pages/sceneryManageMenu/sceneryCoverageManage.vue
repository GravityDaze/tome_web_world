<template>
  <div>
    <mySearchs
      :sign="sign"
      :eventParam="1"
      :sceneryState="sceneryState"
      :affiliatedScenery="affiliatedScenery"
      :coverageName="coverageName"
      :sceneryName="sceneryName"
      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      :isCoverageManage="isCoverageManage"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @queryInfos="queryInfos"
      @openCoverageManageDialog="openCoverageManageDialog"
    ></mySearchs>

    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isHandle="isHandle"
      :isShowIconImage="isShowIconImage"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
    ></myTables>


    <!--景区图层新增或者编辑-->
    <div id="publicAddEditorDialog">
      <el-dialog :title="'图层'+$store.state.titleHeader" :visible.sync="$store.state.sceneryCoverageSign" width="30%"
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
              <el-form-item label="图层名称">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="绘制顺序">
                <el-col>
                  <el-input v-model="ruleForm.sort"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="百度图层Key">
                <el-col>
                  <el-select v-model="ruleForm.type" size="small" placeholder="请选择百度图层Key">
                    <el-option
                      v-for="item in baiduKeyArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col class="position_center up_img_icon_place">
              <div><span>图标</span></div>
              <div>
                <div class="upload_header"
                     :style="{backgroundImage:'url('+ruleForm.iconUrl+')',backgroundSize:'100% 100%'}"></div>
                <input class="upload_input my_hover" type="file" @change="chooseHeaderPicture">
              </div>

            </el-col>
            <el-col class="position_center">
              <span class="tip_info">{{tipInfo}}</span>
            </el-col>
          </el-row>
          <el-form-item>
            <!--<el-col :span="4" :offset="2">-->
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            <!--</el-col>-->
            <el-col :span="10" :offset="6" style="display: flex;flex-wrap: nowrap">
              <el-button @click="cancelForm('ruleForm')">关闭</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <chooseSceneryDialog
      :dataScenery="dataScenery"
      @transferSceneryId="transferSceneryId"
    ></chooseSceneryDialog>

    <!--点击图层管理按钮后，对应弹出图层管理列表情况模态框-->
    <div id="myTablesDialog" class="scenery_language_set_box">
      <el-dialog :title="commonNameSceneryName+'图层--'+commonName" :visible.sync="chooseParam1" align="left" width="60%">
        <mySearchs
          :sign="sign"
          :eventParam="2"
          :sceneryLanguageSetTwoEventParam="sceneryLanguageSetTwoEventParam"
          :isAdd="isAdd"
          :isEditor="isEditor"
          :isEnabled="isEnabled"
          :isDisabled="isDisabled"
          :isLanguageSet="isLanguageSet"
          @enableInfoX="enableInfoX"
          @disableInfoX="disableInfoX"
          :isQueryInfosX="isQueryInfosX"
          @queryInfosX="queryInfosX"
          @openLanguageSetDialog="openLanguageSetDialog"
        ></mySearchs>
        <myTables
          :tableTitle="tableTitleParam1"
          :tableData="tableDataParam1"
          :isShowEnabled="isShowEnabled"
          :isPagePageShow="isPagePageShow"
          :isShowIconImage="isShowIconImage"
          @chooseInfoX="chooseInfoX"
          @queryInfosX="queryInfosX"
        ></myTables>
      </el-dialog>
    </div>

    <!--景区图层--元素新增或者编辑-->
    <div id="userInfoForm">
      <el-dialog :title="'元素'+$store.state.titleHeader" :visible.sync="$store.state.chooseParam2" width="30%"
                 align="left" :close-on-click-modal="false">
        <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>

            <el-col :span="18" :offset="2">
              <el-form-item label="元素名">
                <el-col>
                  <el-input v-model="ruleForm2.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="说明">
                <el-col>
                  <el-input v-model="ruleForm2.describe"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="经纬度">
                <el-col>
                  <el-input v-model="ruleForm2.lonLat"></el-input>
                </el-col>

              </el-form-item>
            </el-col>


            <el-col class="position_center up_img_icon_place">
              <div><span>图标</span></div>
              <div>
                <div class="upload_header"
                     :style="{backgroundImage:'url('+ruleForm2.iconUrl+')',backgroundSize:'100% 100%'}"></div>
                <input class="upload_input my_hover" type="file" @change="chooseHeaderPicture2">
              </div>

            </el-col>
            <el-col class="position_center">
              <span class="tip_info">{{tipInfo}}</span>
            </el-col>
          </el-row>
          <el-form-item>

            <el-col :span="10" :offset="6" style="display: flex;flex-wrap: nowrap">
              <el-button @click="cancelForm('ruleForm2')">关闭</el-button>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>


    <!--点击语言配置按钮后，对应弹出图层管理列表情况模态框-->
    <div id="sceneryAllInfo" class="scenery_language_set_box">
      <el-dialog title="语言配置" :visible.sync="$store.state.chooseParam3" align="left" width="60%">
        <mySearchs
          :sign="sign"
          :eventParam="3"
          :sceneryLanguageSetTwoEventParam="sceneryLanguageSetTwoEventParam"
          :isAdd="isAdd"
          :isEditor="isEditor"
          :isEnabled="isEnabled"
          :isDisabled="isDisabled"
          @enableInfoX="enableInfoXX"
          @disableInfoX="disableInfoXX"
          :isQueryInfosX="isQueryInfosX"
        ></mySearchs>
        <myTables
          :tableTitle="tableTitleParam2"
          :tableData="tableDataParam2"
          :isShowEnabled="isShowEnabled"
          :isPagePageShow="isPagePageShow"
          @chooseInfoX="chooseInfoXX"
        ></myTables>
      </el-dialog>
    </div>

    <!--语言配置新增或者编辑-->
    <div id="alterPasswordForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.chooseParam4" width="30%"
                 align="left" :close-on-click-modal="false">
        <el-form :model="ruleForm3" ref="ruleForm3" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>

            <el-col :span="18" :offset="2">
              <el-form-item label="语言">
                <el-select v-model="ruleForm3.language" size="small" placeholder="请选择语言类型">
                  <el-option
                    v-for="item in setLanguageTypeArr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>

              </el-form-item>
            </el-col>

            <el-col :span="18" :offset="2">
              <el-form-item label="元素名">
                <el-col>
                  <el-input v-model="ruleForm3.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="说明">
                <el-col>
                  <el-input v-model="ruleForm3.describe"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item>

            <el-col :span="10" :offset="6" style="display: flex;flex-wrap: nowrap">
              <el-button @click="cancelForm('ruleForm3')">关闭</el-button>
              <el-button type="primary" @click="submitForm('ruleForm3')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>


  </div>
</template>

<script>
  export default {
    name: "scenery-coverage-manage",
    data() {
      return {
        //以下为图层管理按钮触发时及之后的一系列参数
        apiSceneryCoverageManageList: '/mis/sceneryLayerElement/query',//获取景区图层元素管理列表信息
        apiSceneryCoverageElementLanguageManageList: '/mis/sceneryLayerElementLang/query',//获取景区图层元素语言配置管理列表信息

        isShowEnabled: false,//常规的状态
        isPagePageShow: true,//XXX此处特殊，不要常规分页控件显示出来所以用了true，
        tableTitleParam1: [
          {
            prop: 'name',
            label: '元素名',
            // width: '100',
            align: 'center',
          },
          {
            prop: 'lonLat',
            label: '经纬度',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'describe',
            label: '说明',
            // width: '100',
            align: 'center'
          },
          // {
          //   prop: 'iconUrl',
          //   label: '图标',
          //   // width: '120',
          //   align: 'center'
          // },
          {
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

        tableTitleParam2: [
          {
            prop: 'language',
            label: '语言',
            // width: '100',
            align: 'center',
          },
          {
            prop: 'name',
            label: '元素名',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'describe',
            label: '说明',
            // width: '100',
            align: 'center'
          },
          {
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
        tableDataParam2: [],
        isQueryInfosX: true,//在二级列表里面查询是用于判断是点击的一级查询按钮还是二级查询按钮
        commonIdX: '',
        commonIdXX: '',
        apiAddX: '/mis/sceneryLayerElement/add',
        apiEditorX: '/mis/sceneryLayerElement/edit',
        apiEnableX: '/mis/sceneryLayerElement/enable',
        apiDisableX: '/mis/sceneryLayerElement/disable',
        apiEditorGetX: '/mis/sceneryLayerElement/get',//XXXX编辑信息前先获取对应信息

        apiAddXX: '/mis/sceneryLayerElementLang/add',
        apiEditorXX: '/mis/sceneryLayerElementLang/edit',
        apiEnableXX: '/mis/sceneryLayerElementLang/enable',
        apiDisableXX: '/mis/sceneryLayerElementLang/disable',
        apiEditorGetXX: '/mis/sceneryLayerElementLang/get',//XXXX编辑信息前先获取对应信息

        commonName: '',//图层名称
        commonNameSceneryName: '',//图层归属的景区名称
        chooseParam1: false,//点击了图层管理按钮后是否展示语言配置详情列表模态框
        sceneryLanguageSetTwoEventParam: 'isTwoEvent',//此参数代表二级模态框里面出现的对应功能按钮点击后触发事件的区分（比如到底是第一层级的启用禁用，还是第二层级的启用禁用）

        //以上为图层管理按钮触发时及之后的一系列参数


        apiChooseScenery: '/mis/scenery/queryChoose',//公共下拉选择景区框
        apiUploadImage: '/mis/upload/uploadImage',
        apiQuery: '/mis/sceneryLayer/query',
        apiAdd: '/mis/sceneryLayer/add',
        apiEditor: '/mis/sceneryLayer/edit',
        apiEnable: '/mis/sceneryLayer/enable',
        apiDisable: '/mis/sceneryLayer/disable',
        apiEditorGet: '/mis/sceneryLayer/get',//编辑信息前先获取对应信息
        sign: 'sceneryCoverage',//用于识别对应的页面标识
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        commonSceneryId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        //以下为查询框是否显示的参数
        sceneryState: true,//代表状态，启用禁用
        affiliatedScenery: false,//代表所属景区
        coverageName: true,//图层名称
        sceneryName: true,//景区名称
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

        //以下为查询框下方对应的tab功能键是否显示的参数
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        isLanguageSet:true,//语言配置
        isCoverageManage: true,//图层元素管理
        isShowIconImage: true,//显示列表图标栏目,图标正常显示
        tipInfo: '推荐尺寸为 64(宽) * 64(高)，大小不超过 50KB',
        ruleForm: {
          "sceneryId": "",
          "sceneryName": "",
          "name": "",
          "sort": "",
          "type": "",//百度图层key
          "iconUrl": ""
        },

        ruleForm2: {

          "sceneryLayerId": "",
          "name": "",
          "describe": "",
          "lonLat": "",
          "iconUrl": ""
        },

        ruleForm3: {

          "sceneryLayerElementId": "",
          "language": "",
          "name": "",
          "describe": ""
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
        rules: {
          affiliatedScenerySSS: [
            {required: true, message: '请输入所属景区', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          coverageNameSSS: [
            {required: true, message: '请输入图层名称', trigger: 'blur'}
          ],
          drawOrder: [
            {required: true, message: '请输入绘制顺序', trigger: 'blur'}
          ],

        },
        baiduKeyArr: [
          {
            id: 'road',
            name: '道路'
          },
          {
            id: 'building ',
            name: '建筑'
          },
          {
            id: 'water',
            name: '水'
          },
        ],

        //表格中是否显示操作一栏
        isHandle: false,

        tableTitle: [
          {
            prop: 'sceneryName',
            label: '所属景区',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'type',
            label: '百度图层Key',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'name',
            label: '图层名称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'sort',
            label: '绘制顺序',
            // width: '90',
            align: 'center'
          },

          {
            prop: 'updator',
            label: '最后更新者',
            // width: '120',
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
      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //中间夹的是图层管理按钮触发时及之后的事件

      //点击图层管理按钮显示对应图层管理相关信息模态框
      openCoverageManageDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiSceneryCoverageManageList,
            data: {
              "sceneryLayerId": this.commonId,
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParamX
            }
          }
        ).then(res => {
          console.log('点击图层管理按钮后获取的信息：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            // console.log('语言配置信息出没：', res.data)
            this.tableDataParam1 = [...res.data.value.list]
            // this.$store.state.totalParamX = res.data.value.total
            this.chooseParam1 = true
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })

      },

      //点击语言配置按钮显示对应图层管理元素语言配置相关信息模态框
      openLanguageSetDialog(){
        // alert('到底怎么了')
        this.openCoverageElementLanguageManageDialog()
      },
      openCoverageElementLanguageManageDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiSceneryCoverageElementLanguageManageList,
            data: {
              "sceneryLayerElementId": this.commonIdX,
            }
          }
        ).then(res => {
          console.log('点击图层管理按钮后获取的信息：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {

            this.tableDataParam2 = [...res.data.value]

            this.$store.state.chooseParam3 = true
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
            this.openCoverageManageDialog()
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
            this.openCoverageManageDialog()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },


      //XXXX启用
      enableInfoXX() {
        // alert('你选择了继续操作XX哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiEnableXX + '?id=' + this.commonIdXX,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.openCoverageElementLanguageManageDialog()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

          // console.log(res.data,'前面是后台返回的启用之后的信息')
        }).catch(error => {

        })
      },
      //XXXX禁用
      disableInfoXX() {
        // alert('你选择了继续操作XX哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiDisableXX + '?id=' + this.commonIdXX,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.openCoverageElementLanguageManageDialog()
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
        this.languageXPack = n.language

        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGetX + '?id=' + this.commonIdX,
            data: {}
          }
        ).then(res => {
          console.log('元素编辑前先获取到相关信息哦：---', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm2 = res.data.value
            // this.ruleFormX.headPicPath3 = res.data.value.imageUrls[0]
            this.$set(this.ruleFormX, 'headPicPath3', res.data.value.imageUrls[0])

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })


      },

      //点击三级列表行以后获取的相关三级列表行内容（因为层级过深，所以才会出现特殊的X版本事件）
      chooseInfoXX(n) {
        console.log('XX三级到底会给我什么样的信息呢', n)
        this.commonIdXX = n.id


        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGetXX + '?id=' + this.commonIdXX,
            data: {}
          }
        ).then(res => {
          console.log('元素编辑前先获取到相关信息哦：---', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm3 = res.data.value

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })


      },

      //XXX新增信息
      addInfoX() {
        console.log('开始提交新增信息')
        this.ruleForm2.sceneryLayerId = this.commonId

        this.$axios(
          {
            method: 'post',
            url: this.apiAddX,
            data: this.ruleForm2
          }
        ).then(res => {
          console.log('景点语言配置新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.chooseParam2 = false
            this.openCoverageManageDialog()
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
        this.ruleForm2.sceneryLayerId = this.commonId
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorX,
            data: this.ruleForm2
          }
        ).then(res => {
          console.log('景区语言配置编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.chooseParam2 = false
            this.openCoverageManageDialog()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //XXX新增信息
      addInfoXX() {
        console.log('开始提交新增信息')
        this.ruleForm3.sceneryLayerElementId = this.commonIdX

        this.$axios(
          {
            method: 'post',
            url: this.apiAddXX,
            data: this.ruleForm3
          }
        ).then(res => {
          console.log('景点语言配置新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.chooseParam4 = false
            this.openCoverageElementLanguageManageDialog()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //XXXX编辑信息之后提交信息
      editorInfoXX() {
        console.log('开始提交编辑信息')
        this.ruleForm3.sceneryLayerElementId = this.commonIdX
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorXX,
            data: this.ruleForm3
          }
        ).then(res => {
          console.log('景区语言配置编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.chooseParam4 = false
            this.openCoverageElementLanguageManageDialog()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //查询(景区语言配置详情)XXXXX按钮返回列表数据
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

      //中间夹的是图层管理按钮触发时及之后的事件


      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName": "",//景区名称
              "name": "",//景区图层名称
              "status": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('景区图层管理返回的数据', res.data)
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
              "sceneryName": this.$store.state.sceneryNameParam,
              "name": this.$store.state.coverageNameParam,
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

      //编辑信息前先获取相关信息
      chooseInfo(n) {
        // console.log('到底会给我什么样的信息呢',n)
        this.commonId = n.id
        this.commonName = n.name
        this.commonNameSceneryName = n.sceneryName
        this.commonSceneryId = n.sceneryId
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGet + '?id=' + n.id,
            data: {}
          }
        ).then(res => {
          console.log('景区图层点击行获取编辑前的消息的是什么信息', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm = res.data.value
            this.$message.success('获取信息成功，可进行信息编辑')
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },

      //开始提交新增信息
      addInfo() {

        this.$axios(
          {
            method: 'post',
            url: this.apiAdd,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('景区图层新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.sceneryCoverageSign = false
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
            this.$store.state.sceneryCoverageSign = false
            this.getDefaultInfo()
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //景区启用
      enableInfo() {
        // alert('你选择了继续操作哦')
        this.$axios(
          {
            method: 'post',
            url: this.apiEnable,
            data: {
              "sceneryId": this.commonSceneryId,
              "id": this.commonId
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
      //景区禁用
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

      //上传图层图标
      chooseHeaderPicture(e) {
        this.ruleForm.iconUrl = e.target.files[0]
        var formdata = new FormData()
        formdata.append('file', this.ruleForm.iconUrl)
        this.$axios(
          {
            method: 'post',
            url: this.apiUploadImage,
            data: formdata
          }
        ).then(res => {
          console.log('景区图层管理上传图片返回了什么', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm.iconUrl = res.data.value.url
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })


      },

      //上传图层--元素图标
      chooseHeaderPicture2(e) {
        this.ruleForm2.iconUrl = e.target.files[0]
        var formdata = new FormData()
        formdata.append('file', this.ruleForm2.iconUrl)
        this.$axios(
          {
            method: 'post',
            url: this.apiUploadImage,
            data: formdata
          }
        ).then(res => {
          console.log('景区图层管理上传图片返回了什么', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm2.iconUrl = res.data.value.url
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

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
          }else {
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

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // this.$store.state.sceneryCoverageSign = false
            if (formName === 'ruleForm') {
              if (this.$store.state.titleHeader === '新增') {
                this.addInfo()
              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfo()
              }
            }else if(formName === 'ruleForm2'){
              if (this.$store.state.titleHeader === '新增') {
                this.addInfoX()
              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfoX()
              }
            }else if(formName === 'ruleForm3'){

              if (this.$store.state.titleHeader === '新增') {
                this.addInfoXX()
              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfoXX()
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
        if(formName === 'ruleForm'){
          this.$refs[formName].resetFields();
          this.$store.state.sceneryCoverageSign = false
        }else if(formName === 'ruleForm2'){
          this.$store.state.chooseParam2 = false

        }else if(formName === 'ruleForm3'){
          this.$store.state.chooseParam4 = false

        }

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

  .up_img_icon_place > div:nth-child(2) {
    margin-left: 0.6rem;
  }
</style>
