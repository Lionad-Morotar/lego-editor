<template>
  <div class="left-panel">
    <el-tabs v-model="curTab" type="border-card">
      <el-tab-pane label="模板" name="templates-tab">
        <span slot="label">
          <i class="tab-label-prefix el-icon el-icon-notebook-2" />
          模板
        </span>
        <templates-tab />
      </el-tab-pane>
      <el-tab-pane label="模块" name="modules-tab">
        <span slot="label">
          <i class="tab-label-prefix el-icon el-icon-files" />
          模块
        </span>
        <modules-tab />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TemplatesTab from './templates-tab'
import ModulesTab from './modules-tab'
export default {
  components: {
    TemplatesTab,
    ModulesTab
  },
  data () {
    return {
      curTab: 'modules-tab'
    }
  }
}
</script>

<style lang="scss" scoped>
.left-panel {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.el-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: none;
  box-shadow: none;

  .tab-label-prefix {
    margin-right: 0.2em;
    font-size: 22px;
    vertical-align: middle;
  }

  /deep/ .el-tabs__header {
    background: white;
    border-bottom: solid 1px #f0f3f7;

    .el-tabs__nav {
      display: flex;
      padding: 0 28px;
      width: 100%;
    }
    .el-tabs__content {
      padding: 0;
    }
    .el-tabs__item {
      margin: 0 auto;
      padding: 0 !important;
      padding-right: .6em;
      width: 6.8em;
      height: 56px;
      line-height: 56px;
      text-align: center;
      border: none;
      background: transparent;
      border-bottom: solid 3px transparent;
      &.is-active {
        color: #0058fe;
        border-bottom: solid 3px #0058fe;
      }
    }
  }

  /deep/ .el-tabs__content {
    flex: 1;
    padding: 0;

    .el-tab-pane {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
}
</style>
