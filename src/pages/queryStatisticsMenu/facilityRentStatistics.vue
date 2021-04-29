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
    <el-dialog title="请选择要重新统计的日期" :visible.sync="dialogVisible" width="30%">
      <el-date-picker style="width:100%"  value-format="yyyy-MM-dd" v-model="date" type="date" placeholder="选择日期">
      </el-date-picker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit"
          >确 定</el-button
        >
      </span>
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
      dialogVisible: false,
      date:'',
      loading: false,
      apiQuery: "/mis/terminalOrder/queryTerminalOrderCountList",
      apiFacilityRentInfos: "/mis/count/countTerminalTriggerDetail",
      aipRe: "/guider/terminalOrder/terminalOrderCount",
      formData: [
        {
          type: "select",
          label: "统计状态",
          model: "calcStatus",
          options: [
            {
              label: "全部",
              value: undefined,
            },
            {
              label: "统计中",
              value: 0,
            },
            {
              label: "已统计",
              value: 1,
            },
          ],
        },
        {
          type: "select",
          label: "游客类型",
          model: "type",
          options: [
            {
              label: "全部",
              value: undefined,
            },
            {
              label: "团客",
              value: 0,
            },
            {
              label: "散客",
              value: 1,
            },
          ],
        },
        {
          label: "景区",
          type: "select",
          model: "sceneryNo",
          placeholder: "请输入景区",
          options: [],
        },
        {
          label: "统计时间",
          type: "datePicker",
          model: "createDatetime",
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
          label: "重新统计",
          handle: this.re,
          icon: "el-icon-refresh-right",
        },
      ],
      tableCols: [
        {
          prop: "sceneryNo",
          label: "景区编号",
          align: "center",
        },
        {
          prop: "touristTeamNo",
          label: "团编号",
          // width: '100',
          formatter: (row) => !row.touristTeamNo && "未入团",
          align: "center",
        },
        {
          prop: "touristTeamCode",
          label: "组团码",
          // width: '100',
          align: "center",
        },
        {
          prop: "guideName",
          label: "导游姓名",
          width: "190",
          align: "center",
        },
        {
          prop: "guidePhone",
          label: "导游手机",
          width: "190",
          align: "center",
        },
        {
          prop: "readyCount",
          label: "使用数量",
          width: "100",
          align: "center",
        },
        {
          prop: "startDatetime",
          label: "开始时间",
          width: "100",
          align: "center",
          formatter: (row) => row.startDatetime.split("00:00:00")[0],
        },
      ],
    };
  },
  mounted() {
    this.$store.state.isShowHomeCountParam = false;
    this.getSelect();
    this.getTableData();
  },
  methods: {
    re() {
      this.dialogVisible = true;
    },

    submit(){
       this.$axios({
        method: "post",
        url: "/guider/terminalOrder/terminalOrderCount",
        params:{ date: this.date }
      }).then((res) => {
       if (res.data.resultStatus.resultCode === "0000") {
         this.dialogVisible = false
       }
      });
    
    },

    // 测试远程搜索方法
    getSelect() {
      const index = this.formData.findIndex(
        (item) => item.model === "sceneryNo"
      );

      this.$axios({
        method: "post",
        url: "/mis/scenery/queryIndexDropDown",
      }).then((res) => {
        this.formData[index].options = res.data.value.map((v) => ({
          label: v.name,
          value: v.no,
        }));
      });
    },

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
            this.tableData = [...res.data.value.list];
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

    query(searchData) {
      // 将searchData中的时间数组转换为后台需要接收的格式
      if (searchData.createDatetime && searchData.createDatetime.length) {
        searchData.startDatetime = searchData.createDatetime[0];
        searchData.endDatetime = searchData.createDatetime[1];
        delete searchData.createDatetime;
      } else if (searchData.startDatetime || searchData.endDatetime) {
        delete searchData.startDatetime;
        delete searchData.endDatetime;
      }

      // 查询时 pageNum必须恢复为1
      this.searchData = searchData;
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
