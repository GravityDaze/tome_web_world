<template>
  <div>
    <el-dialog
      title="请选择所属区域"
      :visible.sync="$store.state.chooseAreaDialog"
      width="38%"
      center>
      <el-tree
        :data="dataArea"
        :highlight-current="true"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="[3]"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="$store.state.chooseAreaDialog = false">取 消</el-button>
    <el-button type="primary" @click="suerChooseArea">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "choose-area-dialog",
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name',
          transferData:{},
        },

      }
    },
    props:['dataArea'],
    mounted() {

    },
    methods: {
      handleNodeClick(data) {

        this.transferData = data
        console.log('点击了那个树杈',this.transferData,data.name,data.id);
      },
      //选择区域信息确定事件
      suerChooseArea() {
        this.$store.state.chooseAreaDialog = false
        this.$emit('transferAreaId',this.transferData)
      }
    }
  }
</script>

<style scoped>

</style>
