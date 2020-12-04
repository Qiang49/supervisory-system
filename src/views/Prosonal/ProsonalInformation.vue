<template>
  <div>
    <div style="padding:20px">
      <el-card>
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <div class="userinfo">
          <span class="userphoto">
            <img :src="$store.state.userInfo.headSculpture" alt="">
          </span>
          <el-divider direction="vertical"></el-divider>
          <div class="prompt">
            <el-button @click="editPhotoDialogVisible = true">修改头像</el-button>
            <span>上传头像图片只能是 JPG 格式! 头像图片大小不能超过 2MB!</span>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="username">
          <p>用户名</p>
          <el-input placeholder="请输入内容" v-model="$store.state.userInfo.userName" :disabled="true">
          </el-input>
          <p>邮箱</p>
          <el-input placeholder="请输入内容" v-model="$store.state.userInfo.email" :disabled="true">
          </el-input>
          <el-button type="primary" @click="edituser">修改个人信息</el-button>
        </div>
      </el-card>

      <!-- 头像上传对话框 -->
      <el-dialog title="上传头像" :visible.sync="editPhotoDialogVisible" width="30%" :before-close="handleClose">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editPhotoDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="holdPhoto">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户信息对话框 -->
      <el-dialog title="修改用户信息" :visible.sync="editUserDialogVisible" width="30%" :before-close="handleClose">
        <el-form ref="editUserRef" :rules="editUserRules" :model="userinfo" label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="userinfo.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userinfo.email"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="holdUserEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProsonalInformation',
    data() {
      return {
        // 用户信息
        userinfo: {
          name: '',
          email: ''
        },
        editPhotoDialogVisible: false,
        imageUrl: '',
        editUserDialogVisible: false,
        // 修改用户信息验证
        editUserRules: {
          name: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 10,
              message: '长度在 2 到 10 个字符',
              trigger: 'blur'
            }
          ],
          email: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ]
        }
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 保存头像
      holdPhoto() {
        this.editPhotoDialogVisible = false
        let imageURL = this.imageUrl
        this.$store.commit('holdPhoto',imageURL)
      },
      // 修改用户信息
      edituser() {
        this.editUserDialogVisible = true
      },
      holdUserEdit() {
        this.$refs.editUserRef.validate(valid => {
          if (!valid) return
          let userinfo = this.userinfo
          this.$store.commit('holdUserEdit',userinfo)
        })
        this.editUserDialogVisible = false
      }
    },
    created() {
      this.userinfo.name = this.$store.state.userInfo.userName
      this.userinfo.email = this.$store.state.userInfo.email
    }
  }
</script>

<style scoped>
  .userinfo {
    height: 68px;
    display: flex;
    align-items: center;
  }

  .el-divider--vertical {
    height: 4em;
    margin: 0 20px;
  }

  .userphoto {
    display: inline-block;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    overflow: hidden;
  }

  .userphoto img {
    width: 100%;
  }

  /* 头像上传样式 */
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
  }

  .avatar-uploader .el-upload {

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

  .prompt span {
    display: block;
    margin-top: 5px;
    font-size: 12px;
    color: #8c939d;
  }

  .username .el-button {
    margin-top: 20px;
  }
</style>