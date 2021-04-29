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
      :visible.sync="sceneryDialog"
      width="35%"
      append-to-body
      @closed="dialogClose('sceneryForm')"
    >
      <el-form :model="sceneryForm" ref="sceneryForm">
        <el-form-item label="景区名" label-width="120px">
          <el-input
            style="width: 300px"
            placeholder="请输入景区名称"
            v-model="sceneryForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属区域" label-width="120px">
          <el-cascader
            style="width: 300px"
            placeholder="请选择所属区域"
            v-model="areaValue"
            :props="{
              label: 'name',
              value: 'id',
              checkStrictly: true,
            }"
            :options="areaOptions"
            @change="handleChange"
          >
            <template slot-scope="{ node, data }">
              <span>{{ data.name }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item label="所属服务商" label-width="120px">
          <el-select
            style="width: 300px"
            v-model="sceneryForm.sceneryServiceId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in serviceOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="景区级别" label-width="120px">
          <div style="height: 40px; display: flex; align-items: center">
            <el-rate
              :texts="['1A景区', '2A景区', '3A景区', '4A景区', '5A景区']"
              show-text
              v-model="sceneryForm.level"
            ></el-rate>
          </div>
        </el-form-item>
        <el-form-item label="紧急电话" label-width="120px">
          <el-input
            style="width: 300px"
            placeholder="请输入紧急电话"
            v-model="sceneryForm.sosPhone"
          ></el-input>
        </el-form-item>
        <el-form-item label="经纬度" label-width="120px">
          <el-input
            style="width: 300px"
            placeholder="请输入经纬度"
            v-model="sceneryForm.lonLat"
          ></el-input>
        </el-form-item>
        <el-form-item label="景区地址" label-width="120px">
          <el-input
            style="width: 300px"
            placeholder="请输入景区地址"
            v-model="sceneryForm.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="景区链接" label-width="120px">
          <el-input
            style="width: 300px"
            placeholder="请输入景区链接"
            v-model="sceneryForm.url"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sceneryDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit('sceneryForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 查看景区详细信息 -->
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
                <el-form-item label="状态">
                  <span>{{ detailsForm.status === 1 ? "启用" : "禁用" }}</span>
                </el-form-item>
                <el-form-item label="景区名">
                  <span>{{ detailsForm.name }}</span>
                </el-form-item>
                <el-form-item label="所属服务商">
                  <span>{{ detailsForm.sceneryServiceName }}</span>
                </el-form-item>
                <el-form-item label="负责人">
                  <span>{{ detailsForm.chargeName }}</span>
                </el-form-item>
                <el-form-item label="经纬度">
                  <span>{{ detailsForm.lonLat }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ detailsForm.createDatetime }}</span>
                </el-form-item>
                <el-form-item label="更新时间">
                  <span>{{ detailsForm.updateDatetime }}</span>
                </el-form-item>
                <el-form-item label="位置版">
                  <span>{{ detailsForm.sifecount }}</span>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <el-form
                ref="detailsForm"
                :model="detailsForm"
                label-width="120px"
              >
                <el-form-item label="景区编号">
                  <span>{{ detailsForm.no }}</span>
                </el-form-item>
                <el-form-item label="所属区域">
                  <span>{{ detailsForm.areaName }}</span>
                </el-form-item>
                <el-form-item label="景区级别">
                  <span>{{ detailsForm.level + "A" }}</span>
                </el-form-item>
                <el-form-item label="负责人电话">
                  <span>{{ detailsForm.chargePhone }}</span>
                </el-form-item>
                <el-form-item label="求救人电话">
                  <span>{{ detailsForm.sosPhone }}</span>
                </el-form-item>
                <el-form-item label="创建者">
                  <span>{{ detailsForm.creator }}</span>
                </el-form-item>
                <el-form-item label="更新者">
                  <span>{{ detailsForm.updator }}</span>
                </el-form-item>
                <el-form-item label="RFID">
                  <span>{{ detailsForm.rfidcount }}</span>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          v-for="(item, index) in detailsTitle"
          :key="index"
          :name="item"
          :label="item"
        >
          <tables
            :tableData="detailsData"
            :tableCols="detailsCols"
            hidePagination
          />
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="infoDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- 景区语言配置模态框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="语言配置"
      :visible.sync="langConfigDialog"
      width="45%"
      append-to-body
    >
      <searchs @query="query" :searchBtn="langConfigBtn" />
      <tables
        :tableData="langConfigData"
        :tableCols="langConfigCols"
        hidePagination
      />
    </el-dialog>

    <!-- 景区语言配置新增或编辑模态框 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="langConfigDialogTitle"
      :visible.sync="langConfigFormDialog"
      width="30%"
      append-to-body
    >
      <el-form
        :model="langConfigForm"
        ref="langConfigForm"
        style="width: 400px"
      >
        <el-form-item label="语言" label-width="120px">
          <el-select
            v-model="langConfigForm.language"
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
        <el-form-item label="景区名" label-width="120px">
          <el-input
            placeholder="请输入景区名称"
            v-model="langConfigForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="景区地址" label-width="120px">
          <el-input
            type="textarea"
            placeholder="请输入景区地址"
            v-model="langConfigForm.address"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm('langConfigForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 打包模态框 -->
    <el-dialog
      :close-on-click-modal="false"
      title="打包"
      :visible.sync="packageDialog"
      width="30%"
      append-to-body
    >
      <el-form
        :model="packageForm"
        label-width="100px"
        :hide-required-asterisk="false"
      >
        <el-form-item label="语言">
          <span>{{ packageForm.language }}</span>
        </el-form-item>
        <el-form-item label="景区编号">
          <span>{{ packageForm.no }}</span>
        </el-form-item>
        <el-form-item label="景区名称">
          <span>{{ packageForm.name }}</span>
        </el-form-item>
        <template v-if="packageForm.resourcePackageInfo">
          <el-form-item label="资源包名">
            <span>{{ packageForm.resourcePackageInfo.name }}</span>
          </el-form-item>
          <el-form-item label="包大小">
            <span>{{ packageForm.resourcePackageInfo.size }}</span>
          </el-form-item>
          <el-form-item label="版本">
            <span>{{ packageForm.resourcePackageInfo.version }}</span>
          </el-form-item>
          <el-form-item label="打包者">
            <span>{{ packageForm.resourcePackageInfo.creator }}</span>
          </el-form-item>
          <el-form-item label="打包开始时间">
            <span>{{ packageForm.resourcePackageInfo.startDatetime }}</span>
          </el-form-item>
          <el-form-item label="打包完成时间">
            <span>{{ packageForm.resourcePackageInfo.endDatetime }}</span>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button
            type="primary"
            @click="packing"
            :disabled="packageText === '打包中'"
            >{{ packageText }}</el-button
          >
          <el-button v-if="packageForm.resourcePackageInfo && packageForm.resourcePackageInfo.status === 1" @click="packing(false)">重新打包</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import initPagination from "@/mixins/initPagination";
export default {
  name: "facility-rent-statistics",
  mixins: [initPagination],
  data() {
    return {
      loading: false,
      apiQuery: "/mis/scenery/query",
      areaApi: "/mis/area/queryDropDownAll",
      serviceApi: "/mis/sceneryService/queryDropDown",
      getInfoApu: "/mis/scenery/get",
      editApi: "/mis/scenery/edit",
      addApi: "/mis/scenery/add",
      disableApi: "/mis/scenery/disable",
      enableApi: "/mis/scenery/enable",
      shutDownApi: "/mis/scenery/shutDown",
      DetailsApi: "/mis/scenery/getDetails",
      detailsTitle: ["景点信息", "服务设施", "围栏信息", "发射源"],
      scenerySpotApi: "/mis/scenerySpots/queryByScenery", //景点接口
      facilitySpotApi: "/mis/facility/queryByScenery", //服务设施接口
      fenceApi: "/mis/electronicFence/queryByScenery", //围栏信息接口
      launchSourceApi: "/mis/launchSource/queryByScenery", //发射源接口
      queryLangConfig: "/mis/sceneryLang/query",
      enableConfigApi: "/mis/sceneryLang/enable",
      disableConfigApi: "/mis/sceneryLang/disable",
      addLangConfigApi: "/mis/sceneryLang/add",
      editLangConfigApi: "/mis/sceneryLang/edit",
      dialogTitle: "",
      sceneryDialog: false, //新增或编辑景区模态框
      infoDialog: false, //景区信息模态框
      showMore: false, //显示更多打包信息
      detailsForm: {},
      activeName: "first",
      sceneryId: "",
      langConfigDialogTitle: "编辑",
      areaOptions: [],
      areaValue: [], //区域值
      serviceOptions: [],
      packageForm: {}, //打包表单
      sceneryForm: {
        address: "",
        areaId: "",
        level: 0,
        lonLat: "",
        sosPhone: "",
        url: "",
        sceneryServiceId: "",
      },
      packageDialog: false,
      formData: [
        {
          label: "景区名称",
          model: "name",
          type: "input",
          placeholder: "请输入景区",
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
        {
          type: "select",
          label: "景区级别",
          model: "level",
          options: [
            {
              label: "全部",
              value: undefined,
            },
            {
              label: "1A",
              value: 1,
            },
            {
              label: "2A",
              value: 2,
            },
            {
              label: "3A",
              value: 3,
            },
            {
              label: "4A",
              value: 4,
            },
            {
              label: "5A",
              value: 5,
            },
          ],
        },
        {
          type: "cascader",
          label: "所属区域",
          model: "areaId",
          options: [],
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
          label: "景区编号",
          width: "120",
          align: "center",
          click: this.checkScenery,
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
          prop: "level",
          label: "景区级别",
          width: "100",
          align: "center",
          formatter: (row) => {
            if (row.level === null) {
              return "未知";
            }

            let n = "";
            for (let i = 0; i < row.level; i++) {
              n += "A";
            }
            return n;
          },
          type: "tag",
          tagType: (row) => {
            if (row.level === null) {
              return "warning";
            } else {
              return "success";
            }
          },
        },
        {
          prop: "chargeName",
          label: "负责人姓名",
          width: "100",
          align: "center",
        },
        {
          prop: "chargePhone",
          label: "负责人电话",
          width: "120",
          align: "center",
        },
        {
          prop: "sosPhone",
          label: "紧急呼救电话",
          width: "120",
          align: "center",
        },
        {
          prop: "areaName",
          label: "所属区域",
          width: "100",
          align: "center",
        },
        {
          prop: "address",
          label: "景区地址",
          align: "center",
        },
        {
          prop: "updateDatetime",
          label: "更新时间",
          width: "100",
          align: "center",
        },
        {
          prop: "updator",
          label: "更新者",
          width: "100",
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
          width: "220",
          btnList: [
            { type: "primary", label: "编辑", handle: this.editScenery },
            { label: "配置", handle: this.openLangConfig,disabled:row=>!row.status },
            { type: "danger", label: "关机", handle: this.shutDown,disabled:row=>!row.status },
          ],
        },
      ],
      detailsData: [],
      detailsCols: [],
      langConfigDialog: false,
      langConfigForm: {},
      langConfigFormDialog: false,
      langConfigCols: [
        {
          prop: "language",
          label: "语言",
          align: "center",
        },
        {
          prop: "name",
          label: "景区名称",
          align: "center",
        },
        {
          prop: "address",
          label: "景区地址",
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
          align: "center",
          type: "switch",
          change: this.handleLangConfigStatus,
        },
        {
          label: "操作",
          type: "button",
          align: "center",
          width: "150",
          btnList: [
            { type: "primary", label: "编辑", handle: this.editLangConfig },
            {
              type: "primary",
              label: "打包",
              handle: this.package,
            },
          ],
        },
      ],
      langConfigData: [],
      langConfigBtn: [
        {
          type: "primary",
          label: "新增",
          handle: this.addLangConfig,
        },
      ],
    };
  },
  mounted() {
    this.$store.state.isShowHomeCountParam = false;
    this.getTableData();
    // 获取区域
    this.getArea();
    this.getService();
  },
  computed: {
    packageText() {
      if (
        this.packageForm.resourcePackageInfo &&
        this.packageForm.resourcePackageInfo.status === 0
      ) {
        return "打包中";
      } else if (
        this.packageForm.resourcePackageInfo &&
        this.packageForm.resourcePackageInfo.status === 1
      ) {
        return "完成打包";
      } else {
        return "打包";
      }
    },
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

    // 获取区域
    getArea() {
      this.$axios({
        method: "post",
        url: this.areaApi,
      }).then((res) => {
        this.areaOptions = res.data.value[0].children;
        for (const v of this.formData) {
          if (v.type === "cascader") {
            v.options = res.data.value;
          }
        }
      });
    },

    // 获取服务商
    getService() {
      this.$axios({
        method: "post",
        url: this.serviceApi,
      }).then((res) => {
        this.serviceOptions = res.data.value;
      });
    },

    // 编辑景区
    editScenery(row) {
      this.dialogTitle = "编辑景区";
      this.sceneryDialog = true;
      this.$axios({
        method: "post",
        url: this.getInfoApu,
        params: { id: row.id },
      }).then((res) => {
        // 回填数据
        this.sceneryForm = res.data.value;
        // 获取区域视图数据
        this.areaValue = this.getValue(
          res.data.value.areaId,
          this.areaOptions,
          "id"
        );
      });
    },

    // 递归获取到层级
    getValue(id, data, prop) {
      const arrRes = [];
      const rev = (data, nodeId) => {
        for (let i = 0, length = data.length; i < length; i++) {
          const node = data[i];
          if (node[prop] === nodeId) {
            arrRes.unshift(node[prop]);
            return true;
          } else {
            if (node.children && node.children.length) {
              if (rev(node.children, nodeId)) {
                arrRes.unshift(node[prop]);
                return true;
              }
            }
          }
        }
        return false;
      };
      rev(data, id);
      return arrRes;
    },

    // 选择所属区域
    handleChange(value) {
      this.sceneryForm.areaId = value[value.length - 1];
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
      this.clearForm("sceneryForm");
      this.areaValue = "";
    },

    // 一键关机
    shutDown(row) {
      this.$confirm(
        `确认关闭<strong style="color:red">${row.name}</strong>的所有设备吗？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true,
        }
      ).then(() => {
        this.$axios({
          method: "post",
          url: this.shutDownApi,
          params: {
            id: row.id,
          },
        }).then((res) => {
          if (res.data.resultStatus.resultCode === "0000") {
            this.$message.success("已发送关机指令");
          } else {
            this.$message.error(res.data.resultStatus.resultMessage);
          }
        });
      });
    },

    // 查看景区
    checkScenery(row) {
      this.infoDialog = true;
      this.sceneryId = row.id;
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
    handleClick() {
      // 创建api接口与activeName的映射关系
      const apiList = new Map([
        [this.detailsTitle[0], this.scenerySpotApi],
        [this.detailsTitle[1], this.facilitySpotApi],
        [this.detailsTitle[2], this.fenceApi],
        [this.detailsTitle[3], this.launchSourceApi],
      ]);
      if (this.activeName !== "first") {
        this.$axios({
          method: "post",
          url: apiList.get(this.activeName),
          data: {
            pageNum: 1,
            pageSize: 10000,
            sceneryId: this.sceneryId,
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
            this.detailsCols = title;
            this.detailsData = res.data.value.list;
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
        url: this.dialogTitle === "编辑景区" ? this.editApi : this.addApi,
        data: this[form],
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.$message.success(
            this.dialogTitle === "编辑景区" ? "编辑成功" : "新增成功"
          );
          this.sceneryDialog = false;
          this.getTableData();
        } else {
          this.$message.error(res.data.resultStatus.resultMessage);
        }
      });
    },

    // 新增景区
    add() {
      this.dialogTitle = "新增景区";
      this.sceneryDialog = true;
    },

    // 清空sceneryForm
    clearForm(form) {
      for (let key in this[form]) {
        if (typeof this[form][key] === "number") {
          this[form][key] = 0;
        } else {
          this[form][key] = "";
        }
      }
    },

    // 语言配置
    openLangConfig(row) {
      this.langConfigDialog = true;
      this.sceneryId = row.id;
      this.querylangConfigList();
    },

    // 查询语言配置表格
    querylangConfigList() {
      this.$axios({
        method: "post",
        url: this.queryLangConfig,
        params: {
          sceneryId: this.sceneryId,
        },
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.langConfigData = res.data.value.map((v) => {
            v.status = !!v.status;
            return v;
          });
        } else {
          this.$message.error(res.data.resultStatus.resultMessage);
        }
      });
    },

    // 更改语言配置状态
    handleLangConfigStatus(row) {
      this.$axios({
        method: "post",
        url: row.status ? this.enableConfigApi : this.disableConfigApi,
        params: { id: row.id },
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.$message.info(res.data.resultStatus.resultMessage);
          // this.getTableData();
        } else {
          this.$message.info(res.data.resultStatus.resultMessage);
          this.querylangConfigList();
        }
      });
    },

    // 编辑语言配置
    editLangConfig(row) {
      this.langConfigDialogTitle = "编辑";
      this.langConfigForm = { ...row };
      this.langConfigFormDialog = true;
    },

    // 新增语言配置
    addLangConfig() {
      this.langConfigDialogTitle = "新增";
      this.clearForm("langConfigForm");
      this.langConfigFormDialog = true;
    },

    // 确认新增/修改配置
    confirm(form) {
      this.$axios({
        method: "post",
        url:
          this.langConfigDialogTitle === "编辑"
            ? this.editLangConfigApi
            : this.addLangConfigApi,
        data: { ...this[form], sceneryId: this.sceneryId },
      }).then((res) => {
        if (res.data.resultStatus.resultCode === "0000") {
          this.langConfigFormDialog = false;
          this.querylangConfigList();
        }
      });
    },

    // 打包
    package(row) {
      this.packageDialog = true;
      this.$axios({
        method: "post",
        url: "/mis/sceneryLang/packingInfo",
        params: { id: row.id },
      }).then((res) => {
        this.packageForm = res.data.value;
      });
    },

    packing(isRestart) {
      if (this.packageText === "完成打包" && isRestart) {
        return this.$axios({
          method: "post",
          url: "/mis/sceneryLang/affirmPack",
          data: {
            id: this.packageForm.id, //景区语言id
            packId: this.packageForm.resourcePackageInfo.id, //资源包id
          },
        }).then((res) => {
          if (res.data.resultStatus.resultCode === "0000") {
            this.$message.success("已确认打包");
            this.packageDialog = false;
          }
        });
      }

      this.$axios({
        method: "post",
        url: "/mis/sceneryLang/packing",
        params: { id: this.packageForm.id },
      }).then((res) => {
        console.log(res);
        if (res.data.resultStatus.resultCode === "0000") {
          this.$message.success("打包中,请稍后查看");
          this.package({ id: this.packageForm.id });
        }
      });
    },

    query(searchData) {
      console.log(searchData.areaId);
      this.searchData = { ...searchData };
      // 处理级联选择器的数据
      if (searchData.areaId) {
        this.searchData.areaId =
          searchData.areaId[searchData.areaId.length - 1];
      }
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
</style>
