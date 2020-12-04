<template>
  <div>
    <div style="padding:20px">
        <el-breadcrumb separator="/" style="margin-bottom:20px">
          <el-breadcrumb-item :to="{ path: '/Users' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
          <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 列表数据 -->
        <el-card v-if="isShow">
          <el-table :data="$store.state.tableListdata" border style="width: 100%;font-size:12px">
            <!-- ID -->
            <el-table-column label="ID" type="index" align="center" min-width="5%">
            </el-table-column>
            <!-- 时间 -->
            <el-table-column label="Date" align="center" prop="date" min-width="15%">
            </el-table-column>
            <!-- 作者 -->
            <el-table-column label="Author" align="center" prop="author" min-width="10%">
            </el-table-column>
            <!-- 星星 -->
            <el-table-column label="Importance"  prop="importance" min-width="12%">
            </el-table-column>
            <!-- 状态 -->
            <el-table-column label="Status" align="center" min-width="12%">
              <template slot-scope="scope">
                <el-tag :type="scope.row.type">{{scope.row.statu}}</el-tag>
              </template>
            </el-table-column>
            <!-- 内容 -->
            <el-table-column label="Title" prop="title"></el-table-column>
            <!-- 编辑 -->
            <el-table-column label="Actions" align="center" min-width="12%">
              <template slot-scope="scope">
                <el-button type="primary" @click="EditClick(scope.$index,scope.row)" size="mini" icon="el-icon-edit">Edit
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100"
              layout="total, sizes, prev, pager, next, jumper" :total="100">
            </el-pagination>
          </div>
        </el-card>

        <!-- 富文本 -->
        <Editor v-else v-model="value">
          <!-- 作者 -->
          <template v-slot:author>
            Author：
            <el-input v-model="tabledata.author" placeholder="Search user" style="width: 240px">
            </el-input>
          </template>
          <!-- 时间 -->
          <template v-slot:time>
            Publish Time：
            <el-input v-model="tabledata.time" placeholder="Select date and time" prefix-icon="el-icon-time"
              style="width: 240px">
            </el-input>
          </template>
          <!-- 星星 -->
          <template v-slot:importance>
            Importance：<el-rate v-model="rate" :max="3" @change="rateClick()"></el-rate>
          </template>
          <!-- 摘要 -->
          <template v-slot:summary>
            Summary：
            <input v-model="tabledata.summary" placeholder="Plcase cnter content">
          </template>
          <!-- 创建按钮 -->
          <template v-slot:btn>
            <el-button class="btnTop" type="primary" @click="keepEdit()">保存</el-button>
          </template>
        </Editor>
        <!-- <cropper style="margin-top:20px"></cropper> -->
    </div>
  </div>
</template>

<script>
  import Editor from 'components/editor/index'
  // import cropper from './cropper'

  export default {
    name: 'ArticleList',
    components: {
      Editor,
      // cropper
    },
    data() {
      return {
        tabledata: {
          author: '',
          time: '',
          importance: '',
          summary: '',
        },
        // 富文本框的显示与隐藏
        isShow: true,
        // 富文本内容
        value: '',
        // 评分
        rate: 0,
        // 点击edit的索引
        index: Number,
        // 分页
        currentPage: 1
      }
    },
    methods: {
      // 点击edit修改按钮
      EditClick(index, row) {
        this.tabledata.author = row.author
        this.tabledata.time = row.date
        this.tabledata.importance = row.importance
        this.value = row.title
        this.rate = this.tabledata.importance.length
        this.index = index
        return this.isShow = !this.isShow
      },
      // 保存修改
      keepEdit() {
        let tabledata ={
          index: this.index,
          author: this.tabledata.author,
          importance: this.tabledata.importance,
          title: this.value.replace(/<.+?>/g, '')
        }
        this.$store.commit('editTableListdata',tabledata)
        this.isShow = true
        return this.$Message.success('修改成功')
      },
      // 修改评分
      rateClick() {
        var score
        switch (this.rate) {
          case 1:
            score = '★';
            break;
          case 2:
            score = '★★';
            break;
          case 3:
            score = '★★★';
            break;
        }
        this.tabledata.importance = score
      }
    }
  }
</script>

<style scoped>

  .btnTop {
    margin-top: 20px;
  }

  .el-rate {
    height: 40px;
    display: inline-block;
    box-sizing: border-box;
  }

  .published input {
    width: 240px;
    height: 40px;
    line-height: 34px;
    padding: 0 15px;
    border: none;
    color: rgb(192, 196, 204);
    box-sizing: border-box;
  }

  .published input:focus {
    outline: none;
    border: none;
  }

  .content input {
    width: 90%;
    border: none;
    font-size: 16px;
    line-height: 34px;
    color: rgb(98, 98, 98);
    border-bottom: 1px solid #ccc;
    margin-left: -10px;
    text-indent: 1em;
  }

  .content input:focus {
    outline: none;
  }

  .block {
    margin-top: 40px;
  }
</style>