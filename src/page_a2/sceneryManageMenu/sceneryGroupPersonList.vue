<template>
  <div class="dictionary_manage_style">
    <div>
      <treeviewComponent2
        :data="data"
        @chooseAreaGetListInfo="chooseAreaGetListInfo"
      ></treeviewComponent2>
    </div>
    <div class="my_scroll_x">
      <mySearchs
        :sign="sign"
        :searchIfInfo="searchIfInfo"
        :isAddQ="isAddQ"
        :isEditorQ="isEditorQ"
        :isCloseTouristGroup="isCloseTouristGroup"
        :isToolBar="isToolBar"
        @queryInfos="queryInfos"
        @addBeforeClear="addBeforeClear"
        @closeTouristGroupFn="closeTouristGroupFn"
      ></mySearchs>
      <myTables
        :tableTitle="tableTitle"
        :tableData="tableData"
        :isShowEnabled="isShowEnabled"
        :isHandle222="isHandle222"
        @queryInfos="queryInfos"
        @lookMapInfo="lookMapInfo"
      ></myTables>

      <div id="addEditorForm">
        <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.sceneryGroupPersonList2222" width="35%"
                   align="left"
                   :close-on-click-modal="false">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
                   :hide-required-asterisk='false'>
            <el-row>



              <el-col :span="23">
                <el-form-item label="旅游团">
                  <el-col v-if="$store.state.titleHeader == '新增'">
                    <el-input v-model="ruleForm.Name" placeholder="请输入旅游团" @blur="checkTouristGroupFn"></el-input>
                  </el-col>

                  <el-col v-if="$store.state.titleHeader == '编辑'">
                    <el-input v-model="ruleForm.Name" placeholder="请输入旅游团" @blur="checkTouristGroupFn"
                              :disabled="true"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label="团账号">
                  <el-col v-if="$store.state.titleHeader == '新增'">
                    <el-input v-model="ruleForm.UserName" placeholder="请输入团账号"
                              @blur="checkTouristGroupNumFn"></el-input>
                  </el-col>

                  <el-col v-if="$store.state.titleHeader == '编辑'">
                    <el-input v-model="ruleForm.UserName" placeholder="请输入团账号" @blur="checkTouristGroupNumFn"
                              :disabled="true"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label="团密码">
                  <el-col>
                    <el-input v-model="ruleForm.UserPwd" placeholder="请输入团密码"></el-input>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label="旅游路线">
                  <el-col>
                    <el-select v-model="ruleForm.TourLineName" class="change_select_style" size="small" placeholder="请选择旅游路线">
                      <el-option
                        v-for="item in canChooseTouristLoadArr"
                        :key="item.ID"
                        :label="item.Name"
                        :value="item.ID"
                      ></el-option>
                    </el-select>
                  </el-col>

                </el-form-item>
              </el-col>
              <el-col :span="23">
                <el-form-item label="电子围栏">
                  <el-col>
                    <el-select v-model="ruleForm.ElectronicFenceName" class="change_select_style" size="small" placeholder="请选择电子围栏">
                      <el-option
                        v-for="item in canChooseRailArr"
                        :key="item.ID"
                        :label="item.Name"
                        :value="item.ID"
                      ></el-option>
                    </el-select>
                  </el-col>

                </el-form-item>
              </el-col>

              <el-col :span="23">
                <el-form-item label="导游">
                  <el-col>
                    <el-select v-model="ruleForm.MemberName" class="change_select_style" size="small" placeholder="请选择导游">
                      <el-option
                        v-for="item in canChooseGuideArr"
                        :key="item.ID"
                        :label="item.Name"
                        :value="item.ID"
                      ></el-option>
                    </el-select>
                  </el-col>

                </el-form-item>
              </el-col>

              <el-col :span="23">
                <el-form-item label="工作模式">
                  <el-col>
                    <el-select v-model="ruleForm.WorkingType" class="change_select_style" size="small" placeholder="请选择工作模式">
                      <el-option
                        v-for="item in workStatusArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>

                </el-form-item>
              </el-col>

              <el-col :span="23">
                <el-form-item label="拨打模式">
                  <el-col>
                    <el-select v-model="ruleForm.Mode" class="change_select_style" size="small" placeholder="请选择拨打模式">
                      <el-option
                        v-for="item in callStatusArr"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-col>

                </el-form-item>
              </el-col>

              <el-col :span="23">
                <el-form-item label="描述">
                  <el-col>
                    <el-input v-model="ruleForm.Remark" placeholder="请输入描述信息"></el-input>
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

      <div id="userInfoForm">
        <el-dialog
          title="查询轨迹"
          :visible.sync="dialogVisible"
          width="80%">
          <div id="baidu_map">

          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
        </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
        name: "scenery-group-person-list",
      data(){
          return {
            idChange1:'',
            idChange2:'',
            idChange3:'',
            lineLoadPointArr:[],//查询轨迹点坐标数组
            dialogVisible: false,
            freeParam2: '',//新增团时，选择景区服务商以后记录此服务商的id,用于后面获取数据是的调用
            sign:'sceneryGroupPersonList2222',
            apiQuery2:'/a2guider/member/queryTeamMember',
            apiAdd2:'/a2guider/touristTeam/add',
            apiEditor2: '/a2guider/touristTeam/edit',
            apiDel2: '/a2guider/touristTeam/delete',
            apiTree:'/a2guider/touristTeam/query',
            apiGetEditorInfo2: '/a2guider/touristTeam/get',
            // apiSceneryProviderDropDown: '/a2guider/travelGency/dropDown',
            apiTouristLoadDropDown2: '/a2guider/tourLine/dropDown',//旅游线路下拉
            apiRailDropDown2: '/a2guider/electronicFence/dropDown',//电子围栏下拉
            apiGuideDropDown2: '/a2guider/member/queryGuider',//导游下拉
            apiCheckTouristGroupFn: '/a2guider/touristTeam/checkName',
            apiCheckTouristGroupNumFn: '/a2guider/touristTeam/checkUserName',
            apiLookMapInfo:'/a2guider/historyTrace/queryMember',
            canChooseSceneryProviderArr: [],
            canChooseTouristLoadArr: [],
            canChooseRailArr: [],
            canChooseGuideArr: [],
            callStatusArr: [
              {
                id: 0,
                name: '一次接听就停止'
              },
              {
                id: 1,
                name: '循环拨打'
              },

            ],

            workStatusArr: [
              {
                id: 0,
                name: '正常模式（30分钟）'
              },
              {
                id: 1,
                name: '紧急模式（10秒）'
              },
              {
                id: 2,
                name: '自定义模式>3分钟'
              },
            ],
            isShowEnabled:true,
            isCloseTouristGroup:true,//关闭旅游团按钮
            isHandle222: true,
            isAddQ: true,//显示新增按钮
            isEditorQ: true,//显示编辑按钮
            searchIfInfo: true,
            isToolBar:false,//这个属于树形视图页面独有的属性，重点注意，表示是否显示筛选按钮及查询按钮
            // tableTitle: [
            //   {
            //     prop: 'Name',
            //     label: '姓名',
            //     // width: '600',
            //     align: 'center'
            //   },
            //
            //   {
            //     prop: 'isOnLine',
            //     label: '是否在线',
            //     // width: '500',
            //     align: 'center',
            //     formatter:function (row) {
            //       if(row.isOnLine=='0'){
            //         return '离线'
            //       }else if(row.isOnLine=='1'){
            //         return '在线'
            //       }
            //     }
            //   },
            //
            // ],
            tableData: [
              // {
              //   "isOnLine": 0,
              //   "ID": 7181,
              //   "Name": "Q002485",
              //   "TerminalID": 4662
              //
              // }
            ],
            data: [
              {
                id:1,
                name: '系统字典',
                children: [
                  {
                    id:2,
                    name: '性别',
                    children: [
                      {
                        id:3,
                        name: '男',
                      },
                      {
                        id:4,
                        name: '女',

                      },
                    ]
                  },
                  {
                    id:5,
                    name: '信道',
                  },
                ]
              }
            ],
            ruleForm: {
              "TourLineID": '',
              "TourLineName": '',
              "ElectronicFenceID": '',
              "ElectronicFenceName": '',
              "UserName": '',
              "UserPwd": '',
              "Name": '',//游团名称
              "MemberID": '',
              "MemberName": '',
              "Remark": '',
              "WorkingType": '',//  0 正常模式 (30分钟)  1 紧急模式(10秒) 2 自定义模式 >3分钟
              "Mode": '',//0 一次接听就停止  1 循环拨打

            },
          }
      },
      computed: {
        tableTitle:function () {
            return [
              {
                prop: 'Name',
                label: this.$t('sceneryGroupPersonInfo.name'),
                // width: '600',
                align: 'center'
              },

              {
                prop: 'isOnLine',
                label: this.$t('sceneryGroupPersonInfo.isOnline'),
                // width: '500',
                align: 'center',
                formatter:function (row) {
                  if(row.isOnLine=='0'){
                    return '离线'
                  }else if(row.isOnLine=='1'){
                    return '在线'
                  }
                }
              },

            ]
          }
      },
      mounted(){
        this.$store.state.pageNumParam=1
        this.$store.state.isShowHomeCountParam = false
        this.$store.state.isShowAlert = false

        this.$store.state.addparamsss = false

        // this.getDefaultInfo()
        this.getDefaultTrees()
      },
      methods: {


        //旅游团名称校验
        checkTouristGroupFn() {
          this.ruleForm.TravelGencyID = this.ruleForm.TravelGencyName
          this.$axios(
            {
              method: 'get',
              url: this.apiCheckTouristGroupFn + '?Name=' + this.ruleForm.Name,
              data: {}
            }
          ).then(res => {
            console.log('旅游团名称校验结果', res.data)
            if (res.data.resultStatus.resultCode === '0000') {

              if (this.ruleForm.Name && res.data.value.result) {
                this.$message.success('此旅游团名称可用')
              } else if (this.ruleForm.Name) {
                this.$message.warning('此旅游团名称不可用')
                this.ruleForm.Name = ''
              }

            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
              this.ruleForm.Name = ''
            }
          }).catch(error => {
            console.log(error)
          })
        },
        //团号校验
        checkTouristGroupNumFn() {
          this.$axios(
            {
              method: 'get',
              url: this.apiCheckTouristGroupNumFn + '?UserName=' + this.ruleForm.UserName,
              data: {}
            }
          ).then(res => {
            console.log('团号校验结果', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              if (this.ruleForm.UserName && res.data.value.result) {
                this.$message.success('此团号可用')
              } else if (this.ruleForm.UserName) {
                this.$message.warning('此团号不可用')
                this.ruleForm.UserName = ''
              }

            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
              this.ruleForm.UserName = ''
            }
          }).catch(error => {
            console.log(error)
          })
        },


        //获取路线下拉列表信息
        getTouristLoadDropDown() {
          this.$axios(
            {
              method: 'get',
              url: this.apiTouristLoadDropDown2,
              data: {}
            }
          ).then(res => {
            console.log('嚯嚯嚯：', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              // this.a2ChooseServiceProviderArr = [...res.data.value]
              this.canChooseTouristLoadArr = [...res.data.value]
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })
        },

        //获取电子围栏下拉列表信息
        getRailDropDown() {
          this.$axios(
            {
              method: 'get',
              url: this.apiRailDropDown2,
              data: {}
            }
          ).then(res => {
            console.log('嚯嚯嚯：', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              // this.a2ChooseServiceProviderArr = [...res.data.value]
              this.canChooseRailArr = [...res.data.value]
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })
        },

        //获取导游下拉列表信息
        getGuideDropDown() {
          this.$axios(
            {
              method: 'get',
              url: this.apiGuideDropDown2,
              data: {}
            }
          ).then(res => {
            console.log('嚯嚯嚯：', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              // this.a2ChooseServiceProviderArr = [...res.data.value]
              this.canChooseGuideArr = [...res.data.value]
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })
        },

        //新增之前清空表单数据函数
        addBeforeClear() {

          this.getTouristLoadDropDown()
          this.getRailDropDown()
          this.getGuideDropDown()

          this.$store.state.sceneryGroupPersonList2222 = true

          for (var i in this.ruleForm) {
            this.ruleForm[i] = ''
          }


        },

        //开始提交新增信息
        addInfo() {
          var that = this
          console.log('开始提交新增信息')
          this.ruleForm.TourLineID = this.ruleForm.TourLineName
          this.ruleForm.ElectronicFenceID = this.ruleForm.ElectronicFenceName
          this.ruleForm.MemberID = this.ruleForm.MemberName
          this.$axios(
            {
              method: 'post',
              url: this.apiAdd2,
              data: this.ruleForm
            }
          ).then(res => {
            console.log('新增接口成功返回数据', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              this.$store.state.sceneryGroupPersonList2222 = false

              this.getDefaultInfo()

            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {
            console.log(error)
          })
        },

        //提交编辑信息
        editorInfo() {

          // console.log('this.ruleForm.MemberName',this.ruleForm.MemberName,'this.idChange3',this.idChange3)
          if(this.ruleForm.TourLineName != this.idChange1){
            this.ruleForm.TourLineID = this.ruleForm.TourLineName
          }
          if(this.ruleForm.ElectronicFenceName != this.idChange2){
            this.ruleForm.ElectronicFenceID = this.ruleForm.ElectronicFenceName
          }
          if(this.ruleForm.MemberName != this.idChange3){
            this.ruleForm.MemberID = this.ruleForm.MemberName
          }
          // if(this.ruleForm.Status == this.statusChange1){
          //   this.ruleForm.Status = this.ruleForm.Status == '启用'?'1':'0'
          // }

          this.$axios(
            {
              method: 'post',
              url: this.apiEditor2,
              data: this.ruleForm
            }
          ).then(res => {
            console.log('提交编辑信息', res.data)
            if (res.data.resultStatus.resultCode === '0000') {
              this.$store.state.sceneryGroupPersonList2222 = false
              this.$store.state.isSuccessGetEditInfo = false
              this.getDefaultInfo()
            } else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })
        },

        //关闭旅游团方法函数
        closeTouristGroupFn() {
          // alert('即将关闭旅游团')

          if (this.$store.state.myTouristTeamID) {
            this.$axios(
              {
                method: 'get',
                url: this.apiDel2 + '?ID=' + this.$store.state.myTouristTeamID,
                data: {}
              }
            ).then(res => {
              console.log('关闭旅游团', res.data)
              if (res.data.resultStatus.resultCode === '0000') {
                this.$message.success(res.data.resultStatus.resultMessage)
              } else {
                this.$message.warning(res.data.resultStatus.resultMessage)
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            this.$message.warning('请选择需要删除的旅游团')
          }


        },


        //默认获取树形结构数据
        getDefaultTrees() {
          this.$axios(
            {
              method: 'get',
              url: this.apiTree,
              data: {}
            }
          ).then(res => {
            console.log('字典管理默认获取树形结构图数据', res.data)
            if(res.data.resultStatus.resultCode === '0000'){
              this.data = [...res.data.value]
            }else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })
        },


        //选择左边菜单树对应节点后，将选择的对应值ID赋值给，parentId，用于查询此parentId下对应的列表
        chooseAreaGetListInfo(n) {
          console.log('选择树结构，传值过来++', n)

          if (n.Type == 2) {
            this.$store.state.myTouristTeamID = n.ID
            this.getDefaultInfo()


            this.getTouristLoadDropDown()
            this.getRailDropDown()
            this.getGuideDropDown()

            //以下的请求是为了到时候编辑团的时候先默认获取编辑信息
            this.$axios(
              {
                method: 'get',
                url: this.apiGetEditorInfo2 + '?ID=' + n.ID,
                data: {}
              }
            ).then(res => {
              console.log('ko编辑前信息获取+++', res.data)
              if (res.data.resultStatus.resultCode === '0000') {
                this.$store.state.titleHeader = '编辑'
                this.$store.state.isSuccessGetEditInfo = true
                this.ruleForm = res.data.value
                this.idChange1 = res.data.value.TourLineName
                this.idChange2 = res.data.value.ElectronicFenceName
                this.idChange3 = res.data.value.MemberName
                // alert(this.ruleForm.MemberID)

              } else {
                this.$message.warning(res.data.resultStatus.resultMessage)
                this.$store.state.isSuccessGetEditInfo = false
              }
            }).catch(error => {
              console.log(error)
            })
          }


        },

        //获取默认列表信息方法
        getDefaultInfo() {
          var that = this
          this.$axios(
            {
              method: 'post',
              url: this.apiQuery2,
              data: {
                "TouristTeamID": this.$store.state.myTouristTeamID,
                "search": '',
                // "search":this.$store.state.searchIfInfoParam2,
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
                "TouristTeamID": this.$store.state.myTouristTeamID,
                "search": this.$store.state.searchIfInfoParam2,
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
          this.$store.state.sceneryGroupPersonList2222 = false
          this.$store.state.isSuccessGetEditInfo = false
        },

        map() {
          // alert('地图快来')
          var that = this
          var map = new BMap.Map("baidu_map", {minZoom: 5, maxZoom: 18}); // 创建Map实例,设置地图允许的最小/大级别
          if(this.lineLoadPointArr.length==0){

            var point = new BMap.Point(this.$store.state.centerPointLngParam, this.$store.state.centerPointLatParam);
            map.centerAndZoom(point, this.$store.state.mapSizeParam);
            map.enableScrollWheelZoom();//

          }else if(this.lineLoadPointArr.length!=0){

            let lngParam = this.lineLoadPointArr[0].split(',')[0]
            let latParam = this.lineLoadPointArr[0].split(',')[1]

            var point = new BMap.Point(lngParam, latParam);

            map.centerAndZoom(point, 12);

            map.enableScrollWheelZoom();//

            var polylineAllPointArr = []

            for(let i=0;i<this.lineLoadPointArr.length;i++){
              let lng1= this.lineLoadPointArr[i].split(',')[0]
              let lat1= this.lineLoadPointArr[i].split(',')[1]
              let pp = new BMap.Point(lng1, lat1)
              polylineAllPointArr.push(pp)
            }

            var polyline = new BMap.Polyline(polylineAllPointArr, {strokeColor:"red", strokeWeight:5, strokeOpacity:0.5});   //创建折线

            map.addOverlay(polyline);          //增加折线

          }



        },

        lookMapInfo(n) {
          console.log('查询轨迹时，传过来了什么参数', n)

          this.$axios(
            {
              method:'post',
              url:this.apiLookMapInfo,
              data:{
                "MemberID":n.ID,
                "TerminalID":n.TerminalID
              }
            }
          ).then(res => {
            console.log('查询轨迹接口返回数据',res.data)
            if(res.data.resultStatus.resultCode === '0000'){
              this.dialogVisible = true
              this.lineLoadPointArr = [...res.data.value.trace]
              // this.lineLoadPointArr = [
              //   '104.222,33.110',
              //   '104.022,33.001',
              //   '105.333,33.125',
              //   '104,34'
              // ]
              this.$nextTick(this.map)
            }else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }
          }).catch(error => {

          })
        }

      }
    }
</script>

<style scoped>
  #baidu_map {
    border: 1px solid #ececec;
    width: 100%;
    height: 5.5rem;
    min-height: 350px;
    /*margin: 20px 0;*/
  }
</style>
