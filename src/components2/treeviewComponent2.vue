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
    name: "treeview-component2",
    data() {
      return {
        defaultProps: {
          children: 'Child',
          label: 'Name'
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
