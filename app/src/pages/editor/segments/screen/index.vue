<template>
  <div class="screen" @click="unselectedModule">
    <div class="page">
      <template v-for="m in modules">
        <div
          class="module-block"
          :class="selected === m ? 'selected' : ''"
          :key="m.uuid"
          @click.stop="selectModule(m)">
          <!-- 每个模块都附带一左一右两个 padding block，将剩余的空间填充满 -->
          <div class="padding left" @click="selectTopElement(m)" />
          <instance :module="m" :bindModule="true" />
          <div class="padding right" @click="selectTopElement(m)" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Instance from './instance'
export default {
  components: {
    Instance
  },
  computed: {
    ...mapState('editor', {
      plugins: state => state.modules
    }),
    ...mapState('screen', {
      modules: state => state.modules,
      selected: state => state.selected,
      selectedOutline: state => state.selectedOutline
    })
  },
  created () {
    this.modules.length = 0
    setTimeout(() => {
      this.ADD_MODULE({
        inits: this.plugins.find(x => x.title === '流程模块-测试选中子项流程高亮')
      })
    }, 200)

    // 测试组件
    // setTimeout(() => {
    //   this.ADD_MODULE({
    //     inits: this.plugins[this.plugins.length - 1]
    //   })
    // }, 200)
  },
  methods: {
    ...mapActions('screen', [
      'ADD_MODULE',
      'SELECT_MODULE',
      'SELECT_OUTLINE',
      'UNSELECTED'
    ]),
    // 点击 PaddingBox 时高亮最外层 Outline
    selectTopElement (targetModule) {
      const curModuleTopElement = targetModule.$outlines[0]
      this.SELECT_OUTLINE(curModuleTopElement)
    },
    selectModule (targetModule) {
      this.SELECT_MODULE(targetModule)
    },
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

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-track {
    width: 0;
  }
}
.page {
  margin: 0 auto;
  width: 375px;
  min-height: 655px;
  // 白色先写死，后期背景色可能会作为页面的属性
  background: white;
  box-shadow: 0 0 7px 1px #ddd;
}
.module-block {
  position: relative;
  display: flex;
  cursor: pointer;

  // todo refactor
  & > *:nth-child(2) {
    width: 375px;
  }

  &.selected {
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
</style>
