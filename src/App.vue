<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html {
    min-width: 1280px;
  }

  html, body {
    font-size: 0.12rem;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  /*公共样式*/
  .my_hover {
    cursor: pointer;
  }

  /*轮播样式控制*/
  #layout .el-header {
    padding: 0;
    margin-bottom: 35px;
  }

  #layout .el-main {
    /*padding: 14px 15px;*/
    /*border:1px solid yellow!important;*/
  }

  /*首页地图样式控制*/
  #baidu_map {
    /*border:1px solid red;*/
  }
  .left_div>.el-select{
    flex-grow: 1;
  }

  /*侧边栏样式控制*/
  #sidebar_outbox1 {
    /*border:1px solid red;*/
    width: 15% !important;
  }

  #sidebar_outbox2 {
    /*border:1px solid red;*/
    width: 3.5% !important;
  }

  #sidebar_box .el-submenu {
    width: 100%;
  }

  #sidebar_box .el-menu {
    /*border:1px solid green;*/
    border-right: 0;
  }

  #sidebar_outbox1 #sidebar_box .el-submenu__title {
    /*border:1px solid #2278c8;*/
    /*padding-left: 0.9rem !important;*/
    background-color: #202D3D !important;
    text-align: left;

  }

  #sidebar_outbox1 #sidebar_box .el-menu--inline .el-menu-item {
    /*border:1px solid red;*/
    padding-left: 0.88rem!important;
    /*text-align: center;*/
    text-align: left;
    overflow: hidden;
  }

  /*右侧主体内容样式控制*/
  #el_main_box {
    /*border:1px solid green;*/
    background-color: #F0EEEC;
    /*padding: 20px 17px 20px 0!important;*/
  }

  /*筛选查询组件内部样式设置*/
  .line_box > div > div > input {
    /*景区，景点下拉input框的样式*/
    /*border:1px solid green;*/
    min-height: 40px;
  }

  .line_box > div > input {
    /*日期控件下拉input框的样式*/
    /*border:1px solid green;*/
    min-height: 40px;
  }

  /*公共模态框（新增编辑表单）表单内样式控制*/
  .select_style {
    /*border:1px solid red;*/
    display: flex;

  }

  .select_style1 {
    /*border:1px solid red;*/
    flex-grow: 1;
  }

  #publicAddEditorDialog .el-dialog__header,#sceneryAllInfo .el-dialog__header,#alterPasswordForm .el-dialog__header,#addEditorForm .el-dialog__header,#userInfoForm .el-dialog__header,#myTablesDialog .el-dialog__header{
    /*border: 1px solid red;*/
    background-color: #FA8819;
  }
  /*分页组件的样式控制*/
  .page_control{
    text-align: right;
    padding-top: 0.3rem;
  }

  /*树形结构页面样式控制*/
  .dictionary_manage_style,.district_manage_style,.menu_manage_style,.organization_manage_style{
    /*border:1px solid #ececec;*/
    display: flex;
    flex-direction: row;
  }
  .dictionary_manage_style>div:first-child,.district_manage_style>div:first-child,.menu_manage_style>div:first-child,.organization_manage_style>div:first-child{
    /*border:1px solid green;*/
    width:16%;
    min-width: 120px;
  }
  .dictionary_manage_style>div:nth-child(2),.district_manage_style>div:nth-child(2),.menu_manage_style>div:nth-child(2),.organization_manage_style>div:nth-child(2){
    border:1px solid #ececec;
    flex-grow: 1;
  }
  .my_scroll_x{
    /*border:1px solid magenta!important;*/
    overflow-x: hidden;
  }

  /*单排的新增编辑模态框样式控制*/
  .position_center {
    display: flex;
    justify-content: center;
  }
  .position_center>div{
    display: flex;
    justify-content: center;

  }
  .upload_header,.upload_input{
    border:1px solid #999999;
    width:1.5rem;
    min-width: 100px;
    height: 1.5rem;
    min-height: 100px;
  }
  .upload_input{
    border:1px solid green;
    opacity: 0;
    position: absolute;
  }

  .upload_btn {
    border: 1px solid #999999;
    margin-top: 15px;
    border-radius: 4px;
    width:1rem;
    height: 0.3rem;
    min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tip_info{
    padding: 0.2rem 0;
    white-space: nowrap;
    color: red;
  }
  /*新增编辑模态框内部的上传图片处的样式控制（景点管理处的，因为景区处目前采用自己的上传图片方式，其余的试用element）*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }

  /*景区管理--语言配置里面的二级列表的查询按钮隐藏*/
  .scenery_language_set_box .search_btn{
    display: none!important;
  }
  /*景区管理--语言配置里面的二级列表的分页插件功能隐藏*/
  .scenery_language_set_box .scenery_language_set_page_num{
    display: none!important;
  }

  /*A2后台角色管理隐藏按钮查询*/
  .my_display_none_btn .search_btn {
    display: none!important;
  }

  .change_select_style{
    width:100%;
  }

</style>
