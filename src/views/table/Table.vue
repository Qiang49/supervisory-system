<template>
  <div>
    <div style="padding:20px">
      <div class="table-header">
        <i class="el-icon-menu"></i> <span>基础表格</span>
      </div>
      <table-content></table-content>
    </div>
  </div>
</template>

<script>
import TableContent from 'views/table/TableContent'

export default {
  name: 'Table',
  components:{
    TableContent
  },
  methods: {

    }
}
</script>

<style scoped>

  .table-header{
    margin-bottom: 10px;
    font-size: 18px;
  }


</style>
