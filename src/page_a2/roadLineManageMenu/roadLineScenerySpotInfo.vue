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
      :isShowEnabled222="isShowEnabled222"
      :isHandle="isHandle"
      @queryInfos="queryInfos"
      @delListInfo="delListInfo"
      @getEditorInfos="getEditorInfos"
    >
    </myTables>

    <div id="addEditorForm">
      <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.roadLineScenerySpotInfo2" width="35%"
                 align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>


            <el-col :span="23">
              <el-form-item label="景点名称">
                <el-col v-if="$store.state.titleHeader == '新增'">
                  <el-input v-model="ruleForm.Name" placeholder="请输入景点名称"></el-input>
                </el-col>

                <el-col v-if="$store.state.titleHeader == '编辑'">
                  <el-input v-model="ruleForm.Name" placeholder="请输入景点名称" :disabled="true"></el-input>
                </el-col>

              </el-form-item>
            </el-col>


            <el-col :span="23">
              <el-form-item label="所属路线">
                <el-col>
                  <el-select v-model="ruleForm.TourLineName" class="change_select_style" size="small" placeholder="请选择所属路线">
                    <el-option
                      v-for="item in roadLineInfosArr"
                      :key="item.ID"
                      :label="item.Name"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="景点等级">
                <el-col>
                  <el-select v-model="ruleForm.Level" class="change_select_style" size="small" placeholder="请选择景点等级">
                    <el-option
                      v-for="item in levelArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="景点状态">
                <el-col>
                  <el-select v-model="ruleForm.Status" class="change_select_style" size="small" placeholder="请选择景点状态">
                    <el-option
                      v-for="item in statusArr"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="经纬度">
                <el-col :span="20">
                  <el-input v-model="ruleForm.lngLat" placeholder="例如:104.313456,33.269869"></el-input>
                </el-col>
                <el-col :span="3">
                  <el-button type="warning" @click="getLonLatInfo">拾取坐标</el-button>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="景点地址">
                <el-col>
                  <el-input v-model="ruleForm.Address" placeholder="请输入景点地址"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="联系电话">
                <el-col>
                  <el-input v-model="ruleForm.Phone" placeholder="请输入联系电话"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

            <el-col :span="23">
              <el-form-item label="景点介绍">
                <el-col>
                  <el-input type="textarea" v-model="ruleForm.Introduction" placeholder="请输入景点介绍"></el-input>
                </el-col>

              </el-form-item>
            </el-col>

          </el-row>
          <el-form-item>
            <el-col :span="9" :offset="12">
              <el-button @click="cancelForm('ruleForm')">取消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    name: "road-line-scenery-spot-info",
    data() {
      return {
        change20: '',//编辑时检测是否改变了所属下路下拉的数据
        sign: 'roadLineScenerySpotInfo2',
        apiQuery2: '/a2guider/scenic/query',
        apiAdd2: '/a2guider/scenic/add',
        apiEditor2: '/a2guider/scenic/update',
        apiDel2: '/a2guider/scenic/delete',
        apiScenerySpotIsExist: '/a2guider/scenic/isExit',//验证景点是否已经存在
        apiGetRoadLineInfosArr: '/a2guider/tourLine/dropDown',
        spotName: true,
        isAdd: true,
        isShowEnabled: true,
        isShowEnabled222:true,
        isHandle: true,

        levelArr: [
          {
            id: 1,
            name: 'A级',
            value: 'A级'
          },
          {
            id: 2,
            name: '2A级',
            value: '2A级'
          },
          {
            id: 3,
            name: '3A级',
            value: '3A级'
          },
          {
            id: 4,
            name: '4A级',
            value: '4A级'
          },
          {
            id: 5,
            name: '5A级',
            value: '5A级'
          },
        ],
        statusArr: [
          {
            id: 0,
            name: '禁用',
            value: 0
          },
          {
            id: 1,
            name: '启用',
            value: 1
          },
        ],
        roadLineInfosArr: [
          {
            ID: 1,
            Name: '默认选项',
          },
        ],
        ruleForm: {
          "ID": "",
          "Address": "",
          "Name": "",
          "Level": "",
          "Status": "",
          "lngLat": "",
          "Phone": "",
          "Introduction": "",
          "LngLat": "",
          "TourLineID": "",
          "TourLineName": ""

        },
        // tableTitle: [
        //   {
        //     prop: 'Name',
        //     label: '景点名称',
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'Level',
        //     label: '景点等级',
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'Address',
        //     label: '景点地址',
        //     // width: '120',
        //     align: 'center'
        //   },
        //   {
        //     prop: 'Phone',
        //     label: '联系电话',
        //     // width: '120',
        //     align: 'center'
        //   },
        // ],
        tableData: [
          // {
          //   "Address": "213",
          //   "Name": "123",
          //   "ID": 2367,
          //   "Level": "5A级",
          //   "Status": 1,
          //   "LngLat": "117.445,31.5655",
          //   "Lng": 117.445212,
          //   "Lat": 31.565487,
          //   "Phone": "18280335544",
          //   "Introduction": null
          //
          // }
        ]

      }
    },
    computed: {
      tableTitle:function () {
        return [
          {
            prop: 'Name',
            label: this.$t('roadLineScenerySpotInfo.name'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'Level',
            label: this.$t('roadLineScenerySpotInfo.grade'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'Address',
            label: this.$t('roadLineScenerySpotInfo.address'),
            // width: '120',
            align: 'center'
          },
          {
            prop: 'Phone',
            label: this.$t('roadLineScenerySpotInfo.tel'),
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
      this.getRoadLineInfosArr()
    },
    methods: {
      //获取新增信息里面所属线路下拉数据
      getRoadLineInfosArr() {
        this.$axios(
          {
            method: 'get',
            url: this.apiGetRoadLineInfosArr,
            data: {}
          }
        ).then(res => {
          console.log('get线路信息下拉', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.roadLineInfosArr = [...res.data.value]
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        })
      },


      //获取坐标点
      getLonLatInfo() {
        window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html')
      },

      //新增之前清空表单数据函数
      addBeforeClear() {
        this.$store.state.roadLineScenerySpotInfo2 = true
        for (var i in this.ruleForm) {
          this.ruleForm[i] = ''
        }

      },

      //开始提交新增信息
      addInfo() {
        var that = this
        console.log('开始提交新增信息')

        this.ruleForm.TourLineID = this.ruleForm.TourLineName
        this.$axios(
          {
            method: 'post',
            url: this.apiAdd2,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('新增接口成功返回数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.roadLineScenerySpotInfo2 = false
            this.getDefaultInfo()
            // this.$message.success(res.data.resultStatus.resultMessage)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {
          console.log(error)
        })
      },

      //删除成员信息
      delListInfo(n) {

        this.$axios(
          {
            method: 'post',
            url: this.apiDel2 + '?id=' + n.ID,
            data: {}
          }
        ).then(res => {
          console.log('删除成员信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.getDefaultInfo()

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },

      //获取编辑前的相关信息
      getEditorInfos(n) {
        console.log('从前', n)
        this.$store.state.titleHeader = '编辑'
        this.ruleForm = n
        this.change20 = n.TourLineName


        this.$store.state.roadLineScenerySpotInfo2 = true
      },

      //提交编辑信息
      editorInfo() {
         console.log('zenme回事',this.change20,this.ruleForm.TourLineName)
        if (this.change20 != this.ruleForm.TourLineName) {
          this.ruleForm.TourLineID = this.ruleForm.TourLineName
        }
        this.$axios(
          {
            method: 'post',
            url: this.apiEditor2,
            data: this.ruleForm
          }
        ).then(res => {
          console.log('提交编辑信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.$store.state.roadLineScenerySpotInfo2 = false
            this.getDefaultInfo()
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
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
              "Name": this.$store.state.scenerySpotNameParam,
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
        this.$store.state.roadLineScenerySpotInfo2 = false
      },

    }
  }
</script>

<style scoped>

</style>
