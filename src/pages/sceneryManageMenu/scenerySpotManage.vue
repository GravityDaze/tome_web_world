<template>
  <div>
    <mySearchs
      :sign="sign"
      :affiliatedScenery="affiliatedScenery"
      :spotName="spotName"
      :sceneryState="sceneryState"
      :sceneryName="sceneryName"
      :isAdd="isAdd"
      :isEditor="isEditor"
      :isEnabled="isEnabled"
      :isDisabled="isDisabled"
      :isScenerySpotAllInfo="isScenerySpotAllInfo"
      :isLanguageSet="isLanguageSet"
      @openSceneryDialog="openSceneryDialog"
      @queryInfos="queryInfos"
      @clearAddInfo="clearAddInfo"
      @enableInfo="enableInfo"
      @disableInfo="disableInfo"
      @openLanguageSetDialog="openLanguageSetDialog"
      ref="mysearchs"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
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
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.scenerySpotSign" width="35%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="23">
              <el-form-item label="所属景区">
                <el-col>
                  <el-input v-model="ruleForm.sceneryName" @focus="openEditorSceneryDialog"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="景点名" prop="name">
                <el-col>
                  <el-input v-model="ruleForm.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="经纬度" prop="name">
                <el-col :span="24">
                  <el-input v-model="ruleForm.lonLat"></el-input>
                </el-col>
                <!--<el-col :span="9" style="text-align: center;display: flex;">-->
                  <!--<span style="flex-grow: 1;background-color: #ececec;white-space: nowrap;font-size: 12px">拾取坐标</span>-->
                <!--</el-col>-->

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="景点地址">
                <el-col>
                  <el-input v-model="ruleForm.address"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="安放发射源">
                <el-col>
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-else class="" size="small" @click="openChooseLaunchSourceDialog">+</el-button>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="是否可展示">
                <el-radio-group v-model="ruleForm.showTypeInfo">
                  <el-radio label="可以展示"></el-radio>
                  <el-radio label="不可展示"></el-radio>
                </el-radio-group>

              </el-form-item>
            </el-col>


          </el-row>

          <!--<el-row>-->
          <!--<el-col :span="10">-->
          <!--<el-form-item label="所属景区" prop="region">-->
          <!--<el-col class="select_style">-->
          <!--<el-select v-model="ruleForm.region" placeholder="请选择所属景区" class="select_style1">-->
          <!--<el-option label="青城山" value="shanghai"></el-option>-->
          <!--<el-option label="张家界" value="beijing"></el-option>-->
          <!--</el-select>-->
          <!--</el-col>-->

          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="10" :offset="3">-->
          <!--<el-form-item label="景点名" prop="name">-->
          <!--<el-col>-->
          <!--<el-input v-model="ruleForm.name"></el-input>-->
          <!--</el-col>-->

          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="10">-->
          <!--<el-form-item label="经纬度" prop="name">-->
          <!--<el-col :span="15">-->
          <!--<el-input v-model="ruleForm.lonLat"></el-input>-->
          <!--</el-col>-->
          <!--<el-col :span="9" style="text-align: center;display: flex;">-->
          <!--<span style="flex-grow: 1;background-color: #ececec;white-space: nowrap;font-size: 12px">拾取坐标</span>-->
          <!--</el-col>-->

          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="10" :offset="3">-->
          <!--<el-form-item label="景区链接" prop="name">-->
          <!--<el-col>-->
          <!--<el-input v-model="ruleForm.linkAddress"></el-input>-->
          <!--</el-col>-->

          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="23">-->
          <!--<el-form-item label="景点地址" prop="name">-->
          <!--<el-col>-->
          <!--<el-input v-model="ruleForm.area"></el-input>-->
          <!--</el-col>-->

          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="10">-->
          <!--<el-form-item label="景点音频" prop="name">-->
          <!--<el-col :span="15">-->
          <!--<el-input v-model="ruleForm.lonLat"></el-input>-->
          <!--</el-col>-->
          <!--<el-col :span="9" style="text-align: center;display: flex;">-->
          <!--<span style="flex-grow: 1;background-color: #ececec;white-space: nowrap;font-size: 12px">选择</span>-->
          <!--</el-col>-->

          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="10" :offset="3">-->
          <!--<el-form-item label="景点视频" prop="name">-->
          <!--<el-col :span="15">-->
          <!--<el-input v-model="ruleForm.lonLat"></el-input>-->
          <!--</el-col>-->
          <!--<el-col :span="9" style="text-align: center;display: flex;">-->
          <!--<span style="flex-grow: 1;background-color: #ececec;white-space: nowrap;font-size: 12px">选择</span>-->
          <!--</el-col>-->

          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="23">-->
          <!--<el-form-item label="景点简介" prop="name">-->
          <!--<el-col>-->
          <!--<el-input v-model="ruleForm.area"></el-input>-->
          <!--</el-col>-->

          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="23">-->
          <!--<el-form-item label="景点介绍" prop="desc">-->
          <!--<el-input type="textarea" v-model="ruleForm.desc"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="8" :offset="1">-->
          <!--<div class="up_img_style">-->
          <!--<span>景点图标</span>-->
          <!--<el-upload-->
          <!--class="avatar-uploader"-->
          <!--action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--:show-file-list="false"-->
          <!--:on-success="handleAvatarSuccess"-->
          <!--:before-upload="beforeAvatarUpload">-->
          <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
          <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过50kb</div>-->
          <!--</el-upload>-->
          <!--</div>-->
          <!--</el-col>-->
          <!--<el-col :span="8" :offset="6">-->
          <!--<div class="up_img_style">-->
          <!--<span>景点封面图</span>-->
          <!--<div>-->
          <!--<el-upload-->
          <!--class="avatar-uploader"-->
          <!--action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--:show-file-list="false"-->
          <!--:on-success="handleAvatarSuccess"-->
          <!--:before-upload="beforeAvatarUpload">-->
          <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
          <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
          <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过200kb</div>-->
          <!--</el-upload>-->
          <!--</div>-->

          <!--</div>-->
          <!--</el-col>-->
          <!--<el-col :span="22" :offset="1">-->
          <!--<div class="up_img_style_list">-->
          <!--<span>景点图片</span>-->
          <!--<div>-->
          <!--<el-upload-->
          <!--action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--list-type="picture-card"-->
          <!--:on-preview="handlePictureCardPreview"-->
          <!--:on-remove="handleRemove">-->
          <!--<i class="el-icon-plus"></i>-->
          <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过800kb</div>-->
          <!--</el-upload>-->
          <!--<el-dialog :visible.sync="dialogVisibleImg">-->
          <!--<img width="100%" :src="dialogImageUrl" alt="">-->
          <!--</el-dialog>-->
          <!--</div>-->
          <!--</div>-->

          <!--</el-col>-->
          <!--</el-row>-->
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

    <chooseSceneryDialog
      :dataScenery="dataScenery"
      @transferSceneryId="transferSceneryId"
    ></chooseSceneryDialog>

    <!--以下是选择发射源模态框表格-->
    <div id="userInfoForm">
      <el-dialog
        title="发射源信息"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        <div class="tool_bar">
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="line_box">
                <span>发射源名称</span>
                <el-input v-model="searchParams.rfidSerialName" placeholder="请输入发射源名称"></el-input>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="line_box">
                <span>发射源编号</span>
                <el-input v-model="searchParams.rfidSerialNum" placeholder="请输入发射源编号"></el-input>
              </div>
            </el-col>
          </el-row>
          <div class="search_btn my_hover"><span>查</span><span>询</span></div>
        </div>

        <el-table
          ref="multipleTable"
          border
          :data="dynamicData"
          tooltip-effect="dark"
          style="width: 100%"
          height="400px"
          max-height="492px"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>

          <el-table-column
            prop="no"
            label="发射源编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="发射源名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="type"
            label="发射源类型"
            width="120"
            :formatter="function(row) {
            if(row.type == 1){
              return '发射源'
            }else if(row.type == 2){
              return '位置版'
            }
          }"
          >
          </el-table-column>
          <el-table-column
            prop="radius"
            label="播放半径"
            width="120">
          </el-table-column>
          <el-table-column
            prop="installLocation"
            label="安装位置"
            width="">
          </el-table-column>
          <el-table-column
            prop="isReset"
            label="是否复位源"
            width="120"
            :formatter="function(row) {
            if(row.isReset == 0){
              return '否'
            }else if(row.isReset == 1){
              return '是'
            }
          }"
          >
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="sureChooseLaunchSource">确 定</el-button>
  </span>
      </el-dialog>
    </div>


    <!--点击语言配置按钮后，对应弹出语言配置列表情况模态框-->
    <div id="myTablesDialog" class="scenery_language_set_box">
      <el-dialog :title="'景点语言配置--'+commonName" :visible.sync="chooseParam1" align="left" width="60%">
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
      <el-dialog title="新增/编辑" :visible.sync="$store.state.chooseParam999Spot" align="left" width="55%">
        <el-form :model="ruleFormX" ref="ruleFormX" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="10">
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
            <el-col :span="10" :offset="2">
              <el-form-item label="景点名">
                <el-col>
                  <el-input v-model="ruleFormX.name"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="景点链接">
                <el-col>
                  <el-input v-model="ruleFormX.url"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="景点地址">
                <el-col>
                  <el-input v-model="ruleFormX.address"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="景点音频">
                <el-col :span="18">
                  <el-input v-model="ruleFormX.audioName"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-button type="warning" @click="chooseMediaInfosFunction">选择</el-button>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="2">
              <el-form-item label="景点视频">
                <el-col :span="18">
                  <el-input v-model="ruleFormX.videoName"></el-input>
                </el-col>
                <el-col :span="6">
                  <el-button type="warning" @click="chooseMediaInfosFunction">选择</el-button>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="景点简介">
                <el-col>
                  <el-input v-model="ruleFormX.describe"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="景点介绍">
                <el-col>
                  <el-input type="textarea" v-model="ruleFormX.introduction"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="景点图标">
                <el-col class="position_center">
                  <div>
                    <div class="upload_header"
                         :style="{backgroundImage:'url('+ruleFormX.iconUrl+')',backgroundSize:'100% 100%'}"></div>
                    <input class="upload_input my_hover" type="file" @change="chooseHeaderPicture1">
                  </div>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="景点封面图">
                <el-col class="position_center">
                  <div>
                    <div class="upload_header"
                         :style="{backgroundImage:'url('+ruleFormX.coverUrl+')',backgroundSize:'100% 100%'}"></div>
                    <input class="upload_input my_hover" type="file" @change="chooseHeaderPicture2">
                  </div>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="景点图片">
                <el-col class="position_center">
                  <div>
                    <div class="upload_header"
                         :style="{backgroundImage:'url('+ruleFormX.headPicPath3+')',backgroundSize:'100% 100%'}"></div>
                    <input class="upload_input my_hover" type="file" @change="chooseHeaderPicture3">
                  </div>
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

    <!--音视频选择模态框-->
    <div id="alterPasswordForm">
      <el-dialog
        title="选择媒体文件"
        :visible.sync="isShowMediaDialogParam"
        width="50%"
        center>
        <div class="tool_bar">
          <el-row :gutter="10">
            <el-col :span="24">
              <div class="line_box">
                <span>媒体文件名</span>
                <el-input v-model="searchMediaFileNameParam" placeholder="请输入媒体文件名" style="width: 100%"></el-input>
              </div>
            </el-col>
          </el-row>
          <div class="search_btn my_hover" @click="mySearchMediaName"><span>查</span><span>询</span></div>
        </div>

        <el-table
          ref="multipleTable"
          border
          :data="mediaFileData"
          tooltip-effect="dark"
          style="width: 100%"
          height="400px"
          max-height="492px"
          highlight-current-row
          @row-click="handleSelectionChangeMedia"
        >
          <el-table-column
            type="index"
            width="55">
          </el-table-column>

          <el-table-column
            prop="no"
            label="媒体文件编号"
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="媒体类型"
            :formatter="function(row) {
              return row.type == '1'?'音频':'视频'
            }"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="媒体文件名称"
          >
          </el-table-column>
          <el-table-column
            prop="fileName"
            label="文件名"
          >
          </el-table-column>
          <el-table-column
            prop="fileSize"
            label="文件大小"
          >
          </el-table-column>
        </el-table>
        <!--<span slot="footer" class="dialog-footer">-->
    <!--<el-button type="primary" @click="sureChooseLaunchSource">确 定</el-button>-->
  <!--</span>-->
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    name: "scenery-spot-manage",
    data() {
      return {
        commonIdX:'',
        mediaFileData: [],//音视频媒体文件列表内容数组
        searchMediaFileNameParam: '',//打开选择音视频模态框后里面的查询条件参数
        isShowMediaDialogParam: false,//最深层次的选择音视频文件模态框的显示与隐藏
        headImgFiles: '',//头像文件资源
        headImgFilesT:'',//单张图片，或者有可能为多张图片，所以用这个
        apiUploadImg: '/mis/upload/uploadImage',//统一上传图片接口
        apiMediaUpUrl: '/mis/upload/uploadAudioOrVideo',//统一上传音频视屏接口
        apiGetAllMediaList: '/mis/mediaFile/queryChoose',//默认查询获取所有媒体文件信息
        //语言配置模态框列表表头数据
        sceneryLanguageSetTwoEventParam: 'isTwoEvent',//此参数代表二级模态框里面出现的对应功能按钮点击后触发事件的区分（比如到底是第一层级的启用禁用，还是第二层级的启用禁用）
        ruleFormX: {
          "scenerySpotsId": "",//所属景点ID
          "language": "",//语言类型：language：zh_CN-中文，zh_TW 繁体中文，en_US-英文，ko_KR-韩
          "name": "青城山",//景点名称
          "url": "http://xxx",//景点链接
          "address": "青城山",//景点地址
          "audio": 1,//景点音频ID
          "audioName":'',
          "video": 2,//景点视频ID
          "videoName":'',
          "describe": "xxxxxxxxx",//景点简介
          "introduction": "xxxxxxxxx",//景点介绍
          "iconUrl": "",//景点图标URL
          "coverUrl": "",//景点封面URL
          "headPicPath3":'',//景点图片URL(自己目前先传一张)
          "imageUrls": [],//景点图片URL集合
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
        apiSceneryLanguageSet: '/mis/scenerySpotsLang/query',//景点语言设置列表获取接口
        apiAddX: '/mis/scenerySpotsLang/add',
        apiEditorX: '/mis/scenerySpotsLang/edit',
        apiEnableX: '/mis/scenerySpotsLang/enable',
        apiDisableX: '/mis/scenerySpotsLang/disable',
        apiEditorGetX: '/mis/scenerySpotsLang/get',//XXXX编辑信息前先获取对应信息


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
            prop: 'scenerySpotsNo',
            label: '景点编号',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'language',
            label: '语言',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'name',
            label: '景点名称',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'address',
            label: '景点地址',
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
        chooseParam1: false,//点击了景点语言配置按钮后是否展示语言配置详情列表模态框
        isLanguageSet: true,
        centerDialogVisible: false,
        dynamicTags: [],//element 动态标签默认展示需要的数组
        launchSourceIds: [],//每个发射源标签对应的id集合,展示需要的id数组(隐形的数据，逻辑里需要用到)
        dynamicData: [],//默认请求后台数据，返回的可以选择的动态标签相关数据
        multipleSelection: [],//安放发射源表格对应的多选时的一个参数
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        commonSpotId:'',//进行景点语言配置时，新增编辑都需要传递的景点id
        searchParams: {
          rfidSerialName: '测试发射源',
          rfidSerialNun: '000022554'
        },//选择安放发射源时内部的查询条件
        inputVisible: false,
        inputValue: '',
        sign: 'scenerySpot',
        apiQuery: '/mis/scenerySpots/query',//景区管理-景点管理获取默认列表信息接口
        apiChooseScenery: '/mis/scenery/queryChoose',
        apiAdd: '/mis/scenerySpots/add',
        apiEditor: '/mis/scenerySpots/edit',
        apiChooseLaunchSource: '/mis/launchSource/queryChoose',//新增编辑选择发射源公共弹出框接口
        apiEditorGet: '/mis/scenerySpots/get',//编辑信息前先获取对应信息
        apiEnable: '/mis/scenerySpots/enable',
        apiDisable: '/mis/scenerySpots/disable',
        apiScenerySpotInfos: '/mis/scenerySpots/getDetails',//景点详情接口
        apiScenerySpotLaunchSource: '/mis/launchSource/queryByScenerySpots',//景点详情发射源列表信息查询
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisibleImg: false,
        affiliatedScenery: false,//代表所属景区
        spotName: true,//代表该页面是否显示对应的景点名称筛选功能input框
        sceneryName: true,
        sceneryState: true,//代表状态，启用禁用

        //以下为查询框下方对应的tab功能键是否显示的参数
        isAdd: true,//显示新增按钮
        isEditor: true,//显示编辑按钮
        isEnabled: true,//显示启用按钮
        isDisabled: true,//显示禁用按钮
        isScenerySpotAllInfo: false,//显示景点详情
        ruleForm: {
          // name: '',
          // sceneryName: '',//所属景区
          // sceneryNameId:'',//所属景区ID
          // sureShow: '',//最终展示出来的性别
          // area:'',//所属区域
          // lonLat:'',//经纬度
          // grade:'',//景区级别
          // linkAddress:'',//景区链接
          // address:'',//详细地址

          //以上为原型图未更改时的对应参数，以下为更改后表单要的参数
          sceneryId: '',//所属景区ID
          sceneryName: '青城山',//所属景区
          name: '老君阁',//景点名称
          lon: '',
          lat: '',
          lonLat: '例如:104,33;106,45',
          address: '',//景点地址
          showType: '',//是否展示
          showTypeInfo: '',//是否展示
          launchSourceIds: ''//景点发射源ID集合
        },
        rules: {
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },

        isScenerySpotSerialNum: true,//是否显示景点编号
        //表格中是否显示操作一栏
        isHandle: false,
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
            prop: 'name',
            label: '景点名称',
            width: '120',
            align: 'center'
          },
          {
            prop: 'sceneryName',
            label: '所属景区',
            width: '140',
            align: 'center'
          },
          {
            prop: 'address',
            label: '景点地址',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'lonLat',
            label: '经纬度',
            // width: '160',
            align: 'center',
            // formatter: function (row) {
            //   return row.lon + ',' + row.lat
            //
            // }
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
        tableData: [
          {
            id: '',
            no: 'SP00001',
            name: '猪头寨',
            sceneryId: '',
            sceneryName: '张家界',
            address: '上海市普陀区金沙江路 1518 弄',
            lon: "103",
            lat: "33",
            lonLat: '166,36.66',
            updator: '张大宝',
            updateDatetime: '2019-5-14',
            status: 1
          },
        ],

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
        titleList: [
          {
            id: 1,
            title: '景点信息'
          },
          {
            id: 2,
            title: '发射源'
          },

        ],
        //此参数表示点击对应tables里面的详情信息时，呈现的信息内容对象
        ruleFormNewPage: {
          scenerySerialNum: 'S00101',
          sceneryState: '',
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
          showTypeInfo: '',//是否可以展示
        },
      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //以下是：景点管理--语言配置的相关函数，涉及到二层模态框的东西
               //上传景点图片，封面图，图片的相关三个事件
      chooseHeaderPicture1(e) {
        console.log('选择需要上传的图片')
        // this.headerUrl = '../../static/bg1.png'
        this.headImgFiles = e.target.files[0]
        console.log(this.headImgFiles, '点击了上传图片', e.target.files[0])
        let formdata = new FormData()
        formdata.append('file', this.headImgFiles)
        this.$axios(
          {
            method: 'post',
            url: this.apiUploadImg,
            data: formdata,
          }
        ).then(res => {
          console.log('上传图片后的返回信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleFormX.iconUrl = res.data.value.url
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },
      chooseHeaderPicture2(e) {
        console.log('选择需要上传的图片')
        // this.headerUrl = '../../static/bg1.png'
        this.headImgFiles = e.target.files[0]
        console.log(this.headImgFiles, '点击了上传图片', e.target.files[0])
        let formdata = new FormData()
        formdata.append('file', this.headImgFiles)
        this.$axios(
          {
            method: 'post',
            url: this.apiUploadImg,
            data: formdata,
          }
        ).then(res => {
          console.log('上传图片后的返回信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleFormX.coverUrl = res.data.value.url
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },
      chooseHeaderPicture3(e) {
        console.log('选择需要上传的图片')
        this.ruleFormX.imageUrls = []
        this.headImgFilesT = e.target.files[0]
        console.log(this.headImgFilesT, '点击了上传图片', e.target.files[0])
        let formdata = new FormData()
        formdata.append('file', this.headImgFilesT)
        this.$axios(
          {
            method: 'post',
            url: this.apiUploadImg,
            data: formdata,
          }
        ).then(res => {
          console.log('上传图片后的返回信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleFormX.headPicPath3 = res.data.value.url
            this.ruleFormX.imageUrls.push(res.data.value.url)
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },
              //选择音视频文件时打开模态框事件
      chooseMediaInfosFunction() {

        this.$axios(
          {
            method: 'post',
            url: this.apiGetAllMediaList + '?name=' + '',
            data: {}
          }
        ).then(res => {
          console.log('获取到了哪些媒体文件内容', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.mediaFileData = [...res.data.value]
            this.isShowMediaDialogParam = true
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
         //选择音视频文件时打开模态框事件，查询选择音视频文件
      mySearchMediaName(){

        this.$axios(
          {
            method: 'post',
            url: this.apiGetAllMediaList + '?name=' + this.searchMediaFileNameParam,
            data: {}
          }
        ).then(res => {
          console.log('获取到了哪些媒体文件内容', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.mediaFileData = [...res.data.value]

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
            method:'post',
            url:this.apiEditorGetX + '?id=' + this.commonIdX,
            data:{}
          }
        ).then(res => {
          console.log('编辑前先获取到相关信息哦：---',res.data)
          if(res.data.resultStatus.resultCode === '0000'){
            this.ruleFormX = res.data.value
            // this.ruleFormX.headPicPath3 = res.data.value.imageUrls[0]
            this.$set(this.ruleFormX,'headPicPath3',res.data.value.imageUrls[0])

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })


      },

      //XXX新增信息
      addInfoX() {
        console.log('开始提交新增信息')
        this.ruleFormX.scenerySpotsId = this.commonSpotId
        this.$axios(
          {
            method: 'post',
            url: this.apiAddX,
            data: this.ruleFormX
          }
        ).then(res => {
          console.log('景点语言配置新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.chooseParam999Spot = false
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
        this.ruleFormX.scenerySpotsId = this.commonSpotId
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorX,
            data: this.ruleFormX
          }
        ).then(res => {
          console.log('景区语言配置编辑接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.chooseParam999Spot = false
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

      //点击景点语言配置按钮显示对应语言配置模态框
      openLanguageSetDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiSceneryLanguageSet + '?scenerySpotsId=' + this.commonId,
            data: {}
          }
        ).then(res => {
          console.log('景点点点点语言配置信息出没：', res.data)
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

      //以上是：景点管理--语言配置的相关函数，涉及到二层模态框的东西


      //默认第一初始化对应景点的详情数据获取事件（通过点击景点编码触发）
      getDefaultNewPageInfo(n) {
        console.log('触发了父级事件哦', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiScenerySpotInfos + '?id=' + n,
            data: {}
          }
        ).then(res => {
          console.log('景点管理-景点详情', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleFormNewPage.scenerySerialNum = res.data.value.no
            this.ruleFormNewPage.sceneryName = res.data.value.sceneryName
            this.ruleFormNewPage.scenerySpotName = res.data.value.name
            this.ruleFormNewPage.sceneryState = res.data.value.status == 0 ? '禁用' : '启用'
            this.ruleFormNewPage.showTypeInfo = res.data.value.showType == 1 ? '可以展示' : '不可展示'
            this.ruleFormNewPage.lonLat = res.data.value.lonLat
            this.ruleFormNewPage.createMan = res.data.value.creator
            this.ruleFormNewPage.createTime = res.data.value.createDatetime
            this.ruleFormNewPage.updateMan = res.data.value.updator
            this.ruleFormNewPage.updateTime = res.data.value.updateDatetime
            this.ruleFormNewPage.rfid = res.data.value.count
            this.ruleFormNewPage.scenerySpotAddress = res.data.value.address

            this.$store.state.isShowTablesDialog = true


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
              url: this.apiScenerySpotInfos + '?id=' + this.commonId,
              data: {}
            }
          ).then(res => {
            console.log(res.data)
            if (res.data.resultStatus.resultCode === '0000') {

            }else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })
        } else {
          // alert('其实我要掉1接口,景区-景点信息列表')
          var requestApi = ''
          if (k == 1) {
            //景点管理-详情发射源列表
            requestApi = this.apiScenerySpotLaunchSource
          }

          this.$axios(
            {
              method: 'post',
              url: requestApi + '?scenerySpotsId=' + this.commonId,
              data: {}
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

      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName": "",//景区名称
              "name": "",//景点名称
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
      //新增信息之前获取表单内安放发射源选择内容信息
      getChooseLaunchSourceInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiChooseLaunchSource,
            data: {
              name: "",
              no: ""
            }
          }
        ).then(res => {
          console.log('新增表单中，返回的发射源选择内容', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.dynamicData = [...res.data.value]
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },
      //确定选择的发射源，并进行对应的tabs标签展示
      sureChooseLaunchSource() {
        this.centerDialogVisible = false
        let arr = []
        let arrIds = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
          arr.push(this.multipleSelection[i].no)
          arrIds.push(this.multipleSelection[i].id)
        }
        console.log(arr)
        //合并数组数据
        this.dynamicTags = [...this.dynamicTags, ...arr]
        this.launchSourceIds = [...this.launchSourceIds, ...arrIds]

        //数组数据去重
        function unique(arr) {
          return Array.from(new Set(arr))
        }

        var test = unique(this.dynamicTags)
        var testId = unique(this.launchSourceIds)


        //去重后再次赋值
        this.dynamicTags = [...test]
        this.launchSourceIds = [...testId]
        console.log('对比数据', this.dynamicTags, test, testId)

      },
      //打开新增模态框之前先清空模态框内部的数据(仅限于新增的时候，编辑不做处理，而是会有默认获取对应数据的接口)
      clearAddInfo(n) {
        if (n == '新增') {
          for (var i in this.ruleForm) {
            this.ruleForm[i] = ''
          }
          this.ruleForm.lonLat = '例如:104,33;106,45'
          this.dynamicTags = []
          this.launchSourceIds = []
        } else if (n == '编辑') {

        }


        this.$store.state.scenerySpotSign = true
      },
      //开始提交新增信息
      addInfo() {
        console.log('开始提交新增信息')
        this.ruleForm.launchSourceIds = [...this.launchSourceIds]
        if (this.ruleForm.showTypeInfo == '可以展示') {
          this.ruleForm.showType = 1
        } else if (this.ruleForm.showTypeInfo == '不可展示') {
          this.ruleForm.showType = 0
        }
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.scenerySpotSign = false
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
        this.commonName = n.name
        this.commonSpotId = n.id
        this.$axios(
          {
            method: 'post',
            url: this.apiEditorGet + '?id=' + n.id,
            data: {}
          }
        ).then(res => {
          console.log('获取的是什么信息soooooooo', res.data.value)
          if (res.data.resultStatus.resultCode === '0000') {
            this.ruleForm = res.data.value

            // this.ruleForm.showTypeInfo = res.data.value.showType == 1 ? '可以展示' : '不可展示'

            //以下两行代码代替上面注释的一行代码功能
            var kk = res.data.value.showType == 1 ? '可以展示' : '不可展示'
            this.$set(this.ruleForm,'showTypeInfo',kk)
            //以上两行代码替代了以上的注释

            var ids = res.data.value.launchSourceList
            this.dynamicTags = []
            this.launchSourceIds = []
            if (ids.length > 0) {
              for (let i = 0; i < ids.length; i++) {
                this.dynamicTags.push(ids[i].no)
                this.launchSourceIds.push(ids[i].id)
              }
            }

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
        this.ruleForm.launchSourceIds = [...this.launchSourceIds]

        if (this.ruleForm.showTypeInfo == '可以展示') {
          this.ruleForm.showType = 1
        } else if (this.ruleForm.showTypeInfo == '不可展示') {
          this.ruleForm.showType = 0
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
            this.$store.state.scenerySpotSign = false
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

      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName": this.$store.state.sceneryNameParam,
              "name": this.$store.state.scenerySpotNameParam,
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

          this.$store.state.scenerySpotSign = false

        }else if(formName === 'ruleFormX'){

          this.$store.state.chooseParam999Spot = false

        }


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
      //element批量上传图片的对应自带方法函数，如下
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisibleImg = true;

      },
      //element自带tabs标签动态生成有关1个函数方法
      handleClose(tag) {
        // console.log('tag:',tag,this.dynamicTags.indexOf(tag))
        let num = this.dynamicTags.indexOf(tag)
        // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        this.dynamicTags.splice(num, 1);
        this.launchSourceIds.splice(num, 1);
      },

      openChooseLaunchSourceDialog() {
        this.centerDialogVisible = true
        this.getChooseLaunchSourceInfo()
      },
      //以下是点击安放发射源增加按钮弹出可供选择发射源模态框里面对应的多选方法
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('这是点击了发射源列表行哦',val)
      },


      //以下是选择音视频内容列表中，点击了对应行以后触发事件获取相关数据
      handleSelectionChangeMedia(val) {
        // this.multipleSelection = val;
        console.log('这是点击了音视频行哦',val)
        if(val.type == '1'){
          this.ruleFormX.audio = val.id
          this.ruleFormX.audioName = val.name
        }else if(val.type == '2'){
          this.ruleFormX.video = val.id
          this.ruleFormX.videoName = val.name
        }
      }

    }
  }
</script>

<style scoped lang="scss">
  @import "../../common_css/scss_style";

  .up_img_style {
    /*border:1px solid #ececec;*/
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
  }

  .up_img_style_list {
    /*border:1px solid #ececec;*/
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
  }

  .up_img_style > div, .up_img_style_list > div {
    margin-left: 15px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  /*以下是内部独立表格查询样式*/
  .tool_bar {
    /*
        border:1px solid $orange;
    */
    display: flex;
    justify-content: space-between;
    align-items: start;
  }

  .search_btn {
    width: 1rem;
    min-width: 60px;
    min-height: 40px;
    font-size: $font16;
    color: $white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 2px 0.3rem;
    border-radius: 5px;
    background-color: $orange;
  }

  .line_box {
    /*border: 1px solid red;*/
    min-height: 40px;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    font-size: $font14;

  }

  .line_box > div {
    /* border:1px solid $blue;*/
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: stretch;
  }

  .line_box > span {
    /* border:1px solid $blue;*/
    width: 0.75rem;
    min-width: 85px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
