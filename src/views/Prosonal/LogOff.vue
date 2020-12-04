<template>
  <div>
    <div style="padding:20px">
      <el-button @click="clear">退出登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogOff',
  methods:{
    clear(){
        localStorage.removeItem('Authorization');
        sessionStorage.removeItem('activePath')
        this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>