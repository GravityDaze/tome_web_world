<template>
  <div>
    <searchs @query="query" :formData="formData" :searchBtn="searchBtn" />
    <tables
      :tableData="tableData"
      :tableCols="tableCols"
      :pagination="pagination"
      @sizeChange="sizeChange"
      @numChange="numChange"
      v-loading="loading"
    />
    <!-- 景区管理或新增模态框 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="scenerySpotDialog"
      width="30%"
      append-to-body
      @closed="dialogClose('scenerySpotForm')"
    >
      <el-form :model="scenerySpotForm" ref="scenerySpotForm">
        <el-form-item label="所属景区" label-width="120px">
          <el-select
            style="width: 300px"
            v-model="scenerySpotForm.sceneryId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in sceneryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="景点名" label-width="120px">
          <el-input
            style="width: 300px"
            placeholder="请输入景点名"
            v-model="scenerySpotForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="经纬度" label-width="120px">
          <el-input
            style="width: 300px"
            placeholder="请输入经纬度(如:103.539144,30.821696)"
            v-model="scenerySpotForm.lonLat"
          ></el-input>
        </el-form-item>
        <el-form-item label="景区地址" label-width="120px">
          <el-input
            style="width: 300px"
            placeholder="请输入景区地址"
            v-model="scenerySpotForm.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="发射源" label-width="120px">
          <el-tooltip
            class="item"
            effect="dark"
            :content="tag.no"
            placement="top-start"
            v-for="tag in scenerySpotForm.launchSourceList"
            :key="tag.id"
          >
            <el-tag closable @close="handleClose(tag)">
              {{ tag.no }}
            </el-tag>
          </el-tooltip>

          <el-button size="small" @click="addLaunchSource">+</el-button>
        </el-form-item>
        <el-form-item label="是否可展示" label-width="120px">
          <el-switch
            @change="scenerySpotForm.showType = showType ? 1 : 0"
            v-model="showType"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="scenerySpotDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit('scenerySpotForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 发射源模态框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="发射源"
      :visible.sync="launchSourceDialog"
      width="40%"
      append-to-body
    >
      <tables
        ref="table"
        compRef="launchSourceList"
        :tableData="launchSourceList"
        :tableCols="launchSourceCols"
        hidePagination
        v-loading="loading"
        :selectable="selectable"
        @selectionChange="selectLaunchSource"
        height="500"
        type="selection"
      />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="chooseLaunchSource">确定</el-button>
      </div>
    </el-dialog>

    <!-- 查看景点详细信息 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="infoDialog"
      append-to-body
      width="70%"
    >
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane name="first" label="景区信息">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form
                ref="detailsForm"
                :model="detailsForm"
                label-width="120px"
              >
                <el-form-item label="景区编号">
                  <span>{{ detailsForm.no }}</span>
                </el-form-item>
                <el-form-item label="景点名">
                  <span>{{ detailsForm.name }}</span>
                </el-form-item>
                <el-form-item label="景点地址">
                  <span>{{ detailsForm.address }}</span>
                </el-form-item>
                <el-form-item label="状态">
                  <span>{{ detailsForm.status === 1 ? "启用" : "禁用" }}</span>
                </el-form-item>
                <el-form-item label="创建者">
                  <span>{{ detailsForm.creator }}</span>
                </el-form-item>
                <el-form-item label="更新者">
                  <span>{{ detailsForm.updator }}</span>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form
                ref="detailsForm"
                :model="detailsForm"
                label-width="120px"
              >
                <el-form-item label="所属景区">
                  <span>{{ detailsForm.sceneryName }}</span>
                </el-form-item>
                <el-form-item label="经纬度">
                  <span>{{ detailsForm.lonLat }}</span>
                </el-form-item>
                <el-form-item label="发射源">
                  <span>{{ detailsForm.count }}</span>
                </el-form-item>
                <el-form-item label="是否可以演示">
                  <span>{{
                    detailsForm.showType === 1 ? "可展示" : "不可展示"
                  }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ detailsForm.createDatetime }}</span>
                </el-form-item>
                <el-form-item label="更新时间">
                  <span>{{ detailsForm.updateDatetime }}</span>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane name="launchSource" label="发射源">
          <tables
            :tableData="launchSourceDetailsData"
            :tableCols="launchSourceDetailsCols"
            hidePagination
            v-loading="loading"
            :selectable="selectable"
            @selectionChange="selectLaunchSource"
          />
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infoDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 景点配置信息 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="configDialog"
      append-to-body
      title="语言配置"
      width="60%"
    >
      <searchs @query="query" :formData="[]" :searchBtn="addLangConfig" />
      <tables
        :tableData="langConfigList"
        :tableCols="langConfigCols"
        hidePagination
        v-loading="loading"
        height="500"
      />
    </el-dialog>

    <!-- 景点配置模态框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="configFormDialog"
      append-to-body
      :title="configDialogTitle"
      :before-close="beforClose"
    >
      <el-form :model="configForm" ref="configForm" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="语言">
              <el-select
                v-model="configForm.language"
                placeholder="请选择语言类型"
              >
                <el-option
                  v-for="item in [
                    {
                      id: 'zh_CN',
                      name: '中文',
                    },
                    {
                      id: 'en_US',
                      name: 'English',
                    },
                  ]"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="景点名">
              <el-input v-model="configForm.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="景点链接">
              <el-input v-model="configForm.url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="景点地址">
              <el-input v-model="configForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10"
            ><el-form-item label="景点音频">
              <span>{{ configForm.audioName }}</span>
              <el-button size="small" @click="chooseMedia(1)">选择</el-button>
            </el-form-item></el-col
          >
          <el-col :span="10">
            <el-form-item label="景点视频">
              <span>{{ configForm.videoName }}</span>
              <el-button size="small" @click="chooseMedia(2)">选择</el-button>
            </el-form-item></el-col
          >
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10"
            ><el-form-item label="景点简介">
              <el-input
                type="textarea"
                v-model="configForm.describe"
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="10">
            <el-form-item label="景点介绍">
              <el-input
                type="textarea"
                v-model="configForm.introduction"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10"
            ><el-form-item label="景点图标">
              <Uploader
                :imageUrl="configForm.iconUrl"
                @success="(res) => $set(configForm, 'iconUrl', res.value.url)"
              /> </el-form-item
          ></el-col>
          <el-col :span="10">
            <el-form-item label="景点封面图">
              <Uploader
                :imageUrl="configForm.coverUrl"
                @success="(res) => $set(configForm, 'coverUrl', res.value.url)"
            /></el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="10"
            ><el-form-item label="景点图片">
              <Uploader
                :imageUrl="imageUrls"
                @success="
                  (res) => $set(configForm, 'imageUrls', [res.value.url])
                " /></el-form-item
          ></el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitConfig">确定</el-button>
      </div>
    </el-dialog>

    <!-- 媒体文件配置 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="mediaDialog"
      append-to-body
      title="媒体文件"
    >
      <searchs
        @query="queryMedia"
        :formData="mediaFormData"
        :searchBtn="mediaSearchBtn"
      />
      <tables
        :tableData="mediaList"
        :tableCols="mediaCols"
        hidePagination
        v-loading="loading"
        height="500"
        highlightCurrentRow
        @currentChange="selectMedia"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateMedia" type="primary">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Uploader from "@/components/Uploader";
import initPagination from "@/mixins/initPagination";
export default {
  mixins: [initPagination],
  components: {
    Uploader,
  },
  computed: {
    imageUrls() {
      if (this.configForm.imageUrls && this.configForm.imageUrls.length) {
        return this.configForm.imageUrls[0];
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      loading: false,
      apiQuery: "/mis/scenerySpots/query",
      sceneryApi: "/mis/scenery/queryChoose", //查询所属景区
      serviceApi: "/mis/sceneryService/queryDropDown",
      getInfoApu: "/mis/scenerySpots/get", //获取景点数据
      editApi: "/mis/scenerySpots/edit",
      addApi: "/mis/scenerySpots/add",
      disableApi: "/mis/scenerySpots/disable",
      enableApi: "/mis/scenerySpots/enable",
      DetailsApi: "/mis/scenerySpots/getDetails",
      launchSourceAllApi: "/mis/launchSource/queryChoose", // 所有发射源
      launchSourceApi: "/mis/launchSource/queryByScenery", //单个发射源接口
      launchSourceDetails: "/mis/launchSource/queryByScenerySpots", //该景点发射源详细信息
      langListApi: "/mis/scenerySpotsLang/query",
      enableLangApi: "/mis/scenerySpotsLang/enable",
      disableLangApi: "/mis/scenerySpotsLang/disable",
      langConfigFormApi: "/mis/scenerySpotsLang/get",
      langAddApi: "/mis/scenerySpotsLang/add",
      langEditApi: "/mis/scenerySpotsLang/edit",
      mediaListApi: "/mis/mediaFile/queryChoose",
      dialogTitle: "",
      configDialogTitle: "",
      sceneryOptions: [],
      scenerySpotDialog: false, //新增或编辑景区模态框
      launchSourceDialog: false, //发射源表格
      infoDialog: false, //景区信息模态框
      showType: false, //是否可展示
      detailsForm: {},
      activeName: "first",
      id: "",
      scenerySpotForm: {
        sceneryId: "",
        lonLat: "",
        name: "",
        showType: 0, //是否可展示
        address: "",
        launchSourceList: [],
      },
      formData: [
        {
          label: "景区名称",
          model: "sceneryName",
          type: "input",
          placeholder: "请输入景区",
        },
        {
          label: "景点名称",
          model: "name",
          type: "input",
          placeholder: "请输入景点",
        },
        {
          type: "select",
          label: "状态",
          model: "status",
          options: [
            {
              label: "全部",
              value: undefined,
            },
            {
              label: "禁用",
              value: 0,
            },
            {
              label: "启用",
              value: 1,
            },
          ],
        },
      ],
      searchBtn: [
        {
          type: "primary",
          label: "查询",
          handle: this.query,
          icon: "el-icon-search",
        },
        {
          type: "primary",
          label: "新增",
          handle: this.add,
          icon: "el-icon-edit",
        },
      ],
      tableCols: [
        {
          prop: "no",
          label: "景点编号",
          width: "120",
          align: "center",
          click: this.checkScenerySpot,
          style: (row) => {
            return {
              color: "#409EFF",
              cursor: "pointer",
              "text-decoration": "underline",
            };
          },
        },
        {
          prop: "name",
          label: "景区名称",
          align: "center",
        },
        {
          prop: "sceneryName",
          label: "所属景区",
          align: "center",
        },
        {
          prop: "address",
          label: "景点地址",
          width: "120",
          align: "center",
        },
        {
          prop: "lonLat",
          label: "经纬度",
          align: "center",
        },
        {
          prop: "updator",
          label: "更新者",
          width: "100",
          align: "center",
        },
        {
          prop: "updateDatetime",
          label: "更新时间",
          align: "center",
        },
        {
          prop: "status",
          label: "状态",
          width: "100",
          align: "center",
          type: "switch",
          change: this.handleStatus,
        },
        {
          label: "操作",
          type: "button",
          align: "center",
          width: "180",
          btnList: [
            { type: "primary", label: "编辑", handle: this.editScenerySpot },
            { label: "配置", handle: this.openConfigDialog },
          ],
        },
      ],
      launchSourceCols: [
        {
          prop: "no",
          label: "发射源编号",
          align: "center",
        },
        {
          prop: "name",
          label: "发射源名称",
          align: "center",
        },
        {
          prop: "type",
          label: "发射源类型",
          align: "center",
          formatter: (row) => (row.type === 1 ? "发射源" : "位置版"),
        },
        {
          prop: "radius",
          label: "播放半径",
          align: "center",
        },
        {
          prop: "installLocation",
          label: "安装位置",
          align: "center",
        },
        {
          prop: "isReset",
          label: "是否复位源",
          align: "center",
          formatter: (row) => (row.isReset === 1 ? "是" : "否"),
        },
      ],
      launchSourceList: [], //发射源列表
      launchSourceData: [], //发射源列表中选中的数据
      launchSourceDetailsCols: [],
      launchSourceDetailsData: [],
      detailsData: [],
      detailsCols: [],
      launchSourceSearchs: {
        name: "",
        no: "",
      },
      configDialog: false, //配置模态框
      langConfigList: [], //语言配置表格数据
      langConfigCols: [
        {
          prop: "sceneryName",
          label: "所属景区",
          align: "center",
        },
        {
          prop: "scenerySpotsNo",
          label: "景点编号",
          align: "center",
        },
        {
          prop: "language",
          label: "语言",
          align: "center",
        },
        {
          prop: "name",
          label: "景点名称",
          align: "center",
        },
        {
          prop: "address",
          label: "景点地址",
          align: "center",
        },
        {
          prop: "updator",
          label: "最后更新者",
          align: "center",
        },
        {
          prop: "updateDatetime",
          label: "最后更新时间",
          align: "center",
        },
        {
          prop: "status",
          label: "状态",
          width: "100",
          align: "center",
          type: "switch",
          change: this.handleLangStatus,
        },
        {
          label: "操作",
          type: "button",
          align: "center",
          width: "100",
          btnList: [
            { type: "primary", label: "编辑", handle: this.editConfig },
          ],
        },
      ], //语言配置表头
      addLangConfig: [
        {
          type: "primary",
          label: "新增",
          handle: this.addConfig,
          icon: "el-icon-edit",
        },
      ], //语言配置表单
      configFormDialog: false,
      configForm: {
        imageUrls: [],
      },
      mediaDialog: false, //媒体文件对话框
      mediaCols: [
        {
          prop: "no",
          label: "媒体文件编号",
          align: "center",
        },
        {
          prop: "type",
          label: "媒体类型",
          align: "center",
          formatter: (row) => (row.type === 1 ? "音频" : "视频"),
        },
        {
          prop: "name",
          label: "媒体文件名称",
          align: "center",
        },
        {
          prop: "fileName",
          label: "文件名",
          align: "center",
        },
        {
          prop: "fileSize",
          label: "文件大小",
          align: "center",
        },
      ],
      mediaList: [],
      mediaFormData: [
        {
          label: "景区名称",
          model: "name",
          type: "input",
          placeholder: "请输入景区",
        },
      ],
      mediaSearchBtn: [
        {
          type: "primary",
          label: "查询",
          handle: this.queryMedia,
          icon: "el-icon-search",
        },
      ],
      currentMediaInfo: {}, //当前媒体信息
    };
  },
  mounted() {
    this.$store.state.isShowHomeCountParam = false;
    this.getTableData();
    this.getScenery();
    this.getLaunchSource();
  },
  methods: {
    //获取默认列表信息方法
    getTableData() {
      this.loading = true;
      var that = this;
      this.$axios({
        method: "post",
        url: this.apiQuery,
        data: {
          ...this.searchData,
          pageNum: this.pagination.num,
          pageSize: this.pagination.size,
        },
      })
        .then((res) => {
          if (res.data.resultStatus.resultCode === "0000") {
            this.loading = false;
            this.tableData = res.data.value.list.map((v) => {
              // 将0和1转换为布尔值
              v.status = !!v.status;
              return v;
            });

            this.pagination.total = res.data.value.total;
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage);
            this.tableData = [];
            this.pagination.total = 0;
            this.loading = false;
          }
        })
        .catch((error) => {
          this.tableData = [];
          this.pagination.total = 0;
          this.loading = false;
        });
    },

    // 获取景区
    getScenery() {
      this.$axios({
        method: "post",
        url: this.sceneryApi,
        params: {
          sceneryName: "",
        },
      }).then((res) => {
        this.sceneryOptions = res.data.value;
      });
    },

    // 删除发射源tag
    handleClose(tag) {
      this.scenerySpotForm.launchSourceList = this.scenerySpotForm.launchSourceList.filter(
        (v) => v.id !== tag.id
      );
    },

    // 获取发射源列表
    getLaunchSource() {
      this.$axios({
        method: "post",
        url: this.launchSourceAllApi,
        data: this.launchSourceSearchs,
      }).then((res) => {
        this.launchSourceList = res.data.value;
      });
    },

    // 发射源表格禁用规则
    selectable(row) {
      return !this.scenerySpotForm.launchSourceList.some(
        (v) => v.id === row.id
      );
    },

    // 选择发射源
    selectLaunchSource(val) {
      this.launchSourceData = val.map((v) => ({
        no: v.no,
        id: v.id,
      }));
    },

    // 确认发射源
    chooseLaunchSource() {
      this.scenerySpotForm.launchSourceList.push(...this.launchSourceData);
      this.launchSourceDialog = false;
      this.launchSourceData = [];
      const { table } = this.$refs;
      table.$refs.launchSourceList.clearSelection();
    },

    // 打开编辑景点模态框
    editScenerySpot(row) {
      this.dialogTitle = "编辑景点";
      this.scenerySpotDialog = true;
      this.$axios({
        method: "post",
        url: this.getInfoApu,
        params: { id: row.id },
      }).then((res) => {
        // 回填数据
        this.scenerySpotForm = { ...res.data.value };
        this.showType = !!this.scenerySpotForm.showType;
      });
    },

    // 添加发射源
    addLaunchSource() {
      this.launchSourceDialog = true;
    },

    // 更改状态
    handleStatus(row) {
      this.$axios({
        method: "post",
        url: row.status ? this.enableApi : this.disableApi,
        params: { id: row.id },
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.$message.info(res.data.resultStatus.resultMessage);
          // this.getTableData();
        } else {
          this.$message.info(res.data.resultStatus.resultMessage);
          this.getTableData();
        }
      });
    },

    // 对话框关闭回调
    dialogClose() {
      this.clearForm("scenerySpotForm");
      // 对可展示单独处理
      this.showType = false;
      this.scenerySpotForm.showType = 0;
    },

    // 查看景点
    checkScenerySpot(row) {
      this.infoDialog = true;
      this.id = row.id;
      // 通过activeName重新执行对应方法
      this.handleClick();
      this.$axios({
        method: "post",
        url: this.DetailsApi,
        params: {
          id: row.id,
        },
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.detailsForm = res.data.value;
        }
      });
    },

    // 处理景区详情对话框的点击事件
    handleClick(row) {
      if (this.activeName !== "first") {
        this.$axios({
          method: "post",
          url: this.launchSourceDetails,
          params: {
            scenerySpotsId: this.id,
          },
        }).then((res) => {
          if (res.data.resultStatus.resultCode === "0000") {
            // 将后端传过来的表头数据转换为tables组件可接受的格式
            const title = [];
            for (let key in res.data.value.cnHeads) {
              title.push({
                prop: key,
                label: res.data.value.cnHeads[key],
                align: "center",
              });
            }
            // 赋值
            this.launchSourceDetailsCols = title;
            this.launchSourceDetailsData = res.data.value.list;
            this.$message({
              message: res.data.resultStatus.resultMessage,
              type:
                res.data.resultStatus.resultMessage === "success"
                  ? "success"
                  : "warning",
            });
          }
        });
      }
    },

    // 新增&编辑提交确认
    submit(form) {
      this.$axios({
        method: "post",
        url: this.dialogTitle === "编辑景点" ? this.editApi : this.addApi,
        data: {
          ...this[form],
          launchSourceIds: this.scenerySpotForm.launchSourceList.map(
            (v) => v.id
          ),
        },
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.$message.success(
            this.dialogTitle === "编辑景点" ? "编辑成功" : "新增成功"
          );
          this.scenerySpotDialog = false;
          this.getTableData();
        } else {
          this.$message.error(res.data.resultStatus.resultMessage);
        }
      });
    },

    // 新增景区
    add() {
      this.dialogTitle = "新增景区";
      this.scenerySpotDialog = true;
    },

    // 打开配置模态框
    openConfigDialog(row) {
      this.configDialog = true;
      this.scenerySpotsId = row.id;
      // 查询语言配置列表
      this.queryLangConfig(row.id);
    },

    beforClose() {
      this.configForm = {};
      this.configFormDialog = false;
    },

    // 提交配置
    submitConfig() {
      this.$axios({
        method: "post",
        url:
          this.configDialogTitle === "新增语言配置"
            ? this.langAddApi
            : this.langEditApi,
        data: {
          ...this.configForm,
          scenerySpotsId: this.scenerySpotsId
        },
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.$message.success("操作成功");
          this.configFormDialog = false;
          this.queryLangConfig( this.scenerySpotsId)
        }
      });
    },

    // 新增语言配置
    addConfig() {
      this.configDialogTitle = "新增语言配置";
      this.configFormDialog = true;
    },

    queryLangConfig(id) {
      this.$axios({
        method: "post",
        url: this.langListApi,
        params: {
          scenerySpotsId: id,
        },
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.langConfigList = res.data.value.map((v) => {
            v.status = !!v.status;
            return v;
          });
        }
      });
    },

    // 切换语言配置状态
    handleLangStatus(row) {
      this.$axios({
        method: "post",
        url: row.status ? this.enableLangApi : this.disableLangApi,
        params: { id: row.id },
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.$message.info(res.data.resultStatus.resultMessage);
        } else {
          this.$message.info(res.data.resultStatus.resultMessage);
          this.queryLangConfig(row.od);
        }
      });
    },

    // 点击表格中的编辑按钮
    editConfig(row) {
      this.configDialogTitle = "编辑语言配置";
      this.configFormDialog = true;
      this.langConfigId = row.id;
      this.$axios({
        method: "post",
        url: this.langConfigFormApi,
        params: {
          id: row.id,
        },
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          console.log(res.data.value);
          this.configForm = res.data.value;
        }
      });
    },

    // 打开音视频列表
    chooseMedia(type) {
      this.mediaDialog = true;
      this.mediaType = type;
      this.queryMediaList();
    },

    // 查询媒体列表
    queryMediaList(params = { name: "" }) {
      this.$axios({
        method: "post",
        url: this.mediaListApi,
        params,
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.mediaList = res.data.value.filter(
            (v) => v.type === this.mediaType
          );
        }
      });
    },

    // 查询媒体文件
    queryMedia(searchData) {
      this.queryMediaList({ name: searchData.name });
    },

    // 选择音视频
    selectMedia(row) {
      this.$message.success(`当前选择了${row.name}，请点击确认保存您的选择`);
      this.currentMediaInfo = { ...row };
    },

    // 确定所选音视频
    updateMedia() {
      this.mediaDialog = false;
      console.log(this.currentMediaInfo);
      if (this.currentMediaInfo.type === 1) {
        this.configForm.audioName = this.currentMediaInfo.name;
        this.configForm.audio = this.currentMediaInfo.id;
      } else {
        this.configForm.videoName = this.currentMediaInfo.name;
        this.configForm.video = this.currentMediaInfo.id;
      }
    },

    // 清空scenerySpotForm
    clearForm(form) {
      for (let key in this[form]) {
        if (typeof this[form][key] === "boolean") {
          this[form][key] = false;
        } else if (Array.isArray(this[form][key])) {
          this[form][key] = [];
        } else {
          this[form][key] = "";
        }
      }
    },

    query(searchData) {
      this.searchData = { ...searchData };
      // 查询时,num默认从1开始
      this.pagination.num = 1;
      this.getTableData();
    },
  },
};
</script>

<style>
.white_bg {
  text-align: left;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
