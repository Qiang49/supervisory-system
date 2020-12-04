<template>
  <div>
    <!-- 卡片试图区 -->
    <el-card class="box-card">
      <!-- 搜索区 -->
      <el-row>
        <!-- 新增 -->
        <el-col :span="2">
          <!-- <el-button type="primary" icon="el-icon-plus">新增</el-button> -->
          <slot>
            <add-user :tableData="tableData"></add-user>
          </slot>
        </el-col>
        <!-- 选择 -->
        <el-col :span="3">
          <el-select v-model="value" placeholder="地址">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <!-- 搜索框-->
        <el-col :span="6">
          <el-input placeholder="用户名">
            <!-- <el-button slot="append" icon="el-icon-search">搜索</el-button> -->
          </el-input>
        </el-col>
        <!-- 搜索按钮 -->
        <el-col :span="2">
          <el-button type="primary" @click="tableData" icon="el-icon-search">搜索</el-button>
        </el-col>
      </el-row>
      <!-- 表格区 -->
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
        @selection-change="handleSelectionChange" border>
        <!-- 复选框 -->
        <el-table-column type="selection" min-width="5%" align="center">
        </el-table-column>
        <!-- ID -->
        <el-table-column label="ID" min-width="5%" type="index">
        </el-table-column>
        <!-- 用户名 -->
        <el-table-column prop="name" min-width="10%" label="用户名">
        </el-table-column>
        <!-- 账户余额 -->
        <el-table-column label="账户余额" min-width="10%">
          <template slot-scope="scope">{{ scope.row.balance }}</template>
        </el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像（查看大图）" min-width="15%">
          <template slot-scope="scope" align="center">
            <div class="pic-size">
              <img :src="scope.row.pic" alt="">
            </div>
          </template>
        </el-table-column>
        <!-- 地址 -->
        <el-table-column prop="address" label="地址" min-width="25%">
        </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态" align="center" min-width="7%">
          <template slot-scope="scope">
            <el-tag :type="scope.row.type">{{scope.row.sate}}</el-tag>
          </template>
        </el-table-column>
        <!-- 注册时间 -->
        <el-table-column label="注册时间" min-width="15%">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" align="center" min-width="13%">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <div class="operate">
              <slot>
                <show-edit :tableData="tableData[scope.$index]">
                </show-edit>
              </slot>
            </div>
            <!-- 删除 -->
            <el-button type="text" size="small" style="color:red" @click="deleteRow(scope.$index, tableData)">
              <i class="el-icon-delete"></i><span>删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="block">
        <span>共{{tableData.length}}条</span>
        <el-pagination background layout=" prev, pager, next" :page-size="100" :total="1">
        </el-pagination>
      </div>

    </el-card>
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'element-ui';

  // 添加用户组件
  import AddUser from './AddUser'
  // 添加编辑组件
  import ShowEdit from './ShowEdit'

  export default {
    name: 'TableContent',
    components: {
      AddUser,
      ShowEdit
    },
    data() {
      return {
        // 搜索区
        options: [{
          value: '选项1',
          label: '四川省'
        }, {
          value: '选项2',
          label: '北京市'
        }, {
          value: '选项3',
          label: '广东省'
        }, {
          value: '选项4',
          label: '福建省'
        }],
        value: '',
        // 内容区
        tableData: [{
          date: '2016-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1518 弄',
          balance: '￥123',
          pic: require('../../assets/img/table/xhh.jpg'),
          sate: '成功',
          type: 'success'
        }, {
          date: '2016-05-02',
          name: '李四',
          address: '上海市普陀区金沙江路 1518 弄',
          balance: '￥456',
          pic: require('../../assets/img/table/htl.jpg'),
          sate: '成功',
          type: 'success'
        }, {
          date: '2016-05-04',
          name: '王五',
          address: '上海市普陀区金沙江路 1518 弄',
          balance: '￥789',
          pic: require('../../assets/img/table/lyy.jpg'),
          sate: '失败',
          type: 'danger'
        }, {
          date: '2016-05-01',
          name: '赵六',
          address: '上海市普陀区金沙江路 1518 弄',
          balance: '￥1011',
          pic: require('../../assets/img/table/xyy.jpg'),
          sate: '成功',
          type: 'success'
        }],
        multipleSelection: [],
        num: Number,
        AddDialogVisible: false,
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 删除时提示框
      deleteRow(index, rows) {
        let that = this
        MessageBox.confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除一行
          rows.splice(index, 1);
          // 计算行数
          const sum = this.tableData.length
          this.num = sum
          // 提示信息
          that.$Message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          that.$Message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    }
  }
</script>

<style scoped>
  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-row .el-col:nth-child(n+2) {
    margin-right: 15px;
  }

  .pic-size {
    width: 30px;
    height: 30px;
    margin-left: 50%;
    transform: translateX(-50%);
  }

  .pic-size img {
    width: 100%;
  }

  .block {
    display: flex;
    font-size: 12px;
    color: rgb(132, 142, 162);
    align-items: center;
    position: relative;
    margin-top: 10px;
    left: 80%;
    letter-spacing: 5px;
  }

  .operate {
    display: inline-block;
    margin-right: 10px;
  }
</style>