<template>
   <div class="upload-container">
    <el-tooltip class="item" effect="dark" content="上传图片" placement="bottom" :hide-after="800">
      <el-button :style="buttonStyle" icon="el-icon-upload" size="small" type="primary"
        @click="showDialog">upload</el-button>
    </el-tooltip>

    <el-dialog title="上传图片" append-to-body width="600px" :visible.sync="dialogVisible" center >
      <div class="img-items">
        <div v-for="(item,index) in imgSrcList" :key="index" class="img-box">
          <span class="delete-image" title="点击删除">
            <i class="el-icon-delete-solid" @click="deleteImage(index)" />
          </span>
          <img v-if="item" class="img" :src="item" alt />
        </div>
      </div>
      <div class="uploadImg-box">
        <input ref="fileElem" accept="image/*" class="img-input" type="file" multiple="multiple" @change="onchange" />
        <el-button class="btn" size="small" type="primary" @click="handleOpenFile"> 点击上传</el-button>
      </div>
      <div class="btn-box">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="handleSubmit" >确 定</el-button >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Loading } from "element-ui";
  import { readFile } from "../utils/upload"; 
  import { Base64ToBlob } from "../utils/cos"; 

export default {
    name: "MultipleUpload",
    props: {
      // 最大上传文件的大小
      maxFileSize: {
        type: Number,
        default: 5
      },
      buttonStyle: {
       type: Object,
       default: () => ({})
     }
    },
    data() {
      return {
        dialogVisible: false,
        loading: false,
        imgSrcList: []
      };
    },
    methods: {
      // 打开文件
      handleOpenFile() {
        const input = this.$refs.fileElem;
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

      // 打开dialog
      showDialog() {
        this.dialogVisible = true;
        this.imgSrcList = [];
      },

      //  监听input上传
      async onchange() {
        try {
          // 文件列表
          const files = this.$refs.fileElem.files;
          const sizes = [];
          // base64位地址
          const allReadFile = [];
          for (let index = 0; index < files.length; index++) {
            const item = files[index];
            sizes.push(item.size);
            allReadFile.push(readFile(item));
          }
          // 读取所有文件为base64数据
          const base64List = await Promise.all(allReadFile);
          this.imgSrcList = [...this.imgSrcList, ...base64List];
        } catch (error) {
          console.log(error);
        }
      },

      // 确定上传
      async handleSubmit() {
        if (!this.imgSrcList.length) {
          this.$Message({
            message: "请上传图片！",
            type: "error"
          });
          return;
        }
        // 添加页面loading
        const loadingInstance = Loading.service({
          fullscreen: true,
          text: "上传中..."
        });
        // 添加按钮loading
        this.loading = true;
        try {
          // 所有blob文件
          const blobFiles = [];
          // Base64 数据转成blob数据
          this.imgSrcList.forEach(item => {
            const blobFile = Base64ToBlob(item);
            blobFiles.push(blobFile);
          });
          this.$emit("success", this.imgSrcList);
        } catch (error) {
          console.log(error, error);
        }
        // 停止loading关闭弹窗
        this.loading = false;
        this.dialogVisible = false;
        loadingInstance.close();
      },

      // 删除图片
      deleteImage(index) {
        this.imgSrcList.splice(index, 1);
      }
    }
}
</script>

<style scoped>

  .el-dialog{
    position: relative;
  }

  .img-items{
    display: flex;
  }

  .img-box .img{
    max-width: 100px;
  }

  .uploadImg-box{
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  .uploadImg-box .img-input{
    display: block;
    display: none;
  }

   .btn-box{
    width: 100%;
    position: relative;
    right: 0;
  }
</style>
