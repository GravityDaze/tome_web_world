<template>
  <div id="myTablesDialog">
    <el-dialog
      :title="$store.state.tablesDialogTitle"
      :visible.sync="$store.state.isShowTablesDialog"
      width="68%"
      :before-close="handleClose"
      :close-on-click-modal="false"
      align="left"
    >
      <el-row>
        <el-col class="tab_style my_hover" :class="'tab'+index" :span="3" v-for="(item,index) in  titleList"
                :key="index">
          <span @click="clickTab(index)">{{item.title}}</span>
        </el-col>
      </el-row>
      <div class="facility_rent_statics" style="border:1px solid #ececec;width:100%;padding: 10px 0;margin-bottom: 10px;" v-if="sign=='facilityrentstatistics'">
        <el-row>
          <el-col :span="6" :offset="2">设备编号：{{myTerminalInfo.terminalNo}}</el-col>
          <el-col :span="6" :offset="2">设备IMEI号：{{myTerminalInfo.terminalImei}}</el-col>
          <el-col :span="6" :offset="2">通讯号码：{{myTerminalInfo.terminalPhone}}</el-col>
          <el-col :span="6" :offset="2">所在景区：{{myTerminalInfo.sceneryName}}</el-col>
          <el-col :span="6" :offset="2">系统版本：{{myTerminalInfo.version}}</el-col>
          <el-col :span="6" :offset="2">资源包版本：{{myTerminalInfo.packVersion}}</el-col>
          <el-col :span="6" :offset="2">电量：{{myTerminalInfo.battery}}%</el-col>
          <el-col :span="6" :offset="2">最后定位时间：{{myTerminalInfo.lastLocationDatetime}}</el-col>
          <el-col :span="6" :offset="2">状态：{{myTerminalInfo.status=='0'?'禁用':'启用'}}</el-col>
        </el-row>
      </div>
      <el-row v-if="isShow">
        <el-table
          ref="multipleTable"
          :data="tableDataDialog"
          border
          size="small"
          height="492px"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange">
          <!--<el-table-column-->
          <!--fixed-->
          <!--type="selection"-->
          <!--width="55">-->
          <!--</el-table-column>-->
          <template v-for="item in tableTitleDialog">
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              header-align="center"
              :formatter="item.formatter"
            >
            </el-table-column>
          </template>
          <el-table-column label="操作" align="center" width="240" v-if="false">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.$index, scope.row)">升级
              </el-button>
              <el-button
                size="mini"
                @click="handleLook(scope.$index, scope.row)">查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <!--因为内部不再支持搜索查询，所以暂且隐藏分页组件-->
      <!--<el-row v-if="isShow">-->
      <!--<div class="page_control">-->
      <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="pageParams.pageNum"-->
      <!--:page-sizes="[ 5, 10]"-->
      <!--:page-size="pageParams.pageSize"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="total"-->
      <!--&gt;</el-pagination>-->
      <!--</div>-->
      <!--</el-row>-->

      <!--景区详情模态表格-->
      <el-form :model="ruleFormNewPage" ref="ruleFormNewPage" label-width="100px" class="demo-ruleFormNewPage"
               size="small"
               :hide-required-asterisk='false' v-if="!isShow&&sign==='scenery'">
        <el-row>
          <!--<el-col :span="10" :offset="1">-->
          <!--<el-form-item label="语言：" prop="language">-->
          <!--<el-col>-->
          <!--<span>{{ruleFormNewPage.language}}</span>-->
          <!--</el-col>-->

          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="10" :offset="1">
            <el-form-item label="状态：" prop="sceneryState">
              <el-col>
                <span>{{ruleFormNewPage.sceneryState}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="景区编号：" prop="scenerySerialNum">
              <el-col>
                <span>{{ruleFormNewPage.scenerySerialNum}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="景区名：" prop="sceneryName">
              <el-col>
                <span>{{ruleFormNewPage.sceneryName}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="所属区域：" prop="area">
              <el-col>
                <span>{{ruleFormNewPage.area}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="所属服务商：" prop="serviceProvider">
              <el-col>
                <span>{{ruleFormNewPage.serviceProvider}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="景区级别：" prop="sceneryGrade">
              <el-col>
                <span>{{ruleFormNewPage.sceneryGrade}}</span>
              </el-col>

            </el-form-item>
          </el-col>

          <el-col :span="10" :offset="1">
            <el-form-item label="负责人：" prop="linkMan">
              <el-col>
                <span>{{ruleFormNewPage.linkMan}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="负责人电话：" prop="linkTel">
              <el-col>
                <span>{{ruleFormNewPage.linkTel}}</span>
              </el-col>

            </el-form-item>
          </el-col>

          <el-col :span="10" :offset="1">
            <el-form-item label="经纬度：" prop="lonLat">
              <el-col>
                <span>{{ruleFormNewPage.lonLat}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="求救电话：" prop="sosTel">
              <el-col>
                <span>{{ruleFormNewPage.sosTel}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="创建者：" prop="createMan">
              <el-col>
                <span>{{ruleFormNewPage.createMan}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="创建时间：" prop="createTime">
              <el-col>
                <span>{{ruleFormNewPage.createTime}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="更新者：" prop="updateMan">
              <el-col>
                <span>{{ruleFormNewPage.updateMan}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="更新时间：" prop="updateTime">
              <el-col>
                <span>{{ruleFormNewPage.updateTime}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="RFID：" prop="rfid">
              <el-col>
                <span>{{ruleFormNewPage.rfid}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="位置版：" prop="rfidPlace">
              <el-col>
                <span>{{ruleFormNewPage.rfidPlace}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <!--<el-col :span="10" :offset="1">-->
          <!--<el-form-item label="详细地址：" prop="address">-->
          <!--<el-col>-->
          <!--<span>{{ruleFormNewPage.address}}</span>-->
          <!--</el-col>-->

          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="21" :offset="1">
            <el-form-item label="景区链接：" prop="linkAddress">
              <el-col>
                <span>{{ruleFormNewPage.linkAddress}}</span>
              </el-col>

            </el-form-item>
          </el-col>

          <el-col :span="10" style="display: none">
            <el-form-item label="活动时间" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleFormNewPage.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="1" :offset="1">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker placeholder="选择时间" v-model="ruleFormNewPage.date2"
                                  style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--景点详情模态表格-->
      <el-form :model="ruleFormNewPage" ref="ruleFormNewPage" label-width="100px" class="demo-ruleFormNewPage"
               size="small"
               :hide-required-asterisk='false' v-if="!isShow&&sign==='scenerySpot'">
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="景区编号：" prop="scenerySerialNum">
              <el-col>
                <span>{{ruleFormNewPage.scenerySerialNum}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="所属景区：" prop="sceneryName">
              <el-col>
                <span>{{ruleFormNewPage.sceneryName}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="景点名：" prop="scenerySpotName">
              <el-col>
                <span>{{ruleFormNewPage.scenerySpotName}}</span>
              </el-col>

            </el-form-item>
          </el-col>

          <el-col :span="10" :offset="3">
            <el-form-item label="经纬度：" prop="lonLat">
              <el-col>
                <span>{{ruleFormNewPage.lonLat}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="景点地址：" prop="scenerySpotAddress">
              <el-col>
                <span>{{ruleFormNewPage.scenerySpotAddress}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="发射源：">
              <el-col>
                <span>{{ruleFormNewPage.rfid}}</span>
              </el-col>

            </el-form-item>
          </el-col>

          <el-col :span="10" :offset="1">
            <el-form-item label="状态：" prop="sceneryState">
              <el-col>
                <span>{{ruleFormNewPage.sceneryState}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="是否可展示：">
              <el-col>
                <span>{{ruleFormNewPage.showTypeInfo}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="创建者：" prop="createMan">
              <el-col>
                <span>{{ruleFormNewPage.createMan}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="创建时间：" prop="createTime">
              <el-col>
                <span>{{ruleFormNewPage.createTime}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="更新者：" prop="updateMan">
              <el-col>
                <span>{{ruleFormNewPage.updateMan}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="更新时间：" prop="updateTime">
              <el-col>
                <span>{{ruleFormNewPage.updateTime}}</span>
              </el-col>

            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--用户管理++用户详情模态表格-->
      <el-form :model="ruleFormNewPage" ref="ruleFormNewPage" label-width="100px" class="demo-ruleFormNewPage"
               size="small"
               :hide-required-asterisk='false' v-if="!isShow&&sign==='userManageSign'">
        <el-row>
          <el-col :span="8" :offset="1">
            <div class="up_img_style">
              <span>头像</span>
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过50kb</div>-->
              </el-upload>
            </div>
          </el-col>
          <el-col :span="8" :offset="6">
            <div class="up_img_style">
              <span>人脸识别</span>
              <div>
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过200kb</div>-->
                </el-upload>
              </div>

            </div>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="用户ID：" prop="userId">
              <el-col>
                <span>{{ruleFormNewPage.userId}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="用户编号：" prop="userSerialNum">
              <el-col>
                <span>{{ruleFormNewPage.userSerialNum}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="昵称：" prop="nickname">
              <el-col>
                <span>{{ruleFormNewPage.nickname}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="手机号：" prop="userTel">
              <el-col>
                <span>{{ruleFormNewPage.userTel}}</span>
              </el-col>

            </el-form-item>
          </el-col>

          <el-col :span="10" :offset="1">
            <el-form-item label="邮箱：" prop="email">
              <el-col>
                <span>{{ruleFormNewPage.email}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="性别：" prop="userSex">
              <el-col>
                <span>{{ruleFormNewPage.userSex}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="真实姓名：" prop="reallyName">
              <el-col>
                <span>{{ruleFormNewPage.reallyName}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="身份证号：" prop="identificationId">
              <el-col>
                <span>{{ruleFormNewPage.identificationId}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="注册IP：" prop="registerIp">
              <el-col>
                <span>{{ruleFormNewPage.registerIp}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="注册IMEI：" prop="registerImei">
              <el-col>
                <span>{{ruleFormNewPage.registerImei}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="注册时间：" prop="registerTime">
              <el-col>
                <span>{{ruleFormNewPage.registerTime}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="更新时间：" prop="updateTime">
              <el-col>
                <span>{{ruleFormNewPage.updateTime}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="最近登录：" prop="lastOnlineTime">
              <el-col>
                <span>{{ruleFormNewPage.lastOnlineTime}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="状态：" prop="state">
              <el-col>
                <span>{{ruleFormNewPage.state}}</span>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--旅游团管理++游团详情模态表格-->
      <el-form :model="ruleFormNewPage" ref="ruleFormNewPage" label-width="100px" class="demo-ruleFormNewPage"
               size="small"
               :hide-required-asterisk='false' v-if="!isShow&&sign==='tourGroupManage'&&!onlyParam">
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="游团编码：">
              <el-col>
                <span>{{ruleFormNewPage.tourGroupSerialNum}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="团号：">
              <el-col>
                <span>{{ruleFormNewPage.groupNum}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="旅行社编号：">
              <el-col>
                <span>{{ruleFormNewPage.tourCompanySerialNum}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="旅行社名称：">
              <el-col>
                <span>{{ruleFormNewPage.tourCompanyName}}</span>
              </el-col>

            </el-form-item>
          </el-col>

          <el-col :span="10" :offset="1">
            <el-form-item label="导游姓名：">
              <el-col>
                <span>{{ruleFormNewPage.guideName}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="导游电话：">
              <el-col>
                <span>{{ruleFormNewPage.guideTel}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="所属景区：">
              <el-col>
                <span>{{ruleFormNewPage.affiliatedScenery}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="设备IMEI：">
              <el-col>
                <span>{{ruleFormNewPage.imeiNum}}</span>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="成员数：">
              <el-col>
                <span>{{ruleFormNewPage.memberNum}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="建团地址：">
              <el-col>
                <span>{{ruleFormNewPage.createdGroupPlace}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="坐标：">
              <el-col>
                <span>{{ruleFormNewPage.lonLat}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="建团时间：">
              <el-col>
                <span>{{ruleFormNewPage.createdGroupTime}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="散团时间：">
              <el-col>
                <span>{{ruleFormNewPage.relieveGroupTime}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="最后更新者：">
              <el-col>
                <span>{{ruleFormNewPage.updateMan}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="更新时间：">
              <el-col>
                <span>{{ruleFormNewPage.updateTime}}</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="出行状态：">
              <el-col>
                <span>{{ruleFormNewPage.tourState}}</span>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!--旅游团管理++游团行迹地图-->
      <div v-show="!isShow && sign==='tourGroupManage' && onlyParam">
        <div id="lineRoadMap" style="width:100%;height: 492px;border:1px solid red;"></div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "my-tables-dialog",
    data() {
      return {
        mapPointInfos:'',//游团行迹坐标字符串
        mapSizeParam:6,//如果有游团行迹信息，值为15，没有信息时默认定位到成都总部，值为6,
        isShow: false,//点击对应的tab面包屑按钮时，是显示编辑的信息还是现实表格信息
        onlyParam:false,//这个参数仅作用于游团管理，用于控制是否显示游团行迹地图
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisibleImg: false,
        pageParams: {
          pageSize: 5,//每页默认显示多少条数据
          pageNum: 1,//当前是第几页的数据
        },
        total: 10,//总的数据条数
        isShowTablesDialog: true,

        // ruleFormNewPage: {
        //   userId: 1,//用户id
        //   userSerialNum: 'C12455684',//用户编号
        //   nickname: '霸天虎',//用户昵称
        //   userTel: '13345811198',//手机号
        //   userSex: '女',
        //   email: 'phc270494@163.com',
        //   reallyName: '郭大力',
        //   identificationId: '510422198704275231',
        //   registerIp: '120.26.36.99',
        //   registerImei: 'I15487885',
        //   registerTime: '2019-7-12 22:40:40',
        //   lastOnlineTime: '2019-7-12 22:40:40',
        //   state: '在线',
        //   language: '中文',
        //   scenerySerialNum: 'S00101',
        //   sceneryName: '青城山',
        //   scenerySpotName: '老君阁',
        //   sceneryGrade: 'AAAA',
        //   area: '四川成都',//所属区域
        //   serviceProvider: '青城山服务商',
        //   lnglat: '126.5,19',//经纬度
        //   grade: 'AAAA',//景区级别
        //   sosTel: '110',//紧急电话
        //   linkMan: '彭超',//负责人
        //   linkTel: '13345811137',//负责人电话
        //   createMan: '马云创建者',
        //   createTime: '2015-5-5',
        //   updateMan: '刘强东',
        //   updateTime: '2019-10-14',
        //   rfid: 'rfid发射源',
        //   rfidPlace: '位置版发射源',
        //   linkAddress: 'https://baike.baidu.com/item/map/twreler.html?key=92837768723',//景区链接
        //   address: '四川省成都市都江堰市青城山镇青城山路',//详细地址
        //   scenerySpotAddress: '正南峰500米',
        //   sceneryAudio: '老君阁20190101.mp3',
        //   sceneryVideo: '老君阁20190101.mp4',
        //   scenerySpotDiscribe: '这里是一段景点描述内容这里是一段景点描述内容这里是一段景点描述内容这里是一段景点描述内容这里是一段景点描述内容这里是',
        //   scenerySpotInfo: '这里是景点的详细描述内容，可以重点关注有哪些内容哦，好景点不容错过哦。这里是景点的详细描述内容，可以重点关注有哪些内容哦，好景点不容错过哦。这里是景点的详细描述内容，可以重点关注有哪些内容哦，好景点不容错过哦。',
        //   date1: '',
        //   date2: '',
        //   type: [],
        //
        //   //分页面填写参数，方便以后的调整（开发过程中总结）
        //   tourGroupSerialNum:'G001111',
        //   groupNum:'1314',
        //   tourCompanySerialNum:'TA111111',
        //   tourCompanyName:'大地春回旅行社',
        //   guideName:'郭德纲',
        //   guideTel:'13358799961',
        //   affiliatedScenery:'张家界景区',
        //   imeiNum:'I24581564',
        //   memberNum:'10人',
        //   createdGroupPlace:'青城山前门',
        //   createdGroupTime:'2018-12-20 13:15:30',
        //   relieveGroupTime:'2018-12-20 13:15:30',
        //   tourState:'出行中'
        //
        // },
      };
    },
    props: ['idParam','tableTitleDialog', 'tableDataDialog', 'titleList', 'ruleFormNewPage', 'sign','myTerminalInfo'],
    methods: {
      //游团管理--游团路线地图
      map(){
        // var that = this
        var t = this.mapPointInfos//用t变量存储从后台请求回来的路线坐标字符串信息
        var pointArr = []
        pointArr = t.split(';')// 将字符串坐标数据转换为数组
        var polyLinePointArr = []

        for(let i=0;i<pointArr.length;i++){
          polyLinePointArr.push(new BMap.Point(pointArr[i].split(',')[0], pointArr[i].split(',')[1]))

        }


        var map = new BMap.Map("lineRoadMap", {minZoom: 5, maxZoom: 18}); // 创建Map实例,设置地图允许的最小/大级别

        // var point = new BMap.Point('104.346', '33.678');
        var point = new BMap.Point(pointArr[0].split(',')[0], pointArr[0].split(',')[1]);
        map.centerAndZoom(point, this.mapSizeParam);
        map.enableScrollWheelZoom();//启用滚轮放大缩小

        var polyline = new BMap.Polyline(
          polyLinePointArr,
          {
            strokeColor:'red',
            strokeWeight:4,
            strokeOpacity:0.8
          }
        )
        map.addOverlay(polyline)

      },

      //通过游团id请求接口返回游团行迹相关数据
      getLineRoad(){
        this.$axios(
          {
            method:'post',
            url:'/mis/touristTeam/getTrack?id='+this.idParam,
            data:{}
          }
        ).then(res => {
          console.log('游团行迹接口返回idParam：',res.data)
          if(res.data.resultStatus.resultCode === '0000'){

            if(res.data.value === null){
              this.$message.warning('暂无游团行迹')
              this.mapPointInfos = '104.346,33.678'
              this.mapSizeParam = 6
            }else {
              this.mapPointInfos = res.data.value.touristTeamTrack
              this.mapSizeParam = 15
            }
            this.$nextTick(this.map)
            this.isShow = false
            this.onlyParam = true

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },



      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            this.clickTab(0)
          })
          .catch(_ => {
          });

      },
      //点击tab面包屑按钮触发的事件
      clickTab(n) {
        // alert(n)
        let tabDom = document.getElementsByClassName('tab' + n)[0]
        for (let i = 0; i < this.titleList.length; i++) {
          let doms = document.getElementsByClassName('tab' + i)[0]
          if (n != i) {
            doms.style.backgroundColor = '#F3AA79'
            doms.style.color = '#fff'
          } else {
            doms.style.backgroundColor = '#fff'
            doms.style.color = '#fa8819'
          }

        }

        console.log(tabDom)
        if (n == 0) {
          this.isShow = false

          this.onlyParam = false
          //以上为游团管理--游团行迹做的判断
        } else {
          this.isShow = true

          this.onlyParam = false
          //以上为游团管理--游团行迹做的判断
        }

        //以下为游团管理--游团行迹做的if判断
        if (n == 2 && this.sign==='tourGroupManage'){
          this.getLineRoad()
          // this.$nextTick(this.map)
          // this.isShow = false
          // this.onlyParam = true
        }
        //以上为游团管理--游团行迹做的判断

        this.$emit('getNewPageInfo', n)
      },

      //以下这个方法只是单纯的用于设备统计菜单下点击列表详情内的设备总数数据是，直接就显示第二模态框的表格，因为其他默认的是有基础详情数据的，但是此处没有基础数据详情，就直接切换到了列表数据详情
      onlyTablesInfos() {
        // alert('变了啊')
        this.isShow = true
      },
      handleSelectionChange(val) {

      },
      handleEdit(index, row) {
        console.log(index, row);

      },

      handleLook(index, row) {
        console.log(index, row);
      },

      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`, val);
        this.pageParams.pageNum = 1
        this.pageParams.pageSize = val
      },
      //当前页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageParams.pageNum = val
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        this.$store.state.isShowTablesDialog = false

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancelForm(formName) {
        this.$refs[formName].resetFields();
        this.$store.state.isShowTablesDialog = false
      },
      //如果此组件内容要展示景点详细内容时会涉及到图片的上传及展示的内容
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

      }

    },
    mounted(){


    }
  }
</script>

<style scoped lang="scss">
  @import "../common_css/scss_style.scss";

  .tab_style {
    border: 1px solid #ececec;
    background-color: #F3AA79;
    color: #fff;
    /*border-radius: 4px;*/
    width: 1rem;
    min-width: 110px;
    display: flex;
    /*padding: 7px 0;*/
    margin-bottom: 20px;
  }

  .tab0 {
    background-color: #fff;
    color: #fa8819;
  }

  .tab_style > span {
    font-size: $font18;
    flex-grow: 1;
    text-align: center;
    /*color: $white;*/
  }

  /*图片展示及上传的样式控制*/
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
</style>
