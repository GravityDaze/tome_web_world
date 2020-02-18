<template>
  <div>
    <mySearchs
      :visitDate="visitDate"
      :affiliatedSceneryRRR="affiliatedSceneryRRR"
      @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isScenerySerialNum="isScenerySerialNum"
      :isShowEnabled="isShowEnabled"
      @queryInfos="queryInfos"
    ></myTables>
  </div>
</template>

<script>
  export default {
    name: "ridership-statistics",
    data() {
      return {
        apiQuery:'/mis/count/countPassengerFlow',
        visitDate: true,
        affiliatedSceneryRRR: true,
        isScenerySerialNum: false,
        isShowEnabled: true,
        tableTitle: [
          {
            prop: 'sceneryNo',
            label: '景区编号',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'sceneryName',
            label: '景区名称',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'date',
            label: '日期',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'passengerFlow',
            label: '当日游客数量(按登录用户记)',
            // width: '100',
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
      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "sceneryName":"",
              "startDatetime":"",
              "endDatetime":"",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('客流量统计返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]

            // console.log('赋值的数据', this.tableData)
            // that.$store.state.showLoading = false
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
              "sceneryName": this.$store.state.affiliatedSceneryRRRParam,
              "startDatetime":this.$store.state.ridershipStartDatetimeParam,
              "endDatetime":this.$store.state.ridershipEndDatetimeParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('客流量统计查询按钮返回的数据',res.data)
            this.tableData = [...res.data.value.list]
            this.$store.state.totalParam = res.data.value.total
            console.log('赋值的数据', this.tableData)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },
    }
  }
</script>

<style scoped>

</style>
