<template>
  <div class="treeviewStyle">
    <el-tree
      :data="data"
      :props="defaultProps"
      node-key="id"
      :default-expanded-keys="[1]"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
  export default {
    name: "treeview-component",
    data() {
      return {
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    },
    props:['data'],
    mounted() {

    },
    methods: {

      handleNodeClick(data) {
        console.log('哇哈哈哈是：',data);
        this.$emit('chooseAreaGetListInfo',data)
      }
    }
  }
</script>

<style scoped>
  .treeviewStyle{
    border:1px solid #ececec;
    min-height: 750px;
  }

</style>
