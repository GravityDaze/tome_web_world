<template>
  <div>
    <mySearchs
      :guideTel="guideTel"
      :userSerialNum="userSerialNum"
      :affiliatedScenery="affiliatedScenery"
      :affiliatedSceneryRRR="affiliatedSceneryRRR"
      :imeiNum="imeiNum"
      :affiliatedTourCompany="affiliatedTourCompany"
      :groupNum="groupNum"
      :createGroupTime="createGroupTime"
      :sceneryState="sceneryState"
      :touristState="touristState"
      :isAdjustTourCompany="isAdjustTourCompany"
      @queryInfos="queryInfos"
    ></mySearchs>
    <myTables
      :sign="sign"
      :tableTitle="tableTitle"
      :tableData="tableData"
      :isShowEnabled="isShowEnabled"
      :isTourGroupSerialNum="isTourGroupSerialNum"
      :isShowTravelState="isShowTravelState"
      @chooseInfo="chooseInfo"
      @queryInfos="queryInfos"
      @getDefaultNewPageInfo="getDefaultNewPageInfo"
    ></myTables>

    <myTablesDialog
      :tableTitleDialog="tableTitleDialog"
      :tableDataDialog="tableDataDialog"
      :titleList="titleList"
      :ruleFormNewPage="ruleFormNewPage"
      :sign="sign"
      :idParam="idParam"
      @getNewPageInfo="getNewPageInfo"
    ></myTablesDialog>

    <div id="addEditorForm">
      <el-dialog title="调整旅行社" :visible.sync="$store.state.tourGroupManageSign" width="30%" align="left"
                 :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" size="small"
                 :hide-required-asterisk='false'>
          <el-row>
            <el-col :span="16" :offset="3">
              <el-form-item label="当前所属旅行社" prop="oldAffiliatedTourCompany">
                <el-col>
                  <el-input v-model="ruleForm.oldAffiliatedTourCompany" disabled="disabled"></el-input>
                </el-col>

              </el-form-item>
            </el-col>
            <el-col :span="16" :offset="3">
              <el-form-item label="此团调整归属于" prop="alterAffiliatedTourCompany">
                <el-col>
                  <el-input v-model="ruleForm.alterAffiliatedTourCompany" @focus="openChooseTourGroupDialog"></el-input>
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

    <chooseTourGroupDialog
      :dataTourGroupS="dataTourGroupS"
      @transferSceneryId="transferSceneryId"
    ></chooseTourGroupDialog>
  </div>
</template>

<script>
  export default {
    name: "tour-group-manage",
    data() {
      return {
        apiQuery: '/mis/touristTeam/query',
        apiTourGroupInfos:'/mis/touristTeam/getDetails',//游团管理-游团详情信息接口
        apiTourMembers:'/mis/touristTeam/queryMember',
        apiChooseTourGroups:'/mis/travelAgency/queryChoose',//默认获取选择旅行社的所有选择信息
        apiChangeTourGroup:'/mis/touristTeam/change',//最终改变归属旅游团后提交信息接口
        sign: 'tourGroupManage',
        idParam:'',//此参数用于传递给子组件用于请求游团行迹接口参数
        guideTel: true,
        userSerialNum: true,
        affiliatedScenery: false,//所属景区
        affiliatedSceneryRRR: true,//归属景区
        imeiNum: true,
        affiliatedTourCompany: true,
        groupNum: true,
        createGroupTime: true,
        sceneryState: false,//代表状态，启用禁用
        touristState: true,//代表出行状态
        isAdjustTourCompany: true,
        isShowEnabled: true,
        isTourGroupSerialNum: true,//table列表内部是否显示旅游团编码
        isShowTravelState: true,//table中是否显示出行状态
        commonId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        commonGuideId: '',//此参数是要执行对应操作按钮事件之前先通过表格列点击事件获取到信息，然后供后续操作使用
        tableTitle: [
          {
            prop: 'code',
            label: '团号',
            width: '80',
            align: 'center'
          },
          {
            prop: 'travelAgencyName',
            label: '所属旅行社',
            // width: '200',
            align: 'center'
          },
          {
            prop: 'guideName',
            label: '导游姓名',
            width: '100',
            align: 'center'
          },
          {
            prop: 'guidePhone',
            label: '导游手机号',
            width: '100',
            align: 'center'
          },
          {
            prop: 'sceneryName',
            label: '所属景区',
            width: '100',
            align: 'center'
          },
          {
            prop: 'imei',
            label: '设备IMEI',
            width: '100',
            align: 'center'
          },
          {
            prop: 'teamNum',
            label: '成员数',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'createDatetime',
            label: '建团时间',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'channelNo',
            label: '占用信道',
            // width: '100',
            align: 'center'
          },

          {
            prop: 'updator',
            label: '最后更新者',
            width: '90',
            align: 'center'
          },
          {
            prop: 'updateDatetime',
            label: '更新时间',
            // width: '180',
            align: 'center'
          },
        ],
        tableData: [
          {
            channelNo: "1",
            code: "1239",
            createDatetime: "2019-07-31 18:39:58",
            guideName: "caojunjun",
            guidePhone: "18217638005",
            id: 151,
            imei: "352273017386998",
            no: "T00162",
            sceneryId: 2,
            sceneryName: "青城山",
            status: 0,
            teamNum: 2,
            travelAgencyId: 0,
            travelAgencyName: "导游私团",
            updateDatetime: null,
            updator: null,
          }
        ],

        tableTitleDialog: [
          {
            prop: 'onlineAmount',
            label: '在线总数',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'offlineAmount',
            label: '离线总数',
            width: '100',
            align: 'center'
          },
          {
            prop: 'scenicId',
            label: '景区Id',
            // width: '100',
            align: 'center'
          },
          {
            prop: 'personName',
            label: '负责人姓名',
            width: '120',
            align: 'center'
          },
          {
            prop: 'personTel',
            label: '负责人电话',
            width: '180',
            align: 'center'
          },
          {
            prop: 'address',
            label: '通讯地址',
            width: '300',
            align: 'center'
          },
        ],
        tableDataDialog: [
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '9999',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },
          {

            onlineAmount: '40',
            offlineAmount: '10',
            scenicId: '66',
            personName: '彭超',
            personTel: '13345811137',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {

            onlineAmount: '40',
            offlineAmount: '110',
            scenicId: '67',
            personName: '龚俊政',
            personTel: '13314725836',
            address: '天堂路果子村'
          },

        ],
        titleList: [
          {
            id: 1,
            title: '旅游团信息'
          },
          {
            id: 2,
            title: '旅游团成员'
          },
          {
            id: 3,
            title: '旅游团行迹'
          },

        ],
        dataTourGroupS:[],//选择旅行社模态框旅行社数据集合

        ruleForm: {
          oldAffiliatedTourCompany: '',//当前归属的旅行社
          alterAffiliatedTourCompany: '',//调整后归属于哪个旅行社
          alterAffiliatedTourCompanyId:'',//调整后归属于哪个旅行社ID
          tourGroupId:'',//旅游团id
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        },
        //此参数表示点击对应tables里面的详情信息时，呈现的信息内容对象
        ruleFormNewPage: {
          tourGroupSerialNum:'',//游团编码
          groupNum:'',//团号
          tourCompanySerialNum:'',//旅行社编号
          tourCompanyName:'',//旅行社名称
          guideName:'',//导游姓名
          guideTel:'',//导游电话
          affiliatedScenery:'',//所属景区
          imeiNum:'',//设备IMEI
          memberNum:'',//成员数
          createdGroupPlace:'',//建团地址
          lnglat:'',//坐标
          createdGroupTime:'',//建团时间
          relieveGroupTime:'',//散团时间
          updateMan:'',//最后更新者
          updateTime:'',//更新时间
          tourState:'',//出行状态
        },

      }
    },
    mounted() {
      this.$store.state.pageNumParam=1
      this.$store.state.isShowHomeCountParam = false
      this.getDefaultInfo()
    },
    methods: {
      //获取默认列表信息方法
      getDefaultInfo() {
        var that = this
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "phone": "",
              "customerNo": "",
              "travelAgencyName": "",
              "code": "",
              "sceneryName": "",
              "startDatetime": "",
              "endDatetime": "",
              "imei": "",
              "status": "",
              "pageNum": 1,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          console.log('游团管理返回的数据', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            that.$store.state.totalParam = res.data.value.total
            // console.log('返回的数据', that.$store.state.totalParam)
            this.tableData = [...res.data.value.list]

            // console.log('赋值的数据', this.tableData)
            that.$store.state.showLoading = false
          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //点击列表每一行都需要先获取相关行的信息id
      chooseInfo(n) {
        console.log('到底会给我什么样的信息呢',n)
        this.commonId = n.id
        this.idParam = n.id
        this.commonGuideId = n.guideId
        this.ruleForm.tourGroupId = n.id //旅游团id
        this.ruleForm.oldAffiliatedTourCompany = n.travelAgencyName
      },

      //查询按钮或者点击翻页按钮返回列表数据
      queryInfos(n) {
        this.$axios(
          {
            method: 'post',
            url: this.apiQuery,
            data: {
              "phone": this.$store.state.guideTelParam,//导游手机号
              "customerNo": this.$store.state.userSerialNumParam,//用户编号,此处为导游编号
              "travelAgencyName": this.$store.state.affiliatedTourCompanyParam,//旅行社
              "code": this.$store.state.groupNumParam,//团号
              "sceneryName": this.$store.state.affiliatedSceneryRRRParam,//归属景区，备注归属景区和所属景区有点点区别，一个是选择式的，一个是输入文字式的
              "startDatetime": this.$store.state.startDatetimeParam,
              "endDatetime": this.$store.state.endDatetimeParam,
              "imei": this.$store.state.imeiNumParam,//建团设备imei号
              "status":this.$store.state.touristStateParam,//状态,此处的状态代表出行状态，所以参数有变化
              "pageNum": this.$store.state.pageNumParam,
              "pageSize": this.$store.state.pageSizeParam,
            }
          }
        ).then(res => {
          if (res.data.resultStatus.resultCode === '0000') {
            console.log('返回的数据', res.data.value.list)
            this.tableData = [...res.data.value.list]
            this.$store.state.totalParam = res.data.value.total
            console.log('赋值的数据', this.tableData)

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }
        }).catch(error => {

        })
      },

      //点击详情页面里面的tabs按钮获取详情接口
      getNewPageInfo(n) {
        console.log('触发了父级事件哦', n)
        var k = 0
        if (n) {
          k = n
        } else {
          k = 0
        }
        if (k == 0) {
          this.$axios(
            {
              method: 'post',
              url: this.apiTourGroupInfos + '?id=' + this.commonId,
              data: {}
            }
          ).then(res => {
            console.log(res.data)
            if (res.data.resultStatus.resultCode === '0000') {

            }else {
              this.$message.warning(res.data.resultStatus.resultMessage)
            }

          }).catch(error => {

          })
        } else{
          // alert('其实我要掉1接口,游团管理-旅游团成员')
          var requestApi=''
          if(k==1){
            //游团管理-旅游团成员
            requestApi =this.apiTourMembers
          }else if(k==2){
            requestApi =this.apiTourMembers
          }

          this.$axios(
            {
              method: 'post',
              url: requestApi,
              data: {
                "id":this.commonId,
                "imei":"",
                "customerPhone":"",
                "pageNum": 1,
                "pageSize": 10000,
              }
            }
          ).then(res => {
            console.log('复杂数据', res.data.value)
            //for in 是为了循环出表头
            var obj = res.data.value.cnHeads
            var arr = []
            for (var t in obj) {
              var needJson = {
                prop: '',
                label: '',
                align: 'center'
              }
              needJson.prop = t
              needJson.label = obj[t]
              arr.push(needJson)
            }
            console.log('到底是什么鬼', arr)
            this.tableTitleDialog = [...arr]
            this.tableDataDialog = [...res.data.value.list]

          }).catch(error => {

          })
        }
      },

      //默认第一初始化对应景区的详情数据获取事件（通过点击景区编码触发）
      getDefaultNewPageInfo(n) {
        console.log('触发了父级事件哦，获取用户详情', n)

        this.$axios(
          {
            method: 'post',
            url: this.apiTourGroupInfos + '?id=' + n,
            data: {}
          }
        ).then(res => {
          console.log('获取用户详情',res.data)
          if (res.data.resultStatus.resultCode === '0000') {

            this.ruleFormNewPage.tourGroupSerialNum = res.data.value.id
            this.ruleFormNewPage.groupNum = res.data.value.code
            this.ruleFormNewPage.tourCompanySerialNum = res.data.value.travelAgencyNo
            this.ruleFormNewPage.tourCompanyName = res.data.value.travelAgencyName
            this.ruleFormNewPage.guideName = res.data.value.guideName
            this.ruleFormNewPage.guideTel = res.data.value.guidePhone
            this.ruleFormNewPage.affiliatedScenery = res.data.value.sceneryName
            this.ruleFormNewPage.imeiNum = res.data.value.imei
            this.ruleFormNewPage.memberNum = res.data.value.teamNum
            this.ruleFormNewPage.createdGroupPlace = res.data.value.address
            this.ruleFormNewPage.lnglat = res.data.value.lonLat
            this.ruleFormNewPage.createdGroupTime = res.data.value.createDatetime
            this.ruleFormNewPage.relieveGroupTime = res.data.value.dissolveDateTime
            this.ruleFormNewPage.updateMan = res.data.value.updator
            this.ruleFormNewPage.updateTime = res.data.value.updateDatetime
            this.ruleFormNewPage.tourState = res.data.value.status == '0'?'出行中':'已完团'

            this.$store.state.isShowTablesDialog = true

          } else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })
      },

      //所属景区：获取焦点打开新增编辑状态下的选择景区模态框
      // openEditorSceneryDialog() {
      //
      //   this.openChooseTourGroupDialog()
      // },
      //调整归属旅行社input框获取焦点时打开旅行社选择模态框并返回所有旅行社信息
      openChooseTourGroupDialog() {
        this.$axios(
          {
            method: 'post',
            url: this.apiChooseTourGroups,
            data: {
              "guideId": this.commonGuideId,
              "name": ""
            }
          }
        ).then(res => {
          console.log('注意查看可以选择的旅行社信息', res.data)
          if (res.data.resultStatus.resultCode === '0000') {
            this.dataTourGroupS = [...res.data.value]
            this.$store.state.chooseTourGroupDialog = true
          }else {
            this.$message.warning(res.data.resultStatus.resultMessage)
          }

        }).catch(error => {

        })

      },

      //选择了具体景区信息以后，返回针对性的id和name
      transferSceneryId(n) {
        console.log('猜++++我收到了什么哦',n)

        this.ruleForm.alterAffiliatedTourCompanyId = n.id
        this.ruleForm.alterAffiliatedTourCompany = n.name

      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');

            this.$axios(
              {
                method:'post',
                url:this.apiChangeTourGroup,
                data:{
                  "travelAgencyId":this.ruleForm.alterAffiliatedTourCompanyId,//旅行社id
                  "id":this.ruleForm.tourGroupId,//旅游团id
                }
              }
            ).then(res => {
              if(res.data.resultStatus.resultCode === '0000'){
                // console.log(res.data)
                this.$message.success(res.data.resultStatus.resultMessage)
                for(var i in this.ruleForm){
                  this.ruleForm[i] = ''
                }
                this.getDefaultInfo()
              }else {
                this.$message.warning(res.data.resultStatus.resultMessage)
              }
            }).catch(error => {

            })
            this.$store.state.tourGroupManageSign = false

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancelForm(formName) {
        this.$refs[formName].resetFields();
        this.$store.state.tourGroupManageSign = false

      },

    }
  }
</script>

<style scoped>

</style>
