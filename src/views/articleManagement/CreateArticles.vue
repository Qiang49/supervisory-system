<template>
  <div>
    <div class="creat" style="padding:20px">
      <el-breadcrumb separator="/" style="margin-bottom:20px">
        <el-breadcrumb-item :to="{ path: '/Users' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章创建</el-breadcrumb-item>
      </el-breadcrumb>
      <Editor v-model="value">
        <!-- 作者 -->
        <template v-slot:author>
          Author：
          <el-input v-model.trim="tabledata.author" placeholder="Search user" style="width: 240px">
          </el-input>
        </template>
        <!-- 时间 -->
        <template v-slot:time>
          Publish Time：
          <el-input :disabled="true" v-model="tabledata.date" placeholder="Select date and time"
            prefix-icon="el-icon-time" style="width: 240px">
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
          <el-button class="btnTop" type="primary" @click="keep">创建</el-button>
        </template>
      </Editor>
    </div>
  </div>
</template>

<script>
  import Editor from 'components/editor/index'

  export default {
    name: 'CreateArticles',
    data() {
      return {
        tabledata: {
          author: '',
          date: '',
          importance: '',
          summary: '',
        },
        // 富文本内容
        value: '',
        // 评分
        rate: 0,
      }
    },
    components: {
      Editor,
      // cropper
    },
    methods: {
      keep() {
        if (this.tabledata.author === '' || this.value === '') {
          return this.$Message.error('创建失败，请输入内容');
        }
        let tableListdata = {
          author: this.tabledata.author,
          date: this.currentdatehours,
          importance: this.tabledata.importance,
          type: 'success',
          statu: 'published',
          title: this.value.replace(/<.+?>/g, ''),
        }
        this.$store.commit('addTableListdata',tableListdata)
        this.$Message.success('创建成功');

      },
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
      },

    },
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
</style>