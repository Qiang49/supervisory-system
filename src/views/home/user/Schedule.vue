<template>
  <div>
    <el-card class="box-card" :body-style="{
        padding: '0px 20px 0px 20px',
        height: '342px',
        overflow: 'auto',
      }">
      <div slot="header" class="clearfix">
        <span>待办事项</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addDialogVisible = true">添加</el-button>
      </div>
      <ul>
        <li v-for="(item, index) in scheduleData" :key="(item, index)" :class="{ finish: item.bol }">
          <input type="checkbox" v-model="item.bol" class="check" />
          <span v-text="item.des" v-show="!item.edit"></span>
          <!-- <input type="text" v-model="item.des" v-show='item.edit'> -->
          <span class="el-icon-delete ri" @click="deletedate(index)"></span>
          <span class="el-icon-edit ri" @click="editdate(index)"></span>
        </li>
      </ul>
    </el-card>

    <!-- 添加任务对话框 -->
    <el-dialog title="添加任务" :visible.sync="addDialogVisible" width="40%" :before-close="handleClose"
      @close="addDialogClosed">
      <el-form :model="addTack" :rules="addTackRules" ref="addTackRef" label-width="100px">
        <el-form-item label="任务名称" prop="taskname">
          <el-input v-model.trim="addTack.taskname"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserTack">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑任务对话框 -->
    <el-dialog title="编辑任务" :visible.sync="editDialogVisible" width="30%" :before-close="handleClose"
      @close="editDialogClosed">
      <el-form :model="editTack" :rules="editRules" ref="editRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="任务名称" prop="editname">
          <el-input v-model.trim="editTack.editname"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'element-ui';
  export default {
    name: "Schedule",
    data() {
      return {
        scheduleData: [{
            des: "今天写100个bug",
            bol: false,
            edit: false,
          },
          {
            des: "今天写100行代码",
            bol: false,
            edit: false,
          },
          {
            des: "今天写100个bug",
            bol: false,
            edit: false,
          },
          {
            des: "今天写100行代码",
            bol: false,
            edit: false,
          },
          {
            des: "今天写100个bug",
            bol: false,
            edit: false,
          },
        ],
        addDialogVisible: false,
        // 添加任务的表单数据
        addTack: {
          taskname: "",
        },
        // 表单验证
        addTackRules: {
          taskname: [{
              required: true,
              message: '请输入任务名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 20,
              message: '长度在 1 到 20 个字符',
              trigger: 'blur'
            }
          ]
        },
        editDialogVisible: false,
        // 编辑表单数据
        editTack: {
          editname: ''
        },
        // 编辑表单验证
        editRules: {
          editname: [{
              required: true,
              message: '请输入任务名称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 20,
              message: '长度在 1 到 20 个字符',
              trigger: 'blur'
            }
          ]
        },
        index: Number
      };
    },
    methods: {
      // 重置对话框
      addDialogClosed() {
        this.$refs.addTackRef.resetFields()
      },
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then((_) => {
            done();
          })
          .catch((_) => {});
      },
      // 点击确定是验证
      addUserTack() {
        this.$refs.addTackRef.validate(valid => {
          if (!valid) return
          this.scheduleData.push({
            des: this.addTack.taskname,
            bol: false,
            edit: false
          })
          this.addDialogVisible = false
        })
      },
      deletedate(index) {
        // console.log(index);
        this.scheduleData.splice(index, 1)
      },
      // 重置编辑对话框
      editDialogClosed() {
        this.$refs.editRef.resetFields()
      },
      editdate(index) {
        this.editTack.editname = this.scheduleData[index].des
        this.editDialogVisible = true
        this.index = index
      },
      confirmEdit() {
        this.$refs.editRef.validate(valid => {
          if (!valid) return
          this.scheduleData[this.index].des = this.editTack.editname
          this.editDialogVisible = false
        })
      }
    },
  };
</script>

<style scoped>
  li {
    list-style-type: none;
    margin: 10px 0;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }

  ul {
    padding-left: 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .check {
    margin-right: 20px;
  }

  .span1 {
    color: skyblue;
  }

  .finish {
    color: #ccc;
    text-decoration: line-through;
  }

  .ri {
    float: right;
    margin-right: 10px;
    cursor: pointer;
  }
</style>