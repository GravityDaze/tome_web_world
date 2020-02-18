<template>
  <div>
    <mySearchs
      :monthDate="monthDate"
      @queryInfos="queryInfos"
    >
    </mySearchs>
    <!--<myTables-->
      <!--:sign="sign"-->
      <!--:tableTitle="tableTitle"-->
      <!--:tableData="tableData"-->
      <!--:isShowEnabled="isShowEnabled"-->
      <!--:isHandle="isHandle"-->
    <!--&gt;-->
    <!--</myTables>-->

    <div id="myChart"></div>
  </div>
</template>

<script>
  export default {
    name: "reset-amount-chart",
    data() {
      return {
        sign: 'resetAmountChart2',
        apiQuery2:'/a2guider/count/resetDayCount',
        monthDate: true,
        // serviceProviderName:true,
        isShowEnabled: true,
        isHandle: true,
        dayData:['01','02','03'],
        countData:['100','89','135']


      }
    },
    mounted(){
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.$store.state.isShowAlert = false
      this.$store.state.addparamsss = false
      this.getDefaultInfo()

    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({

          title: {
            text: '复位计次数据图表'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['复位次数']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // data: [
            //   '1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日', '16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日'
            // ]
            data:this.dayData
          },
          yAxis: {
            type: 'value'
          },

          series: [
            {
              name:'复位次数',
              type:'line',
              stack: '总量',
              // data:[
              //   120, 132, 101, 134, 90, 230, 210,120, 132, 1101, 1134, 890, 480, 960,690,
              //   1120, 932, 101, 134, 90, 230, 210,120, 132, 101, 134, 90, 230, 210,286,
              // ]
              data:this.countData
            },
          ]
        });
        window.addEventListener("resize", function() {
          // console.log(123213)
          myChart.resize();
        });
      },

      getDefaultInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              datetime:this.$store.state.monthDateParam2,
            }
          }
        ).then(res => {
          console.log('A2统计返回',res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.dayData=[]
            this.countData=[]

            if(res.data.value==null || res.data.value.length==='0'){

            }else {
              for(let i=0;i<res.data.value.length;i++){
                this.dayData.push(res.data.value[i].day)
                this.countData.push(res.data.value[i].count)
              }
            }

            this.drawLine()

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
              datetime:this.$store.state.monthDateParam2,
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            this.dayData=[]
            this.countData=[]

            if(res.data.value==null || res.data.value.length==='0'){

            }else {
              for(let i=0;i<res.data.value.length;i++){
                this.dayData.push(res.data.value[i].day)
                this.countData.push(res.data.value[i].count)
              }
            }

            this.drawLine()

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
#myChart{
  border:1px solid #999;
  width:100%;
  height: 6.2rem;
}
</style>
