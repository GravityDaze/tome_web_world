<template>
  <div>
    <mySearchs
      :createGroupTime2="createGroupTime2"
      :alertType="alertType"
      :touristGroup2="touristGroup2"
      :touristGroup2DropDownList="touristGroup2DropDownList"
      :isExportDevice="isExportDevice"
      :isClearAlert="isClearAlert"
      @queryInfos="queryInfos"
      @clearAlertInfos="clearAlertInfos"
      @exportInfo="exportInfo"
    >
    </mySearchs>
    <myTables
      :sign="sign2"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowEnabled="isShowEnabled"
      :isHandle="isHandle"
      @queryInfos="queryInfos"
      @delListInfo2222="delListInfo2222"
    >
    </myTables>
  </div>
</template>

<script>

  import commonFn from '../../common_js/commonFn'


  export default {
        name: "alert-info",
      data() {
        return {
          sign:'groupPersonInfo2',
          sign2:'sign2222',//单纯为了操作栏不显示编辑
          apiQuery2: '/a2guider/alarm/query',
          apiDel2:'/a2guider/alarm/delete',
          apiClearAlertInfos:'/a2guider/alarm/clear',
          apiDropDownTouristTeam2: '/a2guider/touristTeam/dropDown',
          createGroupTime2: true,
          alertType: true,
          touristGroup2: true,
          isClearAlert:true,
          isExportDevice: true,
          isShowEnabled:true,
          isHandle:true,
          touristGroup2DropDownList: [
            {
              ID: '0',
              Name: '全部',

            },
            {
              ID: '1',
              Name: '旅游团',

            },
            {
              ID: '2',
              Name: '测试团',

            },
          ],
          tableTitle:[
            {
              prop: 'Content',
              label: '报警',
              // width: '120',
              align: 'center'
            },
            {
              prop: 'CodeMachine',
              label: '设备号',
              // width: '120',
              align: 'center'
            },

            {
              prop: 'MemberName',
              label: '游客名/电话',
              // width: '120',
              align: 'center',
              formatter: function(row){
                return row.MemberName +'/'+ row.MemberPhone
              }
            },

            {
              prop: 'GuiderName',
              label: '导游名/电话',
              // width: '120',
              align: 'center',
              formatter: function(row){
                return row.GuiderName +'/'+ row.GuiderPhone
              }
            },

            {
              prop: 'TouristTeamName',
              label: '旅游团',
              // width: '120',
              align: 'center'
            },
            {
              prop: 'CreateTime',
              label: '报警时间',
              // width: '120',
              align: 'center'
            },

          ],
          tableData:[
            // {
            //   "ID": 201069,
            //   "Content": "您的设备电量低于20%,请及时充电",
            //   "CodeMachine": "Q001024",
            //   "MemberName": "956680617073607",
            //   "MemberPhone": "20786202888",
            //   "GuiderName": "赤水",
            //   "GuiderPhone": "13244444444",
            //   "TouristTeamID": 4,
            //   "TouristTeamName": "赤水",
            //   "CreateTime": "2018-08-29 03:00:32"
            //
            // }
          ]

        }
      },
      mounted(){
        this.$store.state.pageNumParam=1
        this.$store.state.isShowHomeCountParam = false
        this.$store.state.isShowAlert = false
        this.$store.state.addparamsss = false
        this.getDropDownTouristTeamList()
        this.getDefaultInfo()
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
                "Type":this.$store.state.alertTypeParam2,
                "TouristTeamID":this.$store.state.touristGroup2Param2,
                "startDatetime":this.$store.state.startDatetimeParam2,
                "endDatetime":this.$store.state.endDatetimeParam2,
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


        //获取旅游团下拉数据列表方法函数
        getDropDownTouristTeamList() {
          this.$axios(
            {
              method: 'get',
              url: this.apiDropDownTouristTeam2,
              data: {}
            }
          ).then(res => {
            console.log(res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              this.touristGroup2DropDownList = [...res.data.value]
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          })

        },

        //点击删除按钮事件
        delListInfo2222(n){
          console.log('删除N信息是：',n)
          this.$axios(
            {
              method:'get',
              url:this.apiDel2 + '?ID=' + n.ID,
              data:{}
            }
          ).then(res => {
            console.log('A2删除',res.data)
            if(res.data.resultStatus.resultCode === '0000'){

              this.getDefaultInfo()

            }else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          })

        },

        //清空警报
        clearAlertInfos(){
          this.$axios(
            {
              method:'get',
              url:this.apiClearAlertInfos,
              data:{}
            }
          ).then(res => {
            console.log('清空警报',res.data)
            if(res.data.resultStatus.resultCode === '0000'){

              this.getDefaultInfo()

            }else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          })
        },


        getDefaultInfo() {
          this.$axios(
            {
              method: 'post',
              url: this.apiQuery2,
              data: {
                "Type":'',
                "TouristTeamID":'',
                "startDatetime":'',
                "endDatetime":'',
                "pageNum": 1,
                "pageSize": this.$store.state.pageSizeParam
              }
            }
          ).then(res => {
            console.log('A2rfid返回+', res.data)
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
                "Type":this.$store.state.alertTypeParam2,
                "TouristTeamID":this.$store.state.touristGroup2Param2,
                "startDatetime":this.$store.state.startDatetimeParam2,
                "endDatetime":this.$store.state.endDatetimeParam2,
                "pageNum": this.$store.state.pageNumParam,
                "pageSize": this.$store.state.pageSizeParam
              }
            }
          ).then(res => {
            if (res.data.resultStatus.resultCode === '0000') {
              console.log('返回的数据', res.data.value.list)
              if (res.data.value.length == '0') {
                this.tableData = []
                this.$store.state.totalParam = 0
              } else {
                this.tableData = [...res.data.value.list]
                this.$store.state.totalParam = res.data.value.total
              }

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
