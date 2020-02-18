<template>
  <div>
    <!--对应页面的标题组件集合-->
    <!--<div class="title">-->
    <!--<span>{{titleInfo.title1}}</span>&#45;&#45;<span>{{titleInfo.title2}}</span>-->
    <!--</div>-->
    <!--对应页面的筛选组件集合-->
    <div class="tool_bar" v-if="!isToolBar">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="line_box" v-if="searchIfInfo">
            <span>{{$t('queryName.searchIfInfo')}}</span>
            <el-input v-model="allParams.searchIfInfo" :placeholder="$t('placeholderInfo.searchIfInfo')"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="loginName">
            <span>{{$t('queryName.loginName')}}</span>
            <el-input v-model="allParams.loginName" :placeholder="$t('placeholderInfo.loginName')"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="sceneryName">
            <span>景区名称</span>
            <el-input v-model="allParams.sceneryName" placeholder="请输入景区名称"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="deptName">
            <span>机构名称</span>
            <el-input v-model="allParams.deptName" placeholder="请输入机构名称"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="affiliatedScenery">
            <span>所属景区</span>
            <el-input v-model="allParams.affiliatedScenery" placeholder="请输入所属景区" @focus="openSceneryDialog"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="affiliatedSceneryRRR">
            <span>归属景区</span>
            <el-input v-model="allParams.affiliatedSceneryRRR" placeholder="请输入归属景区"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="affiliatedAreaRRR">
            <span>{{$t('queryName.affiliatedAreaRRR')}}</span>
            <el-input v-model="allParams.affiliatedAreaRRR" placeholder="请输入归属景区"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="affiliatedSpot">
            <span>所属景点</span>
            <el-input v-model="allParams.affiliatedSpot" placeholder="请输入所属景点"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="spotName">
            <span>{{$t('queryName.spotName')}}</span>
            <el-input v-model="allParams.scenerySpotName" :placeholder="$t('placeholderInfo.spotName')"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="facilitySort">
            <span>设施类别</span>
            <el-select v-model="allParams.facilitySort" size="small" placeholder="请选择状态" @change="selectChange1">
              <el-option
                v-for="item in facilityType"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>

          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="businessType">
            <span>业务类型</span>
            <el-select v-model="allParams.businessType" size="small" placeholder="请选择业务类型" @change="selectChange1">
              <el-option
                v-for="item in businessTypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>

          </div>
        </el-col>

        <!--A2线路类型-->
        <el-col :span="6">
          <div class="line_box" v-if="roadLineType">
            <span>{{$t('queryName.roadLineType')}}</span>
            <el-select v-model="allParams.roadLineType" size="small" :placeholder="$t('placeholderInfo.roadLineType')" @change="selectChange1">
              <el-option
                v-for="item in roadLineTypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>

          </div>
        </el-col>


        <el-col :span="6">
          <div class="line_box" v-if="sexType">
            <span>{{$t('queryName.sexType')}}</span>
            <el-select v-model="allParams.sexType" size="small" :placeholder="$t('placeholderInfo.sexType')" @change="selectChange1">
              <el-option
                v-for="item in sexTypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>

          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="roadLineName">
            <span>{{$t('queryName.roadLineName')}}</span>
            <el-input v-model="allParams.roadLineName" :placeholder="$t('placeholderInfo.roadLineName')"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="facilityName">
            <span>设施名称</span>
            <el-input v-model="allParams.facilityName" placeholder="请输入设施名称"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="serviceProviderSerialNum">
            <span>服务商编号</span>
            <el-input v-model="allParams.serviceProviderSerialNum" placeholder="请输入服务商编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="roleName">
            <span>角色名称</span>
            <el-input v-model="allParams.roleName" placeholder="请输入角色名称"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="jurisdictionTag">
            <span>权限标识</span>
            <el-input v-model="allParams.jurisdictionTag" placeholder="请输入权限标识"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="serviceProviderName">
            <span>{{$t('queryName.serviceProviderName')}}</span>
            <el-input v-model="allParams.serviceProviderName" :placeholder="$t('placeholderInfo.serviceProviderName')"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="operatorName">
            <span>操作员名称</span>
            <el-input v-model="allParams.operatorName" placeholder="请输入操作员名称"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="serviceProviderLinkMan">
            <span>服务商负责人</span>
            <el-input v-model="allParams.serviceProviderLinkMan" placeholder="请输入服务商负责人"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="line_box" v-if="rentTime">
            <span>租用时间</span>
            <!--<el-input v-model="allParams.rentTime" placeholder="请输入消息标题"></el-input>-->
            <el-date-picker
              v-model="allParams.rentTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="line_box" v-if="dateShow">
            <span>时间</span>
            <!--<el-input v-model="allParams.rentTime" placeholder="请输入消息标题"></el-input>-->
            <el-date-picker
              v-model="allParams.rentTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="allocationState">
            <span>{{$t('queryName.allocationState')}}</span>
            <el-select v-model="allParams.allocationState" size="small" :placeholder="$t('placeholderInfo.allocationState')" @change="selectChange1">
              <el-option
                v-for="item in allocationStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

          </div>
        </el-col>


        <el-col :span="6">
          <div class="line_box" v-if="userTel">
            <span>{{$t('queryName.userTel')}}</span>
            <el-input v-model="allParams.userTel" :placeholder="$t('placeholderInfo.userTel')"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="guideTel">
            <span>导游手机号</span>
            <el-input v-model="allParams.guideTel" placeholder="请输入用户编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="userSerialNum">
            <span>用户编号</span>
            <el-input v-model="allParams.userSerialNum" placeholder="请输入用户编号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="guideSerialNum">
            <span>导游证号</span>
            <el-input v-model="allParams.guideSerialNum" placeholder="请输入导游证号"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="registerDate">
            <span>注册日期</span>
            <el-date-picker
              v-model="allParams.registerDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>

            <!--<el-date-picker size="small" v-model="allParams.startTime" value-format="timestamp" dateType="time"-->
            <!--placeholder="开始日期" @change="startDateChoose"></el-date-picker>-->
            <!--<el-date-picker size="small" v-model="allParams.endTime" value-format="timestamp" dateType="time"-->
            <!--placeholder="结束日期" @change="endDateChoose"></el-date-picker>-->
          </div>
        </el-col>


        <el-col :span="6">
          <div class="line_box" v-if="monthDate">
            <span>{{$t('queryName.monthDate')}}</span>
            <el-date-picker
              v-model="allParams.monthDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
        </el-col>


        <el-col :span="6">
          <div class="line_box" v-if="touristGroup2">
            <span>{{$t('queryName.touristGroup2')}}</span>
            <el-select v-model="allParams.touristGroup2" size="small" placeholder="请选择旅游团" @change="selectChange1">
              <el-option
                v-for="item in touristGroup2DropDownList"
                :key="item.ID"
                :label="item.Name"
                :value="item.ID"
              ></el-option>
            </el-select>

          </div>
        </el-col>


        <el-col :span="6">
          <div class="line_box" v-if="rfidSerialNum">
            <span>{{$t('queryName.rfidSerialNum')}}</span>
            <el-input v-model="allParams.rfidSerialNum" :placeholder="$t('placeholderInfo.rfidSerialNum')"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="rfidType">
            <span>发射源类型</span>
            <!--<el-input v-model="allParams.rfidType" placeholder="请输入发射源类型"></el-input>-->
            <el-select v-model="allParams.rfidType" size="small" placeholder="请选择发射源类型" @change="selectChange1">
              <el-option
                v-for="item in rfidTypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>


          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="sceneryGrade">
            <span>景区级别</span>
            <el-select v-model="allParams.sceneryGrade" size="small" placeholder="请选择景区级别·····" @change="selectChange1">
              <el-option
                v-for="item in sceneryGradeInfo"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="affilitedArea">
            <span>所属区域</span>
            <el-input v-model="allParams.areaName" placeholder="请输入所属区域" @focus="openAreaDialog"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="affiliatedTourCompany">
            <span>所属旅行社</span>
            <el-input v-model="allParams.affiliatedTourCompany" placeholder="请输入所属旅行社"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="tourCompanyName">
            <span>旅行社名称</span>
            <el-input v-model="allParams.tourCompanyName" placeholder="请输入旅行社名称"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="personName">
            <span>联系人</span>
            <el-input v-model="allParams.personName" placeholder="请输入旅行社联系人"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="groupNum">
            <span>团号</span>
            <el-input v-model="allParams.groupNum" placeholder="请输入团号"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="line_box" v-if="createGroupTime">
            <span>建团时间</span>
            <!--第一个手输入时间-->
            <!--<el-input v-model="allParams.createGroupTime" placeholder="请输入团号"></el-input>-->

            <!--第二个单选时间-->
            <!--<el-date-picker-->
            <!--v-model="allParams.createGroupTime"-->
            <!--type="datetime"-->
            <!--placeholder="选择日期时间">-->
            <!--</el-date-picker>-->

            <!--第三个选择时间段-->
            <el-date-picker
              v-model="allParams.createGroupTime"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="line_box" v-if="createGroupTime2">
            <span>{{$t('queryName.createGroupTime2')}}</span>
            <!--第一个手输入时间-->
            <!--<el-input v-model="allParams.createGroupTime" placeholder="请输入团号"></el-input>-->

            <!--第二个单选时间-->
            <!--<el-date-picker-->
            <!--v-model="allParams.createGroupTime"-->
            <!--type="datetime"-->
            <!--placeholder="选择日期时间">-->
            <!--</el-date-picker>-->

            <!--第三个选择时间段-->
            <el-date-picker
              v-model="allParams.createGroupTime2"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="coverageName">
            <span>图层名称</span>
            <el-input v-model="allParams.coverageName" placeholder="请输入图层名称"></el-input>
          </div>
        </el-col>

        <!--A2行程名称-->
        <el-col :span="6">
          <div class="line_box" v-if="travelInfoName">
            <span>{{$t('queryName.travelInfoName')}}</span>
            <el-input v-model="allParams.travelInfoName" :placeholder="$t('placeholderInfo.travelInfoName')"></el-input>
          </div>
        </el-col>


        <el-col :span="6">
          <div class="line_box" v-if="railName">
            <span>{{$t('queryName.railName')}}</span>
            <el-input v-model="allParams.railName" :placeholder="$t('placeholderInfo.railName')"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="versionNum">
            <span>版本号</span>
            <el-input v-model="allParams.version" placeholder="请输入版本号"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="imeiNum">
            <span>{{$t('queryName.imeiNum')}}</span>
            <el-input v-model="allParams.imei" :placeholder="$t('placeholderInfo.imeiNum')"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="codeMachine">
            <span>{{$t('queryName.codeMachine')}}</span>
            <el-input v-model="allParams.codeMachine" :placeholder="$t('placeholderInfo.codeMachine')"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="mediaFileSerialNum">
            <span>媒体文件编号</span>
            <el-input v-model="allParams.mediaFileSerialNum" placeholder="请输入媒体文件编号"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="mediaFileName">
            <span>文件名</span>
            <el-input v-model="allParams.mediaFileName" placeholder="请输入文件名"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="mediaType">
            <span>媒体类型</span>
            <el-select v-model="allParams.mediaType" size="small" placeholder="请选择媒体类型" @change="selectChange1">
              <el-option
                v-for="item in mediaTypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

          </div>
        </el-col>


        <el-col :span="6">
          <div class="line_box" v-if="canChooseScenery">
            <span>可选景区</span>
            <el-select v-model="allParams.canChooseScenery" size="small" placeholder="请选择景区">
              <el-option
                v-for="item in canChooseSceneryArr"
                :key="item.ID"
                :label="item.Name"
                :value="item.ID"
              ></el-option>
            </el-select>

          </div>
        </el-col>

        <!--添加A2条件筛选服务商名称-->
        <el-col :span="6">
          <div class="line_box" v-if="a2ChooseServiceProvider">
            <span>{{$t('queryName.a2ChooseServiceProvider')}}</span>
            <el-select v-model="allParams.a2ChooseServiceProvider" size="small" :placeholder="$t('placeholderInfo.a2ChooseServiceProvider')">
              <el-option
                v-for="item in a2ChooseServiceProviderArr"
                :key="item.ID"
                :label="item.Name"
                :value="item.ID"
              ></el-option>
            </el-select>

          </div>
        </el-col>


        <el-col :span="6">
          <div class="line_box" v-if="messageHeader">
            <span>消息标题</span>
            <el-input v-model="allParams.messageHeader" placeholder="请输入消息标题"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="publishType">
            <span>发布类型</span>
            <el-select v-model="allParams.publishType" size="small" placeholder="请选择状态" @change="selectChange1">
              <el-option
                v-for="item in publishTypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="sosTime">
            <span>呼救时间</span>
            <!--<el-input v-model="allParams.sosTime" placeholder="请输入呼救时间"></el-input>-->

            <!--第二个单选时间-->
            <el-date-picker
              v-model="allParams.sosTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>

          </div>
        </el-col>

        <el-col :span="8">
          <div class="line_box" v-if="visitDate">
            <span>访问日期</span>
            <!--<el-input v-model="allParams.visitDate" placeholder="请输入访问日期"></el-input>-->

            <!--第三个选择时间段-->
            <!--<el-date-picker-->
            <!--v-model="allParams.visitDate"-->
            <!--type="datetimerange"-->
            <!--start-placeholder="开始日期"-->
            <!--end-placeholder="结束日期"-->
            <!--:default-time="['12:00:00']"-->
            <!--value-format="yyyy-MM-dd HH:mm:ss"-->
            <!--&gt;-->
            <!--</el-date-picker>-->

            <el-date-picker
              v-model="allParams.visitDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="publishDate">
            <span>发布时间</span>
            <!--<el-input v-model="allParams.publishDate" placeholder="请输入消息标题"></el-input>-->

            <!--第二个单选时间-->
            <el-date-picker
              v-model="allParams.publishDate"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="paramKey">
            <span>参数键</span>
            <el-input v-model="allParams.paramKey" placeholder="请输入参数键"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="paramValue">
            <span>参数值</span>
            <el-input v-model="allParams.paramValue" placeholder="请输入参数值"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="editorScope">
            <span>编辑</span>
            <el-select v-model="allParams.editorScope" size="small" placeholder="请选择编辑范围" @change="selectChange1">
              <el-option
                v-for="item in editorChooseArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="publishState">
            <span>发布状态</span>
            <el-select v-model="allParams.publishState" size="small" placeholder="请选择状态" @change="selectChange1">
              <el-option
                v-for="item in publishStateArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="publishStateK">
            <span>资源包状态</span>
            <el-select v-model="allParams.publishStateK" size="small" placeholder="请选择状态" @change="selectChange1">
              <el-option
                v-for="item in publishStateArrK"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="reset">
            <span>是否复位点</span>
            <el-select v-model="allParams.reset" size="small" placeholder="请选择复位状态" @change="selectChange1">
              <el-option
                v-for="item in isResetArr"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="touristState">
            <span>出行状态</span>
            <el-select v-model="allParams.touristState" size="small" placeholder="请选择出行状态" @change="selectChange1">
              <el-option
                v-for="item in touristStateArr"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>

          </div>
        </el-col>
        <el-col :span="6">
          <div class="line_box" v-if="sceneryState">
            <span>{{$t('queryName.sceneryState')}}</span>
            <el-select v-model="allParams.sceneryState" size="small" :placeholder="$t('placeholderInfo.sceneryState')" @change="selectChange1">
              <el-option
                v-for="item in sceneryStatus"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

          </div>
        </el-col>

        <!--A2在线状态筛选-->
        <el-col :span="6">
          <div class="line_box" v-if="isOnLineState">
            <span>{{$t('queryName.isOnLineState')}}</span>
            <el-select v-model="allParams.isOnLineState" size="small" :placeholder="$t('placeholderInfo.isOnLineState')" @change="selectChange1">
              <el-option
                v-for="item in isOnLineStateArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

          </div>
        </el-col>


        <el-col :span="6">
          <div class="line_box" v-if="groupPersonType">
            <span>{{$t('queryName.groupPersonType')}}</span>
            <el-select v-model="allParams.groupPersonType" size="small" :placeholder="$t('placeholderInfo.groupPersonType')" @change="selectChange1">
              <el-option
                v-for="item in groupPersonTypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>

          </div>
        </el-col>

        <!--A2选择报警类型-->
        <el-col :span="6">
          <div class="line_box" v-if="alertType">
            <span>{{$t('queryName.alertType')}}</span>
            <el-select v-model="allParams.alertType" size="small" placeholder="请选择报警类型" @change="selectChange1">
              <el-option
                v-for="item in alertTypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>

          </div>
        </el-col>


        <el-col :span="6">
          <div class="line_box" v-if="myUpdateState">
            <span>更新状态</span>
            <el-select v-model="allParams.updateState" size="small" placeholder="请选择更新状态" @change="selectChange1">
              <el-option
                v-for="item in updateStateArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>

          </div>
        </el-col>

        <el-col :span="6">
          <div class="line_box" v-if="routeNameShow">
            <span>行程名称</span>
            <el-input v-model="allParams.name" placeholder="请输入行程名称"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="line_box" v-if="sosDateShow">
            <span>呼救日期</span>
            <!--<el-date-picker size="small" v-model="allParams.startTime" value-format="timestamp" dateType="time"-->
            <!--placeholder="开始日期" @change="startDateChoose"></el-date-picker>-->
            <!--<el-date-picker size="small" v-model="allParams.endTime" value-format="timestamp" dateType="time"-->
            <!--placeholder="结束日期" @change="endDateChoose"></el-date-picker>-->

            <el-date-picker
              v-model="allParams.mySosDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>

          </div>
        </el-col>
        <!--<el-col :span="6">-->
        <!--<div class="line_box" v-if="dateShow">-->
        <!--<span>日期</span>-->
        <!--<el-date-picker size="small" v-model="allParams.startTime" value-format="timestamp" dateType="time"-->
        <!--placeholder="开始日期" @change="startDateChoose"></el-date-picker>-->
        <!--<el-date-picker size="small" v-model="allParams.endTime" value-format="timestamp" dateType="time"-->
        <!--placeholder="结束日期" @change="endDateChoose"></el-date-picker>-->
        <!--</div>-->
        <!--</el-col>-->
        <el-col :span="6" style="border:1px solid red;opacity: 0">
          <div class="line_box" v-if="isOccupyPlace">
            <span>占位input</span>
            <el-input placeholder="请输入所属景区"></el-input>
          </div>
        </el-col>
      </el-row>
      <div class="search_btn my_hover" @click="queryInfos" v-if="sign!='sign2222'">
        <span>{{$t('btnInfo.query')}}</span>
      </div>
    </div>

    <!--对应页面的功能组件集合-->
    <div class="function_btn_box">
      <div class="btn_box1" v-if="isAmountStatistics">
        <span style="">{{$t('textInfo1.facilityCount')}}：</span><span>{{$store.state.allCountP}}</span><span>台</span>
        <div style="display: inline-block;margin: 0 40px">
          <span style="">{{$t('textInfo1.onlineCount')}}：</span><span>{{$store.state.onlineCountP}}</span><span>台</span>
        </div>
        <span style="">{{$t('textInfo1.offlineCount')}}：</span><span>{{$store.state.offlineCountP}}</span><span>台</span>
      </div>

      <div class="btn_box1" v-if="isRfidAmountStatistics">
        <span
          style="">设备总台数：{{rfidCountInfoShowData.allCount}}</span>(RFID:<span>{{rfidCountInfoShowData.allRfidCount}}</span>/位置版:<span>{{rfidCountInfoShowData.allSiteCount}}</span>)
        <div style="display: inline-block;margin: 0 40px">
          <span style="">启用总数：{{rfidCountInfoShowData.enableCount}}</span>(RFID:<span>{{rfidCountInfoShowData.enableRfidCount}}</span>/位置版:<span>{{rfidCountInfoShowData.enableSiteCount}}</span>)
        </div>
        <span style="">禁用总数：{{rfidCountInfoShowData.disableCount}}</span>(RFID:<span>{{rfidCountInfoShowData.disableRfidCount}}</span>/位置版:<span>{{rfidCountInfoShowData.disableSiteCount}}</span>)
      </div>

      <div class="btn_box2">
        <div class="my_hover" v-if="isAdd" @click="openAddEditorDialog('新增')">{{$t('btnInfo.add')}}</div>
        <div class="my_hover" v-if="isAddAdd2" @click="addSceneryToArea">添加</div>

        <div class="my_hover" v-if="isAreaManage" @click="areaInfoSearch">{{$t('btnInfo.areaManage')}}</div>

        <div class="my_hover" v-if="isReturn" @click="returnFacilityFn">{{$t('btnInfo.return')}}</div>

        <!--<div class="my_hover" v-if="isMoreDel" @click="moreDeleteFunction">批量删除</div>-->
        <div class="my_hover" v-if="false" @click="moreDeleteFunction">批量删除</div>


        <div class="my_hover" v-if="isEditor" @click="openAddEditorDialog('编辑')">编辑</div>

        <div class="my_hover" v-if="isAddQ" @click="addNewGroupFn">{{$t('btnInfo.addGroup')}}</div>
        <div class="my_hover" v-if="isEditorQ" @click="editorGroupFn">{{$t('btnInfo.editGroup')}}</div>
        <div class="my_hover" v-if="isCloseTouristGroup" @click="closeTouristGroupFn">{{$t('btnInfo.closeGroup')}}</div>

        <div class="my_hover" v-if="isEnabled" @click="isEnabledDisabled('启用')">启用</div>
        <div class="my_hover" v-if="isDisabled" @click="isEnabledDisabled('禁用')">禁用</div>
        <div class="my_hover" v-if="isAbandon" @click="isAbandonR">弃用</div>
        <div class="my_hover" v-if="isCoverageManage" @click="coverageManageFunction">图层管理</div>
        <div class="my_hover" v-if="isRailTips" @click="openRailTipDialog">围栏提示设置</div>
        <div class="my_hover" v-if="isSceneryScope" @click="openSceneryScopeDialog">景区范围</div>
        <div class="my_hover" v-if="isShutdown" @click="shutDownFunction">一键关机</div>
        <div class="my_hover" v-if="isLanguageSet" @click="openLanguageSetDialog">语言配置</div>
        <div class="my_hover" v-if="isResourcePack" @click="infosPackFunction">资源打包</div>
        <div class="my_hover" v-if="isMapPreview">地图预览</div>
        <div class="my_hover" v-if="isSceneryAllInfo" @click="openMyTableDialog">景区详情</div>
        <div class="my_hover" v-if="isScenerySpotAllInfo" @click="openMyTableDialog">景点详情</div>
        <div class="my_hover" v-if="isDel">删除</div>
        <div class="my_hover" v-if="isSureMessage" @click="sureMessageEvent">确认消息</div>
        <div class="my_hover" v-if="isSosDispose" @click="openSosDisposeDialog">求救处理</div>
        <div class="my_hover" v-if="isAdjustTourCompany" @click="openAlterTourCompanyDialog">调整旅行社</div>
        <div class="my_hover" v-if="isQualificationIdentification" @click="isEnabledDisabledSss('资格认证')">资格认证</div>
        <div class="my_hover" v-if="isCancelIdentification" @click="isEnabledDisabledSss('取消认证')">取消认证</div>

        <div class="my_hover" v-if="isRelevanceGuide" @click="openGuideRelevanceDialog">关联导游</div>
        <div class="my_hover" v-if="isCancelRelevanceGuide" @click="cancelGuideRelation">取消关联</div>
        <div class="my_hover" v-if="isPublish" @click="messagePublish">发布</div>
        <div class="my_hover" v-if="isCancelPublish" @click="messageCancelPublish">取消发布</div>
        <div class="my_hover" v-if="isTerminalUpdateInfo" @click="openUpdateInfoDialog">终端更新情况</div>
        <div class="my_hover" v-if="isAddDevice">添加设备</div>
        <div class="my_hover" v-if="isSynToRedis" @click="uploadRedisFunction">同步到Redis</div>
        <div class="my_hover" v-if="isImpower" @click="openOperatorImpowerDialog">授权</div>
        <div class="my_hover" v-if="isImpowerScenery" @click="openImpowerSceneryDialog">授权景区</div>
        <div class="my_hover" v-if="isRoleImpower" @click="openRoleImpowerDialog">角色授权</div>
        <div class="my_hover" v-if="isFunctionImpower" @click="openRoleFunctionImpowerDialog">功能授权</div>
        <div class="my_hover" v-if="isReloadImpower">重载授权</div>
        <div class="my_hover" v-if="isResetPassword" @click="updateResetPassword">重置密码</div>
        <div class="my_hover" @click="printPage" v-if="isAllotDevice">分配设备</div>
        <div class="my_hover import" v-if="isImportRfid">
          导入发射源
          <input class="my_hover" type="file" @change="importf(this)"
                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        </div>
        <div class="my_hover import" v-if="isImportDevice">
          {{$t('btnInfo.importFacility')}}
          <!--导入设备-->
          <input id="uploadBtn" class="my_hover" type="file" @change="importf(this)"
                 accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
        </div>
        <div class="my_hover" @click="exportInfo" v-if="isExportDevice">
          {{$t('btnInfo.exportFacility')}}
          <!--导出设备-->
        </div>
        <div class="my_hover" @click="getExcel" v-if="isImportParam">
          {{$t('btnInfo.downloadExcelTemplate')}}
          <a :href="$store.state.downloadUrl" id="downloadBtn"></a>
        </div>

        <div class="my_hover" v-if="isClearTravelInfo" @click="clearTravelInfosFn">{{$t('btnInfo.clearTravel')}}</div>
        <div class="my_hover" v-if="isClearAlert" @click="clearAlertInfosFn">  {{$t('btnInfo.clearAlert')}}</div>

        <div class="my_hover" v-if="sign=='systemlogmanage'" @click="chooseShowLog('用户日志')">用户日志</div>
        <div class="my_hover" v-if="sign=='systemlogmanage'" @click="chooseShowLog('操作员日志')">操作员日志</div>
        <div class="my_hover" v-if="sign=='systemlogmanage'" @click="chooseShowLog('业务日志')">业务日志</div>

      </div>

    </div>

  </div>
</template>

<script>
  import commonFn from '../common_js/commonFn'

  export default {
    name: "my-searchs",
    data() {
      return {
        allParams: {
          isOnLineState: '',//A2选择是否在线状态
          a2ChooseServiceProvider: '',//A2选择服务商名称
          canChooseScenery: '',//A2可选景区的下拉内容
          affiliatedAreaRRR: '',//A2归属区域
          touristGroup2: '',//选择旅游团A2
          alertType: '',//选择报警类型A2
          travelInfoName: '',//行程名称A2
          sexType: '',//性别A2
          groupPersonType: '',//成员类型A2
          roadLineName: '',//线路名称
          roadLineType: '',//线路类型
          searchIfInfo: '',//A2后台人员管理综合所有条件框
          monthDate: '',//A2后台查询月份
          allocationState: '2',//A2后台的分配状态
          coverageName: '',//图层名称
          businessType: '',//业务类型
          operatorName: '',//操作员名称
          deptName: '',//机构名称
          mySosDate: '',//呼救日期
          sceneryName: '',//景区名称
          sceneryId: '',//景区id，如果是空字符串则代表展示全部信息
          scenerySpotName: '',//景点名称
          scenerySpotId: '',//景点id，如果是空字符串则代表展示全部信息
          sceneryGrade: '',//景区级别
          areaName: '',//所属区域
          areaId: '',//所属区域ID
          sceneryState: '',
          updateState: '',//更新状态
          affiliatedScenery: '',//所属景区
          affiliatedSceneryRRR: '',//归属景区
          affiliatedSceneryId: '',//所属景区id
          touristState: '',//出行状态
          affiliatedSpot: '',//所属景点
          facilitySort: '',//设施类别
          facilityName: '',//设施名称
          rfidSerialNum: '',//发射源编号
          userTel: '',//用户手机号
          guideTel: '',//导游手机号
          userSerialNum: '',//用户编号
          guideSerialNum: '',//导游证号
          registerDate: '',//注册日期
          affiliatedTourCompany: '',//所属旅行社
          tourCompanyName: '',//旅行社名称
          personName: '',//旅行社联系人姓名
          roleName: '',
          loginName: '',
          jurisdictionTag: '',//权限标识
          groupNum: '',//团号
          createGroupTime: '',//建团时间
          createGroupTime2: '',//A2搜索时间
          visitDate: '',//访问日期
          sosTime: '',//呼救时间
          mediaFileSerialNum: '',//媒体文件编号
          mediaFileName: '',//媒体文件名
          mediaType: '',//媒体类型
          paramKey: '',//参数键
          paramValue: '',//参数值
          editorScope: '',//可编辑范围
          rfidType: '',//发射源类型
          rentTime: '',//租用时间
          messageHeader: '',//消息标题
          publishType: '',//消息发布类型
          publishDate: '',//消息发布时间
          publishState: '',//消息发布状态
          publishStateK: '',//资源包发布状态
          reset: '',//是否复位点
          railName: '',//围栏名称
          codeMachine: '',//机器码
          imei: '',//设备IMEI号
          version: '',//版本号
          startTime: '',
          endTime: '',
          name: '',//行程名称
          serviceProviderSerialNum: '',//服务商编码
          serviceProviderName: '',//服务商名称
          serviceProviderLinkMan: '',//服务商负责人
        },
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
        sceneryStatus: [
          {
            id: '2',
            name: '全部'
          },
          {
            id: '0',
            name: '禁用'
          },
          {
            id: '1',
            name: '启用'
          },
        ],

        isOnLineStateArr: [
          {
            id: '2',
            name: '全部'
          },
          {
            id: '0',
            name: '离线'
          },
          {
            id: '1',
            name: '在线'
          },
        ],

        allocationStatus: [
          {
            id: '2',
            name: '全部'
          },
          {
            id: '1',
            name: '已分配'
          },
          {
            id: '0',
            name: '未分配'
          },
        ],


        allOptionscenic: [
          {
            id: '1',
            name: '青城山'
          },
          {
            id: '2',
            name: '都江堰'
          }
        ],
        updateStateArr: [
          {
            id: '10',
            name: '全部'
          },
          {
            id: '0',
            name: '已更新'
          },
          {
            id: '1',
            name: '待更新'
          }
        ],
        mediaTypeArr: [
          {
            id: '0',
            name: '全部'
          },
          {
            id: '1',
            name: '音频'
          },
          {
            id: '2',
            name: '视频'
          }
        ],
        allOptionspot: [
          {
            id: '1',
            name: '紫云阁'
          },
          {
            id: '2',
            name: '张家界'
          }
        ],
        facilityType: [
          {
            id: '0',
            name: '全部',
            value: ''
          },
          {
            id: '1',
            name: 'FAC_WC-厕所',
            value: 'FAC_WC'
          },
          {
            id: '2',
            name: 'FAC_SELL-售卖点',
            value: 'FAC_SELL'
          },
          {
            id: '3',
            name: 'FAC_DOOR-景区门',
            value: 'FAC_DOOR'
          },
          {
            id: '4',
            name: 'FAC_SERVICE-服务站',
            value: 'FAC_SERVICE'
          },
          {
            id: '5',
            name: 'FAC_ALM-报警点',
            value: 'FAC_ALM'
          },

        ],
        businessTypeArr: [
          {
            id: '0',
            name: '全部',
            value: ''
          },
          {
            id: '1',
            name: '用户管理',
            value: '1'
          },
          {
            id: '2',
            name: '操作员管理',
            value: '2'
          },
          {
            id: '3',
            name: '一键关机',
            value: '3'
          },
          {
            id: '4',
            name: '资源打包',
            value: '4'
          },
          {
            id: '5',
            name: '资源包管理',
            value: '5'
          },
          {
            id: '6',
            name: '终端设备管理',
            value: '6'
          },
          {
            id: '7',
            name: '发射源管理',
            value: '7'
          },
          {
            id: '8',
            name: '导游管理',
            value: '8'
          },
          {
            id: '9',
            name: '游团管理',
            value: '9'
          },

        ],

        sexTypeArr: [
          {
            id: '0',
            name: '全部',
            value: ''
          },
          {
            id: '1',
            name: '男',
            value: '1'
          },
          {
            id: '2',
            name: '女',
            value: '2'
          },

        ],
        groupPersonTypeArr: [
          {
            id: 2,
            name: '全部',
            value: ''
          },
          {
            id: 0,
            name: '游客',
            value: 0
          },
          {
            id: 1,
            name: '导游',
            value: 1
          },

        ],


        alertTypeArr: [
          {
            id: '10',
            name: '全部',
            value: ''
          },
          {
            id: '0',
            name: '呼救地址',
            value: '0'
          },
          {
            id: '1',
            name: '进围栏报警',
            value: '1'
          },
          {
            id: '2',
            name: '出围栏报警',
            value: '2'
          },
          {
            id: '6',
            name: '旅游卡低电报警',
            value: '6'
          },
          {
            id: '7',
            name: '设备低电报警',
            value: '7'
          },

        ],


        //   touristGroup2Arr: [
        //   {
        //     id: '0',
        //     name: '全部',
        //     value: ''
        //   },
        //   {
        //     id: '1',
        //     name: '旅游团',
        //     value: '1'
        //   },
        //   {
        //     id: '2',
        //     name: '测试团',
        //     value: '2'
        //   },
        //
        // ],

        roadLineTypeArr: [
          {
            id: '0',
            name: '全部',
            value: ''
          },
          {
            id: '1',
            name: '出境旅游',
            value: '1'
          },
          {
            id: '2',
            name: '周边短途',
            value: '2'
          },
          {
            id: '3',
            name: '国内长线',
            value: '3'
          },

        ],

        isResetArr: [
          {
            id: '0',
            name: '全部',
            value: ''
          },
          {
            id: '1',
            name: '是',
            value: '1'
          },
          {
            id: '2',
            name: '否',
            value: '2'
          },
        ],
        rfidTypeArr: [
          {
            id: '0',
            name: '全部',
            value: ''
          },
          {
            id: '1',
            name: 'rfid',
            value: '1'
          },
          {
            id: '2',
            name: '位置版',
            value: '2'
          },
        ],
        touristStateArr: [
          {
            id: '2',
            name: '全部',
            value: '2'
          },
          {
            id: '0',
            name: '出行中',
            value: '0'
          },
          {
            id: '1',
            name: '已完团',
            value: '1'
          },
        ],
        publishTypeArr: [

          {
            id: '0',
            name: '全部',
            value: '0'
          },
          {
            id: '1',
            name: '平台消息',
            value: '1'
          },
          {
            id: '2',
            name: '导游消息',
            value: '2'
          },
          {
            id: '3',
            name: '景区消息',
            value: '3'
          },
        ],
        //发布状态
        publishStateArr: [
          {
            id: '10',
            name: '全部',
            value: '10'
          },
          {
            id: '0',
            name: '未发布',
            value: '0'
          },
          {
            id: '1',
            name: '待发布',
            value: '1'
          },
          {
            id: '2',
            name: '已发布',
            value: '2'
          },
          {
            id: '9',
            name: '已取消',
            value: '9'
          },
        ],
        //资源包发布状态
        publishStateArrK: [
          {
            id: '10',
            name: '全部',
            value: '10'
          },
          {
            id: '2',
            name: '待发布',
            value: '2'
          },
          {
            id: '3',
            name: '已发布',
            value: '3'
          },
          {
            id: '9',
            name: '已过期',
            value: '9'
          },
        ],

        editorChooseArr: [
          {
            id: '9',
            name: '全部',
            value: '9'
          },
          {
            id: '0',
            name: '不可以',
            value: '0'
          },
          {
            id: '1',
            name: '可以',
            value: '1'
          },
        ],

      }
    },
    //isQueryInfosX在二级列表里面查询是用于判断是点击的一级查询按钮还是二级查询按钮
    //sceneryLanguageSetTwoEventParam在二级列表里面点击的启用禁用等时间
    props: ['eventParam', 'sceneryLanguageSetTwoEventParam', 'isQueryInfosX', 'rfidCountInfoShowData', 'sign', 'areaSearchParam', 'titleInfo', 'isToolBar', 'sceneryName', 'deptName', 'affiliatedScenery', 'affiliatedSceneryRRR', 'affiliatedAreaRRR', 'affiliatedSpot', 'spotName', 'facilitySort', 'businessType', 'groupPersonType', 'alertType', 'touristGroup2', 'touristGroup2DropDownList', 'sexType', 'roadLineType', 'facilityName', 'roadLineName', 'codeMachine', 'imeiNum', 'serviceProviderSerialNum', 'roleName', 'jurisdictionTag', 'serviceProviderName', 'operatorName', 'serviceProviderLinkMan', 'userTel', 'guideTel', 'guideSerialNum', 'monthDate', 'registerDate', 'userSerialNum', 'rfidSerialNum', 'rfidType', 'mediaFileSerialNum', 'mediaFileName', 'mediaType', 'canChooseSceneryArr', 'canChooseScenery', 'a2ChooseServiceProvider', 'a2ChooseServiceProviderArr', 'messageHeader', 'publishType', 'sosTime', 'visitDate', 'publishDate', 'rentTime', 'paramKey', 'paramValue', 'editorScope', 'publishState', 'publishStateK', 'reset', 'versionNum', 'routeNameShow', 'sosDateShow', 'dateShow', 'isOccupyPlace', 'railName', 'allocationState', 'sceneryState', 'isOnLineState', 'myUpdateState', 'touristState', 'sceneryGrade', 'affilitedArea', 'affiliatedTourCompany', 'tourCompanyName', 'searchIfInfo', 'loginName', 'personName', 'groupNum', 'createGroupTime', 'createGroupTime2', 'coverageName', 'travelInfoName', 'isAmountStatistics', 'isRfidAmountStatistics', 'isClearTravelInfo', 'isClearAlert', 'isReturn', 'isAdd', 'isAddAdd2', 'isAreaManage', 'isAddQ', 'isMoreDel', 'isEditor', 'isEditorQ', 'isCloseTouristGroup', 'isEnabled', 'isDisabled', 'isAbandon', 'isCoverageManage', 'isRailTips', 'isSceneryScope', 'isShutdown', 'isLanguageSet', 'isResourcePack', 'isMapPreview', 'isSceneryAllInfo', 'isScenerySpotAllInfo', 'isDel', 'isSureMessage', 'isSosDispose', 'isAdjustTourCompany', 'isQualificationIdentification', 'isCancelIdentification', 'isRelevanceGuide', 'isCancelRelevanceGuide', 'isPublish', 'isCancelPublish', 'isTerminalUpdateInfo', 'isAddDevice', 'isSynToRedis', 'isImpower', 'isImpowerScenery', 'isRoleImpower', 'isFunctionImpower', 'isReloadImpower', 'isResetPassword', 'isAllotDevice', 'isImportRfid', 'isImportDevice', 'isExportDevice', 'isImportParam'],
    methods: {

      //A2片区管理--点击片区管理按钮触发事件，获取对应片区的信息
      areaInfoSearch() {
        this.$emit('getDefaultInfo4')
      },
      //A2添加景区到对应片区里面
      addSceneryToArea() {
        this.$emit('addSceneryIntoArea', this.allParams.canChooseScenery)
      },
      //A2设备归还方法函数
      returnFacilityFn() {
        this.$emit('returnFacilityFn')
      },


      //打开新增/编辑模态框
      openAddEditorDialog(n) {
        if (!this.sceneryLanguageSetTwoEventParam) {

          console.log(n, this.sign)
          if (this.sign === 'scenery') {

            this.$store.state.scenerySign = true

          } else if (this.sign === 'sceneryCoverage') {

            this.$store.state.sceneryCoverageSign = true

          } else if (this.sign === 'scenerySpot') {

            this.$emit('clearAddInfo', n)

          } else if (this.sign === 'sceneryFacility') {

            this.$store.state.sceneryFacilitySign = true

          } else if (this.sign === 'railSign') {

            this.$store.state.railSign = true
            this.$emit('openRailMap', n)

          } else if (this.sign === 'terminalFacility') {

            this.$emit('clearAddInfo', n)

          } else if (this.sign === 'terminalRfid') {

            this.$emit('clearAddInfo', n)


          } else if (this.sign === 'messageSign') {

            this.$store.state.messageSign = true

          } else if (this.sign === 'guideManageSign') {

            this.$store.state.guideManageSign = true

          } else if (this.sign === 'mediaFileManageSign') {

            this.$store.state.mediaFileManageSign = true

          } else if (this.sign === 'districtManageSign') {

            this.$store.state.districtManageSign = true

          } else if (this.sign === 'organizationManageSign') {

            // this.$store.state.organizationManageSign = true
            this.$emit('sureAddOrEditor', n)

          } else if (this.sign === 'sceneryServiceProviderSign') {
            this.$store.state.sceneryServiceProviderSign = true
          } else if (this.sign === 'tourCompanyManageSign') {
            this.$store.state.tourCompanyManageSign = true
          } else if (this.sign === 'operatorManageSign') {
            this.$store.state.operatorManageSign = true
          } else if (this.sign === 'roleManageSign') {
            this.$store.state.roleManageSign = true
          } else if (this.sign === 'menuManageSign') {
            this.$store.state.menuManageSign = true
          } else if (this.sign === 'systemParamSign') {
            this.$store.state.systemParamSign = true
          } else if (this.sign === 'dictionaryManageSign') {
            this.$store.state.dictionaryManageSign = true
          } else if (this.sign === 'roleManage2') {
            this.$store.state.roleManageSign2 = true
          } else if (this.sign === 'sceneryServiceProviderList2') {

            //从以下开始为A2的判断

            this.$store.state.sceneryServiceProviderListSign2 = true
          } else if (this.sign === 'sceneryScopeList2') {

            this.$emit('addBeforeClear')

          } else if (this.sign === 'areaManageList2') {
            this.$emit('addBeforeClear')
          } else if (this.sign === 'facilityInfo2') {
            this.$emit('addBeforeClear')
          } else if (this.sign === 'rfid2') {
            this.$emit('addBeforeClear')
          } else if (this.sign === 'siteRfid2') {
            this.$emit('addBeforeClear')
          } else if (this.sign === 'areaFacilityInfo2') {
            this.$emit('addBeforeClear')
          } else if (this.sign === 'areaMemberInfo2') {
            this.$emit('addBeforeClear')
          } else if (this.sign === 'groupPersonInfo2') {
            this.$emit('addBeforeClear')
          } else if (this.sign === 'roadLineInfo2') {
            this.$emit('addBeforeClear')
          }else if(this.sign === 'roadLineScenerySpotInfo2'){
            this.$emit('addBeforeClear')
          }else if(this.sign === 'railInfo2'){
            this.$emit('addBeforeClear')
          }else if(this.sign === 'rfid2child'){
            this.$emit('addBeforeClear')
          }else if(this.sign === 'siteRfid2child'){
            this.$emit('addBeforeClear')
          }else if(this.sign === 'travelInfo2'){
            this.$emit('addBeforeClear')
          }

          this.$store.state.titleHeader = n


        } else {
          //此处的例外是用于判断到底是弹出景区管理默认编辑新增模态框还是弹出更深层次的景区语言设置模态框内部的新增编辑模态框
          // this.$store.state.chooseParam999 = true
          this.$store.state.titleHeader = n

          //以下的第一个if判断是用于协助景点语言配置的相关模态框的出现
          if (this.sign === 'scenery') {

            this.$store.state.chooseParam999 = true

          } else if (this.sign === 'scenerySpot') {

            this.$store.state.chooseParam999Spot = true

          } else if (this.sign === 'sceneryFacility') {

            this.$store.state.chooseParam999Facility = true

          }

          //以下的if判断是用于协助图层管理的相关多层模态框的显示出现
          if (this.eventParam == '2') {
            // alert('进房间2')
            this.$store.state.chooseParam2 = true
          } else if (this.eventParam == '3') {
            // alert('进房间3')
            this.$store.state.chooseParam4 = true
          }


        }
      },

      //A2新增团方法函数
      addNewGroupFn() {
        this.$store.state.titleHeader = '新增'
        this.$emit('addBeforeClear')
      },

      //A2编辑团方法函数
      editorGroupFn() {
        this.$store.state.titleHeader = '编辑'
        if (this.$store.state.isSuccessGetEditInfo) {

          if (this.sign === 'sceneryGroupPersonList2') {
            this.$store.state.sceneryGroupPersonList2 = true
          } else if (this.sign === 'sceneryGroupPersonList2222') {
            this.$store.state.sceneryGroupPersonList2222 = true
          }

          this.$store.state.isSuccessGetEditInfo = false
        } else {
          this.$message.warning('请先选择需要编辑的数据行')
        }

      },

      //A2关闭旅游团方法函数（即删除）
      closeTouristGroupFn() {

        this.$confirm('您将执行' + '关闭旅行团' + '操作, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$emit('closeTouristGroupFn')

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });

      },


      //批量删除方法函数
      moreDeleteFunction() {
        alert('确定执行批量删除吗')
      },

      //在查询筛选的时候选择了所属区域后，将相应的值赋值到input框内
      intoInputAreaName(n) {
        console.log(n)
        this.allParams.areaId = n.id
        this.allParams.areaName = n.name

      },
      //在查询筛选的时候选择了所属景区后，将相应的值赋值到input框内
      intoInputSceneryName(n) {
        console.log(n)
        this.allParams.affiliatedSceneryId = n.id
        this.allParams.affiliatedScenery = n.name

      },

      //所属区域input框获取焦点是打开区域选择模态框
      openAreaDialog() {
        this.$store.state.editorOrSearch = '查询'
        console.log(this.$store.state.editorOrSearch)
        this.$emit('openAreaDialog')
      },
      //所属景区input框获取焦点是打开景区选择模态框
      openSceneryDialog() {
        this.$store.state.editorOrSearch = '查询'
        console.log(this.$store.state.editorOrSearch)
        this.$emit('openSceneryDialog')
      },
      //确认消息事件
      sureMessageEvent() {
        this.$emit('sureMessage')
      },
      //打开求救处理模态框
      openSosDisposeDialog() {
        this.$store.state.sosDisposeSign = true
      },
      //打开景区详情列表模态框
      openMyTableDialog() {
        if (this.sign === 'scenery') {
          this.$store.state.tablesDialogTitle = '景区详情'
        } else if (this.sign === 'scenerySpot') {
          this.$store.state.tablesDialogTitle = '景点详情'
        }
        this.$store.state.isShowTablesDialog = true
      },
      //打开调整归属于哪个旅行社模态框事件
      openAlterTourCompanyDialog() {
        this.$store.state.tourGroupManageSign = true
      },

      //打开关联导游模态框
      openGuideRelevanceDialog() {
        this.$store.state.guideRelevanceSign = true
      },
      //取消导游关联
      cancelGuideRelation() {
        this.$confirm('您将执行' + '取消关联' + '操作, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$emit('cancelRelationTravelAgency')

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });
      },

      //发布消息
      messagePublish() {
        this.$confirm('您将执行' + '消息发布' + '操作, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (this.sign === 'messageSign') {
            this.$emit('messagePublish')
          } else if (this.sign === 'resourcebundlemanageSign') {
            this.$emit('publishResourceInfo')
          }


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });
      },

      //取消发布消息
      messageCancelPublish() {
        this.$confirm('您将执行' + '取消消息发布' + '操作, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$emit('messageCancelPublish')

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });
      },

      //打开终端更新情况模态框事件
      openUpdateInfoDialog() {
        this.$emit('openUpdateInfoDialog')
      },

      //触发同步到redis函数
      uploadRedisFunction() {
        this.$emit('uploadRedis')
      },

      //打开操作员管理授权模态框
      openOperatorImpowerDialog() {
        // this.$store.state.operatorImpowerSign = true
        this.$emit('impowerInfo')
      },
      //打开授权景区模态框事件
      openImpowerSceneryDialog() {
        // this.$store.state.impowerScenerySign = true
        this.$emit('getChooseImpowerScenery')
      },
      //打开角色授权模态框
      openRoleImpowerDialog() {
        // this.$store.state.roleImpowerSign = true
        this.$emit('getChooseRoleInfos')
      },
      //打开角色功能授权模态框
      openRoleFunctionImpowerDialog() {
        this.$emit('getChooseFunctionInfos')
        // this.$store.state.roleFunctionImpowerSign = true
      },
      //景区下拉筛选框事件
      selectChange1() {
        // console.log('选择下拉内容')
      },

      //清空行程信息
      clearTravelInfosFn(){

        this.$confirm('您将' + '清空所有行程信息' + ', 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$emit('clearTravelInfos')

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });

      },

      //清空警报信息
      clearAlertInfosFn(){

        this.$confirm('您将' + '清空所有警报信息' + ', 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$emit('clearAlertInfos')

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });

      },


      //导入设备信息之前先获取对应excel模板
      getExcel() {
        this.$emit('getExcel')
        var downloadBtn = document.getElementById('downloadBtn')
        downloadBtn.click()
      },

      //下载模板获取表格链接后，触发按钮自动点击事件
      // clickBtnFn(){
      //   alert('tomi')
      //   var downloadBtn = document.getElementById('downloadBtn')
      //   downloadBtn.click()
      // },


      //导入设备信息
      importf(obj) {
        console.log('开始导入XX')
        this.$emit('importf')

      },
      //导出设备信息
      exportInfo() {
        console.log('开始导出信息')
        this.$emit('exportInfo')
      },
      //打印页面内容
      printPage() {
        window.print()
      },
      //时间控件的对应事件
      startDateChoose() {
        console.log('开始日期', this.allParams.startTime)
      },
      endDateChoose() {
        console.log('结束日期', this.allParams.endTime)
      },
      //启用禁用弹出框
      isEnabledDisabled(n) {
        this.$confirm('您将执行' + n + '操作, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (!this.sceneryLanguageSetTwoEventParam) {
            if (n == '启用') {
              this.$emit('enableInfo')
            } else if (n == '禁用') {
              this.$emit('disableInfo')
            }
          } else {
            if (n == '启用') {
              this.$emit('enableInfoX')
            } else if (n == '禁用') {
              this.$emit('disableInfoX')
            }
          }


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });
      },

      //弃用弹出框
      isAbandonR(n) {
        this.$confirm('您将执行' + '弃用' + '操作, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$emit('abandonInfo')

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });
      },

      //操作员管理重置密码弹出框
      updateResetPassword(n) {
        this.$confirm('您将执行' + '重置密码' + '操作, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$emit('resetPasswordInfo')

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });
      },

      //具体选择展示用户日志，操作员日志还是业务日志
      chooseShowLog(n) {
        // alert(n)
        if (n == '用户日志') {
          this.$store.state.userOrOperatorOrbusinessLog = 1
        } else if (n == '操作员日志') {
          this.$store.state.userOrOperatorOrbusinessLog = 2
        } else if (n == '业务日志') {
          this.$store.state.userOrOperatorOrbusinessLog = 3
        }
        this.$emit('getDefaultInfo')
      },
      //认证、取消认证弹出框
      isEnabledDisabledSss(n) {
        this.$confirm('您将执行' + n + '操作, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          if (n == '资格认证') {
            this.$emit('enableInfoSss')
          } else if (n == '取消认证') {
            this.$emit('disableInfoSss')
          }

          // this.$message({
          //   type: 'success',
          //   message: n+'成功!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });
      },
      //点击围栏提示语设置按钮弹出围栏提示框
      openRailTipDialog() {
        this.$emit('railTips')
      },

      //点击打开景区管理里面的景区范围按钮的对应模态框
      openSceneryScopeDialog() {
        this.$store.state.sceneryScopeSign = true
        this.$emit('openSceneryScopeMap')
      },

      //一键关机指令
      shutDownFunction() {
        this.$confirm('确认关闭' + this.$store.state.shutDownSceneryName + '景区的所有设备吗？' + '操作, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$emit('shutDownTips')

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });

      },

      //点击图层管理按钮后弹出图层管理详情模态框
      coverageManageFunction() {
        this.$emit('openCoverageManageDialog')
      },

      //点击语言配置按钮后弹出语言配置详情模态框
      openLanguageSetDialog() {
        this.$emit('openLanguageSetDialog')
      },

      //点击资源打包按钮，弹出具体打包资源详情模态框
      infosPackFunction() {
        // alert('开始触发资源打包的模态框显示')
        this.$emit('infosPackFunction')

      },

      //点击查询按钮事件
      queryInfos() {

        // console.log(this.allParams.createGroupTime)


        this.$store.state.sceneryNameParam = this.allParams.sceneryName
        this.$store.state.scenerySpotNameParam = this.allParams.scenerySpotName
        this.$store.state.sceneryIdParam = this.allParams.affiliatedSceneryId
        this.$store.state.facilityTypeParam = this.allParams.facilitySort
        this.$store.state.facilityNameParam = this.allParams.facilityName
        this.$store.state.imeiNumParam = this.allParams.imei
        this.$store.state.codeMachineParam = this.allParams.codeMachine
        this.$store.state.rfidSerialNumParam = this.allParams.rfidSerialNum
        this.$store.state.rfidTypeParam = this.allParams.rfidType
        this.$store.state.isResetParam = this.allParams.reset
        this.$store.state.userTelParam = this.allParams.userTel
        this.$store.state.userSerialNumParam = this.allParams.userSerialNum
        this.$store.state.registerDateParam = this.allParams.registerDate
        this.$store.state.guideCardParam = this.allParams.guideSerialNum
        this.$store.state.guideTelParam = this.allParams.guideTel
        this.$store.state.affiliatedTourCompanyParam = this.allParams.affiliatedTourCompany
        this.$store.state.groupNumParam = this.allParams.groupNum
        this.$store.state.affiliatedSceneryRRRParam = this.allParams.affiliatedSceneryRRR
        this.$store.state.sosTimeParam = this.allParams.sosTime
        this.$store.state.messageHeaderParam = this.allParams.messageHeader
        this.$store.state.publishTypeParam = this.allParams.publishType
        this.$store.state.publishDateParam = this.allParams.publishDate
        this.$store.state.publishStateParam = this.allParams.publishState
        this.$store.state.publishStateKParam = this.allParams.publishStateK
        this.$store.state.serviceProviderNoParam = this.allParams.serviceProviderSerialNum
        this.$store.state.serviceProviderNameParam = this.allParams.serviceProviderName
        this.$store.state.serviceProviderLinkManParam = this.allParams.serviceProviderLinkMan

        this.$store.state.tourcompanyLinkManParam = this.allParams.personName
        this.$store.state.tourcompanyParam = this.allParams.tourCompanyName
        this.$store.state.loginNameParam = this.allParams.loginName
        this.$store.state.deptNameParam = this.allParams.deptName
        this.$store.state.editorScopeParam = this.allParams.editorScope
        this.$store.state.paramValueParam = this.allParams.paramValue
        this.$store.state.paramKeyParam = this.allParams.paramKey
        this.$store.state.operatorNameParam = this.allParams.operatorName
        this.$store.state.businessTypeParam = this.allParams.businessType
        this.$store.state.railNameParam = this.allParams.railName
        this.$store.state.versionParam = this.allParams.version
        this.$store.state.mediaFileSerialNumParam = this.allParams.mediaFileSerialNum
        this.$store.state.mediaFileNameParam = this.allParams.mediaFileName
        this.$store.state.coverageNameParam = this.allParams.coverageName
        this.$store.state.monthDateParam2 = this.allParams.monthDate


        this.$store.state.a2ChooseServiceProviderParam2 = this.allParams.a2ChooseServiceProvider
        // this.$store.state.isOnLineStateParam2 = this.allParams.isOnLineState

        this.$store.state.searchIfInfoParam2 = this.allParams.searchIfInfo
        this.$store.state.roadLineTypeParam2 = this.allParams.roadLineType
        this.$store.state.roadLineNameParam2 = this.allParams.roadLineName
        this.$store.state.alertTypeParam2 = this.allParams.alertType
        this.$store.state.touristGroup2Param2 = this.allParams.touristGroup2
        this.$store.state.travelInfoNameParam2 = this.allParams.travelInfoName

        this.$store.state.groupPersonTypeParam2 = this.allParams.groupPersonType
        this.$store.state.sexTypeParam2 = this.allParams.sexType

        this.$store.state.affiliatedAreaParamRRR = this.allParams.affiliatedAreaRRR


        if (this.allParams.updateState == '10') {
          this.$store.state.updateStateParam = ''
        } else {
          this.$store.state.updateStateParam = this.allParams.updateState
        }


        this.$store.state.roleNameParam = this.allParams.roleName//角色名称
        this.$store.state.jurisdictionTagParam = this.allParams.jurisdictionTag//权限标识

        //以下是判断建团时间的日期参数
        if (this.allParams.createGroupTime == '' || this.allParams.createGroupTime == null) {
          this.$store.state.startDatetimeParam = ''
          this.$store.state.endDatetimeParam = ''
        } else {
          this.$store.state.startDatetimeParam = this.allParams.createGroupTime[0]
          this.$store.state.endDatetimeParam = this.allParams.createGroupTime[1]
        }
        // console.log(this.$store.state.startDatetimeParam,this.$store.state.endDatetimeParam)

        //以下是判断A2搜索时间的日期参数
        if (this.allParams.createGroupTime2 == '' || this.allParams.createGroupTime2 == null) {
          this.$store.state.startDatetimeParam2 = ''
          this.$store.state.endDatetimeParam2 = ''
        } else {
          this.$store.state.startDatetimeParam2 = this.allParams.createGroupTime2[0]
          this.$store.state.endDatetimeParam2 = this.allParams.createGroupTime2[1]
        }


        //以下判断是客流量统计的日期参数
        if (this.allParams.visitDate == '' || this.allParams.visitDate == null) {
          this.$store.state.ridershipStartDatetimeParam = ''
          this.$store.state.ridershipEndDatetimeParam = ''
        } else {
          this.$store.state.ridershipStartDatetimeParam = this.allParams.visitDate[0]
          this.$store.state.ridershipEndDatetimeParam = this.allParams.visitDate[1]
        }

        //以下是判断sos统计的日期参数
        if (this.allParams.mySosDate == '' || this.allParams.mySosDate == null) {
          this.$store.state.mySosStartDatetimeParam = ''
          this.$store.state.mySosEndDatetimeParam = ''
        } else {
          this.$store.state.mySosStartDatetimeParam = this.allParams.mySosDate[0]
          this.$store.state.mySosEndDatetimeParam = this.allParams.mySosDate[1]
        }


        //以下是判断设备租用统计的日期参数
        if (this.allParams.rentTime == '' || this.allParams.rentTime == null) {
          this.$store.state.myRentStartDatetimeParam = ''
          this.$store.state.myRentEndDatetimeParam = ''
        } else {
          this.$store.state.myRentStartDatetimeParam = this.allParams.rentTime[0]
          this.$store.state.myRentEndDatetimeParam = this.allParams.rentTime[1]
        }

        // console.log(this.$store.state.ridershipStartDatetimeParam,this.$store.state.ridershipEndDatetimeParam)
        //以下这个代表音频视频类型
        if (this.allParams.mediaType == 0) {
          this.$store.state.mediaTypeParam = ''
        } else {
          this.$store.state.mediaTypeParam = this.allParams.mediaType
        }


        if (this.allParams.sceneryGrade == 0) {
          this.$store.state.sceneryGradeParam = ''
        } else {
          this.$store.state.sceneryGradeParam = this.allParams.sceneryGrade
        }
        this.$store.state.areaIdParam = this.allParams.areaId
        if (this.allParams.sceneryState == 2) {
          this.$store.state.sceneryStateParam = ''
        } else {
          this.$store.state.sceneryStateParam = this.allParams.sceneryState
        }
        if (this.allParams.touristState == 2) {
          this.$store.state.touristStateParam = ''
        } else {
          this.$store.state.touristStateParam = this.allParams.touristState
        }


        if (this.allParams.isOnLineState == 2) {
          this.$store.state.isOnLineStateParam2 = ''
        } else {
          this.$store.state.isOnLineStateParam2 = this.allParams.isOnLineState
        }


        if(this.allParams.allocationState == 2){
          this.$store.state.allocationStateParam2 = ''
        }else {
          this.$store.state.allocationStateParam2 = Number(this.allParams.allocationState)//A2的设备分配状态
        }


        //以下把页数归为第一页是为了避免用户选了后面的几页内容，但查询的数据又较少甚至只有一条数据时，出现无法显示对应页数的那个数据问题
        this.$store.state.pageNumParam = 1

        if (!this.isQueryInfosX) {
          this.$emit('queryInfos', this.allParams)
        } else {
          this.$store.state.pageNumParamX = 1
          this.$emit('queryInfosX', this.allParams)
        }


      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../common_css/scss_style";

  .title {
    /*
        border: 1px solid $blue;
    */
    color: $gray;
    font-size: $font18;
    text-align: left;
  }

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

  .function_btn_box {
    /*
        border:1px solid $blue;
    */
    margin-top: 15px;
  }

  .btn_box1 {
    border-bottom: 2px solid #f0eeec;
    padding: 5px 15px;
    text-align: left;
  }

  .btn_box1 > span {
    /*
        border-bottom:1px solid $gray;
    */
    color: $gray;
  }

  .btn_box2 {
    /*border:1px solid orange;*/
    /*margin: 10px 0;*/
    padding: 15px 20px;
    text-align: left;
  }

  .btn_box2 > div {
    /*
        border-bottom: 1px solid $gray;
    */
    display: inline-block;
    width: 0.8rem;
    min-width: 75px;
    text-align: center;
    color: $white;
    margin-right: 0.2rem;
    background-color: $orange;
    padding: 5px;
    border-radius: 5px;
  }

  .import {
    /*border:1px solid red;*/
    position: relative;
  }

  .import > input {
    /*border:1px solid blue;*/
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

</style>
