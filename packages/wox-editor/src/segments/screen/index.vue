<template>
  <div class="screen" @click="UNSELECTED">
    <div class="page" :class="[moving && 'moving']">
      <draggable
        v-bind="dragOptions"
        v-model="draggableModules">
        <!-- FIXME ? Vue.Draggable 在鼠标事件时会清空行内样式如 transform 导致样式不生效，所以这里额外包一层 DIV -->
        <!-- FIXME 模块的 zindex 层级控制 -->
        <div v-for="(m, idx) in modules" :key="m.uuid">
          <div
            class="module-block"
            :class="[
              selected === m ? 'selected' : '',
              m.layout.auto ? '' : 'free'
            ]"
            :style="styles[idx]"
            @click.stop="selectModule(m)">
              <instance :module="m" :bindModule="true" />
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Module from '@/models/module'
import Props from 'wox-props'
import Draggable from 'vuedraggable'
import Instance from './instance'
export default {
  components: {
    Draggable,
    Instance
  },
  computed: {
    ...mapState('editor', {
      plugins: state => state.modules
    }),
    ...mapState('screen', {
      moving: state => state.moving,
      modules: state => state.modules,
      previewModules: state => state.previewModules,
      selected: state => state.selected,
      selectedOutline: state => state.selectedOutline
    }),
    draggableModules: {
      get () {
        return this.modules
      },
      set (newVal) {
        // 临时解决 newVal 中存在 inits 问题
        this.UPDATE_MODULES(newVal.filter(x => x instanceof Module))
      }
    },
    dragOptions () {
      return {
        animation: 250,
        group: 'installed-moudle',
        ghostClass: 'ghost'
      }
    },
    styles () {
      return this.modules.map(m => {
        const isSelected = this.selected === m
        const style = Props.genStyles(m.layout, { onlyTranslate: true })
        if (isSelected && style.transform) {
          style.transform += ' translateZ(0)'
          style.willChange = 'auto'
        }
        return style
      })
    },
    curIDX () {
      return this.modules.findIndex(x => x === this.selected)
    }
  },
  created () {
    // * for test suppose
    if (this.modules.length === 0) {
      setTimeout(() => {
        this.ADD_MODULE({
          inits: this.plugins.find(x => x.title === '图片模块')
        })
        this.ADD_MODULE({
          inits: this.plugins.find(x => x.title === '按钮模块')
        })
        this.ADD_MODULE({
          inits: this.plugins.find(x => x.title === '基础文本')
        })
        this.ADD_DRAFT()
      }, 200)
    }
  },
  mounted () {
    const type = '选中模块'
    this.$keyboards.watch('up', { type, title: '向上选择' }, this.selectPrev)
    this.$keyboards.watch('down', { type, title: '向下选择' }, this.selectNext)
  },
  methods: {
    ...mapActions('screen', [
      'ADD_MODULE',
      'SELECT_MODULE',
      'SELECT_OUTLINE',
      'UNSELECTED',
      'UPDATE_MODULES',
      'ADD_DRAFT'
    ]),
    // 点击 PaddingBox 时选中模块，同时高亮最外层 Outline
    selectTopElement (targetModule) {
      if (this.selected !== targetModule) {
        this.UNSELECTED()
      }
      const curModuleTopElement = targetModule.$outlines[0]
      this.SELECT_OUTLINE(curModuleTopElement)
    },
    selectModule (targetModule) {
      this.SELECT_MODULE(targetModule)
    },
    selectPrev () {
      const reversed = [].concat(this.modules).reverse()
      const curReversedIDX = reversed.findIndex(x => x === this.selected)
      const targetModule = this.selected
        ? reversed.find((x, idx) => idx > curReversedIDX && x.layout.auto)
        : reversed.find(x => x.layout.auto)
      targetModule && this.selectModule(targetModule)
    },
    selectNext () {
      const targetModule = this.selected
        ? this.modules.find((x, idx) => idx > this.curIDX && x.layout.auto)
        : this.modules.find(x => x.layout.auto)
      targetModule && this.selectModule(targetModule)
    }
    // selectAnyPrev () {
    //   const targetModule = this.selected
    //     ? this.modules.find((_, idx) => idx > this.curIDX)
    //     : this.modules[this.modules.length - 1]
    //   targetModule && this.selectModule(targetModule)
    // },
    // selectAnyNext () {
    //   const targetModule = this.selected
    //     ? this.modules.find((_, idx) => idx > this.curIDX)
    //     : this.modules[0]
    //   targetModule && this.selectModule(targetModule)
    // }
  }
}
</script>

<style lang="scss" scoped>
.screen {
  position: relative;
  padding: 45px 0;
  width: 100%;
  height: 100%;
  overflow: hidden scroll;
  user-select: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-track {
    width: 0;
  }
}
.page {
  position: relative;
  margin: 0 auto;
  width: 375px;
  min-height: 655px;
  // 白色先写死，后期背景色可能会作为页面的属性
  background: white;
  box-shadow: 0 0 7px 1px #ddd;

  &.moving {
    .outline {
      opacity: 0;
    }
  }
}
.module-block {
  position: relative;
  display: flex;
  cursor: pointer;
  z-index: 1;

  &.free {
    will-change: auto;
    z-index: 10;

    &[draggable="true"] {
      transition: none !important;
    }
    & > .padding {
      display: none;
    }
  }

  // todo refactor ?
  & > * {
    width: 375px;
    height: fit-content;
  }
  &.free > * {
    width: unset;
  }

  &.selected {
    z-index: 2;
  }
  .module {
    flex-shrink: 0;
    width: 375px;
  }

  img {
    image-rendering: pixelated;
  }
}
.ghost:not(.selected) {
  outline: dashed 3px #409eff;
  opacity: .68;
  z-index: 999;
}
</style>
