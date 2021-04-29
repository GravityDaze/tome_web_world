<template>
  <Map
    :lon="position.lon"
    :lat="position.lat"
    :zoom="zoom"
    :markers="markers"
  />
</template>

<script>
import Map from "./map";
export default {
  name: "baidu-map",
  components: {
    Map,
  },
  data() {
    return {
      zoom: "6", //地图展示尺寸
      point: "",
      position: {
        lat: "33.678385",
        lon: "104.346071",
      },
      markers: [],

      iconImei: "", //测试展示猫咪详情参数imei
      iconCustomerPhone: "", //测试展示猫咪详情参数游客手机号
      iconGuidePhone: "", //测试展示猫咪详情参数导游手机号
      iconIsOnLine: "", //测试展示猫咪详情参数是否在线
      iconPositionDateTime: "", //测试展示猫咪详情参数最后定位时间
      iconSosDatetime: "", //测试展示sos详情参数最后时间
      iconLonlat: "", //测试展示sos详情参数最后坐标
      iconTouristTeamNo: "", //测试展示猫咪详情参数旅游团编号
      iconType: "", //测试展示猫咪详情参数游客数据类型
      apiAllInfos: "/mis/index/queryCountry", //初始化默认获取全国状态下的相关信息接口
      apiSceneryInfos: "/mis/index/queryScenery", //
      apiClickCatIconGetInfos: "/mis/index/get", //点击设备图标，显示具体设备当前信息
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
      onlinePoints: [], //景区状态下展示对应设备的坐标图片（在线）
      offlinePoints: [], //景区状态下展示对应设备的坐标图片（离线）
      sosPoints: [], //景区状态下展示对应sos的坐标图片（）
      sceneryLonlatArr: [], //全国状态下展示景区的坐标图片
    };
  },
  methods: {
    // map() {
    //   var const = this;
    //   var map = new BMap.Map("baidu_map", { minZoom: 5, maxZoom: 18 }); // 创建Map实例,设置地图允许的最小/大级别
    //   var point = new BMap.Point(
    //     this.$store.state.centerPointLngParam,
    //     this.$store.state.centerPointLatParam
    //   );
    //   map.centerAndZoom(point, this.$store.state.mapSizeParam);
    //   map.enableScrollWheelZoom(); //启用滚轮放大缩小

    //   //在线图标
    //   var onlineIcon = new BMap.Icon(
    //     "http://tomepicture.zhihuiquanyu.com/online-icon.png",
    //     new BMap.Size(34, 41)
    //   );
    //   //离线图标
    //   var offlineIcon = new BMap.Icon(
    //     "http://tomepicture.zhihuiquanyu.com/offline-icon.png",
    //     new BMap.Size(34, 41)
    //   );
    //   //sos图标
    //   var sosIcon = new BMap.Icon(
    //     "http://tomepicture.zhihuiquanyu.com/SOS.png",
    //     new BMap.Size(34, 41),
    //     { imageSize: new BMap.Size(30, 34) }
    //   );

    //   //合作景区图标
    //   var sceneryIcon = new BMap.Icon(
    //     "http://tomepicture.zhihuiquanyu.com/layericon2.png",
    //     new BMap.Size(34, 41)
    //   );

    //   if (!this.$store.state.showSceneryIconOrShowCatIcon) {
    //     // 创建标注对象并添加到地图--在线图标
    //     for (let i = 0; i < this.onlinePoints.length; i++) {
    //       var pOn = new BMap.Point(
    //         this.onlinePoints[i].lng,
    //         this.onlinePoints[i].lat
    //       );
    //       let myid = this.onlinePoints[i].id;
    //       var markerOn = new BMap.Marker(pOn, { icon: onlineIcon });
    //       map.addOverlay(markerOn);
    //       markerOn.addEventListener("click", function () {
    //         var opts = {
    //           width: 240, // 信息窗口宽度
    //           height: 150, // 信息窗口高度
    //           title: "设备信息", // 信息窗口标题
    //           enableMessage: true, //设置允许信息窗发送短息
    //         };

    //         const     //           .$axios({
    //             method: "post",
    //             url: const apiClickCatIconGetInfos,
    //             data: {
    //               type: 1,
    //               id: myid,
    //             },
    //           })
    //           .then((res) => {
    //             console.log("点击猫咪设备后获取了哪些详情：", res.data);
    //             if (res.data.resultStatus.resultCode === "0000") {
    //               const iconImei = res.data.value.terminal.imei;
    //               const iconCustomerPhone =
    //                 res.data.value.terminal.customerPhone;
    //               const iconGuidePhone = res.data.value.terminal.guidePhone;
    //               // const iconIsOnLine = res.data.value.terminal.isOnLine
    //               const iconIsOnLine = "在线";
    //               const iconPositionDateTime =
    //                 res.data.value.terminal.positionDateTime;
    //               const iconTouristTeamNo =
    //                 res.data.value.terminal.touristTeamNo;
    //               const iconType = res.data.value.terminal.type;

    //               var infoWindow = new BMap.InfoWindow(
    //                 "IMEI号：" +
    //                   const iconImei +
    //                   "<br>" +
    //                   "游客手机号：" +
    //                   const iconCustomerPhone +
    //                   "<br>" +
    //                   "导游手机号：" +
    //                   const iconGuidePhone +
    //                   "<br>" +
    //                   "是否在线：" +
    //                   const iconIsOnLine +
    //                   "<br>" +
    //                   "旅游团号：" +
    //                   const iconTouristTeamNo +
    //                   "<br>" +
    //                   "最后定位时间：" +
    //                   const iconPositionDateTime +
    //                   "<br>",
    //                 opts
    //               ); // 创建信息窗口对象
    //               map.openInfoWindow(infoWindow, this.point); // 打开信息窗口
    //             } else {
    //               this.$message.warning(res.data.resultStatus.resultMessage);
    //             }
    //           })
    //           .catch((error) => {});
    //       });
    //     }
    //     // 创建标注对象并添加到地图--离线图标
    //     for (let i = 0; i < this.offlinePoints.length; i++) {
    //       var pOff = new BMap.Point(
    //         this.offlinePoints[i].lng,
    //         this.offlinePoints[i].lat
    //       );
    //       let myid = this.offlinePoints[i].id;
    //       var markerOff = new BMap.Marker(pOff, { icon: offlineIcon });
    //       map.addOverlay(markerOff);
    //       markerOff.addEventListener("click", function () {
    //         //点击猫咪设备图标后获取对应设备详情事件
    //         // alert('事件也生效')
    //         var opts = {
    //           width: 240, // 信息窗口宽度
    //           height: 150, // 信息窗口高度
    //           title: "设备信息", // 信息窗口标题
    //           enableMessage: true, //设置允许信息窗发送短息
    //         };

    //         // var infoWindow = new BMap.InfoWindow(
    //         //   "IMEI号：" +
    //         //   const iconImei +
    //         //   "<br>" +
    //         //   "游客手机号：" +
    //         //   const iconCustomerPhone +
    //         //   "<br>" +
    //         //   "导游手机号：" +
    //         //   const iconGuidePhone +
    //         //   "<br>" +
    //         //   "是否在线：" +
    //         //   const iconIsOnLine +
    //         //   "<br>" +
    //         //   "旅游团号：" +
    //         //   const iconTouristTeamNo +
    //         //   "<br>" +
    //         //   "最后定位时间：" +
    //         //   const iconPositionDateTime +
    //         //   "<br>",
    //         //   opts
    //         // ); // 创建信息窗口对象
    //         // map.openInfoWindow(infoWindow, this.point);      // 打开信息窗口

    //         const     //           .$axios({
    //             method: "post",
    //             url: const apiClickCatIconGetInfos,
    //             data: {
    //               type: 1,
    //               id: myid,
    //             },
    //           })
    //           .then((res) => {
    //             console.log("点击猫咪设备后获取了哪些详情：", res.data);
    //             if (res.data.resultStatus.resultCode === "0000") {
    //               const iconImei = res.data.value.terminal.imei;
    //               const iconCustomerPhone =
    //                 res.data.value.terminal.customerPhone;
    //               const iconGuidePhone = res.data.value.terminal.guidePhone;
    //               // const iconIsOnLine = res.data.value.terminal.isOnLine
    //               const iconIsOnLine = "离线";
    //               const iconPositionDateTime =
    //                 res.data.value.terminal.positionDateTime;
    //               const iconTouristTeamNo =
    //                 res.data.value.terminal.touristTeamNo;
    //               const iconType = res.data.value.terminal.type;

    //               var infoWindow = new BMap.InfoWindow(
    //                 "IMEI号：" +
    //                   const iconImei +
    //                   "<br>" +
    //                   "游客手机号：" +
    //                   const iconCustomerPhone +
    //                   "<br>" +
    //                   "导游手机号：" +
    //                   const iconGuidePhone +
    //                   "<br>" +
    //                   "是否在线：" +
    //                   const iconIsOnLine +
    //                   "<br>" +
    //                   "旅游团号：" +
    //                   const iconTouristTeamNo +
    //                   "<br>" +
    //                   "最后定位时间：" +
    //                   const iconPositionDateTime +
    //                   "<br>",
    //                 opts
    //               ); // 创建信息窗口对象
    //               map.openInfoWindow(infoWindow, this.point); // 打开信息窗口
    //             } else {
    //               this.$message.warning(res.data.resultStatus.resultMessage);
    //             }
    //           })
    //           .catch((error) => {});
    //       });
    //     }
    //     // 创建标注对象并添加到地图--sos图标
    //     for (let i = 0; i < this.sosPoints.length; i++) {
    //       var pSos = new BMap.Point(
    //         this.sosPoints[i].lng,
    //         this.sosPoints[i].lat
    //       );
    //       let myid = this.sosPoints[i].id;
    //       var markerSos = new BMap.Marker(pSos, { icon: sosIcon });
    //       map.addOverlay(markerSos);
    //       markerSos.addEventListener("click", function () {
    //         //点击猫咪设备图标后获取对应设备详情事件
    //         // alert('事件也生效')
    //         var opts = {
    //           width: 240, // 信息窗口宽度
    //           height: 150, // 信息窗口高度
    //           title: "SOS信息", // 信息窗口标题
    //           enableMessage: true, //设置允许信息窗发送短息
    //         };

    //         const     //           .$axios({
    //             method: "post",
    //             url: const apiClickCatIconGetInfos,
    //             data: {
    //               type: 2,
    //               id: myid,
    //             },
    //           })
    //           .then((res) => {
    //             console.log("点击sos设备后获取了哪些详情：", res.data);
    //             if (res.data.resultStatus.resultCode === "0000") {
    //               const iconImei = res.data.value.sos.imei;
    //               const iconCustomerPhone = res.data.value.sos.customerPhone;
    //               const iconSosDatetime = res.data.value.sos.sosDatetime;
    //               const iconLonlat = res.data.value.sos.lonLat;

    //               var infoWindow = new BMap.InfoWindow(
    //                 "IMEI号：" +
    //                   const iconImei +
    //                   "<br>" +
    //                   "游客手机号：" +
    //                   const iconCustomerPhone +
    //                   "<br>" +
    //                   "求救时间：" +
    //                   const iconSosDatetime +
    //                   "<br>" +
    //                   "求救位置：" +
    //                   const iconLonlat +
    //                   "<br>",
    //                 opts
    //               ); // 创建信息窗口对象
    //               map.openInfoWindow(infoWindow, this.point); // 打开信息窗口
    //             } else {
    //               this.$message.warning(res.data.resultStatus.resultMessage);
    //             }
    //           })
    //           .catch((error) => {});
    //       });
    //     }
    //   }

    //   if (this.$store.state.showSceneryIconOrShowCatIcon) {
    //     // 创建标注对象并添加到地图--合作景区图标
    //     for (let i = 0; i < this.sceneryLonlatArr.length; i++) {
    //       var pIcon = new BMap.Point(
    //         this.sceneryLonlatArr[i].lng,
    //         this.sceneryLonlatArr[i].lat
    //       );
    //       let sceneryId = this.sceneryLonlatArr[i].sceneryId;
    //       let sceneryNo = this.sceneryLonlatArr[i].sceneryNo;
    //       let lng = this.sceneryLonlatArr[i].lng;
    //       let lat = this.sceneryLonlatArr[i].lat;
    //       var markerIcon = new BMap.Marker(pIcon, { icon: sceneryIcon });
    //       map.addOverlay(markerIcon);
    //       markerIcon.addEventListener("click", function () {
    //         // console.log('事件也生效', sceneryId, sceneryNo)
    //         const $store.state.showSceneryIconOrShowCatIcon = false;
    //         const changeSceneryMap(sceneryId, sceneryNo, lng, lat);
    //       });
    //     }
    //   }
    // },
    //切换景区地图事件
    // changeSceneryMap(n, p, s, t) {
    //   // alert('gaibian')
    //   //n代表景区id，p代表编码，s代表经度，t代表纬度
    //   // console.log('切换景区时接受到的id', n, p, s, t)
    //   this.$emit("changeSceneryChangeSelectId", n);
    //   this.$store.state.mapSizeParam = 14;
    //   this.$store.state.showSceneryIconOrShowCatIcon = false;
    //   this.$store.state.centerPointLngParam = s;
    //   this.$store.state.centerPointLatParam = t;
    //   this.onlinePoints = [];
    //   this.offlinePoints = [];
    //   this.sosPoints = [];
    //   this.$axios({
    //     method: "post",
    //     url: this.apiSceneryInfos,
    //     data: {
    //       sceneryId: n,
    //       sceneryNo: p,
    //     },
    //   })
    //     .then((res) => {
    //       console.log("切换景区后获取到的数据", res.data);
    //       if (res.data.resultStatus.resultCode === "0000") {
    //         this.$store.state.onLineCountParam =
    //           res.data.value.countData.onLineCount;
    //         this.$store.state.offLineCountParam =
    //           res.data.value.countData.offLineCount;
    //         this.$store.state.sosCountParam = res.data.value.countData.sosCount;

    //         //以下sosArr数组循环出对应的sos图标数据
    //         let sosArr = [...res.data.value.sosData];
    //         console.log("sosArr:", sosArr);

    //         for (var p = 0; p < sosArr.length; p++) {
    //           var objsos = {
    //             lng: "",
    //             lat: "",
    //             lonLat: "",
    //             imei: "",
    //             id: "",
    //           };

    //           objsos.lng = sosArr[p].lonLat.split(",")[0];
    //           objsos.lat = sosArr[p].lonLat.split(",")[1];
    //           objsos.lonLat = sosArr[p].lonLat;
    //           objsos.imei = sosArr[p].imei;
    //           objsos.id = sosArr[p].id;
    //           this.sosPoints.push(objsos);
    //           console.log(objsos);
    //         }

    //         //以下arr循环出对应的设备在线，离线图标数据
    //         let arr = [...res.data.value.terminalData];
    //         for (var i = 0; i < arr.length; i++) {
    //           var obj = {
    //             lng: "",
    //             lat: "",
    //             isOnLine: "",
    //             lonLat: "",
    //             imei: "",
    //             id: "",
    //             type: 1,
    //           };
    //           obj.lng = arr[i].lonLat.split(",")[0];
    //           obj.lat = arr[i].lonLat.split(",")[1];
    //           obj.lonLat = arr[i].lonLat;
    //           obj.isOnLine = arr[i].isOnLine;
    //           obj.imei = arr[i].imei;
    //           obj.id = arr[i].id;
    //           // this.sceneryLonlatArr.push(obj)
    //           if (arr[i].isOnLine == "0") {
    //             this.offlinePoints.push(obj);
    //           } else if (arr[i].isOnLine == "1") {
    //             this.onlinePoints.push(obj);
    //           }
    //         }
    //         console.log(this.offlinePoints, this.onlinePoints);
    //         this.map();
    //       } else {
    //         this.$message.warning(res.data.resultStatus.resultMessage);
    //       }
    //     })
    //     .catch((error) => {});
    // },
    //切换景区后，点击猫咪设备图标后获取对应设备详情事件
    clickCatIconGetInfos() {},
    //此方法是首页的下拉选择景区框触发router-view内部的一个中转事件
    chooseMap(obj) {
      this.timer && clearInterval(this.timer);
      //n代表景区id，p代表编码，s代表经度，t代表纬度
      let n = obj.id;
      let p = obj.no;
      let s = obj.lonLat.split(",")[0];
      let t = obj.lonLat.split(",")[1];
      if (n == 0) {
        this.getData();
      } else {
        this.changeSceneryMap(n, p, s, t);
      }
    },

    getCountInfo() {
      this.$axios({
        method: "post",
        url: this.apiAllInfos,
        data: {},
      })
        .then((res) => {
          if (res.data.resultStatus.resultCode === "0000") {
            this.$store.state.onLineCountParam =
              res.data.value.countData.onLineCount;
            this.$store.state.offLineCountParam =
              res.data.value.countData.offLineCount;
            this.$store.state.sosCountParam = res.data.value.countData.sosCount;
          }
        })
        .catch((error) => {});
    },

    //默认获取全国状态下的所有相关统计信息及地图信息
    getAllInfos() {
      this.sceneryLonlatArr = [];
      this.$store.state.mapSizeParam = 6;
      this.$store.state.showSceneryIconOrShowCatIcon = true;
      this.$axios({
        method: "post",
        url: this.apiAllInfos,
        data: {},
      })
        .then((res) => {
          console.log("全国返回的信息", res.data);
          if (res.data.resultStatus.resultCode === "0000") {
            this.$store.state.onLineCountParam =
              res.data.value.countData.onLineCount;
            this.$store.state.offLineCountParam =
              res.data.value.countData.offLineCount;
            this.$store.state.sosCountParam = res.data.value.countData.sosCount;

            // console.log(res.data.value.sceneryData)
            let arr = [...res.data.value.sceneryData];
            for (var i = 0; i < arr.length; i++) {
              var obj = {
                lng: "",
                lat: "",
                allCount: "",
                lonLat: "",
                sceneryId: "",
                sceneryName: "",
                sceneryNo: "",
              };
              obj.lng = arr[i].lonLat.split(",")[0];
              obj.lat = arr[i].lonLat.split(",")[1];
              obj.allCount = arr[i].allCount;
              obj.lonLat = arr[i].lonLat;
              obj.sceneryId = arr[i].sceneryId;
              obj.sceneryName = arr[i].sceneryName;
              obj.sceneryNo = arr[i].sceneryNo;
              this.sceneryLonlatArr.push(obj);
            }
            console.log("没走到这里吗", this.sceneryLonlatArr);
            this.map();
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage);
          }
        })
        .catch((error) => {});
    },

    /*
     * 重构区域
     */
    getData() {
      this.$axios({
        method: "post",
        url: this.apiAllInfos,
        data: {},
      }).then((res) => {
        console.log(res);
        this.zoom = 6;
        this.$store.state.onLineCountParam =
          res.data.value.countData.onLineCount;
        this.$store.state.offLineCountParam =
          res.data.value.countData.offLineCount;
        this.$store.state.sosCountParam = res.data.value.countData.sosCount;
        const sceneryMarker = res.data.value.sceneryData.map((v) => ({
          id: v.id,
          icon: "http://tomepicture.zhihuiquanyu.com/layericon2.png",
          size: [34, 41],
          lon: v.lonLat.split(",")[0],
          lat: v.lonLat.split(",")[1],
          type: "scenery", //表示marker的类型
          click: () => {
            this.$emit("changeSceneryChangeSelectId", v.sceneryId);
            this.changeSceneryMap(
              v.sceneryId,
              v.sceneryNo,
              v.lonLat.split(",")[0],
              v.lonLat.split(",")[1]
            );
          },
        }));
        this.markers = sceneryMarker;
      });
    },

    changeSceneryMap(n, p, lon, lat) {
      this.position.lat = lat;
      this.position.lon = lon;
      this.zoom = 16;
      const count = () => {
        this.setMarker(n, p);
        // this.getSceneryInfo(n,p)
        return count;
      };
      this.timer = setInterval(count(), 100000);
    },

    setMarker(n, p) {
      console.log("我被调用了");
      // 为marker添加点击时回调函数
      const click = (v, point, map, BMap) => {
        const opts = {
          width: 240, // 信息窗口宽度
          height: 150, // 信息窗口高度
          title: v.type === "sos" ? "SOS信息" : "设备信息", // 信息窗口标题
          enableMessage: true, //设置允许信息窗发送短息
        };

        if (v.type === "sos") {
          this.$axios({
            method: "post",
            url: this.apiClickCatIconGetInfos,
            data: {
              type: 2,
              id: v.id,
            },
          }).then((res) => {
            const {
              imei,
              customerPhone,
              sosDatetime,
              lonLat,
            } = res.data.value.sos;

            const infoWindow = new BMap.InfoWindow(
              "IMEI号：" +
                imei +
                "<br>" +
                "游客手机号：" +
                customerPhone +
                "<br>" +
                "求救时间：" +
                sosDatetime +
                "<br>" +
                "求救位置：" +
                lonLat +
                "<br>",
              opts
            ); // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); // 打开信息窗口
          });
        } else {
          this.$axios({
            method: "post",
            url: this.apiClickCatIconGetInfos,
            data: {
              type: 1,
              id: v.id,
            },
          }).then((res) => {
            const {
              imei,
              customerPhone,
              guidePhone,
              positionDateTime,
              touristTeamNo,
              isOnLine
            } = res.data.value.terminal;
            console.log(res);

            const infoWindow = new BMap.InfoWindow(
              "IMEI号：" +
                imei +
                "<br>" +
                "游客手机号：" +
                customerPhone +
                "<br>" +
                "导游手机号：" +
                guidePhone +
                "<br>" +
                "是否在线：" +
                (isOnLine ? "在线" : "离线") +
                "<br>" +
                "旅游团号：" +
                touristTeamNo +
                "<br>" +
                "最后定位时间：" +
                positionDateTime +
                "<br>",
              opts
            ); // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); // 打开信息窗口
          });
        }
      };

      // 获取到marker信息
      this.$axios({
        method: "post",
        url: this.apiSceneryInfos,
        data: {
          sceneryId: n,
          sceneryNo: p,
        },
      }).then((res) => {
        const { sosData, terminalData, countData } = res.data.value;
        this.$store.state.onLineCountParam = countData.onLineCount;
        this.$store.state.offLineCountParam = countData.offLineCount;
        this.$store.state.sosCountParam = countData.sosCount;

        const sosMarkers = sosData.map((v) => ({
          id: v.id,
          icon: "http://tomepicture.zhihuiquanyu.com/SOS.png",
          size: [34, 41],
          lon: v.lonLat.split(",")[0],
          lat: v.lonLat.split(",")[1],
          type: "sos",
          click,
        }));

        const terminalMarkers = terminalData.map((v) => {
          return {
            id: v.id,
            icon: v.isOnLine
              ? "http://tomepicture.zhihuiquanyu.com/online-icon.png"
              : "http://tomepicture.zhihuiquanyu.com/offline-icon.png",
            size: [34, 41],
            lon: v.lonLat.split(",")[0],
            lat: v.lonLat.split(",")[1],
            type: v.isOnLine ? "online" : "outline", //表示marker的类型
            click,
          };
        });
        console.log(terminalMarkers);
        if (
          JSON.stringify(this.markers) ===
          JSON.stringify([...terminalMarkers, ...sosMarkers])
        ) {
          return;
        }
        this.markers = [...terminalMarkers, ...sosMarkers];
      });
    },
  },
  mounted() {
    // 获取全国地图
    this.getData();

    this.$store.state.isShowHomeCountParam = true;
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
};
</script>
