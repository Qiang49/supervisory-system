<template>
  <div class="login-content">
    <div class="login-box">
      <h2>欢迎登录</h2>
      <!-- 登录表单 -->
      <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" prefix-icon="el-icon-unlock">
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" class="codeImg">
          <el-input type="text" placeholder="验证码" maxlength="4" v-model="loginForm.code"  :model="loginForm.uuid" prefix-icon="el-icon-unlock"></el-input>
          <!-- 验证码图片 -->
          <div class="code-img"><img :src="codeImg" @click="handleCode()" alt=""></div>
        </el-form-item>
        <!-- 登录 -->
        <el-form-item>
          <el-button type="primary" @click="login" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    getLoginMultidata
  } from 'network/login'
  import {
    getCodeImg
  } from 'network/login'
  import {
    mapMutations
  } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: 'admin123',
          code: '',
          uuid: ''
        },
        // 表单验证规则
        loginFormRules: {
          // 用户名验证
          username: [{
              required: true,
              message: '请输入登录昵称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 10,
              message: '长度在 3 到 10 个字符',
              trigger: 'blur'
            }
          ],
          // 密码验证
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 15,
              message: '长度在 6 到 15 个字符',
              trigger: 'blur'
            }
          ],
          // 验证码
          code: [{
              required: true,
              message: '请输入验证码',
              trigger: 'blur'
            },
            {
              min: 4,
              max: 4,
              message: '请输入长度为 4 的字符',
              trigger: 'blur'
            }
          ]
        },
        codeImg: [],
      }
    },
    methods: {
      ...mapMutations(['changeLogin']),

      login() {
        // let than = this
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return;
          const result = await this.$http.post('/prod-api/login', this.loginForm)
          // console.log(result.data.code);
          // 判断是否登录成功
          if (result.data.code !== 200) return this.$Message.error('登录失败');
          this.$Message.success('登录成功');
          // 将token存到vuex中
          this.userToken = 'Bearer ' + result.data.token
          this.changeLogin({
            Authorization: this.userToken
          })
          this.$router.push('/home')
        })

      },
      handleCode() {
        getCodeImg().then(res => {
          this.codeImg = "data:image/png;base64," + res.data.img
          this.loginForm.uuid = res.data.uuid
          this.loginForm.code = ''
        })
      }
    },
    created() {
      getCodeImg().then(res => {
        localStorage.removeItem('Authorization');
        this.codeImg = "data:image/gif;base64," + res.data.img
        this.loginForm.uuid = res.data.uuid
      })
    }
  }
</script>

<style scoped>
  .login-content {
    background: url(~assets/img/login/login-bg.jpg) no-repeat;
    background-size: cover;
    height: 100%;
  }

  .login-box {
    position: absolute;
    width: 350px;
    height: 400px;
    background-color: aliceblue;
    border-radius: 10px;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    padding: 20px;
    box-sizing: border-box;
  }

  .login-box h2 {
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
  }

  /* 验证码 */
  .codeImg {
    height: 40px;
    position: relative;
  }

  .codeImg .code-img {
    position: absolute;
    top: 2px;
    right: 0;
  }
</style>