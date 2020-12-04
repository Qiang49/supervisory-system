<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div class="clearfix">
        <span>Title</span>
      </div>
      <div class="main">
        <el-row>
          <!-- 作者 -->
          <el-col :span="8">
            <slot name="author"></slot>
          </el-col>
          <!-- 时间 -->
          <el-col :span="8">
            <slot name="time"></slot>
          </el-col>
          <!-- 星 -->
          <el-col :span="8" class="published">
            <slot name="importance"></slot>
          </el-col>
        </el-row>
        <!-- 文章内容区 -->
        <el-row class="content">
          <slot name="summary"></slot>
        </el-row>
        <!-- 富文本 -->
        <el-row>
          <div class="btnbox" >
            <Editor :id="tinymceId" :init="init" v-model="myValue" ></Editor>
            <div class="uploadBtn">
              <multiple-upload @success="imageSuccess"></multiple-upload>
            </div>
          </div>
          <slot name="btn"></slot>
        </el-row>
      </div>
    </el-card>
    <cropper style="margin-top:20px"></cropper>
  </div>
</template>

<script>
  import MultipleUpload from './MultipleUpload'
  import Editor from '@tinymce/tinymce-vue'
  import tinymce from './tinymce.min.js'
  import './icons/default/icons.min.js'
  import './themes/silver/theme.min.js'
  import './langs/zh_CN'
  // 裁剪图片
  import cropper from './cropper'

  // 注册插件
  import './plugins/preview/plugin.min.js' //浏览
  import './plugins/anchor/plugin.min.js' // 锚点
  import './plugins/wordcount/plugin.min.js' // 文字统计
  import './plugins/code/plugin.min.js' // 编辑源码
  import './plugins/codesample/plugin.min.js' // 代码实例
  import './plugins/hr/plugin.min.js' // 分割线
  import './plugins/lists/plugin.min.js' // 有序无序列表
  import './plugins/advlist/plugin.min.js'
  import './plugins/link/plugin.min.js' // 超链接
  import './plugins/image/plugin.min.js' // 图片
  import './plugins/imagetools/plugin.min.js'
  import './plugins/pagebreak/plugin.min.js' // 分页符
  import './plugins/insertdatetime/plugin.min.js' // 时间
  import './plugins/media/plugin.min.js' // 媒体
  import './plugins/table/plugin.min.js' // 表格
  import './plugins/emoticons/js/emojis.min.js' // 表情
  import './plugins/emoticons/plugin.min.js'
  import './plugins/fullscreen/plugin.min.js' // 全屏


  export default {
    name: 'index',
    components: {
      Editor,
      MultipleUpload,
      cropper
    },
    data() {
      return {
        init: {
          language: 'zh_CN',
          height: '450px',
          branding: false,
          // file_picker_types: 'image',
          plugins: 'preview,wordcount,code,codesample,hr,lists,advlist,link,image,pagebreak,imagetools,anchor,insertdatetime,media,table,emoticons,fullscreen',
          menubar: 'file edit insert view format table',
          toolbar: [
            'preview  bold italic underline strikethrough alignleft aligncenter alignright alignjustify outdent indent blockquote undo redo removeformat subscript superscript code codesample',
            'hr bullist numlist link image  preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen imageUpload' 
          ],
          setup: (editor) => {//设置自定义功能的按钮
            editor.ui.registry.addButton("imageUpload", {//单个按钮，此处的uploading是该按钮的名称
              tooltip: "上传图片",//鼠标放上去后现在是内容.
              icon: 'image',
              onAction: () => {
                this.dialogVisible = true;
                this.editor = editor;
                this.imageList = [];
              }
            });
          },
        },
        myValue: this.value,
        uploadDialogVisible:false,
        tinymceId: 'vue-tinymce',
        fullscreen: false,
        editorContent: ''
      }
    },
    methods:{
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
     
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(this.imageUrl);
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$Message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$Message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      handleOpenFile(){
        const input = this.$refs.fileElem;
        // 解决同一个文件不能监听的问题
        input.addEventListener(
          "click",
          function() {
            this.value = "";
          },
          false
        );
        // 点击input
        input.click();
      },

    async imageSuccess(urlList) {
      try {
        let imageTemplateList = ''
        urlList.forEach(item => {
          const image = `<img style="max-width:100%;" src="${item}">`
          imageTemplateList = imageTemplateList + image
        })
        window.tinymce.get(this.tinymceId).insertContent(imageTemplateList)
        this.$Message({
          message: '上传成功！',
          type: 'success'
        })
      } catch (error) {
        console.log(error)
        this.$Message({
          message: error,
          type: 'error'
        })
      }
      }
    },
    props: {
      value: String,
      default: ''
    },
    watch: {
      value(newValue) {
        this.myValue = newValue;
      },
      myValue(newValue) {
        this.$emit("input", newValue);
      },
    },
    mounted() {},
    created(){}
  }
</script>

<style scoped>
  @import url('./skins/ui/oxide/skin.min.css');


  .clearfix {
    font-size: 14px;
    color: #ccc;
    border-bottom: 1px solid #ccc;
    margin: 10px 0;
    padding-bottom: 10px;
  }

  .main .el-row {
    margin-top: 30px;
  }

  .published {
    height: 40px;
    line-height: 40px;
  }

  .el-rate {
    display: inline-block;
  }

  .btnbox{
    position: relative;
    width: 100%;
  }

  .btnbox .uploadBtn{
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 10;
  }

  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader-icon:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>