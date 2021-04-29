<template>
  <div>
    <mySearchs
      :sign="sign"
      :areaSearchParam="areaSearchParam"
      :titleInfo="titleInfo"
      :sceneryName="sceneryName"
      :affiliatedScenery="affiliatedScenery"
      :spotName="spotName"
      :facilitySort="facilitySort"
      :facilityName="facilityName"
      :codeMachine="codeMachine"
      :imeiNum="imeiNum"
      :versionNum="versionNum"
      :routeNameShow="routeNameShow"
      :dateShow="dateShow"
      :sceneryGrade="sceneryGrade"
      :railName="railName"
      :sceneryState="sceneryState"
      :affilitedArea="affilitedArea"
      :coverageName="coverageName"
      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      :isAbandon="isAbandon"
      :isCoverageManage="isCoverageManage"
      :isSceneryScope="isSceneryScope"
      :isShutdown="isShutdown"
      :isLanguageSet="isLanguageSet"
      :isMapPreview="isMapPreview"
      :isSceneryAllInfo="isSceneryAllInfo"
      :isDel="isDel"
      :isAddDevice="isAddDevice"
      :isAllotDevice="isAllotDevice"
      :isImportDevice="isImportDevice"
      :isExportDevice="isExportDevice"
      @importf="importf"
      @exportInfo="exportInfo"
      @queryInfos="queryInfos"
      @openAreaDialog="openAreaDialog"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @openSceneryScopeMap="openSceneryScopeMap"
      @shutDownTips="shutDownTips"
      @openLanguageSetDialog="openLanguageSetDialog"
      ref="mysearchs"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isLanguage="isLanguage"
      :isScenerySerialNum="isScenerySerialNum"
      :isScenerySpotSerialNum="isScenerySpotSerialNum"
      :isHandle="isHandle"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
      @getDefaultNewPageInfo="getDefaultNewPageInfo"
    ></myTables>


    <myTablesDialog
      :tableTitleDialog="tableTitleDialog"
      :tableDataDialog="tableDataDialog"
      :titleList="titleList"
      :ruleFormNewPage="ruleFormNewPage"
      :sign="sign"
      @getNewPageInfo="getNewPageInfo"
    ></myTablesDialog>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.scenerySign" width="50%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <!--<el-col :span="10">-->
            <!--<el-form-item label="语言" prop="region">-->
            <!--<el-col class="select_style">-->
            <!--<el-select v-model="ruleForm.region" placeholder="请选择语言" class="select_style1">-->
            <!--<el-option label="中文" value="shanghai"></el-option>-->
            <!--<el-option label="English" value="beijing"></el-option>-->
            <!--</el-select>-->
            <!--</el-col>-->

            <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="10">
              <el-form-item label="景区名" prop="name">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="所属区域" prop="areaName">
                <el-col>
                  <el-input v-model="ruleForm.areaName" @focus="openEditorAreaDialog"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="景区级别" prop="level">
                <el-col class="select_style">
                  <el-select v-model="ruleForm.level" placeholder="请选择景区级别" class="select_style1">
                    <el-option
                      v-for="item in sceneryGradeInfo"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="景区服务商" prop="sceneryService">
                <el-col>
                  <el-input v-model="ruleForm.sceneryService" @focus="openEditorSceneryServiceDialog"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <!--<el-col :span="10">-->
            <!--<el-form-item label="负责人姓名" prop="chargeName">-->
            <!--<el-col>-->
            <!--<el-input v-model="ruleForm.chargeName"></el-input>-->
            <!--</el-col>-->

            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="10" :offset="3">-->
            <!--<el-form-item label="负责人电话" prop="chargePhone">-->
            <!--<el-col>-->
            <!--<el-input v-model="ruleForm.chargePhone"></el-input>-->
            <!--</el-col>-->

            <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="10">
              <el-form-item label="紧急电话" prop="sosPhone">
                <el-col>
                  <el-input v-model.number="ruleForm.sosPhone"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="经纬度" prop="lonLat">
                <el-col :span="24">
                  <el-input v-model="ruleForm.lonLat"></el-input>
                </el-col>
                <!--<el-col :span="9" style="text-align: center;display: flex;">-->
                <!--<span style="flex-grow: 1;background-color: #ececec;white-space: nowrap;font-size: 12px">拾取坐标</span>-->
                <!--</el-col>-->

              </el-form-item>
            </el-col>


            <el-col :span="10">
              <el-form-item label="景区链接" prop="url">
                <el-col>
                  <el-input v-model="ruleForm.url"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="3">
              <el-form-item label="景区地址" prop="address">
                <el-col>
                  <el-input v-model="ruleForm.address"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" style="display: none">
              <el-form-item label="活动时间" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="1" :offset="1">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                  </el-form-item>
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


    <!--以下是此页面对应的景区范围模态框-->
    <div id="userInfoForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.sceneryScopeSign" width="50%"
                 align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleFormSceneryScope" ref="ruleFormSceneryScope" label-width="100px" class="demo-ruleForm"
                 size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="23">
              <el-form-item label="手动输入坐标">
                <el-col>
                  <el-input type="textarea" v-model="ruleFormSceneryScope.railPointText"
                            :placeholder="ruleFormSceneryScope.infos"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="坐标功能按钮">
                <el-col>
                  <el-button type="warning" round size="mini" @click="clearAll">清空坐标</el-button>
                  <el-button type="warning" round size="mini">结束输入</el-button>
                  <el-button type="warning" round size="mini" @click="add_overlay">确认输入</el-button>

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
              <el-button @click="cancelForm('ruleFormSceneryScope')">取消</el-button>
              <el-button type="warning" @click="submitForm('ruleFormSceneryScope')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <chooseAreaDialog
      :dataArea="dataArea"
      @transferAreaId="transferAreaId"
    ></chooseAreaDialog>

    <chooseSceneryServiceDialog
      :dataSceneryService="dataSceneryService"
      @transferSceneryServiceId="transferSceneryServiceId"
    ></chooseSceneryServiceDialog>


    <!--点击语言配置按钮后，对应弹出语言配置列表情况模态框-->
    <div id="myTablesDialog" class="scenery_language_set_box">
      <el-dialog :title="'景区语言配置--'+commonName" :visible.sync="chooseParam1" align="left" width="60%">
        <mySearchs
          :sign="sign"
          :sceneryLanguageSetTwoEventParam="sceneryLanguageSetTwoEventParam"
          :isAdd="isAdd"
          :isEditor="isEditor"
          :isEnabled="isEnabled"
          :isDisabled="isDisabled"
          :isResourcePack="true"
          @enableInfoX="enableInfoX"
          @disableInfoX="disableInfoX"
          :isQueryInfosX="isQueryInfosX"
          @queryInfosX="queryInfosX"
          @infosPackFunction="infosPackFunction"
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
      <el-dialog title="新增/编辑" :visible.sync="$store.state.chooseParam999" align="left" width="28%">
        <el-form :model="ruleFormX" ref="ruleFormX" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="23">
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
            <el-col :span="23">
              <el-form-item label="景区名">
                <el-col>
                  <el-input v-model="ruleFormX.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="景区地址">
                <el-col>
                  <el-input type="textarea" v-model="ruleFormX.address"></el-input>
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

    <!--语言配置按钮点击后，进入到二层模态框列表后，里面的资源打包模态框-->
    <div id="alterPasswordForm" class="scenery_language_set_box">
      <el-dialog title="资源打包" :visible.sync="$store.state.chooseParam999Pack" align="left" width="28%">
        <el-form :model="ruleFormXPack" ref="ruleFormXPack" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="23">
              <el-form-item label="语言">
                <el-col>
                  <!--<el-input v-model="ruleFormXPack.language"></el-input>-->
                  <span>{{ruleFormXPack.language}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="景区NO">
                <el-col>
                  <!--<el-input v-model="ruleFormXPack.no"></el-input>-->
                  <span>{{ruleFormXPack.no}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="景区名称">
                <el-col>
                  <!--<el-input v-model="ruleFormXPack.name"></el-input>-->
                  <span>{{ruleFormXPack.name}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="资源包名">
                <el-col>
                  <!--<el-input v-model="ruleFormXPack.name"></el-input>-->
                  <span v-if="showMoreX">{{ruleFormXPack.resourcePackageInfo.name}}</span>
                  <span style="color: red" v-if="showBtnState == '2'">打包中...</span>
                  <el-button type="primary" round @click="packingFunction"
                             v-if="showBtnState == '1'&&isShowRestartPackBtn == '0'">资源打包
                  </el-button>
                  <el-button type="warning" round @click="packingRestartFunction" v-if="isShowRestartPackBtn == '1'">
                    重新打包
                  </el-button>
                </el-col>

              </el-form-item>
            </el-col>

            <!--以下增加的是进度条展示-->
            <el-col :span="23" v-if="showMoreX">
              <el-form-item label="进度百分比">
                <el-col>
                  <el-progress :text-inside="true" :stroke-width="22" :percentage="50" v-show="ruleFormXPack.resourcePackageInfo.status =='0'"></el-progress>
                </el-col>
                <el-col>
                  <el-progress :text-inside="true" :stroke-width="22" :percentage="100" v-show="ruleFormXPack.resourcePackageInfo.status !='0'"></el-progress>
                </el-col>

              </el-form-item>
            </el-col>
            <!--以上增加的是进度条展示-->


            <el-col :span="23" v-if="showMoreX">
              <el-form-item label="包大小">
                <el-col>
                  <!--<el-input v-model="ruleFormXPack.resourcePackageInfo.size"></el-input>-->
                  <span>{{ruleFormXPack.resourcePackageInfo.size}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23" v-if="showMoreX">
              <el-form-item label="版本">
                <el-col>
                  <!--<el-input v-model="ruleFormXPack.resourcePackageInfo.version"></el-input>-->
                  <span>{{ruleFormXPack.resourcePackageInfo.version}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23" v-if="showMoreX">
              <el-form-item label="打包者">
                <el-col>
                  <!--<el-input v-model="ruleFormXPack.resourcePackageInfo.creator"></el-input>-->
                  <span>{{ruleFormXPack.resourcePackageInfo.creator}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23" v-if="showMoreX">
              <el-form-item label="打包开始时间">
                <el-col>
                  <!--<el-input v-model="ruleFormXPack.resourcePackageInfo.endDatetime"></el-input>-->
                  <span>{{ruleFormXPack.resourcePackageInfo.startDatetime}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23" v-if="showMoreX">
              <el-form-item label="打包完成时间">
                <el-col>
                  <!--<el-input v-model="ruleFormXPack.resourcePackageInfo.endDatetime"></el-input>-->
                  <span>{{ruleFormXPack.resourcePackageInfo.endDatetime}}</span>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23" v-if="showMoreX">
              <el-form-item label="状态">
                <el-col>
                  <!--<el-input v-model="ruleFormXPack.resourcePackageInfo.status"></el-input>-->
                  <span>{{ruleFormXPack.resourcePackageInfo.status =='0'?'打包中':'完成，待确认'}}</span>
                  <el-button type="primary" round @click="surePackFunction"
                             v-if="ruleFormXPack.resourcePackageInfo.status =='1'">确认此包
                  </el-button>
                </el-col>

              </el-form-item>
            </el-col>

          </el-row>

          <el-form-item>
            <el-col :span="9" :offset="12">
              <!--<el-button @click="cancelForm('ruleFormXPack')">关闭</el-button>-->
              <!--<el-button type="warning" @click="submitForm('ruleFormXPack')">提交</el-button>-->
            </el-col>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>
  </div>
</template>

<script>
  import commonFn from '../../common_js/commonFn'

  export default {
    name: "scenery-manage",
    data() {
      //重要注释必读，此页面的参数众多，是由于本页面包含了所有其他页面有可能用到的所有判断参数，之所以全部列出，是为了方便其他页面需要用到对应参数时，都在此页面进行查看及复制使用
      return {
        isShowRestartPackBtn: 0,//用于控制显示重新打包按钮
        showBtnState: 1,//这个参数用于控制'1'打包前(即显示资源打包按钮)，‘2’打包中，‘3’打包后状态的切换
        showMoreX: false,//这个参数用于控制显示资源打包里面详情信息时全部显示还是只显示部分信息的
        //资源打包模态框内部参数
        ruleFormXPack: {
          id: '',//景区语言id
          no: '',//景区no
          name: '',//景区名称
          language: '',//语言
          resourcePackageInfo: {
            creator: '',//打包者
            endDatetime: '',//打包完成时间
            id: '',
            isRestart: '',
            name: '',
            packageUrl: '',
            size: '',//资源包大小
            startDatetime: '',//打包开始时间
            status: '',//状态
            version: '',//资源包版本
          },
        },
        apiGetPackInfos: '/mis/sceneryLang/packingInfo',//点击资源打包后先去获取对应打包的详细信息，并展示出来，的接口
        apiPacking: '/mis/sceneryLang/packing',//点击资源打包按钮开始进行中ing
        apiRestartPacking: '/mis/sceneryLang/restartPacking',//从新打包接口
        apiSurePack: '/mis/sceneryLang/affirmPack',//资源打包确认打包
        languageXPack: '',
        ruleFormX: {
          "sceneryId": '',
          "language": "",//语言类型：language：zh_CN-中文，zh_TW 繁体中文，en_US-英文，ko_KR-韩
          "name": "",//这里的景区名不要跟常规的景区名理解成一样，此处的景区名仅只是针对于景区语言配置
          "address": "",//景区地址
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
        sceneryLanguageSetTwoEventParam: 'isTwoEvent',//此参数代表二级模态框里面出现的对应功能按钮点击后触发事件的区分（比如到底是第一层级的启用禁用，还是第二层级的启用禁用）
        maps: {},
        overlays: [],
        centerPoint: '',//添加遮盖物图层后，定位地图中心点参数
        overlaycomplete: {},
        polygon: {},//创建多边形变量
        polygonArr: [],//所有创建的多边形，存放在此数组中
        //以上的参数是百度地图对应参数
        apiQuery: '/mis/scenery/query',//景区默认数据查询
        apiAdd: '/mis/scenery/add',
        apiEditor: '/mis/scenery/edit',
        apiEnable: '/mis/scenery/enable',
        apiDisable: '/mis/scenery/disable',
        apiChooseArea: '/mis/area/queryDropDownAll',
        apiEditorGet: '/mis/scenery/get',//编辑信息前先获取对应信息
        apiChooseSceneryService: '/mis/sceneryService/queryDropDown',//获取景区服务商
        apiSceneryInfos: '/mis/scenery/getDetails',//获取景区详情信息接口
        apiScenerySpotListInfo: '/mis/scenerySpots/queryByScenery',//景区详情里面的景点列表信息接口
        apiFacilityInfo: '/mis/facility/queryByScenery',//景区详情里面的服务设施列表信息接口
        apiElectronicFenceInfo: '/mis/electronicFence/queryByScenery',//景区详情里面的电子围栏列表信息接口
        apiLaunchSourceInfo: '/mis/launchSource/queryByScenery',//景区详情里面的发射源列表信息接口
        apiSceneryScopeInfo: '/mis/scenery/getScope',//景区范围坐标点集合获取接口
        apiSaveSceneryScopeInfo: '/mis/scenery/editScope',//保存景区范围坐标信息
        apiShutDownTips: '/mis/scenery/shutDown',//一键关机接口
        sign: 'scenery',//用于识别对应的页面标识
        chooseParam1: false,//点击了景区语言配置按钮后是否展示语言配置详情列表模态框
        // chooseParam999:false,//景区语言配置详情列表里面的新增编辑模态框控制是否显示参数
        //语言配置模态框列表表头数据
        apiSceneryLanguageSet: '/mis/sceneryLang/query',//景区语言设置列表获取接口
        apiAddX: '/mis/sceneryLang/add',
        apiEditorX: '/mis/sceneryLang/edit',
        apiEnableX: '/mis/sceneryLang/enable',
        apiDisableX: '/mis/sceneryLang/disable',
        apiEditorGetX: '/mis/sceneryLang/get',//XXXX编辑信息前先获取对应信息

        tableTitleParam1: [
          {
            prop: 'language',
            label: '语言',
            // width: '100',
            align: 'center',
          },
          {
            prop: 'name',
            label: '景区名称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'address',
            label: '景区地址',
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
        tableDataParam1: [],
        isQueryInfosX: true,//在二级列表里面查询是用于判断是点击的一级查询按钮还是二级查询按钮
        isShowEnabled: false,//常规的状态
        isPagePageShow: true,//XXX此处特殊，不要常规分页控件显示出来所以用了true，
        commonIdX: '',

        commonName: '',
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        showTablesDialog: true,//此参数是在点击表格里面景区编号时，触发是否显示景区详细信息模态框的参数
        //以下为查询框是否显示的参数
        sceneryName: true,//代表该页面是否显示对应的景区名称筛选功能input框
        affiliatedScenery: false,//代表所属景区
        userTel: true,//用户手机号
        sosTime: false,//呼救时间
        spotName: false,//代表该页面是否显示对应的景点名称筛选功能input框
        codeMachine: false,//代表该页面是否显示对应的机器码筛选功能input框
        imeiNum: false,//代表该页面是否显示对应的imei设备号筛选功能input框
        versionNum: false,//代表该页面是否显示对应的版本号筛选功能input框
        routeNameShow: false,//代表该页面是否显示对应的行程名称筛选功能input框
        dateShow: false,//代表该页面是否显示对应的日期控件筛选功能input框
        sceneryGrade: true,//代表景区级别
        facilitySort: false,//代表设施类别
        facilityName: false,//代表设施名称
        railName: false,//代表围栏名称
        sceneryState: true,//代表状态，启用禁用
        affilitedArea: true,//代表所属区域
        coverageName: false,//图层名称
        //以下为查询框下方对应的tab功能键是否显示的参数
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        isAbandon: false,//显示弃用按钮
        isCoverageManage: false,//图层元素管理
        isSceneryScope: true,//显示景区范围
        isRailTips: true,//显示围栏提示语设置
        isShutdown: true,//显示一键关机
        isLanguageSet: true,//显示语言设置
        isResourcePack: true,//显示资源打包
        isMapPreview: false,//显示地图预览
        isSceneryAllInfo: false,//显示景区详情
        isDel: false,//显示删除
        isAddDevice: false,//显示添加设备
        isAllotDevice: false,//显示分配设备
        isImportDevice: false,//显示导入设备
        isExportDevice: false,//显示导出设备
        isLanguage: true,//是否显示语言
        isScenerySerialNum: true,//是否显示景区编号
        isScenerySpotSerialNum: false,//是否显示景点编号
        //表格中是否显示操作一栏
        isHandle: false,
        sceneryGradeInfo: [
          {
            id: '0',
            name: '全部'
          },
          {
            id: '1',
            name: 'A'
          },
          {
            id: '2',
            name: 'AA'
          },
          {
            id: '3',
            name: 'AAA'
          },
          {
            id: '4',
            name: 'AAAA'
          },
          {
            id: '5',
            name: 'AAAAA'
          },
        ],
        areaSearchParam: {},//此参数用于传递给搜索条件里面的所属区域input框

        titleInfo: {
          title1: '景区服务',
          title2: '景区服务商'
        },
        tableTitle: [
          {
            prop: 'name',
            label: '景区名称',
            width: '100',
            align: 'center'
          },
          {
            prop: 'level',
            label: '景区级别',
            width: '120',
            align: 'center',
            formatter: function (row) {
              if (row.level == 1) {
                return 'A'
              } else if (row.level == 2) {
                return 'AA'
              } else if (row.level == 3) {
                return 'AAA'
              } else if (row.level == 4) {
                return 'AAAA'
              } else if (row.level == 5) {
                return 'AAAAA'
              } else {
                return ''
              }
            }
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
            width: '100',
            align: 'center'
          },
          {
            prop: 'sosPhone',
            label: '紧急呼救电话',
            width: '100',
            align: 'center'
          },
          {
            prop: 'areaName',
            label: '所属区域',
            // width: '180',
            align: 'center'
          },


          {
            prop: 'address',
            label: '景区地址',
            // width: '200',
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
        tableData: [
          {
            no: 'S00001',
            spotNumber: 'SP00001',
            name: '青城山',
            level: '5',
            chargeName: '彭超',
            chargePhone: '13345811137',
            sosPhone: '11011011011',
            areaName: '中国/四川/成都/都江堰市',
            address: '上海市普陀区金沙江路 1518 弄',
            updator: '张大宝',
            updateDatetime: '2019-5-14 18:20:20',
            status: 1,//是否启用状态
          },

        ],

        ruleForm: {
          name: '',
          areaId: '',
          areaName: '',
          sceneryServiceId: '',
          sceneryService: '',
          level: '',
          lonLat: '例如:104,33;106,45',
          lon: '',
          lat: '',
          sosPhone: '',
          address: '',
          url: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入景区名称', trigger: 'blur'},
            {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
          ],
          level: [
            {required: true, message: '请选择景区级别', trigger: 'change'}
          ],
          sosPhone: [
            {required: true, message: '请输入紧急联系电话', trigger: 'blur'},
            {type: 'number', message: '手机号码必须为数字', trigger: 'blur'},
            {pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式错误', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请输入地址信息', trigger: 'blur'}
          ],
          lonLat: [
            {required: true, message: '请输入经纬度信息，支持小数点后最多六位', trigger: 'blur'}
          ]
        },

        tableTitleDialog: [
          {
            prop: 'onlineAmount',
            label: '在线总数',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'offlineAmount',
            label: '离线总数',
            width: '100',
            align: 'center'
          },
          {
            prop: 'scenicId',
            label: '景区Id',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'personName',
            label: '负责人姓名',
            width: '120',
            align: 'center'
          },
          {
            prop: 'personTel',
            label: '负责人电话',
            width: '180',
            align: 'center'
          },
          {
            prop: 'address',
            label: '通讯地址',
            width: '300',
            align: 'center'
          },
        ],
        tableDataDialog: [
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '9999',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },

        ],
        //此参数表示点击对应tables里面的详情信息时，呈现的信息内容对象
        ruleFormNewPage: {
          scenerySerialNum: 'S00101',
          sceneryState: 0,
          sceneryName: '青城山',
          scenerySpotName: '老君阁',
          sceneryGrade: 'AAAA',
          area: '四川成都',//所属区域
          serviceProvider: '青城山服务商',
          lonLat: '126.5,19',//经纬度
          grade: 'AAAA',//景区级别
          sosTel: '110',//紧急电话
          linkMan: '彭超',//负责人
          linkTel: '13345811137',//负责人电话
          createMan: '马云创建者',
          createTime: '2015-5-5',
          updateMan: '刘强东',
          updateTime: '2019-10-14',
          rfid: 'rfid发射源',
          rfidPlace: '位置版发射源',
          linkAddress: 'https://baike.baidu.com/item/map/twreler.html?key=92837768723',//景区链接
          address: '四川省成都市都江堰市青城山镇青城山路',//详细地址
          scenerySpotAddress: '正南峰500米',
        },

        titleList: [
          {
            id: 1,
            title: '景区信息'
          },
          {
            id: 2,
            title: '景点信息'
          },
          {
            id: 3,
            title: '服务设施'
          },
          {
            id: 4,
            title: '围栏信息'
          },
          {
            id: 5,
            title: '发射源'
          },

        ],
        dataArea: [
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
        dataSceneryService: [
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

        tableDataAdd: [],//新导入的excel数据（区别是此数组是标准的json）
        excelData: [],//新导入的excel数据储存在此数组中（区别在于此数组是伪json数据，属性值是汉子之类的非标准属性命名）
        ruleFormSceneryScope: {
          infos: '(备注:经纬度之间用英文逗号隔开，坐标点与坐标点之间用英文分号隔开。例如:)164,33;99,66;79,37',
          railPointText: ''
        }
      }
    },
    methods: {
      //以下为景区管理--景区语言配置的相关函数方法


      //点击二级列表行以后获取的相关二级列表行内容（因为层级过深，所以才会出现特殊的X版本事件）
      chooseInfoX(n) {
        console.log('XX二级到底会给我什么样的信息呢', n)
        this.commonIdX = n.id
        this.ruleFormX = n
        this.languageXPack = n.language


      },
      //点击资源打包按钮显示对应的资源打包具体信息模态框
      infosPackFunction() {
        // alert('景来了啊')
        this.$store.state.chooseParam999Pack = true
        this.$axios(
          {
            method: 'post',
            url: this.apiGetPackInfos + '?id=' + this.commonIdX,
            data: {}
          }
        ).then(res => {
          console.log('资源快点打包吧，早点结束：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {

            // console.log('resourcePackageInfo?????',res.data.value.resourcePackageInfo)
            if (res.data.value.resourcePackageInfo) {
              this.ruleFormXPack = res.data.value
              this.showMoreX = true
              if (res.data.value.resourcePackageInfo.isRestart == '1') {
                this.isShowRestartPackBtn = 1
              } else {
                this.isShowRestartPackBtn = 0
              }
            } else {
              this.ruleFormXPack = res.data.value
              this.showMoreX = false
              this.isShowRestartPackBtn = 0
            }
            // this.$store.state.chooseParam999Pack = true
            // this.ruleFormXPack = res.data.value
            // this.ruleFormXPack.resourcePackageInfo.creator = ''
            // this.ruleFormXPack.resourcePackageInfo.endDatetime = ''
            // this.ruleFormXPack.resourcePackageInfo.id = ''
            // this.ruleFormXPack.resourcePackageInfo.isRestart = ''
            // this.ruleFormXPack.resourcePackageInfo.name = ''
            // this.ruleFormXPack.resourcePackageInfo.packageUrl = ''
            // this.ruleFormXPack.resourcePackageInfo.size = ''
            // this.ruleFormXPack.resourcePackageInfo.startDatetime = ''
            // this.ruleFormXPack.resourcePackageInfo.status = ''
            // this.ruleFormXPack.resourcePackageInfo.version = ''
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //获取打包信息后，点击资源打包按钮进行ing
      packingFunction() {
        this.showBtnState = '2'
        this.$axios(
          {
            method: 'post',
            url: this.apiPacking + '?id=' + this.commonIdX,
            data: {}
          }
        ).then(res => {
          console.log('ing进行中返回的信息；', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.showBtnState = '3'
            this.infosPackFunction()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //（备注：打包后的重新按钮打包）获取打包信息后，点击资源从新打包按钮进行ing
      packingRestartFunction() {
        this.showBtnState = '2'
        this.$axios(
          {
            method: 'post',
            url: this.apiRestartPacking + '?id=' + this.commonIdX,
            data: {}
          }
        ).then(res => {
          console.log('ing进行中返回的信息；', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.showBtnState = '3'
            this.infosPackFunction()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //打包完成后，最后的确认事件
      surePackFunction() {
        this.$axios(
          {
            method: 'post',
            url: this.apiSurePack,
            data: {
              "id": this.ruleFormXPack.id,//景区语言id
              "packId": this.ruleFormXPack.resourcePackageInfo.id,//资源包id
            }
          }
        ).then(res => {
          console.log('确认打包按钮事件返回的信息：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$message.warning(res.data.resultStatus.resultMessage)
            this.$store.state.chooseParam999Pack = false
            this.showBtnState = '1'
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },


      //点击景区语言配置按钮显示对应语言配置模态框
      openLanguageSetDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiSceneryLanguageSet + '?sceneryId=' + this.commonId,
            data: {}
          }
        ).then(res => {
          console.log('语言配置信息出没：', res.data)
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

      //XXX新增信息
      addInfoX() {
        console.log('开始提交新增信息')
        this.ruleFormX.sceneryId = this.commonId
        this.$axios(
          {
            method: 'post',
            url: this.apiAddX,
            data: this.ruleFormX
          }
        ).then(res => {
          console.log('景区语言配置新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.chooseParam999 = false
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
        this.ruleFormX.sceneryId = this.commonId
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorX,
            data: this.ruleFormX
          }
        ).then(res => {
          console.log('景区语言配置编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.chooseParam999 = false
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

      //以上为景区管理--景区语言配置的相关函数方法


      //导入excel表格内容
      importf(obj) {
        // console.log(obj)
        let _this = this;
        this.file = event.currentTarget.files[0];
        var rABS = false; //是否将文件读取为二进制字符串
        var file = this.file;

        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var workbook; //读取完成的数据
          // var excelData;
          var reader = new FileReader();
          reader.onprogress = function (e) {
            let total = file.size;
            _this.progress = (e.loaded / total) * 100;
            console.log(_this.progress);
          };
          reader.onload = function (e) {
            try {
              var bytes = new Uint8Array(reader.result);
              var length = bytes.byteLength;
              for (var i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              if (rABS) {
                workbook = XLSX.read(btoa(fixdata(binary)), { //手动转化
                  type: 'base64'
                });
              } else {
                workbook = XLSX.read(binary, {
                  type: 'binary'
                });
              }
              // excelData = [];
            } catch (e) {
              console.log('文件类型不正确');
              _this.$message.warning('导入数据失败')
              return;
            }
            var fromTo = '';
            for (var sheet in workbook.Sheets) {
              if (workbook.Sheets.hasOwnProperty(sheet)) {
                fromTo = workbook.Sheets[sheet]['!ref'];
                // _this.excelData = _this.excelData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                _this.excelData = (XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
              }
            }
            _this.tableDataAdd = []

            for (let j = 0; j < _this.excelData.length; j++) {
              //将伪json格式数据转化为标准json格式数据
              _this.tableDataAdd.push(
                {
                  scenicService: _this.excelData[j]['景区服务商'],
                  deviceAmount: _this.excelData[j]['设备总数'],
                  onlineAmount: _this.excelData[j]['在线总数'],
                  offlineAmount: _this.excelData[j]['离线总数'],
                  scenicId: _this.excelData[j]['景区Id'],
                  personName: _this.excelData[j]['负责人姓名'],
                  personTel: _this.excelData[j]['负责人电话'],
                  address: _this.excelData[j]['通讯地址'],
                }
              )
            }
            //更新表格数据，将新导入的excel数据数组添加到原来表格数据数组中去，形成新的表格数据
            _this.tableData = _this.tableData.concat(_this.tableDataAdd)

            console.log(_this.excelData);
            console.log('数据已经导入了哦')

            _this.$message.success('导入数据成功')
          };

          reader.readAsArrayBuffer(f);

        }

        var reader = new FileReader();
        if (rABS) {
          reader.readAsArrayBuffer(file);
        } else {
          reader.readAsBinaryString(file);
        }


      },
      //导出信息为excel格式表
      exportInfo() {
        var n = this.tableTitle
        var k = this.tableData

        commonFn.exportExcel(n, k)
      },

      //所属区域：获取焦点打开编辑状态下的选择区域模态框
      openEditorAreaDialog() {
        this.$store.state.editorOrSearch = '编辑'
        console.log(this.$store.state.editorOrSearch)
        this.openAreaDialog()
      },
      //所属服务商：获取焦点打开编辑状态下的选择景区服务商模态框
      openEditorSceneryServiceDialog() {
        this.$store.state.editorOrSearch = '编辑'
        console.log(this.$store.state.editorOrSearch)
        this.openSceneryServiceDialog()
      },

      //所属区域input框获取焦点是打开区域选择模态框并返回所有区域信息
      openAreaDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiChooseArea,
            data: {}
          }
        ).then(res => {
          console.log('注意查看区域信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.dataArea = [...res.data.value]
            this.$store.state.chooseAreaDialog = true
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },
      //所属景区服务商input框获取焦点是打开服务商选择模态框并返回所有服务商信息
      openSceneryServiceDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiChooseSceneryService,
            data: {}
          }
        ).then(res => {
          console.log('注意查看景区服务商全部信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.dataSceneryService = [...res.data.value]
            this.$store.state.chooseSceneryServiceDialog = true
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },

      //选择了具体区域信息以后，返回针对性的id和name
      transferAreaId(n) {
        // console.log('猜我收到了什么哦',n)
        if (this.$store.state.editorOrSearch == '编辑') {
          this.ruleForm.areaId = n.id
          this.ruleForm.areaName = n.name
        } else if (this.$store.state.editorOrSearch == '查询') {
          // this.areaSearchParam = n
          this.$refs['mysearchs'].intoInputAreaName(n)
        }

      },
      //选择了具体服务商信息以后，返回针对性的id和name
      transferSceneryServiceId(n) {
        console.log('猜我景区服务商收到了什么哦', n)
        this.ruleForm.sceneryServiceId = n.id
        this.ruleForm.sceneryService = n.name
      },


      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "name": '',
              "level": '',
              "areaId": '',
              "status": '',
              "pageNum": 1,
              // "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
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
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "name": this.$store.state.sceneryNameParam,
              "level": this.$store.state.sceneryGradeParam,
              "areaId": this.$store.state.areaIdParam,
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

      //地图围栏对应的方法函数
      openSceneryScopeMap(n) {
        console.log('新增打开渲染地图，并获得了n为：', n)
        this.$nextTick(this.map)
        // this.$nextTick(this.add_overlay)
      },

      //以下是景区范围按钮打开模态框后处理显示对应地图的方法函数
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
          console.log('最终的坐标点集合-------', pointArr, pointArr.join(';'))

          //鼠标绘制图层后的数据赋值
          that.ruleFormSceneryScope.railPointText = pointArr.join(';')


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
        var pointArr = this.ruleFormSceneryScope.railPointText.split(';')
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

      //一键关机事件
      shutDownTips() {
        this.$axios(
          {
            method: 'post',
            url: this.apiShutDownTips + '?id=' + this.commonId,
            data: {}
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log(res.data)
            this.$message.success('一键关机指令成功发送到后台')
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //以下三个方法为新增编辑模态框的内部方法
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            if (formName === 'ruleForm') {

              this.ruleForm.lon = this.ruleForm.lonLat.split(',')[0]
              this.ruleForm.lat = this.ruleForm.lonLat.split(',')[1]
              if (this.$store.state.titleHeader === '新增') {
                this.addInfo()
              } else if (this.$store.state.titleHeader === '编辑') {
                this.editorInfo()
              }

            } else if (formName === 'ruleFormSceneryScope') {
              this.saveSceneryScopeInfo()
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

        if (formName === 'ruleForm') {
          this.$refs[formName].resetFields();
          this.$store.state.scenerySign = false
        } else if (formName === 'ruleFormSceneryScope') {
          this.$refs[formName].resetFields();
          this.$store.state.sceneryScopeSign = false
        }else if(formName === 'ruleFormX'){

          this.$store.state.chooseParam999 = false

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
            this.$store.state.scenerySign = false
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
        this.commonName = n.name
        this.$store.state.shutDownSceneryName = n.name
        //以下第一请求是为了获取景区范围的默认展示地图坐标点集合数组数据
        this.$axios(
          {
            method: 'post',
            url: this.apiSceneryScopeInfo + '?id=' + n.id,
            data: {}
          }
        ).then(res => {
          console.log('滴滴答答+++', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleFormSceneryScope.railPointText = res.data.value.scope
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
        //以下是获取编辑前的对应默认信息数据
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGet + '?id=' + n.id,
            data: {}
          }
        ).then(res => {
          console.log('skt获取的是什么信息', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            // res.data.value.lonLat = res.data.value.lon + ',' + res.data.value.lat
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
            this.$store.state.scenerySign = false
            this.getDefaultInfo()
          } else {
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


      //景区范围按钮弹出模态框后，模态框内信息调整后点击提交按钮事件
      saveSceneryScopeInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiSaveSceneryScopeInfo,
            data: {
              id: this.commonId,
              scope: this.ruleFormSceneryScope.railPointText,
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.sceneryScopeSign = false
            this.$message.success('信息保存成功')
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //点击详情页面里面的tabs按钮获取详情接口
      getNewPageInfo(n) {
        console.log('触发了父级事件哦', n)
        var k = 0
        if (n) {
          k = n
        } else {
          k = 0
        }
        if (k == 0) {
          this.$axios(
            {
              method: 'post',
              url: this.apiSceneryInfos + '?id=' + this.commonId,
              data: {}
            }
          ).then(res => {
            console.log(res.data)
            if (res.data.resultStatus.resultCode === '0000') {

            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })
        } else {
          alert('其实我要掉1接口,景区-景点信息列表')
          var requestApi = ''
          if (k == 1) {
            //景区-景点列表
            requestApi = this.apiScenerySpotListInfo
          } else if (k == 2) {
            //景区-服务设施列表
            requestApi = this.apiFacilityInfo
          } else if (k == 3) {
            //景区-围栏信息
            requestApi = this.apiElectronicFenceInfo
          } else if (k == 4) {
            //景区-发射源
            requestApi = this.apiLaunchSourceInfo
          }

          this.$axios(
            {
              method: 'post',
              url: requestApi,
              data: {
                "sceneryId": this.commonId,
                "pageNum": 1,
                "pageSize": 10000
              }
            }
          ).then(res => {
            console.log('复杂数据', res.data.value)
            //for in 是为了循环出表头
            var obj = res.data.value.cnHeads
            var arr = []
            for (var t in obj) {
              var needJson = {
                prop: '',
                label: '',
                align: 'center'
              }
              needJson.prop = t
              needJson.label = obj[t]
              arr.push(needJson)
            }
            console.log('到底是什么鬼', arr)
            this.tableTitleDialog = [...arr]
            this.tableDataDialog = [...res.data.value.list]

          }).catch(error => {

          })
        }
      },
      //默认第一初始化对应景区的详情数据获取事件（通过点击景区编码触发）
      getDefaultNewPageInfo(n) {
        console.log('触发了父级事件哦', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiSceneryInfos + '?id=' + n,
            data: {}
          }
        ).then(res => {
          console.log(res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleFormNewPage.scenerySerialNum = res.data.value.no
            this.ruleFormNewPage.sceneryName = res.data.value.name
            this.ruleFormNewPage.sceneryState = res.data.value.status == 0 ? '禁用' : '启用'
            this.ruleFormNewPage.sceneryGrade = res.data.value.level
            this.ruleFormNewPage.area = res.data.value.areaName
            this.ruleFormNewPage.serviceProvider = res.data.value.sceneryServiceName
            // this.ruleFormNewPage.lonLat = res.data.value.lon + ',' + res.data.value.lat
            this.ruleFormNewPage.lonLat = res.data.value.lonLat
            this.ruleFormNewPage.grade = res.data.value.level
            this.ruleFormNewPage.sosTel = res.data.value.sosPhone
            this.ruleFormNewPage.linkMan = res.data.value.chargeName
            this.ruleFormNewPage.linkTel = res.data.value.chargePhone
            this.ruleFormNewPage.createMan = res.data.value.creator
            this.ruleFormNewPage.createTime = res.data.value.createDatetime
            this.ruleFormNewPage.updateMan = res.data.value.updator
            this.ruleFormNewPage.updateTime = res.data.value.updateDatetime
            this.ruleFormNewPage.rfid = res.data.value.rfidcount
            this.ruleFormNewPage.rfidPlace = res.data.value.sifecount
            this.ruleFormNewPage.linkAddress = res.data.value.url
            this.ruleFormNewPage.address = res.data.value.address

            this.$store.state.isShowTablesDialog = true

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      }


    },

    //默认获取数据列表信息
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      console.log(this.$store)
      // this.$store.state.showLoading = true
      this.getDefaultInfo()

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
