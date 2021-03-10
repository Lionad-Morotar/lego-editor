<template>
  <div
    class="module-block"
    :class="isSelected ? 'selected' : ''"
    @click.stop="selectModule"
  >
    <!-- 每个模块都附带一左一右两个 padding block，将剩余的空间填充满 -->
    <div class="padding left" @click="selectTopElement" />
    <instance :module="module" />
    <div class="padding right" @click="selectTopElement" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Instance from './instance'
export default {
  components: {
    Instance
  },
  props: ['module'],
  computed: {
    ...mapState('screen', {
      modules: state => state.modules,
      selected: state => state.selected,
      selectedOutline: state => state.selectedOutline
    }),
    isSelected () {
      return this.selected === this.module
    }
  },
  methods: {
    ...mapActions('screen', ['SELECT_MODULE', 'SELECT_OUTLINE']),
    selectModule () {
      if (!this.isSelected) {
        this.SELECT_MODULE(this.module)
      }
    },
    // 点击 PaddingBox 时高亮最外层 Outline
    selectTopElement () {
      const curModuleTopElement = this.module.$outlines[0]
      this.SELECT_OUTLINE(curModuleTopElement)
    }
  }
}
</script>

<style lang="scss" scoped>
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
