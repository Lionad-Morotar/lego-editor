<template>
  <div class="left-panel">
    <div class="icon-navs">
      <div class="icon-nav">
        <i class="el-icon el-icon-notebook-2" />
        <div class="label">模板</div>
      </div>
      <div class="icon-nav active">
        <i class="el-icon el-icon-files" />
        <div class="label">模块</div>
      </div>
    </div>
    <div class="content">
      <el-tabs type="border-card">
        <el-tab-pane label="全部内容">
          <div class="module-cards-con">
            <template v-for="m in modules">
              <module-selector :inits="m" :key="m.name" />
            </template>

            <!-- for scroller test start -->
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <!-- for scroller test end -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="全部样式">
          <p
            style="padding: 30px; font-size: 14px; color: #888; text-align: center;"
          >
            别看！这里还没有内容...
          </p>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ModuleSelector from './module-selector'
export default {
  components: {
    ModuleSelector
  },
  computed: {
    ...mapState('editor', {
      modules: state => state.modules
    })
  }
}
</script>

<style lang="scss" scoped>
.left-panel {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  // border-right: solid 1px #f0f3f7;
  // border-right: solid 5px white;

  .icon-navs,
  .content {
    height: 100%;
  }

  .icon-navs {
    width: 75px;
    border-right: solid 1px #f0f3f7;

    .icon-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 20px 0;
      height: 65px;
      border-left: 4px transparent solid;
      color: #777;
      transition: 0.25s;
      cursor: pointer;

      &.active {
        border-left: 4px #0058fe solid;
        background: #f5f8ff;
        color: #0058fe;
      }

      .el-icon {
        display: block;
        font-size: 26px;
      }
      .label {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
  .content {
    flex: 1;

    .module-cards-con {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 20px 0;
      height: 100%;
      overflow: hidden scroll;

      // todo remove
      & > * {
        flex-shrink: 0;
        margin-top: 20px;
        width: 200px;
        height: 260px;
        border: solid 6px #f0f3f7;
        border-radius: 3px;
        transition: 0.25s;
        cursor: pointer;

        &:hover {
          background: #f0f3f766;
        }
        &:active {
          background: #f0f3f7ff;
        }
      }
    }

    .el-tabs {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      border: none;
      box-shadow: none;

      /deep/ .el-tabs__header {
        background: white;
        border-bottom: solid 1px #f0f3f7;

        .el-tabs__nav {
          display: flex;
          padding: 0 10px;
          width: 100%;
        }
        .el-tabs__content {
          padding: 0;
        }
        .el-tabs__item {
          margin: 0 auto;
          padding: 0;
          width: 4em;
          height: 48px;
          line-height: 48px;
          border: none;
          background: transparent;
          border-bottom: solid 2px transparent;
          &.is-active {
            color: #0058fe;
            border-bottom: solid 2px #0058fe;
          }
        }
      }

      /deep/ .el-tabs__content {
        flex: 1;
        padding: 0;

        .el-tab-pane {
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
