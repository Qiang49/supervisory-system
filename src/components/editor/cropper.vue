<template>
  <div class="main">
      <!-- element 上传图片按钮 -->
      <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" drag  :auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">点击上传</div>
        <div class="el-upload__tip">支持绝大多数图片格式，单张图片最大支持5MB</div>
      </el-upload>

    <!-- vueCropper 剪裁图片实现-->
    <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
      <div class="cropper-content">
        <div class="cropper" style="text-align:center">
        <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            :resizable="option.resizable"
          ></vueCropper>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible=false,finish()" :loading="loading">确认</el-button>
      </div>
    </el-dialog>
    <div class="master">
      <img :src="showIMG" alt="">
      <!-- 遮罩 -->
      <div :class="showIMG === ''?shade:'shade'" @click="deleteImg">
        <i class="el-icon-delete"></i>
      </div>
    </div>
    <div class="base">
      <img :src="baseURL" alt="">
      <div :class="baseURL === ''?shade:'shade'" @click="deleteBaseImg">
        <i class="el-icon-delete"></i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        resizable:true, //是否允许改变裁剪框的大小
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [],  //页面显示的数组
      // 防止重复提交
      loading: false,
      // 上传图片的地址
      masterURL:'',
      showIMG:'',
      // 裁剪后生成的图片地址
      baseURL:'',
      // 鼠标经过遮罩层
      shade: false
    }
  },
  methods:{
    // 上传按钮   限制图片大小
    changeUpload(file, fileList) {
      this.masterURL = URL.createObjectURL(file.raw)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$Message.error('上传文件大小不能超过 5MB!')
        return false
      }
      this.fileinfo = file
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file.raw)
        this.dialogVisible = true
      })
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.showIMG = this.masterURL
      this.$refs.cropper.startCrop(); 
      this.$refs.cropper.getCropData(res => { //得到截图的数据
        this.scanImg = res;
        let reg = new RegExp("data:image/jpeg;base64,");
        this.baseURL = res
        // console.log(res);
        this.clipImg = res.replace(reg, "");
        this.showImg = true;
      })
    },
    // 删除图片
    deleteImg(){
      this.showIMG = ''
    },
    deleteBaseImg(){
      this.baseURL = ''
    }
  }
}
</script>

<style scoped>
  .cropper-content .cropper{     
    width: auto;
    height: 300px;   
  }
  .main{
    display: flex;
  }
  .master{
    position: relative;
    max-width: 300px;
    min-width: 200px;
    min-height: 80px;
    vertical-align: middle;
    margin-left: 20px;
    border: 1px dashed #d9d9d9;
  }

  .base{
    position: relative;
    min-width: 200px;
    min-height: 80px;
    margin-left: 20px;
    border: 1px dashed #d9d9d9;
  }

  .master .shade,
  .base .shade{
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    color: #fff;
    top: 0;
    left: 0;
  }

  .master i,
  .base i{
    display: none;
  }

  .master .shade:hover,
  .base .shade:hover{
    background-color: rgba(0, 0, 0,.5);
  }

  .master .shade:hover i,
  .base .shade:hover i{
    display: block;
  }


  .master img{
    width: 100%;
  }
  .base img{
    width: 100%;
  }
</style>