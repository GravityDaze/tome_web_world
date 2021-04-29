/* 
    通用上传组件
    Author:朱星杰
    Date:2020/2/26
*/

<template>
  <el-upload
    class="uploader"
    action="https://tome3pay.zhihuiquanyu.com/mis/upload/uploadImage"
    :element-loading-text="tips"
    :show-file-list="listType !== 'text'"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
    :on-progress="onProgress"
    :on-error="onError"
    :on-remove="onRemove"
    :on-preview="onPreview"
    :file-list="fileList"
    :list-type="listType"
  >
    <div v-if="tips" slot="tip" class="el-upload__tip">
      {{ tips }}
    </div>
    <img v-if="imageUrl" :src="imageUrl" class="img" />
    <i v-else :class="['el-icon-plus',  listType ==='text'?'uploader-icon':'' ]"></i>
  </el-upload>
</template>

<script>
export default {
  props: {
    imageUrl: {
      default: "",
      type: String,
    },
    name: {
      default: "",
    },
    allowedFileType: {
      default() {
        return ["image/png"];
      },
      type: Array,
    },
    tips: {
      default: "",
      type: String,
    },
    fileList:{
      default(){
        return []
      },
      type:Array
    },
    listType:{
      default:"text",
      type:String 
    }
  },
  methods: {
    async beforeUpload({ type }) {
      if (this.allowedFileType.indexOf(type) === -1) {
        //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
        this.$message.error("请上传的正确的文件格式");
        return Promise.reject();
      }
    },
    // 获取上传进度
    onProgress(event) {
      this.$emit('progress',event)
    },
    onError() {
      this.$confirm("上传失败,请刷新网页并尝试重新上传", "提示", {
        type: "error",
      })
        .then(() => {})
        .catch(() => {});
    },
    onSuccess(res, file) {
      this.$emit("success", res, file);
    },
    onPreview(file){
      this.$emit("preview", file);
    },
    onRemove(file){
      this.$emit("remove", file);
    }

  },
};
</script>

<style>
.uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader .el-upload:hover {
  border-color: #409eff;
}

.uploader img{
   width: 178px;
   height: 178px;
   display: block;
}

.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>