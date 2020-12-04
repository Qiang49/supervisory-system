<template>
  <div class="box">
    <div class="main">
      <p class="err-color">
        <span>4</span>
        <span>0</span>
        <span>4</span>
      </p>
      <p>啊哦~你所访问的页面不存在</p>
      <el-button-group>
        <el-button type="primary" size="mini">返回首页</el-button>
        <el-button type="primary" size="mini">返回上一页</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotFound",
  };
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .box {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main {
    position: absolute;
    width: 280px;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
  }

  .main p:nth-child(2) {
    font-size: 18px;
    color: rgb(132, 142, 162);
    margin: 0 0 10px 0;
  }

  .el-button-group {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }

  .err-color {
    font-size: 140px;
    font-weight: bold;
    color: rgb(45, 140, 240);
  }

  .err-color span:nth-child(2) {
    color: rgb(0, 168, 84);
  }
</style>