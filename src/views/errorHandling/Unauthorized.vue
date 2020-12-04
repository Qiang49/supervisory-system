<template>
  <div class="box">
    <div class="btn">
      <el-button icon="el-icon-arrow-left">首页</el-button>
    </div>
    <div class="main">
      <div class="main-l">
        <p>Oops!</p>
        <p>gif来源Airbnb页面</p>
        <p>你没有权限去该页面</p>
        <p>如有不满请联系你领导</p>
        <ul>
          <li>或者你可以去：</li>
          <li>回首页</li>
          <li>随便看看</li>
          <li>点我看图</li>
        </ul>
      </div>
      <div class="main-r">
        <img src="~assets/img/home/401.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Unauthorized'
  }
</script>

<style scoped>
  .box {
    position: relative;
    width: 550px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .el-button {
    background-color: rgb(0, 132, 137);
    color: #fff;
  }

  .el-button:hover {
    background-color: rgb(0, 132, 137);
    color: #fff;
  }

  .main {
    display: flex;
  }

  .main-l p:nth-child(1) {
    font-size: 54px;
    font-weight: bold;
    color: rgb(72, 72, 72);
  }

  .main-l p:nth-child(2) {
    font-size: 12px;
  }

  .main-l p:nth-child(3) {
    font-size: 22px;
    font-weight: bold;
  }

  .main-l p:nth-child(4) {
    font-size: 12px;
    font-weight: bold;
  }

  .main-l ul li:nth-child(1) {
    font-size: 16px;
  }

  .main-l ul li:nth-child(n+2) {
    font-size: 16px;
    color: rgb(0, 132, 137);
  }
</style>