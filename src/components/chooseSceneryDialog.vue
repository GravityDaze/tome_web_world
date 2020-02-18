<template>
  <div>
    <el-dialog
      title="请选择所属景区"
      :visible.sync="$store.state.chooseSceneryDialog"
      width="38%"
      center>
      <el-tree
        :data="dataScenery"
        :highlight-current="true"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="[3]"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="$store.state.chooseSceneryDialog = false">取 消</el-button>
    <el-button type="primary" @click="suerChooseScenery">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "choose-scenery-dialog",
      data() {
        return {
          defaultProps: {
            children: 'children',
            label: 'name',
            transferData:{},
          },

        }
      },
      props:['dataScenery'],
      mounted() {

      },
      methods: {
        handleNodeClick(data) {

          this.transferData = data
          console.log('点击了那个树杈',this.transferData,data.name,data.id);
        },
        //选择景区信息确定事件
        suerChooseScenery() {
          this.$store.state.chooseSceneryDialog = false
          this.$emit('transferSceneryId',this.transferData)
        }
      }
    }
</script>

<style scoped>

</style>
