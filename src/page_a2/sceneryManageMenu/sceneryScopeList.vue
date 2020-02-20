<template>
  <div>
    <mySearchs
      :sign="sign"
      :spotName="spotName"
      :isAdd="isAdd"
      @queryInfos="queryInfos"
      @addBeforeClear="addBeforeClear"
    >
    </mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowEnabled="isShowEnabled"
      :isHandle="isHandle"
      @queryInfos="queryInfos"
      @getEditorInfos="getEditorInfos"
      @delListInfo="delListInfo"
    >
    </myTables>

    <!--以下是此页面对应的新增编辑模态框-->
    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.sceneryScopeList2" width="50%"
                 align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="10">
              <el-form-item label="所属景点">
                <el-col class="select_style" v-if="$store.state.titleHeader=='新增'">
                  <el-select v-model="ruleForm.sceneryName" class="select_style1">
                    <el-option
                      v-for="item in dropDownArr"
                      :key="item.ID"
                      :label="item.Name"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </el-col>

                <el-col class="select_style" v-if="$store.state.titleHeader=='编辑'">
                  <el-select v-model="ruleForm.sceneryName" class="select_style1" :disabled="true">
                    <el-option
                      v-for="item in dropDownArr"
                      :key="item.ID"
                      :label="item.Name"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>


            <el-col :span="10" :offset="3">
              <el-form-item label="是否启用">
                <el-col class="select_style">
                  <el-select v-model="ruleForm.enabledType" placeholder="请选择是否启用" class="select_style1">
                    <el-option
                      v-for="item in enabledTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="手动输入坐标">
                <el-col>
                  <el-input type="textarea" v-model="ruleForm.railPointText" placeholder="备注：手动输入坐标为非百度坐标时，需要点击红色按钮进行坐标转换"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="坐标功能按钮">
                <el-col>
                  <el-button type="warning" round size="mini" @click="clearAll">清空坐标</el-button>
                  <!--<el-button type="warning" round size="mini">结束输入</el-button>-->
                  <el-button type="warning" round size="mini" @click="add_overlay">确认输入</el-button>

                  <el-button type="danger" round size="mini" @click="changeGpsToBaidu">GPS转百度</el-button>

                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div id="railMap"></div>
            </el-col>
          </el-row>

          <el-form-item>
            <!--<el-col :span="3">-->
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
            <!--</el-col>-->
            <el-col :span="9" :offset="12">
              <el-button @click="cancelForm('ruleForm')">取消</el-button>
              <el-button type="warning" @click="submitForm('ruleForm')">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  export default {
    name: "scenery-scope-list",
    data() {
      return {
        sign: 'sceneryScopeList2',
        maps: {},
        centerPoint: '',//添加遮盖物图层后，定位地图中心点参数
        overlays: [],
        polygon: {},//创建多边形变量
        polygonArr: [],//所有创建的多边形，存放在此数组中
        apiQuery2: '/a2guider/scopeScenic/query',
        apiGetEditorInfo2:'a2guider/scopeScenic/queryDetail',//点击编辑获取当前信息
        apiAdd2: '/a2guider/scopeScenic/add',
        apiEditor2: '/a2guider/scopeScenic/update',
        apiDel2: '/a2guider/scopeScenic/delete',
        apiDropDownList: '/a2guider/travelGency/dropDown',
        spotName: true,
        isAdd: true,
        isShowEnabled: true,
        isHandle: true,
        // tableTitle: [
        //   {
        //     prop: 'travelGencyName',
        //     label: '景区名称',
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'enabled',
        //     label: '是否启用',
        //     // width: '120',
        //     align: 'center',
        //     formatter: function (row) {
        //       return row.enabled ? '启用' : '禁用'
        //     }
        //   },
        // ],
        tableData: [
          // {
          //   enabled: true,
          //   id: 3,
          //   travelGencyName: "深圳科佳讯测试旅行社"
          // }
        ],
        dropDownArr: [],
        enabledTypeArr: [
          {
            id: '0',
            name: '禁用',
            value: '0'
          },
          {
            id: '1',
            name: '启用',
            value: '1'
          },
        ],
        ruleForm: {
          sceneryName: '',//所属景区名称
          sceneryId: '',//所属景区id
          enabledType: '',//是否启用
          scopeId:'',//范围id即围栏坐标行程之后的对应id号码
          railPointTextDefault: '依次输入坐标点，并用‘;’隔开,末尾务必以坐标点结束）：100,22;116.1,66.1;116.2,39.3;118,39;119,33',
          railPointText: '',
        },
      }
    },
    computed: {
      tableTitle:function () {
        return  [
          {
            prop: 'travelGencyName',
            label: this.$t('sceneryScopeListInfo.name'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'enabled',
            label: this.$t('sceneryScopeListInfo.isEnabled'),
            // width: '120',
            align: 'center',
            formatter: function (row) {
              return row.enabled ? '启用' : '禁用'
            }
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
      this.getDropDownList()
    },
    methods: {
      //手动输入的坐标为非百度坐标时需要进行转换
      changeGpsToBaidu() {

        this.$confirm('请确定手动输入的坐标为GPS坐标，' + '否则请取消操作' + ', 是否继续?', '危险警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          // this.$emit('cancelRelationTravelAgency')
          this.$axios(
            {
              method: 'post',
              url: '/a2guider/electronicFence/coordsChange',
              data: {
                coords: this.ruleForm.railPointText,
                from: 1
              }
            }
          ).then(res => {

            console.log('百度坐标转换', res.data)

            if (res.data.resultStatus.resultCode === '0000') {
              this.ruleForm.railPointText = res.data.value
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }


          }).catch(error => {

          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });

      },



      getDefaultInfo() {
        // this.$store.state.pageNumParam = 1
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "scenicName": "",
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('A2范围返回+', res.data)
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

      getDropDownList() {
        this.$axios(
          {
            method: 'get',
            url: this.apiDropDownList,
            data: {}
          }
        ).then(res => {
          console.log('获取下拉：', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.dropDownArr = [...res.data.value]
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
              "scenicName": this.$store.state.scenerySpotNameParam,
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

      //点击编辑时获取默认的对应相关信息
      getEditorInfos(n) {
        console.log('点击编辑后', n)
        this.$store.state.titleHeader = '编辑'

        this.$axios(
          {
            method:'post',
            url:this.apiGetEditorInfo2 +'?id='+ n.id,
            data:{}
          }
        ).then(res => {
          console.log('点击编辑后获取默认信息接口返回数据：',res.data)
          if(res.data.resultStatus.resultCode === '0000'){

            this.ruleForm.enabledType=res.data.value.enabled?'1':'0'
            this.ruleForm.sceneryName=res.data.value.travelGencyName
            this.ruleForm.sceneryId=res.data.value.travelGencyId
            this.ruleForm.scopeId=res.data.value.id
            this.ruleForm.railPointText=res.data.value.lngLats

          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })

        this.openRailMap()
      },

      //点击删除按钮事件
      delListInfo(n){
        this.$axios(
          {
            method:'post',
            url:this.apiDel2 + '?id='+n.id,
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

      //新增之前清空表单数据函数
      addBeforeClear(){

        this.$store.state.sceneryScopeList2 = true
        for(var i in this.ruleForm){
          this.ruleForm[i] = ''
        }

        this.openRailMap()

      },

      //开始提交新增信息
      addInfo() {
        console.log('开始提交新增信息')

        this.ruleForm.sceneryId=this.ruleForm.sceneryName
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd2,
            data: {
              "travelGencyId": this.ruleForm.sceneryId,
              "Enable": this.ruleForm.enabledType == '1' ? true : false,
              "lngLats": this.ruleForm.railPointText

            }
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.sceneryScopeList2 = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //开始提交编辑信息
      editorInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiEditor2,
            data: {
              "travelGencyId": this.ruleForm.sceneryId,
              "Enable": this.ruleForm.enabledType == '1' ? true : false,
              "lngLats": this.ruleForm.railPointText,
              "id":this.ruleForm.scopeId
            }
          }
        ).then(res => {
          console.log('编辑的信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.sceneryScopeList2 = false
            this.getDefaultInfo()

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })
      },

      //景区范围模态框内的相关事件

      //地图围栏对应的方法函数
      openRailMap(n) {
        console.log('新增打开渲染地图，并获得了n为：', n)
        this.$nextTick(this.map)
        // this.$nextTick(this.add_overlay)
      },

      map() {
        var that = this
        var map = new BMap.Map("railMap", {minZoom: 5, maxZoom: 18}); // 创建Map实例,设置地图允许的最小/大级别
        that.maps = map
        var point = new BMap.Point(104.346071, 33.678385);
        map.centerAndZoom(point, 13);
        map.enableScrollWheelZoom();//启用滚轮放大缩小


        //鼠标绘制图层方法函数如下
        that.overlaycomplete = function (e) {
          that.overlays.push(e.overlay);
          var path = e.overlay.getPath();//Array<Point> 返回多边型的点数组
          var pointArr = []
          for (var i = 0; i < path.length; i++) {
            // console.log(path[i].lng+","+path[i].lat)
            pointArr.push(path[i].lng + "," + path[i].lat)
          }
          console.log('最终的坐标点集合', pointArr, pointArr.join(';'))

          //鼠标绘制图层后的数据赋值
          that.ruleForm.railPointText = pointArr.join(';')

        };
        var styleOptions = {
          strokeColor: "red",    //边线颜色。
          fillColor: "red",      //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 3,       //边线的宽度，以像素为单位。
          strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
          fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid' //边线的样式，solid或dashed。
        }
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(map, {
          isOpen: false, //是否开启绘制模式
          enableDrawingTool: true, //是否显示工具栏
          drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            drawingModes: [
              BMAP_DRAWING_POLYGON,
              BMAP_DRAWING_RECTANGLE
            ]
          },
          circleOptions: styleOptions, //圆的样式
          polylineOptions: styleOptions, //线的样式
          polygonOptions: styleOptions, //多边形的样式
          rectangleOptions: styleOptions //矩形的样式
        });
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', that.overlaycomplete);

      },

      clearAll() {
        for (var i = 0; i < this.overlays.length; i++) {
          this.maps.removeOverlay(this.overlays[i]);
        }

        for (var k = 0; k < this.polygonArr.length; k++) {
          this.maps.removeOverlay(this.polygonArr[k]);
        }


      },
      //添加手动围栏覆盖物方法
      add_overlay() {
        this.clearAll()
        // console.log('点击覆盖物',this.ruleForm.railPointText)
        var pointArr = this.ruleForm.railPointText.split(';')
        var usedArr = [] //创建多边形围栏时，需要用到的点坐标集合
        console.log(pointArr)
        for (let i = 0; i < pointArr.length; i++) {
          if (i == 0) {
            this.centerPoint = new BMap.Point(pointArr[0].split(',')[0], pointArr[0].split(',')[1])
          }
          usedArr.push(new BMap.Point(pointArr[i].split(',')[0], pointArr[i].split(',')[1]),)
        }
        this.maps.centerAndZoom(this.centerPoint, 12);

        //创建多边形
        this.polygon = new BMap.Polygon(usedArr, {
          strokeColor: "blue",
          strokeWeight: 2,
          strokeOpacity: 1,
          fillColor: "blue"
        });  //创建多边形
        this.polygonArr.push(this.polygon)//此处是吧所有的添加的多边形图形存储到一个数组中，方便清空地图图层的时候可用此数组
        this.maps.addOverlay(this.polygon);           //增加多边形

      },


      submitForm(formName) {

        this.$confirm('请确定即将上传的坐标信息为百度坐标' + '否则请取消本次' + '操作, 是否继续?', '危险警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {


          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              if (formName === 'ruleForm') {
                if (this.$store.state.titleHeader === '新增') {
                  this.addInfo()
                } else if (this.$store.state.titleHeader === '编辑') {
                  this.editorInfo()
                }

              }

            } else {
              console.log('error submit!!');
              return false;
            }
          });


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '本次操作已取消'
          });
        });

      },

      cancelForm(formName) {
        this.$refs[formName].resetFields();
        if (formName === 'ruleForm') {
          this.$store.state.sceneryScopeList2 = false
        }

      },
    }
  }
</script>

<style scoped>
  #railMap {
    border: 1px solid #ececec;
    width: 100%;
    height: 4.5rem;
    min-height: 300px;
    margin: 20px 0;
  }
</style>
