<template>
  <div class="right-panel">
    <folder v-if="selected" title="模块操作">
      <div class="content">
        <div class="icons-group">
          <div class="icon" title="上移模块（Ctrl+Up）" :class="disableMoveUpClass" @click="handleMoveUp">
            <i class="iconfont icon-arrowup" />
          </div>
          <div class="icon" title="下移模块（Ctrl+Down）" :class="disableMoveDownClass" @click="handleMoveDown">
            <i class="iconfont icon-arrowdown" />
          </div>
          <div class="icon" title="复制模块" @click="cloneModule">
            <i class="iconfont icon-file-copy" />
          </div>
          <div class="icon" title="删除模块（Delete）" @click="deleteModule">
            <i class="iconfont icon-delete" />
          </div>
        </div>
        <div class="config-item">
          <div class="config-item-label">自动排版</div>
          <div class="config-item-content">
            <el-switch
              v-model="selected.layout.auto"
              :disabled="selected.layout.lockLayout"
            />
          </div>
        </div>
      </div>
    </folder>

    <config-panel />

    <folder v-if="!selected" title="啊啊啊啊！" :closable="false">
      <div class="content">
        <el-button disabled class="action-button" type="text"
          >你咋啥都没选呢！</el-button
        >
      </div>
    </folder>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ConfigPanel from './config-panel'
import Folder from './folder/index'
export default {
  components: {
    ConfigPanel,
    Folder
  },
  computed: {
    ...mapState('screen', {
      modules: state => state.modules,
      selected: state => state.selected,
      selectedOutline: state => state.selectedOutline
    }),
    isFreeElement () {
      return this.selected && !this.selected.layout.auto
    },
    disableMoveUp () {
      return this.isFreeElement || this.selected === this.modules.find(x => x.layout.auto)
    },
    disableMoveDown () {
      const reversed = [].concat(this.modules).reverse()
      return this.isFreeElement || this.selected === reversed.find(x => x.layout.auto)
    },
    disableMoveUpClass () {
      return this.disableMoveUp ? 'disabled' : ''
    },
    disableMoveDownClass () {
      return this.disableMoveDown ? 'disabled' : ''
    },
    curIDX () {
      return this.modules.findIndex(x => x === this.selected)
    }
  },
  mounted () {
    const type = '选中模块'
    this.$keyboards.watch('ctrl+up', { type, title: '上移' }, !this.disableMoveUp && this.handleMoveUp)
    this.$keyboards.watch('ctrl+down', { type, title: '下移' }, !this.disableMoveDown && this.handleMoveDown)
    this.$keyboards.watch('del', { type, title: '删除' }, this.deleteModule)
  },
  methods: {
    ...mapActions('screen', [
      'DELETE_SELECTED_MODULE',
      'CLONE_MODULE',
      'MOVE_MODULE',
      'ADD_DRAFT'
    ]),
    cloneModule () {
      this.CLONE_MODULE()
      this.ADD_DRAFT()
    },
    deleteModule () {
      this.DELETE_SELECTED_MODULE()
      this.ADD_DRAFT()
    },
    handleMoveUp () {
      for (let i = this.curIDX - 1; i >= 0; i--) {
        if (this.modules[i].layout.auto) {
          this.MOVE_MODULE(i - this.curIDX)
          this.ADD_DRAFT()
          this.scrollIntoView()
          return
        }
      }
    },
    handleMoveDown () {
      for (let i = this.curIDX + 1; i < this.modules.length; i++) {
        if (this.modules[i].layout.auto) {
          this.MOVE_MODULE(i - this.curIDX)
          this.ADD_DRAFT()
          this.scrollIntoView()
          return
        }
      }
    },
    scrollIntoView () {
      this.$nextTick(() => {
        const $el = this.selected.$instance.$el
        const $parent = this.$utils.findParentByClass($el, 'module-block')
        this.$utils.scrollIntoView($parent)
      })
    }
  }
}
</script>

<style lang="scss">
.right-panel {
  padding-top: 20px;
  padding-bottom: 20px;
  border-left: solid 1px #f0f3f7;
  user-select: none;
}
.icons-group {
  flex-shrink: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 48px;
  background: #f9f9f9;
  border: solid 1px #eee;
  border-radius: 3px;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    border: solid 1px #eee;
    border-radius: 50%;
    background: white;
    cursor: pointer;

    &:hover {
      .iconfont {
        color: #409eff;
      }
      .iconfont.icon-delete {
        color: var(--color-danger);
      }
    }
    &.disabled {
      background: transparent;
      border-color: transparent;
      color: #bbb;
      pointer-events: none;
    }

    .iconfont {
      transition: color .25s;
    }
  }
}
</style>
