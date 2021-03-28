<template>
  <div class="screen" @click="unselectedModule">
    <div class="page" :class="[moving && 'moving']">
      <draggable
        v-bind="dragOptions"
        v-model="draggableModules">
        <!-- ? Vue.Draggable 在鼠标事件时会清空行内样式如 transform 导致样式不生效，所以这里额外包一层 DIV -->
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
              <!-- 每个模块都附带一左一右两个 padding block，将剩余的空间填充满 -->
              <!-- todo refactor 拖拽的时候会带影子 -->
              <div class="padding left" @click="selectTopElement(m)" />
              <instance :module="m" :bindModule="true" />
              <div class="padding right" @click="selectTopElement(m)" />
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Module from '@/models/module'
import Props from '@/models/props'
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
      return this.modules.map(m => Props.genStyles(m.layout, { onlyTranslate: true }))
    },
    curIDX () {
      return this.modules.findIndex(x => x === this.selected)
    }
  },
  created () {
    if (this.modules.length === 0) {
      /* 以下代码供开发环境调试用 */
      // this.modules.length = 0
      setTimeout(() => {
        this.ADD_MODULE({
          inits: this.plugins.find(x => x.title === '轮播模块')
        })
        // this.ADD_MODULE({
        //   inits: this.plugins.find(x => x.title === '单行文本')
        // })
        // this.ADD_MODULE({
        //   inits: this.plugins.find(x => x.title === '文本区域')
        // })
        // this.ADD_MODULE({
        //   inits: this.plugins.find(x => x.title === '按钮模块'),
        //   initialData: {
        //     layout: Object.assign(Props.DS.layout, {
        //       auto: false,
        //       degree: -45,
        //       left: 150,
        //       top: 150,
        //       padding: [15, 15, 15, 15],
        //       width: 100,
        //       height: 50,
        //       border: [1, 2, 5, 2],
        //       borderStyle: 'solid',
        //       borderColor: '#999',
        //       radius: 30
        //     })
        //   }
        // })
        // setTimeout(() => this.SELECT_MODULE(this.modules[2]), 100)
        // this.ADD_MODULE({
        //   inits: this.plugins.find(x => x.title === '流程模块')
        // })
        // this.ADD_MODULE({
        //   inits: this.plugins.find(x => x.title === '对比模块')
        // })
      //   this.ADD_MODULE({
      //     inits: this.plugins.find(x => x.title === '单行文本'),
      //     initialData: {
      //       layout: Object.assign(Props.DS.layout, {
      //         auto: false,
      //         left: 106,
      //         top: 260
      //       }),
      //       text: Object.assign(Props.DS.text, {
      //         text: '自由布局文本',
      //         fontSize: 26,
      //         letterSpacing: 3,
      //         lineHeight: 1.8,
      //         bold: true
      //       })
      //     }
      //   })
      // }, 200)
      // setTimeout(() => {
      //   this.ADD_MODULE({
      //     inits: this.plugins[this.plugins.length - 1]
      //   })
      }, 200)
    }
  },
  mounted () {
    this.$keyboards.watch('up', this.selectPrev)
    this.$keyboards.watch('down', this.selectNext)
  },
  methods: {
    ...mapActions('screen', [
      'ADD_MODULE',
      'SELECT_MODULE',
      'SELECT_OUTLINE',
      'UNSELECTED',
      'UPDATE_MODULES'
    ]),
    // 点击 PaddingBox 时高亮最外层 Outline
    selectTopElement (targetModule) {
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
    },
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
    // },
    unselectedModule () {
      this.UNSELECTED()
    }
  }
}
</script>

<style lang="scss" scoped>
.screen {
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

  // todo refactor
  & > *:nth-child(2) {
    width: 375px;
  }
  &.free > *:nth-child(2) {
    width: unset;
  }

  &.selected {
    z-index: 2;

    .padding {
      background: #e6e8eb;
    }
  }
  .padding {
    position: absolute;
    width: 100vw;
    transition: 0.25s;
    z-index: 0;
    height: 100%;

    &.left {
      left: -100vw;
    }
    &.right {
      right: -100vw;
    }
  }
  .module {
    flex-shrink: 0;
    width: 375px;
  }
}
.ghost:not(.selected) {
  outline: dashed 3px #0058ff;
  opacity: .68;
  z-index: 999;
}
</style>
