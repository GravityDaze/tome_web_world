<template>
  <div id="baidu_map">

  </div>
</template>

<script>
  export default {
    name: "baidu-map",
    data() {
      return {
        iconImei: '',//测试展示猫咪详情参数imei
        iconCustomerPhone: '',//测试展示猫咪详情参数游客手机号
        iconGuidePhone: '',//测试展示猫咪详情参数导游手机号
        iconIsOnLine: '',//测试展示猫咪详情参数是否在线
        iconPositionDateTime: '',//测试展示猫咪详情参数最后定位时间
        iconSosDatetime: '',//测试展示sos详情参数最后时间
        iconLonlat: '',//测试展示sos详情参数最后坐标
        iconTouristTeamNo: '',//测试展示猫咪详情参数旅游团编号
        iconType: '',//测试展示猫咪详情参数游客数据类型
        apiAllInfos: '/mis/index/queryCountry',//初始化默认获取全国状态下的相关信息接口
        apiSceneryInfos: '/mis/index/queryScenery',//
        apiClickCatIconGetInfos: '/mis/index/get',//点击设备图标，显示具体设备当前信息
        // onlinePoints: [
        //   {lng: 104.1, lat: 33},
        //   {lng: 105.2, lat: 34},
        //   {lng: 106.3, lat: 32},
        //   {lng: 107.4, lat: 35},
        // ],
        // offlinePoints: [
        //   {lng: 109.1, lat: 33},
        //   {lng: 118.2, lat: 34},
        //   {lng: 116.9, lat: 32},
        //   {lng: 117.8, lat: 35},
        // ],
        onlinePoints: [],//景区状态下展示对应设备的坐标图片（在线）
        offlinePoints: [],//景区状态下展示对应设备的坐标图片（离线）
        sosPoints: [],//景区状态下展示对应sos的坐标图片（）
        sceneryLonlatArr: [],//全国状态下展示景区的坐标图片
      }
    },
    methods: {
      map() {
        var that = this
        var map = new BMap.Map("baidu_map", {minZoom: 5, maxZoom: 18}); // 创建Map实例,设置地图允许的最小/大级别
        var point = new BMap.Point(this.$store.state.centerPointLngParam, this.$store.state.centerPointLatParam);
        map.centerAndZoom(point, this.$store.state.mapSizeParam);
        map.enableScrollWheelZoom();//启用滚轮放大缩小

        //在线图标
        var onlineIcon = new BMap.Icon("http://tomepicture.zhihuiquanyu.com/online-icon.png", new BMap.Size(34, 41));
        //离线图标
        var offlineIcon = new BMap.Icon("http://tomepicture.zhihuiquanyu.com/offline-icon.png", new BMap.Size(34, 41));
        //sos图标
        var sosIcon = new BMap.Icon(
          "http://tomepicture.zhihuiquanyu.com/SOS.png",
          new BMap.Size(34, 41),{imageSize:new BMap.Size(30,34)}
        );

        //合作景区图标
        var sceneryIcon = new BMap.Icon("http://tomepicture.zhihuiquanyu.com/layericon2.png", new BMap.Size(34, 41));

        if (!this.$store.state.showSceneryIconOrShowCatIcon) {
          // 创建标注对象并添加到地图--在线图标
          for (let i = 0; i < this.onlinePoints.length; i++) {
            var pOn = new BMap.Point(this.onlinePoints[i].lng, this.onlinePoints[i].lat);
            let myid = this.onlinePoints[i].id
            var markerOn = new BMap.Marker(pOn, {icon: onlineIcon});
            map.addOverlay(markerOn);
            markerOn.addEventListener('click', function () {
              var opts = {
                width: 240, // 信息窗口宽度
                height: 150, // 信息窗口高度
                title: "设备信息", // 信息窗口标题
                enableMessage: true //设置允许信息窗发送短息
              };

              that.$axios(
                {
                  method: 'post',
                  url: that.apiClickCatIconGetInfos,
                  data: {
                    "type": 1,
                    "id": myid
                  }
                }
              ).then(res => {
                console.log('点击猫咪设备后获取了哪些详情：', res.data)
                if (res.data.resultStatus.resultCode ==='0000') {
                  that.iconImei = res.data.value.terminal.imei
                  that.iconCustomerPhone = res.data.value.terminal.customerPhone
                  that.iconGuidePhone = res.data.value.terminal.guidePhone
                  // that.iconIsOnLine = res.data.value.terminal.isOnLine
                  that.iconIsOnLine = '在线'
                  that.iconPositionDateTime = res.data.value.terminal.positionDateTime
                  that.iconTouristTeamNo = res.data.value.terminal.touristTeamNo
                  that.iconType = res.data.value.terminal.type

                  var infoWindow = new BMap.InfoWindow(
                    "IMEI号：" +
                    that.iconImei +
                    "<br>" +
                    "游客手机号：" +
                    that.iconCustomerPhone +
                    "<br>" +
                    "导游手机号：" +
                    that.iconGuidePhone +
                    "<br>" +
                    "是否在线：" +
                    that.iconIsOnLine +
                    "<br>" +
                    "旅游团号：" +
                    that.iconTouristTeamNo +
                    "<br>" +
                    "最后定位时间：" +
                    that.iconPositionDateTime +
                    "<br>",
                    opts
                  ); // 创建信息窗口对象
                  map.openInfoWindow(infoWindow, this.point);      // 打开信息窗口
                }else {
                  this.$message.warning(res.data.resultStatus.resultMessage)
                }

              }).catch(error => {

              })


            })

          }
          // 创建标注对象并添加到地图--离线图标
          for (let i = 0; i < this.offlinePoints.length; i++) {
            var pOff = new BMap.Point(this.offlinePoints[i].lng, this.offlinePoints[i].lat);
            let myid = this.offlinePoints[i].id
            var markerOff = new BMap.Marker(pOff, {icon: offlineIcon});
            map.addOverlay(markerOff);
            markerOff.addEventListener('click', function () {
              //点击猫咪设备图标后获取对应设备详情事件
              // alert('事件也生效')
              var opts = {
                width: 240, // 信息窗口宽度
                height: 150, // 信息窗口高度
                title: "设备信息", // 信息窗口标题
                enableMessage: true //设置允许信息窗发送短息
              };

              // var infoWindow = new BMap.InfoWindow(
              //   "IMEI号：" +
              //   that.iconImei +
              //   "<br>" +
              //   "游客手机号：" +
              //   that.iconCustomerPhone +
              //   "<br>" +
              //   "导游手机号：" +
              //   that.iconGuidePhone +
              //   "<br>" +
              //   "是否在线：" +
              //   that.iconIsOnLine +
              //   "<br>" +
              //   "旅游团号：" +
              //   that.iconTouristTeamNo +
              //   "<br>" +
              //   "最后定位时间：" +
              //   that.iconPositionDateTime +
              //   "<br>",
              //   opts
              // ); // 创建信息窗口对象
              // map.openInfoWindow(infoWindow, this.point);      // 打开信息窗口

              that.$axios(
                {
                  method: 'post',
                  url: that.apiClickCatIconGetInfos,
                  data: {
                    "type": 1,
                    "id": myid
                  }
                }
              ).then(res => {
                console.log('点击猫咪设备后获取了哪些详情：', res.data)
                if (res.data.resultStatus.resultCode ==='0000') {
                  that.iconImei = res.data.value.terminal.imei
                  that.iconCustomerPhone = res.data.value.terminal.customerPhone
                  that.iconGuidePhone = res.data.value.terminal.guidePhone
                  // that.iconIsOnLine = res.data.value.terminal.isOnLine
                  that.iconIsOnLine = '离线'
                  that.iconPositionDateTime = res.data.value.terminal.positionDateTime
                  that.iconTouristTeamNo = res.data.value.terminal.touristTeamNo
                  that.iconType = res.data.value.terminal.type


                  var infoWindow = new BMap.InfoWindow(
                    "IMEI号：" +
                    that.iconImei +
                    "<br>" +
                    "游客手机号：" +
                    that.iconCustomerPhone +
                    "<br>" +
                    "导游手机号：" +
                    that.iconGuidePhone +
                    "<br>" +
                    "是否在线：" +
                    that.iconIsOnLine +
                    "<br>" +
                    "旅游团号：" +
                    that.iconTouristTeamNo +
                    "<br>" +
                    "最后定位时间：" +
                    that.iconPositionDateTime +
                    "<br>",
                    opts
                  ); // 创建信息窗口对象
                  map.openInfoWindow(infoWindow, this.point);      // 打开信息窗口


                }else {
                  this.$message.warning(res.data.resultStatus.resultMessage)
                }

              }).catch(error => {

              })
            })
          }
          // 创建标注对象并添加到地图--sos图标
          for (let i = 0; i < this.sosPoints.length; i++) {
            var pSos = new BMap.Point(this.sosPoints[i].lng, this.sosPoints[i].lat);
            let myid = this.sosPoints[i].id
            var markerSos = new BMap.Marker(pSos, {icon: sosIcon});
            map.addOverlay(markerSos);
            markerSos.addEventListener('click', function () {
              //点击猫咪设备图标后获取对应设备详情事件
              // alert('事件也生效')
              var opts = {
                width: 240, // 信息窗口宽度
                height: 150, // 信息窗口高度
                title: "SOS信息", // 信息窗口标题
                enableMessage: true //设置允许信息窗发送短息
              };


              that.$axios(
                {
                  method: 'post',
                  url: that.apiClickCatIconGetInfos,
                  data: {
                    "type": 2,
                    "id": myid
                  }
                }
              ).then(res => {
                console.log('点击sos设备后获取了哪些详情：', res.data)
                if (res.data.resultStatus.resultCode ==='0000') {
                  that.iconImei = res.data.value.sos.imei
                  that.iconCustomerPhone = res.data.value.sos.customerPhone
                  that.iconSosDatetime = res.data.value.sos.sosDatetime
                  that.iconLonlat = res.data.value.sos.lonLat


                  var infoWindow = new BMap.InfoWindow(
                    "IMEI号：" +
                    that.iconImei +
                    "<br>" +
                    "游客手机号：" +
                    that.iconCustomerPhone +
                    "<br>" +
                    "求救时间：" +
                    that.iconSosDatetime +
                    "<br>" +
                    "求救位置：" +
                    that.iconLonlat +
                    "<br>",
                    opts
                  ); // 创建信息窗口对象
                  map.openInfoWindow(infoWindow, this.point);      // 打开信息窗口


                }else {
                  this.$message.warning(res.data.resultStatus.resultMessage)
                }

              }).catch(error => {

              })
            })
          }

        }

        if (this.$store.state.showSceneryIconOrShowCatIcon) {
          // 创建标注对象并添加到地图--合作景区图标
          for (let i = 0; i < this.sceneryLonlatArr.length; i++) {
            var pIcon = new BMap.Point(this.sceneryLonlatArr[i].lng, this.sceneryLonlatArr[i].lat);
            let sceneryId = this.sceneryLonlatArr[i].sceneryId
            let sceneryNo = this.sceneryLonlatArr[i].sceneryNo
            let lng = this.sceneryLonlatArr[i].lng
            let lat = this.sceneryLonlatArr[i].lat
            var markerIcon = new BMap.Marker(pIcon, {icon: sceneryIcon});
            map.addOverlay(markerIcon);
            markerIcon.addEventListener('click', function () {
              // console.log('事件也生效', sceneryId, sceneryNo)
              that.$store.state.showSceneryIconOrShowCatIcon = false
              that.changeSceneryMap(sceneryId, sceneryNo, lng, lat)
            })
          }
        }


      },
      //切换景区地图事件
      changeSceneryMap(n, p, s, t) {
        // alert('gaibian')
        //n代表景区id，p代表编码，s代表经度，t代表纬度
        // console.log('切换景区时接受到的id', n, p, s, t)
        this.$emit('changeSceneryChangeSelectId',n)

        this.onlinePoints = []
        this.offlinePoints = []
        this.sosPoints = []
        this.$axios(
          {
            method: 'post',
            url: this.apiSceneryInfos,
            data: {
              "sceneryId": n,
              "sceneryNo": p,
            }
          }
        ).then(res => {
          console.log('切换景区后获取到的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.onLineCountParam = res.data.value.countData.onLineCount
            this.$store.state.offLineCountParam = res.data.value.countData.offLineCount
            this.$store.state.sosCountParam = res.data.value.countData.sosCount
            this.$store.state.mapSizeParam = 14
            this.$store.state.showSceneryIconOrShowCatIcon = false
            this.$store.state.centerPointLngParam = s
            this.$store.state.centerPointLatParam = t
            console.log(this.$store.state.centerPointLngParam, this.$store.state.centerPointLatParam)

            //以下sosArr数组循环出对应的sos图标数据
            let sosArr = [...res.data.value.sosData]
            console.log('sosArr:',sosArr)

            for (var p = 0; p < sosArr.length; p++) {
              var objsos = {
                lng: '',
                lat: '',
                lonLat: '',
                imei: '',
                id: '',
              }

              objsos.lng =sosArr[p].lonLat.split(',')[0]
              objsos.lat =sosArr[p].lonLat.split(',')[1]
              objsos.lonLat = sosArr[p].lonLat
              objsos.imei =sosArr[p].imei
              objsos.id = sosArr[p].id
              this.sosPoints.push(objsos)
              console.log(objsos)
            }



            //以下arr循环出对应的设备在线，离线图标数据
            let arr = [...res.data.value.terminalData]
            for (var i = 0; i < arr.length; i++) {
              var obj = {
                lng: '',
                lat: '',
                isOnLine: '',
                lonLat: '',
                imei: '',
                id: '',
                type: 1
              }
              obj.lng = arr[i].lonLat.split(',')[0]
              obj.lat = arr[i].lonLat.split(',')[1]
              obj.lonLat = arr[i].lonLat
              obj.isOnLine = arr[i].isOnLine
              obj.imei = arr[i].imei
              obj.id = arr[i].id
              // this.sceneryLonlatArr.push(obj)
              if (arr[i].isOnLine == '0') {
                this.offlinePoints.push(obj)
              } else if (arr[i].isOnLine == '1') {
                this.onlinePoints.push(obj)
              }
            }
            console.log(this.offlinePoints, this.onlinePoints)
            this.map()

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })


      },
      //切换景区后，点击猫咪设备图标后获取对应设备详情事件
      clickCatIconGetInfos() {

      },
      //此方法是首页的下拉选择景区框触发router-view内部的一个中转事件
      chooseMap(obj) {

        //n代表景区id，p代表编码，s代表经度，t代表纬度
        let n = obj.id
        let p = obj.no
        let s = obj.lonLat.split(',')[0]
        let t = obj.lonLat.split(',')[1]
        console.log('我被兄弟组件触发了并接收到了一些值', obj, n, p, s, t)
        if (n == 0) {
          this.getAllInfos()
        } else {
          this.changeSceneryMap(n, p, s, t)
        }

      },
      //默认获取全国状态下的所有相关统计信息及地图信息
      getAllInfos() {
        this.sceneryLonlatArr = []
        this.$store.state.mapSizeParam = 6
        this.$store.state.showSceneryIconOrShowCatIcon = true
        this.$axios(
          {
            method: 'post',
            url: this.apiAllInfos,
            data: {}
          }
        ).then(res => {
          console.log('全国返回的信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.onLineCountParam = res.data.value.countData.onLineCount
            this.$store.state.offLineCountParam = res.data.value.countData.offLineCount
            this.$store.state.sosCountParam = res.data.value.countData.sosCount

            // console.log(res.data.value.sceneryData)
            let arr = [...res.data.value.sceneryData]
            for (var i = 0; i < arr.length; i++) {
              var obj = {
                lng: '',
                lat: '',
                allCount: '',
                lonLat: '',
                sceneryId: '',
                sceneryName: '',
                sceneryNo: '',
              }
              obj.lng = arr[i].lonLat.split(',')[0]
              obj.lat = arr[i].lonLat.split(',')[1]
              obj.allCount = arr[i].allCount
              obj.lonLat = arr[i].lonLat
              obj.sceneryId = arr[i].sceneryId
              obj.sceneryName = arr[i].sceneryName
              obj.sceneryNo = arr[i].sceneryNo
              this.sceneryLonlatArr.push(obj)
            }
            console.log('没走到这里吗', this.sceneryLonlatArr)
            this.map()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      }
    },
    mounted() {

      this.$store.state.isShowHomeCountParam = true
      this.getAllInfos()
    }
  }
</script>

<style scoped>

  #baidu_map {
    /*border:1px solid red;*/
  }

</style>
