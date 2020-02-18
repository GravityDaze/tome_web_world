<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small"
             :hide-required-asterisk='false'>
      <el-row>

        <el-col :span="19" :offset="2">
          <el-form-item label="上传文件">
            <el-col :span="15">
              <el-input v-model="ruleForm.originalName"></el-input>
            </el-col>
            <el-col :span="7" style="text-align: center;display: flex;">
              <!--注释的是限制上传类型只能是图片类型，没有accept就允许所有类型-->
              <!--<input type="file" accept="image/*" @change="upMediaInfos" ref="file" multiple="multiple">-->
              <input type="file" @change="upMediaInfos" ref="file" multiple="multiple">
            </el-col>

          </el-form-item>
        </el-col>
        <el-col :span="18" :offset="2">
          <el-form-item label="媒体文件">
            <el-col>
              <el-input v-model="ruleForm.fileName"></el-input>
            </el-col>

          </el-form-item>
        </el-col>

      </el-row>
    </el-form>

    <div v-if="sizeTopic">文件过大，请重新选择上传文件</div>
  </div>
</template>

<script>
  export default {
    name: "up-video",
    data() {
      return {
        sizeTopic: false,
        ruleForm: {
          "type": '',
          "name": '',//媒体文件名称，即介绍的名称
          "fileName": '',//上传成功后，后台解析处理后返回的新的文件名
          "originalName": '',//原文件名，即本地上传时候的文件名字
          "fileSize": '',//文件大小
          "mediaFileUrl": '',//文件后台返回的路径
          "mediaFileRemark": '媒体文件目前只支持:' +
          '\n' +
          '1、音频文件(*.mp3)，大小不超过5M' +
          '\n' +
          '2、视频文件(*.mp4)，大小不超过50M',
        },
      }
    },
    mounted() {

    },
    methods: {
      //上传媒体文件事件
      upMediaInfos(e) {

        this.mediaFilesInfo = e.target.files[0]

        let name=this.mediaFilesInfo.name
        let size=parseInt(this.mediaFilesInfo.size/1024)
        let type=this.mediaFilesInfo.type
        console.log('wenjianxinxi',name,size,type)
        let tokenInfo = ''
        let formdata = new FormData()
        formdata.append('file', this.mediaFilesInfo)

        //前端上传音视频等文件到七牛云时关键三步
        //1，向后台调用特定获取token接口，以便获取与七牛云相关的对应token
        //2，自己服务器存储文件空间（即绑定的存储域名）在哪个大区，就调用哪个大区的七牛云共用接口，如华东：http://upload.qiniup.com
        //3，接口调用成功后，后台返回key后，将上述的存储域名与key结合到一块就成为最终的下载地址
        this.$axios.get('/mis/upload/uploadAuth')
          .then(res => {
            console.log('+++++++',res)
            tokenInfo = res.data.value.token
            formdata.append('token', tokenInfo)

            this.$axios.post('http://upload.qiniup.com', formdata, {emulateJSON: true}).then(res => {
              console.log('媒体资源上传重要传输环节+++', res)

            }).catch(error => {
              console.log(error)
            })

          })

        // console.log(this.mediaFilesInfo, '点击了上传媒体文件', e.target.files[0].name)

      },


    }
  }
</script>

<style scoped>

</style>
