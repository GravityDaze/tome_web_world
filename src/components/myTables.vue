<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      size="small"
      height="492px"
      max-height="492px"
      tooltip-effect="dark"
      highlight-current-row
      @row-click="handleSelectionChange">
      <el-table-column
        fixed
        type="index"
        width="55">
      </el-table-column>
      <!--<el-table-column-->
      <!--label="语言"-->
      <!--width="60"-->
      <!--align="center"-->
      <!--v-if="isLanguage"-->
      <!--&gt;-->
      <!--<template slot-scope="scope">-->
      <!--<span>中文</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--以下有两个景区编号，是由于有的编号返回参数的字段不一致而存在的-->
      <el-table-column
        label="景区编号"
        width="80"
        align="center"
        class="my_hover"
        v-if="isScenerySerialNum"
      >
        <template slot-scope="scope">
          <span class="my_hover" @click="goToInfoPage(scope.$index,scope.row)"
                style="color: blue">{{ scope.row.no }}</span>
        </template>
      </el-table-column>
      <!--此处有两个景区编号，是由于有的编号返回参数的字段不一致而存在的，下面这个相对用的少-->
      <el-table-column
        label="景区编号"
        width="80"
        align="center"
        class="my_hover"
        v-if="isScenerySerialNumMore"
      >
        <template slot-scope="scope">
          <span class="my_hover">{{ scope.row.sceneryNo }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="景点编号"
        width="120"
        align="center"
        class="my_hover"
        v-if="isScenerySpotSerialNum"
      >
        <template slot-scope="scope">
          <span class="my_hover" @click="goToInfoPage(scope.$index,scope.row)"
                style="color: blue">{{ scope.row.no }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文件名"
        width="110"
        align="center"
        class="my_hover"
        v-if="isDownFileName"
      >
        <template slot-scope="scope">
          <span class="my_hover" @click="goToInfoPage(scope.$index,scope.row)" style="color: blue">{{ scope.row.fileName }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="用户编号"
        width="140"
        align="center"
        class="my_hover"
        v-if="isUserSerialNum"
      >
        <template slot-scope="scope">
          <span class="my_hover" @click="goToInfoPage(scope.$index,scope.row)"
                style="color: blue">{{ scope.row.no}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="游团编码"
        width="120"
        align="center"
        class="my_hover"
        v-if="isTourGroupSerialNum"
      >
        <template slot-scope="scope">
          <span class="my_hover" @click="goToInfoPage(scope.$index,scope.row)"
                style="color: blue">{{ scope.row.no}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="消息标题"
        width="140"
        align="center"
        class="my_hover"
        v-if="isMessageHeader"
      >
        <template slot-scope="scope">
          <span class="my_hover" @click="goToInfoPage(scope.$index,scope.row)" style="color: blue">{{ scope.row.titile }}</span>
        </template>
      </el-table-column>

      <template v-for="item in tableTitle">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :formatter="item.formatter"
          header-align="center">
        </el-table-column>
      </template>


      <el-table-column
        label="当前景区设备台数"
        width="140"
        align="center"
        class="my_hover"
        v-if="isSceneryFacilityAmount"
      >
        <template slot-scope="scope">
          <span class="my_hover" @click="goToInfoPage(scope.$index,scope.row)" style="color: blue">{{ scope.row.allCount }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发射源数(RFID/位置版)"
        align="center"
        class="my_hover"
        v-if="isRfidAmount"
      >
        <template slot-scope="scope">
          <span class="my_hover" @click="goToInfoPage(scope.$index,scope.row)" style="color: blue">{{ scope.row.allRfidCount }}/{{scope.row.allSiteCount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="启用数(RFID/位置版)"
        align="center"
        class="my_hover"
        v-if="isRfidEnabledAmount"
      >
        <template slot-scope="scope">
          <span class="my_hover"
                style="color: blue">{{ scope.row.enableRfidCount }}/{{scope.row.enableSiteCount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="禁用数(RFID/位置版)"
        align="center"
        class="my_hover"
        v-if="isRfidDisabledAmount"
      >
        <template slot-scope="scope">
          <span class="my_hover"
                style="color: blue">{{ scope.row.disableRfidCount }}/{{scope.row.disableSiteCount}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="安装位置"
        width="140"
        align="center"
        class="my_hover"
        v-if="isInstallPlace"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <!--<img v-for="item in scope.row.imgUrl" :src="item" alt=""-->
            <!--style="border:1px solid orange;width:200px;height: 100px;">-->
            <!--以上图片的展示是原来的实例，并且考虑到多张图片的展示，所以用了循环，下方是后来的数据，并且只考虑一张图片的情况-->
            <img :src="scope.row.installPictureUrl" alt=""
                 style="border:1px solid orange;width:250px;height: 200px;">

            <div slot="reference" class="name-wrapper">
              <!--<el-tag size="medium">{{ scope.row.installPlace }}</el-tag>-->
              <!--以上为原来的，以下为更改后的-->
              <el-tag size="medium">{{ scope.row.installLocation }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="图标"
        width="140"
        align="center"
        class="my_hover"
        v-if="isShowIconImage"
      >
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="right">
            <!--<img v-for="item in scope.row.imgUrl" :src="item" alt=""-->
            <!--style="border:1px solid orange;width:200px;height: 100px;">-->
            <!--以上图片的展示是原来的实例，并且考虑到多张图片的展示，所以用了循环，下方是后来的数据，并且只考虑一张图片的情况-->
            <img :src="scope.row.iconUrl" alt=""
                 style="border:1px solid orange;width:250px;height: 200px;">

            <div slot="reference" class="name-wrapper">
              <!--<el-tag size="medium">{{ scope.row.installPlace }}</el-tag>-->
              <!--以上为原来的，以下为更改后的-->
              <el-tag size="medium">{{ scope.row.iconUrl }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column
        label="音频"
        width="80"
        align="center"
        class="my_hover"
        v-if="isShowAudio"
      >
        <template slot-scope="scope">
          <span class="my_hover" @click="goToInfoPage(scope.$index,scope.row)"
                style="color: blue">{{ scope.row.audio }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="视频"
        width="80"
        align="center"
        class="my_hover"
        v-if="isShowVideo"
      >
        <template slot-scope="scope">
          <span class="my_hover" @click="goToInfoPage(scope.$index,scope.row)"
                style="color: blue">{{ scope.row.video }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访问次数" align="center" width="100" v-if="isTriggerAmount">
        <template slot-scope="scope">
          <span class="my_hover" style="color: blue"
                @click="goToInfoPage(scope.$index,scope.row)">{{scope.row.count}}</span>
        </template>
      </el-table-column>
      <el-table-column label="触发源(次)" align="center" width="100" v-if="isTriggerResourceTimes">
        <template slot-scope="scope">
          <span class="my_hover" style="color: red" @click="goToInfoPage(scope.$index,scope.row)">{{scope.row.triggerTimes}}</span>
        </template>
      </el-table-column>
      <el-table-column label="当日紧急呼救次数" align="center" v-if="isIntradaySosAmount">
        <template slot-scope="scope">
          <span class="my_hover" style="color: red"
                @click="goToInfoPage(scope.$index,scope.row)">{{scope.row.sosCount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否认证" align="center" width="100" v-if="isShowIdentification">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.authStatus=='1'">已认证</span>
          <span style="color: red" v-if="scope.row.authStatus=='0'">未认证</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" width="60" v-if="!isShowEnabled">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.status == 1">启用</span>
          <span style="color: red" v-if="scope.row.status == 0">禁用</span>
          <span style="color: blue" v-if="scope.row.status == 9">弃用</span>
        </template>
      </el-table-column>


      <!--此处针对A2的部分页面的启用禁用的参数status开头是大写S，而做的处理-->
      <el-table-column label="状态" align="center" width="60" v-if="isShowEnabled222">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.Status == 1">启用</span>
          <span style="color: red" v-if="scope.row.Status == 0">禁用</span>
          <span style="color: blue" v-if="scope.row.Status == 9">弃用</span>
        </template>
      </el-table-column>

      <!--此处针对A2的部分页面的启用禁用的参数status开头是大写S，而做的处理-->


      <el-table-column label="更新状态" align="center" width="60" v-if="isUpdateState">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.status == 1">待更新</span>
          <span style="color: red" v-if="scope.row.status == 0">已更新</span>
        </template>
      </el-table-column>

      <el-table-column label="是否可编辑" align="center" width="100" v-if="isShowIsEditor">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.edit=='1'">可编辑</span>
          <span style="color: red" v-if="scope.row.edit=='0'">不可编辑</span>
        </template>
      </el-table-column>
      <el-table-column label="发送状态" align="center" width="100" v-if="isShowSend">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.sendStatus=='0'">未发送</span>
          <span style="color: red" v-if="scope.row.sendStatus=='1'">已发送</span>
        </template>
      </el-table-column>
      <el-table-column label="计次状态" align="center" width="100" v-if="isShowRentTimesState">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.calcStatus=='1'">已计算</span>
          <span style="color: red" v-if="scope.row.calcStatus=='0'">未计算</span>
        </template>
      </el-table-column>
      <el-table-column label="SOS是否确认" align="center" width="100" v-if="isShowSosSure">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.isConfirm=='0'">未确认</span>
          <span style="color: red" v-if="scope.row.isConfirm=='1'">已确认</span>
        </template>
      </el-table-column>
      <el-table-column label="出行状态" align="center" width="100" v-if="isShowTravelState">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.status=='0'">出行中</span>
          <span style="color: red" v-if="scope.row.status=='1'">已完团</span>
        </template>
      </el-table-column>
      <!--发布状态-->
      <el-table-column label="发布状态" align="center" width="100" v-if="isShowPublish">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.status=='0'">未发布</span>
          <span style="color: blue" v-if="scope.row.status=='1'">待发布</span>
          <span style="color: black" v-if="scope.row.status=='2'">已发布</span>
          <span style="color: red" v-if="scope.row.status=='9'">已取消</span>
        </template>
      </el-table-column>
      <!--资源包发布状态-->
      <el-table-column label="发布状态." align="center" width="100" v-if="isShowPublishK">
        <template slot-scope="scope">
          <span style="color: blue" v-if="scope.row.status=='2'">待发布</span>
          <span style="color: black" v-if="scope.row.status=='3'">已发布</span>
          <span style="color: red" v-if="scope.row.status=='9'">已过期</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('singleText.handle')" align="center" width="160" v-if="isHandle">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="sign!='sign2222'"
          >编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDel(scope.$index, scope.row)"
            v-if="sign!='personManage2'"
          >删除
          </el-button>
        </template>
      </el-table-column>

      <!--以下这个操作是单独为A2的某些页面添加的-->
      <el-table-column :label="$t('singleText.handle')" align="center" width="160" v-if="isHandle222">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleLook(scope.$index, scope.row)"
          >查询轨迹
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div class="page_control" v-if="!isPagePageShow">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="$store.state.pageNumParam"
        :page-sizes="[ 5,10,50,100]"
        :page-size="$store.state.pageSizeParam"
        layout="total, sizes, prev, pager, next, jumper"
        :total="$store.state.totalParam"
      ></el-pagination>
    </div>
    <div class="page_control scenery_language_set_page_num" v-if="isPagePageShow">
      <el-pagination
        @size-change="handleSizeChangeX"
        @current-change="handleCurrentChangeX"
        :current-page="$store.state.pageNumParamX"
        :page-sizes="[ 8,10,50,100]"
        :page-size="$store.state.pageSizeParamX"
        layout="total, sizes, prev, pager, next, jumper"
        :total="$store.state.totalParamX"
      ></el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    name: "my-tables",
    data() {
      return {
        // pageParams: {
        //   pageSize: this.$store.state.pageSizeParam,//每页默认显示多少条数据
        //   pageNum: this.$store.state.pageNumParam,//当前是第几页的数据
        // },
      }
    },
    props: ['isPagePageShow', 'sign', 'tableTitle', 'tableData', 'isDownFileName', 'isUserSerialNum', 'isLanguage', 'isScenerySerialNum', 'isScenerySerialNumMore', 'isTourGroupSerialNum', 'isMessageHeader', 'isScenerySpotSerialNum', 'isSceneryFacilityAmount', 'isRfidAmount', 'isRfidEnabledAmount', 'isRfidDisabledAmount', 'isInstallPlace', 'isShowIconImage', 'isShowAudio', 'isShowVideo', 'isShowEnabled', 'isShowEnabled222', 'isUpdateState', 'isShowIsEditor', 'isShowSend', 'isTriggerResourceTimes', 'isIntradaySosAmount', 'isShowIdentification', 'isShowRentTimesState', 'isShowSosSure', 'isShowTravelState', 'isShowPublish', 'isShowPublishK', 'isHandle', 'isHandle222', 'isTriggerAmount'],

    methods: {
      //点击景区编号弹出对应景区详情模态框
      goToInfoPage(index, row) {
        console.log(this.sign, '点击了编号////', index, row)
        if (this.sign === 'scenery') {
          this.$store.state.tablesDialogTitle = '景区详情'
          this.$emit('getDefaultNewPageInfo', row.id)

        } else if (this.sign === 'scenerySpot') {
          this.$store.state.tablesDialogTitle = '景点详情'
          this.$emit('getDefaultNewPageInfo', row.id)

        } else if (this.sign === 'messageSign') {
          this.$store.state.tablesDialogTitle = '信息详情'
          this.$emit('getDefaultNewPageInfo', row.id)
          // this.$store.state.isShowMessageInfos = true

        } else if (this.sign === 'userManageSign') {
          this.$store.state.tablesDialogTitle = '用户管理详情'
          this.$emit('getDefaultNewPageInfo', row.id)
          // this.$store.state.isShowTablesDialog = true

        } else if (this.sign === 'tourGroupManage') {
          this.$store.state.tablesDialogTitle = '游团详情'
          // this.$store.state.isShowTablesDialog = true
          this.$emit('getDefaultNewPageInfo', row.id)

        } else if (this.sign === 'facilityStatistics') {
          // console.log(row)
          this.$store.state.tablesDialogTitle = row.sceneryName + '--设备统计'
          this.$emit('getDefaultNewPageInfo', row.sceneryNo)
        } else if (this.sign === 'rfidstatistics') {
          this.$store.state.tablesDialogTitle = row.sceneryName + '--发射源统计'
          this.$emit('getDefaultNewPageInfo', row.sceneryId)
        } else if (this.sign === 'sosstatistics') {
          this.$store.state.tablesDialogTitle = row.sceneryName + '--SOS统计'
          this.$emit('getDefaultNewPageInfo', row.sosIds)
        } else if (this.sign === 'rfidtriggerlog') {
          this.$store.state.tablesDialogTitle = '发射源明细--' + row.no
          this.$emit('getDefaultNewPageInfo', row.no)
        } else if (this.sign === 'facilityrentstatistics') {
          this.$store.state.tablesDialogTitle = '设备租用信息'
          this.$emit('getDefaultNewPageInfo', row)
        } else if (this.sign === 'mediaFileManageSign') {
          //此处是媒体文件管理
          console.log('媒体文件管理有跳转的下载链接地址吗', row.mediaFileUrl)
          // alert('即将跳转到媒体文件下载页面！')
          window.open(row.mediaFileUrl)

        }

      },

      handleSelectionChange(val) {
        if (!this.isPagePageShow) {
          console.log('当前行被点击了', val)
          this.$emit('chooseInfo', val)
        } else {
          // alert('点击获取的是+++二级列表行信息')
          this.$emit('chooseInfoX', val)
        }

      },
      handleEdit(index, row) {

        //A2后台管理系统用到此处方法
        console.log('A2要开始编辑了哦', index, row);
        if (this.sign === 'sceneryServiceProviderList2') {
          this.$store.state.sceneryServiceProviderListSign2 = true
          this.$emit('getEditorInfos', row)
        } else if (this.sign === 'sceneryScopeList2') {
          this.$store.state.sceneryScopeList2 = true
          this.$emit('getEditorInfos', row)
        } else if (this.sign === 'roleManage2') {
          this.$emit('getEditorInfos', row)
        } else if (this.sign === 'personManage2') {
          this.$emit('getEditorInfos', row)
        } else if (this.sign === 'areaManageList2') {
          this.$emit('getEditorInfos', row)
        } else if (this.sign === 'facilityInfo2') {
          this.$emit('getEditorInfos', row)
        } else if (this.sign === 'rfid2') {
          this.$emit('getEditorInfos', row)
        } else if (this.sign === 'siteRfid2') {
          this.$emit('getEditorInfos', row)
        } else if (this.sign === 'areaSceneryList2') {
          this.$emit('getEditorInfos', row)
        } else if (this.sign === 'areaFacilityInfo2') {
          this.$emit('getEditorInfos', row)
        } else if (this.sign === 'areaMemberInfo2') {
          this.$emit('getEditorInfos', row)
        }else if(this.sign === 'groupPersonInfo2'){
          this.$emit('getEditorInfos', row)
        }else if(this.sign === 'roadLineInfo2'){
          this.$emit('getEditorInfos', row)
        }else if(this.sign === 'roadLineScenerySpotInfo2'){
          this.$emit('getEditorInfos', row)
        }else if(this.sign === 'railInfo2'){
          this.$emit('getEditorInfos', row)
        }else if(this.sign === 'rfid2child'){
          this.$emit('getEditorInfos', row)
        }else if(this.sign === 'siteRfid2child'){
          this.$emit('getEditorInfos', row)
        }else if(this.sign === 'travelInfo2'){
          this.$emit('getEditorInfos', row)
        }


      },

      handleDel(index, row) {

        // console.log('A2要开始删除了', index, row);
        // if (this.sign != 'sign2222') {
        //   this.$emit('delListInfo', row)
        // } else {
        //   this.$emit('delListInfo2222', row)
        // }


        this.$confirm('您将执行' + '删除' + '操作, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {

          console.log('A2要开始删除了', index, row);
          if (this.sign != 'sign2222') {
            this.$emit('delListInfo', row)
          } else {
            this.$emit('delListInfo2222', row)
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });



      },


      handleLook(index, row) {
        console.log('A2要开始查询轨迹了', index, row);
        this.$emit('lookMapInfo', row)

      },

      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`, val);
        this.$store.state.pageNumParam = 1
        this.$store.state.pageSizeParam = val
        this.$emit('queryInfos')
      },
      //分页X
      handleSizeChangeX(val) {
        console.log(`每页 ${val} 条`, val);
        this.$store.state.pageNumParamX = 1
        this.$store.state.pageSizeParamX = val
        this.$emit('queryInfosX')
      },
      //当前页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.$store.state.pageNumParam = val
        this.$emit('queryInfos')
      },
      //当前页X
      handleCurrentChangeX(val) {
        console.log(`当前页: ${val}`);
        this.$store.state.pageNumParamX = val
        this.$emit('queryInfosX')
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
  @import "../common_css/scss_style";


</style>
