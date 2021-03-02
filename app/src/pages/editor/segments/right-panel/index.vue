<template>
  <div class="right-panel">
    <!-- todo refactor -->
    <div class="segment" v-if="selected">
      <div class="header">
        <span class="label">模块操作</span>
        <i class="el-icon el-icon-arrow-down" />
      </div>
      <div class="content">
        <el-button class="action-button" type="text" @click="handleMoveUp"
          >上移模块</el-button
        >
        <el-button class="action-button" type="text" @click="handleMoveDown"
          >下移模块</el-button
        >
        <el-button class="action-button" type="text" @click="deleteModule"
          >删除模块</el-button
        >
      </div>
    </div>

    <div class="segment">
      <div class="header">
        <span class="label">如果有内容区</span>
        <i class="el-icon el-icon-arrow-down" />
      </div>
      <div class="content">
        <el-button disabled class="action-button" type="text"
          >增加对比</el-button
        >
        <el-button disabled class="action-button" type="text"
          >删除对比</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('screen', {
      modules: state => state.modules,
      selected: state => state.selected,
    }),
  },
  methods: {
    ...mapActions('screen', ['DELETE_SELETED_MODULE', 'MOVE_MODULE']),
    // 删除当前屏幕中选中的模块
    deleteModule() {
      this.DELETE_SELETED_MODULE()
    },
    handleMoveUp() {
      this.MOVE_MODULE(-1)
    },
    handleMoveDown() {
      this.MOVE_MODULE(1)
    },
  },
}
</script>

<style lang="scss" scoped>
.right-panel {
  padding-top: 20px;
  border-left: solid 1px #f0f3f7;
}
.segment {
  padding: 0 20px;
  width: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.4px;
    cursor: pointer;

    .label {
      margin-left: 1px;
    }
    .el-icon {
      font-size: 18px;
    }
  }
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;

  .action-button {
    margin: 25px 0 0 0;
    padding: 0;
    width: 180px;
    height: 40px;
    line-height: 40px;
    color: #444;
    border: solid 1px #eee;
    border-radius: 20px;
    transition: 0.25s;
    &:first-child {
      margin-top: 0;
    }
    &:hover {
      color: #0058ff;
    }
    &:active {
      background: rgba(0, 88, 255, 0.03);
    }
    &:disabled {
      color: #999;
      pointer-events: none;
    }
  }
}
</style>
