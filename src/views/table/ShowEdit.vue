<template>
  <div>
    <!-- 编辑按钮 -->
    <el-button type="text" size="mini" @click="showEdit()">
      <i class="el-icon-edit"></i><span>编辑</span>
    </el-button>
    <!-- 编辑内容 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose"
      @close="editDialogClose">
      <el-form label-width="80px" :model="editShowData" ref="editFormRef" :rules="editFormRules">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editShowData.name"></el-input>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item label="地址" prop="address">
          <el-input v-model="editShowData.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="keepData">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'element-ui';

  export default {
    name: 'ShowEdit',
    data() {
      return {
        // 用户数据
        editShowData: {
          name: '',
          address: ''
        },
        dialogVisible: false,
        // 表单验证
        editFormRules: {
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
              max: 30,
              message: '长度在 3 到 30 个字符',
              trigger: 'blur'
            }
          ]
        },
      };
    },
    methods: {
      handleClose(done) {
        MessageBox.confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // 监听编辑对话框关闭清除数据
      editDialogClose() {
        this.$refs.editFormRef.resetFields()
      },
      // 编辑
      showEdit() {
        this.dialogVisible = true
        this.editShowData.name = this.tableData.name
        this.editShowData.address = this.tableData.address
      },
      // 保存数据
      keepData() {
        this.dialogVisible = false
        this.$refs.editFormRef.validate(valid => {
          if (!valid) return
          this.tableData.name = this.editShowData.name
          this.tableData.address = this.editShowData.address
        })
      }
    },
    props: ['tableData']
  }
</script>

<style scoped>

</style>