<template>
  <div>
    <el-dialog
      title="请选择服务商"
      :visible.sync="$store.state.chooseSceneryServiceDialog"
      width="38%"
      center>
      <el-tree
        :data="dataSceneryService"
        :highlight-current="true"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="[3]"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="$store.state.chooseSceneryServiceDialog = false">取 消</el-button>
    <el-button type="primary" @click="suerChooseSceneryService">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "choose-scenery-service-dialog",
      data() {
        return {
          defaultProps: {
            children: 'children',
            label: 'name',
            transferData:{},
          },

        }
      },
      props:['dataSceneryService'],
      mounted() {

      },
      methods: {
        handleNodeClick(data) {

          this.transferData = data
          console.log('点击了那个树杈',this.transferData,data.name,data.id);
        },
        //选择区域信息确定事件
        suerChooseSceneryService() {
          this.$store.state.chooseSceneryServiceDialog = false
          this.$emit('transferSceneryServiceId',this.transferData)
        }
      }
    }
</script>

<style scoped>

</style>
