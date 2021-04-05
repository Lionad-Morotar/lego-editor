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
  user-select: none;
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
        color: #409eff;
        border-bottom: solid 3px #409eff;
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

<style lang="scss">
.left-panel {
  .menus {
    padding: 6px 0;
    width: 116px;
    border-right: solid 1px #f0f3f7;
    font-size: 14px;

    .header {
      margin-top: 10px;
      padding-left: 18px;
      height: 42px;
      line-height: 42px;
      font-weight: bold;
      cursor: default;
    }
    .header:first-child {
      margin-top: 0;
    }

    .menu {
      padding-left: 23px;
      height: 43px;
      line-height: 43px;
      border-left: 2px transparent solid;
      color: #777;
      font-size: 13px;
      transition: 0.25s;
      cursor: pointer;

      &:hover {
        color: #409eff;
      }
      &.active {
        border-left: 2px #409eff solid;
        background: #f5f8ff;
        color: #409eff;
      }
      .label {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
  .content {
    flex: 1;

    .cards-con {
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 100%;
      overflow: hidden scroll;
    }
  }
  .ghost {
    color: #409eff;
  }
}
</style>
