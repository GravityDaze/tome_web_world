<template>
  <div id="addEditorForm">
    <el-dialog :title="$store.state.titleHeader" :visible.sync="$store.state.scenerySign" width="50%" align="left" :close-on-click-modal="false">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
               :hide-required-asterisk='false'>
        <el-row>
          <!--<el-col :span="10">-->
            <!--<el-form-item label="语言" prop="region">-->
              <!--<el-col class="select_style">-->
                <!--<el-select v-model="ruleForm.region" placeholder="请选择语言" class="select_style1">-->
                  <!--<el-option label="中文" value="shanghai"></el-option>-->
                  <!--<el-option label="English" value="beijing"></el-option>-->
                <!--</el-select>-->
              <!--</el-col>-->

            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="10">
            <el-form-item label="景区名" prop="name">
              <el-col>
                <el-input v-model="ruleForm.name"></el-input>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="所属区域" prop="name">
              <el-col>
                <el-input v-model="ruleForm.area"></el-input>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="景区级别" prop="region">
              <el-col class="select_style">
                <el-select v-model="ruleForm.grade" placeholder="请选择语言" class="select_style1">
                  <el-option label="中文" value="shanghai"></el-option>
                  <el-option label="English" value="beijing"></el-option>
                </el-select>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="景区服务商" prop="name">
              <el-col>
                <el-input v-model="ruleForm.area"></el-input>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="紧急电话" prop="name">
              <el-col>
                <el-input v-model="ruleForm.sosTel"></el-input>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="经纬度" prop="name">
              <el-col :span="15">
                <el-input v-model="ruleForm.lnglat"></el-input>
              </el-col>
              <el-col :span="9" style="text-align: center;display: flex;">
                <span style="flex-grow: 1;background-color: #ececec;white-space: nowrap;font-size: 12px">拾取坐标</span>
              </el-col>

            </el-form-item>
          </el-col>


          <el-col :span="10" >
            <el-form-item label="景区链接" prop="name">
              <el-col>
                <el-input v-model="ruleForm.linkAddress"></el-input>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="3">
            <el-form-item label="景区地址" prop="name">
              <el-col>
                <el-input v-model="ruleForm.address"></el-input>
              </el-col>

            </el-form-item>
          </el-col>
          <el-col :span="10" style="display: none">
            <el-form-item label="活动时间" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="1" :offset="1">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <!--<el-col :span="3">-->
            <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
          <!--</el-col>-->
          <el-col :span="9" :offset="12">
            <el-button @click="cancelForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'add-editor-form',
    data() {
      return {
        dialogFormVisible: true,
        hah: true,
        ruleForm: {
          name: '',
          region: '',
          area:'',//所属区域
          lnglat:'',//经纬度
          grade:'',//景区级别
          sosTel:'',//紧急电话
          linkman:'',//负责人
          linkTel:'',//负责人电话
          linkAddress:'',//景区链接
          address:'',//详细地址
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
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
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.$store.state.scenerySign = false
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancelForm(formName) {
        this.$refs[formName].resetFields();
        this.$store.state.scenerySign = false
      }
    }
  };
</script>

<style scoped>

</style>
