<template>
  <div id="baidu_map">

  </div>

</template>

<script>
  export default {
    name: "baidu-map2",
    data() {
      return {

        apiFacilityAmount: '/a2guider/home/queryCount ',//初始化设备数量接口
        apiAllFacilityInfo: '/a2guider/home/queryTerminalList',//默认获取设备所有信息
        // codeMachine: '',//查询设备机器码参数
        allDataArr: [],
        // allDataArr: [
        //   {
        //     LngBD09ll:'104.333333',
        //     LatBD09ll:'34.020306'
        //   },
        //   {
        //     LngBD09ll:'105.333223',
        //     LatBD09ll:'34.020316'
        //   },
        //   {
        //     LngBD09ll:'103.334333',
        //     LatBD09ll:'34.020406'
        //   },
        //   {
        //     LngBD09ll:'104.335333',
        //     LatBD09ll:'36.021306'
        //   },
        // ],//包含了在线及离线的数据坐标的所有数组
        onlinePoints: [],//景区状态下展示对应设备的坐标图片（在线）
        offlinePoints: [],//景区状态下展示对应设备的坐标图片（离线）
        sosPoints: [],//景区状态下展示对应sos的坐标图片（）
        myParam: '',

      }
    },
    methods: {

      //获取首页设备总数和在线数量
      getFacilityAmountInfos() {
        this.$axios(
          {
            method: 'post',
            url: this.apiFacilityAmount,
            data: {}
          }
        ).then(res => {
          console.log('是否返回设备数量', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.onLineCountA2 = res.data.value.onlineCount
            this.$store.state.facilityTotalA2 = res.data.value.totalCount
            this.$store.state.onlineCountPercentageA2 = res.data.value.onlineCountPercentage
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //获取首页设备的所有相关信息
      getAllFacilityInfos(n) {
        var that = this
        // alert(n)
        if (!n) {
          n = ''
        }
        this.$axios(
          {
            method: 'post',
            url: this.apiAllFacilityInfo + '?codeMachine=' + n,
            data: {}
          }
        ).then(res => {
          console.log('返回的设备信息数据总览', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.allDataArr = [...res.data.value]
            // this.allDataArr = [
            //   {
            //     LngBD09ll: '104.333333',
            //     LatBD09ll: '34.020306'
            //   },
            //   {
            //     LngBD09ll: '105.333223',
            //     LatBD09ll: '34.020316'
            //   },
            //   {
            //     LngBD09ll: '114.333333',
            //     LatBD09ll: '44.020306'
            //   },
            // ]
            this.map()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //默认执行初始化接口函数
      getAllInfos() {
        this.getFacilityAmountInfos()
        this.getAllFacilityInfos()
        // this.map()
      },


      map() {
        var that = this
        var map = new BMap.Map("baidu_map", {minZoom: 5, maxZoom: 18}); // 创建Map实例,设置地图允许的最小/大级别
        var point = new BMap.Point(this.$store.state.centerPointLngParam, this.$store.state.centerPointLatParam);
        map.centerAndZoom(point, this.$store.state.mapSizeParam);
        map.enableScrollWheelZoom();//启用滚轮放大缩小

        //在线图标
        var onlineIcon = new BMap.Icon("http://tomevideo.zhihuiquanyu.com/1578972759004.png", new BMap.Size(24, 24));
        //离线图标
        var offlineIcon = new BMap.Icon("http://tomevideo.zhihuiquanyu.com/1578972999246.png", new BMap.Size(24, 24));


        // 创建标注对象并添加到地图--在线图标
        var markers = [];
        for (let i = 0; i < this.allDataArr.length; i++) {


          var pOn = new BMap.Point(this.allDataArr[i].LngBD09ll, this.allDataArr[i].LatBD09ll);
          if (this.allDataArr[i].IsOnline == '1') {
            var markerOn = new BMap.Marker(pOn, {icon: onlineIcon});
          } else {
            var markerOn = new BMap.Marker(pOn, {icon: offlineIcon});
          }

          markers.push(markerOn);

          let myid = this.allDataArr[i].CodeMachine
          let CodeMachine = this.allDataArr[i].CodeMachine
          let Geo = this.allDataArr[i].Geo
          let Battery = this.allDataArr[i].Battery
          let Phone = this.allDataArr[i].Phone
          let GpsTime = this.allDataArr[i].GpsTime
          let OnlineTime = this.allDataArr[i].OnlineTime
          let status = this.allDataArr[i].IsOnline == '1' ? '在线' : '离线'

          //为小猫咪添加鼠标移入弹出信息框事件
          markerOn.addEventListener('mouseover', function () {
            var opts = {
              width: 160, // 信息窗口宽度
              height: 130, // 信息窗口高度
              // title: "设备信息", // 信息窗口标题
              enableMessage: true //设置允许信息窗发送短息
            };

            var infoWindow = new BMap.InfoWindow(
              "机器码：" +
              CodeMachine +
              "<br>" +
              "定位地址：" +
              Geo +
              "<br>" +
              "电量：" +
              Battery +
              "<br>" +
              "电话：" +
              Phone +
              "<br>" +
              "定位时间：" +
              GpsTime +
              "<br>" +
              "最后在线时间：" +
              OnlineTime +
              "<br>" +
              "状态：" +
              status +
              "<br>",
              opts
            ); // 创建信息窗口对象
            map.openInfoWindow(infoWindow, this.point);      // 打开信息窗口


          })
          //为小猫咪添加鼠标移出后关闭信息框事件

          markerOn.addEventListener('mouseout', function () {

            map.closeInfoWindow();      // 打开信息窗口


          })



        }
        //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
        var markerClusterer = new BMapLib.MarkerClusterer(map, {
          markers: markers,
          minClusterSize: 15,//
          maxZoom:16,//
          girdSize:60,//聚合数据时，以60像素为一个单元点，
          styles: [{
            // url: 'http://admin.zhihuiquanyu.com/Content/images/mark_gray3.png',
            url: 'http://tomevideo.zhihuiquanyu.com/1578973831768.png',
            // url:'../../static/logonew.png',
            size: new BMap.Size(36, 36),
            textSize:10,
            textColor:'#ffffff',
            // anchor:new BMap.Size(0, 0),
            // offset :new BMap.Size(0, 0),
          }]
        });

      }


    },


    mounted() {
      this.$store.state.isShowHomeCountParam = true
      this.$store.state.addparamsss = true
      this.getAllInfos()
    }
  }
</script>

<style scoped>

  #baidu_map {
    /*border:1px solid red;*/
  }

</style>
