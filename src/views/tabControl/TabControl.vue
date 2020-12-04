<template>
  <div>
    <div style="padding:20px">
      <el-breadcrumb separator="/" style="margin-bottom:20px">
        <el-breadcrumb-item><i class="el-icon-s-order" style="margin-right:10px"></i>tab选项卡</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 未读消息 -->
        <el-tab-pane :label="'未读消息' + '（' + noMessage.length + '）'" name="first">
          <el-card>
            <el-table ref="multipleTable" :data="noMessage" style="width: 100%" :show-header="false">
              <!-- 内容 -->
              <el-table-column prop="content" min-width="60%"> </el-table-column>
              <!-- 日期 -->
              <el-table-column prop="date" width="180"> </el-table-column>
              <!-- 标为已读 -->
              <el-table-column prop="condition" width="180">
                <template slot-scope="scope">
                  <el-button plain size="mini" @click="handleDelete(scope.$index, scope.row)">标为已读</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 全部标为已读按钮 -->
            <div class="entire" v-show="noMessage.length !== 0">
              <el-button type="primary" @click="asRead">全部标为已读</el-button>
            </div>
          </el-card>
        </el-tab-pane>

        <!-- 已读消息 -->
        <el-tab-pane :label="'已读消息' + '（' + readMessage.length + '）'" name="second">
          <el-card>
            <el-table ref="multipleTable" :data="readMessage" style="width: 100%" :show-header="false">
              <!-- 内容 -->
              <el-table-column prop="content" min-width="60%"> </el-table-column>
              <!-- 日期 -->
              <el-table-column prop="date" width="180"> </el-table-column>
              <!-- 标为已读 -->
              <el-table-column prop="condition" width="180">
                <!-- <el-button type="danger">删除</el-button> -->
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="clear(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="entire" v-show="readMessage.length !== 0">
              <el-button type="danger" @click="allClear">删除全部</el-button>
            </div>
          </el-card>
        </el-tab-pane>

        <!-- 回收站 -->
        <el-tab-pane :label="'回收站' + '（' + recMessage.length + '）'" name="third">
          <el-card>
            <el-table ref="multipleTable" :data="recMessage" style="width: 100%" :show-header="false">
              <!-- 内容 -->
              <el-table-column prop="content" min-width="60%"> </el-table-column>
              <!-- 日期 -->
              <el-table-column prop="date" width="180"> </el-table-column>
              <!-- 标为已读 -->
              <el-table-column prop="condition" width="180">
                <template slot-scope="scope">
                  <el-button plain size="mini" @click="restore(scope.$index, scope.row)">还原</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="entire" v-show="recMessage.length !== 0">
              <el-button type="danger" @click="empty">清空回收站</el-button>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        activeName: "second",
        // 未读消息
        noMessage: [],
        // 已读消息
        readMessage: [{
          content: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          date: "2020-9-30 18:00",
          condition: "标为已读",
        }, ],
        // 回收站
        recMessage: [{
          content: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          date: "2020-9-30 18:00",
          condition: "标为已读",
        }, ],
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      // 全部标为已读
      asRead() {
        // 将所有未读消息标为已读消息
        let allMessage = this.readMessage.concat(this.noMessage);
        this.readMessage = allMessage;
        this.noMessage = [];
        this.$store.state.noMessage = []
      },
      // 点击删除全部，将所有数据放到回收站
      allClear() {
        this.recMessage = this.recMessage.concat(this.readMessage);
        this.readMessage = [];
      },
      // 清空回收站
      empty() {
        this.recMessage = [];
      },
      // 标为已读
      handleDelete(index, row) {
        // console.log(index, row);
        this.readMessage.push({
          content: row.content,
          condition: row.condition,
          date: row.date,
        });
        this.noMessage.splice(index, 1);
      },
      // 点击删除将数据放到回收站
      clear(index, row) {
        this.recMessage.push({
          content: row.content,
          condition: row.condition,
          date: row.date,
        });
        this.readMessage.splice(index, 1);
      },
      // 还原数据
      restore(index, row) {
        this.readMessage.push({
          content: row.content,
          condition: row.condition,
          date: row.date,
        });
        this.recMessage.splice(index, 1);
      },
    },
    created() {
      this.noMessage = this.$store.state.noMessage
    }
  };
</script>

<style scoped>
  .el-table {
    color: rgb(64, 158, 255);
  }

  .entire {
    margin-top: 20px;
  }
</style>