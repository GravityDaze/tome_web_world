<template>
  <div>
    <el-dialog
      title="请选择调整后归属旅行社"
      :visible.sync="$store.state.chooseTourGroupDialog"
      width="38%"
      center>
      <el-tree
        :data="dataTourGroupS"
        :highlight-current="true"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="[3]"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="$store.state.chooseTourGroupDialog = false">取 消</el-button>
    <el-button type="primary" @click="suerChooseScenery">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "choose-tour-group-dialog",
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name',
          transferData:{},
        },

      }
    },
    props:['dataTourGroupS'],
    mounted() {

    },
    methods: {
      handleNodeClick(data) {

        this.transferData = data
        console.log('点击了那个树杈',this.transferData,data.name,data.id);
      },
      //选择景区信息确定事件
      suerChooseScenery() {
        this.$store.state.chooseTourGroupDialog = false
        this.$emit('transferSceneryId',this.transferData)
      }
    }
  }
</script>

<style scoped>

</style>
