<template>
  <div>
    <el-button type="primary" @click="AddDialogVisible = true" icon="el-icon-plus">新增</el-button>
    <el-dialog title="添加用户" :visible.sync="AddDialogVisible" width="30%" :before-close="handleClose"
      @close="AddDialogClose">
      <el-form ref="AddFormRef" :rules="AddFormRules" :model="AddForm" label-width="80px">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="name">
          <el-input v-model="AddForm.name"></el-input>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item label="地址" prop="address">
          <el-input v-model="AddForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'element-ui';
  export default {
    name: 'AddUser',
    data() {
      return {
        // 控制添加用户框的显示与隐藏
        AddDialogVisible: false,
        AddForm: {
          date: '',
          name: '',
          address: '',
          balance: '￥0',
          pic: require('../../assets/img/table/mor.jpg'),
          sate: '成功',
          type: 'success',
          delivery: false,
        },
        AddFormRules: {
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
          address: [{
              required: true,
              message: '请输入地址',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ]
        },
      }
    },
    methods: {
      handleClose(done) {
        MessageBox.confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 监听用户对话框关闭
      AddDialogClose() {
        this.$refs.AddFormRef.resetFields()
      },
      AddUser() {
        this.$refs.AddFormRef.validate(valid => {
          if (!valid) return
          // 添加数据
          this.tableData.push({
            date: this.currentdate,
            name: this.AddForm.name,
            address: this.AddForm.address,
            balance: this.AddForm.balance,
            pic: this.AddForm.pic,
            sate: this.AddForm.sate,
            type: this.AddForm.type,
          })
          this.AddDialogVisible = false
        })

      }
    },
    // 父组件传过来的用户数据
    props: ['tableData'],
  }
</script>

<style scoped>

</style>