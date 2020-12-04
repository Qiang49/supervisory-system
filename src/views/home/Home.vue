<template>
  <!-- 头部 -->
  <el-container class="home-con">
    <el-header>
      <div>
        <span class="el-icon-s-fold"><a href="javascript:;">后台管理系统</a></span>
      </div>
      <div class="header-right">
        <span class="el-icon-rank"></span>
        <!-- 消息提醒 -->
        <span>
          <el-badge :is-dot="$store.state.noMessage.length === 0 ? false : true" class="item">
            <span class="el-icon-bell"></span>
          </el-badge>
        </span>
        <!-- 用户头像 -->
        <span><img :src="$store.state.userInfo.headSculpture" alt=""></span>
        <!-- 用户信息 -->
        <el-dropdown>
          <span class="el-dropdown-link">
            {{$store.state.userInfo.userName}}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <span @click="userInfo()">
              <el-dropdown-item>个人信息</el-dropdown-item>
            </span>
            <span @click="clear()">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区 -->
        <el-menu background-color="rgb(50, 65, 87)" text-color="#fff" active-text-color="rgb(41,134,245)" unique-opened
          router :default-active="activePath === ''?starter:activePath">
          <!-- 首页 -->
          <el-menu-item index="Users" @click="showIndex">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- tab选项卡 -->
          <el-menu-item index="TabControl" @click="showIndex">
            <i class="el-icon-s-order"></i>
            <span slot="title">tab选项卡</span>
          </el-menu-item>

          <!-- 表格管理 -->
          <el-menu-item index="Table" @click="showIndex">
            <i class="el-icon-menu"></i>
            <span slot="title">表格管理</span>
          </el-menu-item>

          <!-- 文章管理 -->
          <el-submenu index="Article" >
            <template slot="title">
              <i class="el-icon-date"></i>
              <span slot="title">文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="CreateArticles" @click="showIndex">创建文章</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="ArticleList" @click="showIndex">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 错误处理 -->
          <el-submenu index="Error" @click="showIndex">
            <template slot="title">
              <i class="el-icon-s-release"></i>
              <span slot="title">错误处理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="Unauthorized" @click="showIndex">401页面</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="NotFound" @click="showIndex">404页面</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 个人中心 -->
          <el-submenu index="Porsonal" >
            <template slot="title" >
              <i class="el-icon-s-custom"></i>
              <span slot="title">个人中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="ProsonalInformation" @click="showIndex">个人信息</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="LogOff" @click="showIndex">退出登录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <!-- 内容区 -->
      <el-main>
        <el-card :body-style="{ padding: '4px' }">
          <el-tag v-for="(item,index) in tags" :key="(item.name,index)" :type="item.type" closable @click="toMain(index)" @close="handleClose(item)">
            {{item.name}}
          </el-tag>
        </el-card>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Users from './user/Users'
  import TabControl from '../tabControl/TabControl'
  export default {
    name: 'Home',
    components: {
      TabControl,
      Users
    },
    data() {
      return {
        tags:[{
          name:this.$route.name,
          type:'info',
          index:this.$route.path,
        }],
        activePath: '',
        starter: 'Users',
      }
    },
    methods: {
      // 修改sessionStorage
      editSessionStorage(){
          window.sessionStorage.setItem('activePath',this.$route.path)
          if(!this.$route.path == ''){
            this.activePath = (this.$route.path).substr(1)
          }
      },
      // 个人信息
      userInfo() {
        this.$router.push('/ProsonalInformation');
        this.activePath = 'ProsonalInformation'
      },
      // 退出登录
      clear() {
        localStorage.removeItem('Authorization');
        sessionStorage.removeItem('activePath')
        this.$router.push('/login');
      },
      // 添加
      showIndex(){
        let tags = this.tags
        let flag = true
        for (let i = 0; i < tags.length; i++) {
            if(this.$route.name == tags[i].name){
              this.editSessionStorage()
              flag = false
              return
            }      
        }
        if(flag){
          this.tags.push({
            name: this.$route.name,
            type:'info',
            index:this.$route.path,
          })
        }
        this.editSessionStorage()
      },
      // 去往
      toMain(index){
        this.index = index
        this.$router.push(this.tags[index].index);
        this.editSessionStorage()
      },
      // 关闭
      handleClose(item){
        this.tags.splice(this.tags.indexOf(item),1)
      }
    },
    created(){
      if(!window.sessionStorage.getItem('activePath') == ''){
      this.activePath = window.sessionStorage.getItem('activePath').substr(1)
      }
    }
  }
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }

  .el-icon-caret-bottom {
    font-size: 18px;
  }

  .home-con {
    height: 100%;
  }

  .el-header {
    display: flex;
    font-size: 20px;
    justify-content: space-between;
    align-items: center;
    color: rgb(255, 255, 255);
    background-color: rgb(36, 47, 66);
  }

  .header-right {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }

  .header-right>span {
    display: block;
    margin: 0 5px;
  }

  .header-right>span:nth-child(2) {
    margin-right: 10px;
  }

  .header-right span:nth-child(3) {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;
  }

  .header-right span:nth-child(3) img {
    width: 100%;
  }

  .el-header span a {
    text-decoration: none;
    color: rgb(255, 255, 255);
    margin-left: 10px;
  }

  .el-aside {
    background-color: rgb(50, 65, 87);
  }

  .el-aside .el-menu {
    border: none;
  }

  .el-main {
    padding: 0;
    background-color: rgb(240, 240, 240);
  }

  .el-main .el-tag {
    margin-right: 10px;
  }
</style>