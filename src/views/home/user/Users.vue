<template>
  <div>
    <div style="padding:20px">
      <el-row>
        <!-- 用户信息 -->
        <el-col :span="9" class="fr">
          <!-- 用户详细信息 -->
          <el-card class="header">
            <div class="userinfo">
              <div class="headsculpture">
                <!-- 用户头像 -->
                <div class="main">
                  <img :src="$store.state.userInfo.headSculpture" alt="">
                </div>
              </div>
              <div class="username">
                <p>{{$store.state.userInfo.userName}}</p>
                <p>{{$store.state.userInfo.administrators}}</p>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="loginInfo">
              <p>上次登录时间： <span>{{$store.state.userInfo.loginTime}}</span></p>
              <p>上次登录地点： <span>{{$store.state.userInfo.location}}</span></p>
            </div>
          </el-card>

          <!-- 语言详细 -->
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>语言详细</span>
            </div>
            <div>
              <span>Vue</span>
              <el-progress :percentage="64" :color="customColorMethod"></el-progress>
              <span>JavaScript</span>
              <el-progress :percentage="24" :color="customColorMethod"></el-progress>
              <span>CSS</span>
              <el-progress :percentage="9" :color="customColorMethod"></el-progress>
              <span>HTML</span>
              <el-progress :percentage="3" :color="customColorMethod"></el-progress>
            </div>
          </el-card>
        </el-col>

        <el-col :span="15">
          <el-row class="header record">
            <!-- 用户访问量 -->
            <el-col :span="8">
              <el-card shadow="never" :body-style="{ padding: '0px' }" class="uservisits">
                <div class="el-icon-user ico"></div>
                <div class="content">
                  <div class="main">
                    <p>123</p>
                    <span>访问量</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <!-- 系统消息 -->
            <el-col :span="8">
              <el-card shadow="never" :body-style="{ padding: '0px' }" class="sysemmess">
                <div class="el-icon-bell ico"></div>
                <div class="content">
                  <div class="main">
                    <p>321</p>
                    <span>系统消息</span>
                  </div>
                </div>
              </el-card>
            </el-col>
            <!-- 数量 -->
            <el-col :span="8">
              <el-card shadow="never" :body-style="{ padding: '0px' }" class="amount">
                <div class="el-icon-goods ico"></div>
                <div class="content">
                  <div class="main">
                    <p>5000</p>
                    <span>数量</span>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <!-- 待办事项 -->
          <schedule></schedule>
        </el-col>

      </el-row>
      <el-row style="margin-top:10px">
        <el-col :span="12" class="fr">
          <el-card :body-style="{height: '250px'}">
            <histogram></histogram>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card :body-style="{height: '250px'}">
            <line-chart></line-chart>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Schedule from './Schedule'
  import Histogram from './Histogram'
  import LineChart from './LineChart'

  export default {
    name: 'Users',
    components: {
      Schedule,
      Histogram,
      LineChart
    },
    methods: {
      customColorMethod(percentage) {
        if (percentage < 10) {
          return 'rgb(245,108,108)';
        } else if (percentage < 20) {
          return 'rgb(74,144,226)';
        } else if (percentage < 30) {
          return 'rgb(241,224,90)'
        } else {
          return 'rgb(66,185,131)'
        }
      },
    }
  }
</script>

<style scoped>
  .el-row {
    display: flex;
    justify-content: space-between;
  }

  .userinfo {
    display: flex;
    align-items: center;
  }

  .userinfo .main {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
  }

  .userinfo .main img {
    width: 100%;
  }

  .userinfo .username {
    margin-left: 30px;
  }

  .userinfo .username p:nth-child(1) {
    font-size: 24px;
    line-height: 0px;
  }

  .userinfo .username p:nth-child(2) {
    font-size: 12px;
    line-height: 0px;
    color: #ccc;
  }

  .loginInfo {
    font-size: 12px;
    color: #ccc;
    line-height: 12px;
  }

  .loginInfo span {
    margin-left: 20px;
  }

  .header {
    margin-bottom: 10px;
  }

  .record .el-col:nth-child(2) {
    margin: 0 20px;
  }

  .record .el-card .ico {
    float: left;
    width: 64px;
    height: 64px;
    font-size: 24px;
    text-align: center;
    line-height: 64px;
    color: #fff;
  }

  .uservisits .ico {
    background-color: #2D8CF0;
  }

  .sysemmess .ico {
    background-color: rgb(100, 213, 114);
  }

  .amount .ico {
    background-color: rgb(242, 94, 67);
  }


  .record .el-card .content {
    width: 100%;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
  }

  .record .el-card .content .main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .record .el-card .content .main p {
    font-weight: bold;
    color: #2D8CF0;
    font-size: 18px;
    margin: 10px 0 0 0;
  }

  .record .el-card .content .main span {
    font-size: 12px;
    color: #ccc;
  }

  .fr {
    margin-right: 10px;
  }
</style>