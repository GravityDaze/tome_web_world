<template>
  <div>
    <mySearchs
      :createGroupTime2="createGroupTime2"
      :isExportDevice="isExportDevice"
      :serviceProviderName="serviceProviderName"
      @queryInfos="queryInfos"
      @exportInfo="exportInfo"
    >
    </mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowEnabled="isShowEnabled"
      :isHandle="isHandle"
      @queryInfos="queryInfos"
    >
    </myTables>
  </div>
</template>

<script>
  import commonFn from '../../common_js/commonFn'


  export default {
    name: "reset-amount-list",
    data() {
      return {
        sign: 'resetAmountList2',
        serviceProviderName: true,
        createGroupTime2: true,
        isExportDevice: true,
        isShowEnabled: true,
        isHandle: false,
        apiQuery2: '/a2guider/count/resetCount',//默认查询获取信息接口

        // tableTitle: [
        //   {
        //     prop: 'travelGencyName',
        //     label: '景区服务商',
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'count',
        //     label: '次数',
        //     // width: '120',
        //     align: 'center'
        //   },
        // ],
        tableData: [
          // {
          //   count: '12',
          //   travelGencyName: '四姑娘景区服务商',
          // }
        ]
      }
    },
    computed: {
      tableTitle:function () {
        return   [
          {
            prop: 'travelGencyName',
            label: this.$t('resetAmountListInfo.sceneryProvider'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'count',
            label: this.$t('resetAmountListInfo.count'),
            // width: '120',
            align: 'center'
          },
        ]
      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.$store.state.isShowAlert = false
      this.$store.state.addparamsss = false
      this.getDefaultInfo()

    },
    methods: {
      getDefaultInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "travelGencyName": "",
              "startDatetime":  "",
              "endDatetime": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('A2统计返回',res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.totalParam = res.data.value.total
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
            url: this.apiQuery2,
            data: {
              "travelGencyName": this.$store.state.serviceProviderNameParam,
              "startDatetime":  this.$store.state.startDatetimeParam2,
              "endDatetime": this.$store.state.endDatetimeParam2,
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


      //导出信息为excel格式表
      exportInfo() {

        var n = ''
        var k = ''
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "travelGencyName": this.$store.state.serviceProviderNameParam,
              "startDatetime":  this.$store.state.startDatetimeParam2,
              "endDatetime": this.$store.state.endDatetimeParam2,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('导出了什么玩意儿',res)

          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.totalParam = res.data.value.total
            // console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]
            // n = this.tableTitle
            n= this.tableTitle
            k = this.tableData
            commonFn.exportExcel(n, k)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        })

        // var n = this.tableTitle
        // var k = this.tableData

        // commonFn.exportExcel(n, k)
      },

    }
  }
</script>

<style scoped>

</style>
