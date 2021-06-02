<template>
  <div class="header">
    <div class="left">
      <el-button class="return-btn" type="text"><i class="el-icon el-icon-arrow-left" />返回</el-button>
    </div>
    <div class="center">
      <el-button
        type="text"
        icon="el-icon-back"
        :disabled="disableUndo"
        @click="UNDO"
      >撤销</el-button>
      <el-button
        type="text"
        icon="el-icon-right"
        :disabled="disableRedo"
        @click="REDO"
      >重做</el-button>
      <el-button title="保存（Ctrl+S）" type="text" icon="el-icon-upload2" @click="save">保 存</el-button>
    </div>
    <div class="right">
      <el-button type="text" icon="el-icon-view" @click="togglePreview">{{
        isPreview ? '编辑' : '预览'
      }}</el-button>
      <el-button class="release" type="primary" @click="save">发布</el-button>
    </div>
  </div>
</template>

<script>
import clonedeep from 'lodash.clonedeep'
import { mapState, mapGetters, mapActions } from 'vuex'
import Module from '@/models/module'
export default {
  computed: {
    ...mapState('editor', {
      installedModules: state => state.modules,
      isPreview: state => state.isPreview
    }),
    ...mapState('screen', {
      modules: state => state.modules,
      drafts: state => state.drafts,
      draftOffset: state => state.draftOffset
    }),
    ...mapGetters('screen', [
      'lastDraft'
    ]),
    disableUndo () {
      const canUndo = this.drafts.length && (this.draftOffset < this.drafts.length - 1)
      return !canUndo
    },
    disableRedo () {
      return this.draftOffset === 0
    },
    datas () {
      return this.modules.map(x => x.genStore())
    }
  },
  mounted () {
    const type = '编辑器'
    this.$keyboards.watch('ctrl+s', { type, title: '保存' }, this.save)
    this.$keyboards.watch('ctrl+z', { type, title: '撤销' }, () => !this.disableUndo && this.UNDO())
    this.$keyboards.watch('ctrl+y', { type, title: '重做' }, () => !this.disableRedo && this.REDO())
  },
  methods: {
    ...mapActions('editor', [
      'TOGGLE_PREVIEW'
    ]),
    ...mapActions('screen', [
      'ADD_MODULE',
      'CLEAR_SCREEN',
      'CLEAR_DRAFTS',
      'ADD_DRAFT',
      'REDO',
      'UNDO'
    ]),
    save () {
      console.log(this.datas)
      this.CLEAR_DRAFTS()
    },
    togglePreview () {
      const datas = clonedeep(this.datas)
      Module.clearCache()
      this.CLEAR_SCREEN()
      this.TOGGLE_PREVIEW()
      datas.map((x, idx) => {
        const target = this.installedModules.find(y => y.name === x.meta.name)
        if (target) {
          datas[idx].meta.component = target.component
          this.ADD_MODULE({
            inits: target,
            initialData: x
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
/***************** 布局 *****************/
.header {
  @include flex;
  height: 100%;
  background: #222;
}
.left,
.center,
.right {
  @include flex;
  width: 33.3%;
  height: 100%;
}
.left {
  justify-content: flex-start;
}
.center {
  justify-content: center;
}
.right {
  justify-content: flex-end;
}
/***************** 样式 *****************/
.left {
  .el-button {
    color: #9a9a9a;
    font-size: 12px;
  }
}
.center {
  .el-button {
    margin: 0;
    width: 110px;
    height: 100%;
    color: #cecece;
    transition: 0.25s;

    &:hover {
      background: #333;
      color: white;
    }
    &:disabled {
      color: #777;
      background: unset;
    }
  }
}
.right {
  .el-button {
    width: 110px;
    color: #cecece;
  }
  .release {
    padding: 0;
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #409eff;
    color: white;
    transition: .25s;

    &:hover {
      background: #5d8cf7;
    }
  }
}
.return-btn {
  .el-icon {
    margin-top: -3px;
    margin-right: 2px;
    font-size: 18px;
    font-weight: bold;
    vertical-align: middle;
  }
}
</style>
