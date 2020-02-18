<template>
  <div>
    <mySearchs
      :sign="sign"
      :railName="railName"
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
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.railInfo2" width="45%"
                 align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>

            <el-col :span="23">
              <el-form-item label="围栏名称">
                <el-col v-if="$store.state.titleHeader=='新增'">
                  <el-input v-model="ruleForm.Name" placeholder="请输入围栏名称"></el-input>
                </el-col>

                <el-col v-if="$store.state.titleHeader=='编辑'">
                  <el-input v-model="ruleForm.Name" placeholder="请输入围栏名称" :disabled="true"></el-input>
                </el-col>
              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="所属景点">
                <el-col class="select_style">
                  <el-select v-model="ruleForm.ScenicName" class="select_style1">
                    <el-option
                      v-for="item in dropDownArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="围栏类型">
                <el-col class="select_style">
                  <el-select v-model="ruleForm.Type" placeholder="请选择围栏类型" class="select_style1">
                    <el-option
                      v-for="item in railTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>


            <el-col :span="23">
              <el-form-item label="提醒方式">
                <el-col class="select_style">
                  <el-select v-model="ruleForm.HintMode" placeholder="请选择提醒方式" class="select_style1">
                    <el-option
                      v-for="item in tipsTypeArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="进提示语">
                <el-col>
                  <el-input v-model="ruleForm.InHintWord" placeholder="请输入提示语"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="出提示语">
                <el-col>
                  <el-input v-model="ruleForm.OutHintWord" placeholder="请输入提示语"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="是否启用">
                <el-col class="select_style">
                  <el-select v-model="ruleForm.Enabled" placeholder="请选择是否启用" class="select_style1">
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
                  <el-input type="textarea" v-model="ruleForm.lngLats"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="23">
              <el-form-item label="坐标功能按钮">
                <el-col>
                  <el-button type="warning" round size="mini" @click="clearAll">清空坐标</el-button>
                  <!--<el-button type="warning" round size="mini">结束输入</el-button>-->
                  <el-button type="warning" round size="mini" @click="add_overlay">确认输入</el-button>

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
    name: "rail-info",
    data() {
      return {
        change01: '',
        sign: 'railInfo2',
        maps: {},
        centerPoint: '',//添加遮盖物图层后，定位地图中心点参数
        overlays: [],
        polygon: {},//创建多边形变量
        polygonArr: [],//所有创建的多边形，存放在此数组中
        apiQuery2: '/a2guider/electronicFence/query',
        apiAdd2: '/a2guider/electronicFence/add',
        apiEditor2: '/a2guider/electronicFence/update',
        apiDel2: '/a2guider/electronicFence/delete',
        apiDropDownList: '/a2guider/scenic/queryScenicList',
        apiGetLngLats:'/a2guider/electronicFence/get',
        railName: true,
        isAdd: true,
        isShowEnabled: true,
        isHandle: true,
        getId:'',
        dropDownArr: [],//新增里面的下拉所属景点

        railTypeArr: [
          {
            id: '1',
            name: '出围栏报警',
            value: '1'
          },
          {
            id: '2',
            name: '进围栏报警',
            value: '2'
          },
          {
            id: '3',
            name: '进出围栏报警',
            value: '3'
          },
        ],

        tipsTypeArr: [
          {
            id: '0',
            name: '不提示',
            value: '0'
          },
          {
            id: '1',
            name: '振动提示',
            value: '1'
          },
          {
            id: '2',
            name: '语音提示',
            value: '2'
          },
          {
            id: '3',
            name: '振动和语音提示',
            value: '3'
          },
        ],
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
          ID: '',//围栏ID
          Name: '',//围栏名称
          ScenicID: '',//景点ID
          ScenicName: '',//所属景区名称
          Type: '',//报警类型
          Enabled: '',//是否启用
          HintMode: '',//提醒模式
          InHintWord: '',//进提示语
          OutHintWord: '',//出提示语
          lngLats: '',//经纬度
        },
        tableTitle: [
          {
            prop: 'Name',
            label: '围栏名称',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'ScenicName',
            label: '旅游景点',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'Type',
            label: '报警类型',
            // width: '120',
            align: 'center',
            formatter: function (row) {
              if (row.Type == '1') {
                return '出围栏报警'
              } else if (row.Type == '2') {
                return '进围栏报警'
              } else if (row.Type == '3') {
                return '进出围栏报警'
              }
            }
          },
          {
            prop: 'Enabled',
            label: '是否启用',
            // width: '120',
            align: 'center',
            formatter: function (row) {
              if (row.Enabled == '0') {
                return '禁用'
              } else if (row.Enabled == '1') {
                return '启用'
              }
            }
          },
          {
            prop: 'HintMode',
            label: '提醒方式',
            // width: '120',
            align: 'center',
            formatter: function (row) {
              if (row.HintMode == '0') {
                return '不提示'
              } else if (row.HintMode == '1') {
                return '振动提示'
              } else if (row.HintMode == '2') {
                return '语音提示'
              } else if (row.HintMode == '3') {
                return '振动和语音提示'
              }
            }
          },
          {
            prop: 'InHintWord',
            label: '进提示语',
            // width: '120',
            align: 'center'
          },
          {
            prop: 'OutHintWord',
            label: '出提示语',
            // width: '120',
            align: 'center'
          },
        ],
        tableData: []

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

      //获取新增模态框内所属景点下拉信息
      getDropDownList() {
        this.$axios(
          {
            method: 'post',
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

      //新增之前清空表单数据函数
      addBeforeClear() {

        this.$store.state.railInfo2 = true
        for (var i in this.ruleForm) {
          this.ruleForm[i] = ''
        }

        this.openRailMap()

      },


      //开始提交新增信息
      addInfo() {
        console.log('开始提交新增信息')

        this.ruleForm.ScenicID = this.ruleForm.ScenicName
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd2,
            data: {
              "Name": this.ruleForm.Name,
              "ScenicID": this.ruleForm.ScenicID,
              "Type": this.ruleForm.Type,
              "Enabled": this.ruleForm.Enabled,
              "HintMode": this.ruleForm.HintMode,
              "InHintWord": this.ruleForm.InHintWord,
              "OutHintWord": this.ruleForm.OutHintWord,
              "lngLats": this.ruleForm.lngLats
            }
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.railInfo2 = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //点击删除按钮事件
      delListInfo(n){
        this.$axios(
          {
            method:'post',
            url:this.apiDel2 + '?id='+n.ID,
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

      //点击编辑时获取默认的对应相关信息
      getEditorInfos(n) {
        console.log('点击编辑后', n)
        this.$store.state.titleHeader = '编辑'
        this.getId = n.ID
        this.$axios(
          {
            method:'post',
            url:this.apiGetLngLats + '?id=' + this.getId,
            data:{}
          }
        ).then(res => {
          console.log('获取坐标数组数据',res.data)
          if(res.data.resultStatus.resultCode === '0000'){

            this.ruleForm = res.data.value
            this.ruleForm.lngLats = res.data.value.CoordinateList
            this.change01 = this.ruleForm.ScenicName
            if (this.ruleForm.Type == '1') {
              this.ruleForm.Type = '出围栏报警'
            } else if (this.ruleForm.Type == '2') {
              this.ruleForm.Type = '进围栏报警'
            } else if (this.ruleForm.Type == '3') {
              this.ruleForm.Type = '进出围栏报警'
            }

            if (this.ruleForm.HintMode == '0') {
              this.ruleForm.HintMode = '不提示'
            } else if (this.ruleForm.HintMode == '1') {
              this.ruleForm.HintMode = '振动提示'
            } else if (this.ruleForm.HintMode == '2') {
              this.ruleForm.HintMode = '语音提示'
            } else if (this.ruleForm.HintMode == '3') {
              this.ruleForm.HintMode = '振动和语音提示'
            }

            if (this.ruleForm.Enabled == '1') {
              this.ruleForm.Enabled = '启用'
            } else if (this.ruleForm.Enabled == '0') {
              this.ruleForm.Enabled = '禁用'
            }


          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })

        this.openRailMap()
        this.$store.state.railInfo2 = true

      },

      //开始提交编辑信息
      editorInfo() {

        if (this.ruleForm.ScenicName != this.change01) {
          this.ruleForm.ScenicID = this.ruleForm.ScenicName
        }

        if (this.ruleForm.Type == '出围栏报警') {
          this.ruleForm.Type = '1'
        } else if (this.ruleForm.Type == '进围栏报警') {
          this.ruleForm.Type = '2'
        } else if (this.ruleForm.Type == '进出围栏报警') {
          this.ruleForm.Type = '3'
        }

        if (this.ruleForm.HintMode == '不提示') {
          this.ruleForm.HintMode = '0'
        } else if (this.ruleForm.HintMode == '振动提示') {
          this.ruleForm.HintMode = '1'
        } else if (this.ruleForm.HintMode == '语音提示') {
          this.ruleForm.HintMode = '2'
        } else if (this.ruleForm.HintMode == '振动和语音提示') {
          this.ruleForm.HintMode = '3'
        }

        if (this.ruleForm.Enabled == '启用' || this.ruleForm.Enabled == '1') {
          this.ruleForm.Enabled = 1
        } else if (this.ruleForm.Enabled == '禁用' || this.ruleForm.Enabled == '0') {
          this.ruleForm.Enabled = 0
        }

        this.$axios(
          {
            method: 'post',
            url: this.apiEditor2,
            data: {
              "ID": this.ruleForm.ID,
              "Name": this.ruleForm.Name,
              "ScenicID": this.ruleForm.ScenicID,
              "Type": this.ruleForm.Type,
              "Enabled": this.ruleForm.Enabled,
              "HintMode": this.ruleForm.HintMode,
              "InHintWord": this.ruleForm.InHintWord,
              "OutHintWord": this.ruleForm.OutHintWord,
              "lngLats": this.ruleForm.lngLats

            }
          }
        ).then(res => {
          console.log('编辑的信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.railInfo2 = false
            this.getDefaultInfo()

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })
      },

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
          that.ruleForm.lngLats = pointArr.join(';')

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
        console.log('点击覆盖物', this.ruleForm.lngLats)
        var pointArr = this.ruleForm.lngLats.split(';')
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

      getDefaultInfo() {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery2,
            data: {
              "Name": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          console.log('A2路线huohuo返回+', res.data)
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
              "Name": this.$store.state.railNameParam,
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('路线返回的数据', res.data.value.list)
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

      submitForm(formName) {
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
      },

      cancelForm(formName) {
        this.$refs[formName].resetFields();
        if (formName === 'ruleForm') {
          this.$store.state.railInfo2 = false
        }

      },

    }
  }
</script>

<style scoped>
  #railMap {
    border: 1px solid #ececec;
    width: 100%;
    height: 3.2rem;
    min-height: 300px;
    margin: 0 0 20px 0;
  }
</style>
