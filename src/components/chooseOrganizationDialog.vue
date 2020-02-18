<template>
  <div>
    <el-dialog
      title="请选择所属机构"
      :visible.sync="$store.state.chooseOrganizationDialog"
      width="38%"
      center>
      <el-tree
        :data="dataOrganization"
        :highlight-current="true"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="[3]"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="$store.state.chooseOrganizationDialog = false">取 消</el-button>
    <el-button type="primary" @click="suerChooseOrganization">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "choose-organization-dialog",
      data() {
        return {
          defaultProps: {
            children: 'children',
            label: 'name',
            transferData:{},
          },

        }
      },
      props:['dataOrganization'],
      mounted() {

      },
      methods: {
        handleNodeClick(data) {

          this.transferData = data
          console.log('点击了那个树杈',this.transferData,data.name,data.id);
        },
        //选择所属机构信息确定事件
        suerChooseOrganization() {
          this.$store.state.chooseOrganizationDialog = false
          this.$emit('transferOrganizationId',this.transferData)
        }
      }
    }
</script>

<style scoped>

</style>
