<template>
  <div>
    <mySearchs
      :createGroupTime2="createGroupTime2"
      :serviceProviderName="serviceProviderName"
      :a2ChooseServiceProvider="a2ChooseServiceProvider"
      :a2ChooseServiceProviderArr="a2ChooseServiceProviderArr"
      :isExportDevice="isExportDevice"
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
    name: "area-reset-data-list",
    data() {
      return {
        sign: 'areaResetDataList2',
        apiQuery2: '/a2guider/count/areaResetCount',
        apiSceneryProviderDropDown: '/a2guider/travelGency/dropDown',
        createGroupTime2: true,
        serviceProviderName: true,
        a2ChooseServiceProvider: true,
        a2ChooseServiceProviderArr: [],
        isExportDevice: true,
        isShowEnabled: true,
        isHandle: false,
        // tableTitle: [
        //   {
        //     prop: 'travelGencyName',
        //     label: '景区服务商....',
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'count',
        //     label: '次数321',
        //     // width: '120',
        //     align: 'center'
        //   },
        //
        //
        // ],
        tableData: [
          // {
          //   "travelGencyName": "新疆矿山公园景区",
          //   "count": 38825
          //
          // }
        ]

      }
    },
    computed: {
      tableTitle: function () {
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
      this.getSceneryProviderDropDown()
    },
    methods: {

      //导出信息为excel格式表
      exportInfo() {

        var n = ''
        var k = ''
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "travelGencyID": this.$store.state.a2ChooseServiceProviderParam2,
              "travelGencyName": this.$store.state.serviceProviderNameParam,
              "startDatetime": this.$store.state.startDatetimeParam2,
              "endDatetime": this.$store.state.endDatetimeParam2,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('导出了什么玩意儿', res)

          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.totalParam = res.data.value.total
            // console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]
            // n = this.tableTitle
            n = this.tableTitle
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


      //获取景区服务商下拉列表信息
      getSceneryProviderDropDown() {
        this.$axios(
          {
            method: 'get',
            url: this.apiSceneryProviderDropDown,
            data: {}
          }
        ).then(res => {
          console.log('嚯嚯嚯：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.a2ChooseServiceProviderArr = [...res.data.value]
            // this.canChooseSceneryProviderArr = [...res.data.value]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },

      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "travelGencyID": '',
              "travelGencyName": '',
              "startDatetime": '',
              "endDatetime": '',
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam

            }
          }
        ).then(res => {
          console.log('获取的默认kkk返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            // console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },

      //添加条件查询或者翻页等获取列表信息方法
      queryInfos() {
        var that = this
        // alert('是否查询')
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "travelGencyID": this.$store.state.a2ChooseServiceProviderParam2,
              "travelGencyName": this.$store.state.serviceProviderNameParam,
              "startDatetime": this.$store.state.startDatetimeParam2,
              "endDatetime": this.$store.state.endDatetimeParam2,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('获取的默认kkk返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            // console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },
    }
  }
</script>

<style scoped>

</style>
