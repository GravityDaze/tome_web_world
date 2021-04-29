<template>
  <div id="map"></div>
</template>

<script>
let map;
export default {
  props: {
    lat: {
      default: "33.678385",
      type: String | Number,
    },
    lon: {
      default: "104.346071",
      type: String | Number,
    },
    zoom: {
      default: "6",
      type: String | Number,
    },
    enableScrollWheelZoom: {
      default: true,
      type: Boolean,
    },
    enableInertialDragging: {
      default: true,
      type: Boolean,
    },
    markers: {
      default() {
        return [];
      },
      type: Array,
    },
  },
  mounted() {
    this.initMap();
  },
  watch: {
    lat(val) {
      const point = new BMap.Point(this.lon, val);
      map.setCenter(point);
    },
    lon(val) {
      const point = new BMap.Point(val, this.lat);
      map.setCenter(point);
    },
    zoom(val) {
      map.setZoom(val);
    },
    markers: {
      handler(val) {
        map && map.clearOverlays()
        val.forEach((v) => {
          const icon = new BMap.Icon(v.icon, new BMap.Size(...v.size), {
            imageSize: new BMap.Size(...v.size),
          });
          const point = new BMap.Point(v.lon, v.lat);
          const marker = new BMap.Marker(point,{icon});
          map.addOverlay(marker);
          // 为marker创建点击事件
          marker.addEventListener("click", () => v.click(v,point,map,BMap) )
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    initMap() {
      map = new BMap.Map("map");
      const point = new BMap.Point(this.lon, this.lat);
      map.centerAndZoom(point, this.zoom);
      this.enableScrollWheelZoom && map.enableScrollWheelZoom(); //启用滚轮放大缩小
      this.enableInertialDragging && map.enableInertialDragging(); // 启用惯性拖拽
    },
    includes() {
      map.setViewport();
    },
  },
};
</script>

<style>
</style>