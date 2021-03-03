<template>
  <div
    class="box-outline"
    :class="isActive ? 'active' : ''"
    @click="handleClick"
  >
    <slot />
    <div class="outline">
      <div class="point left top" />
      <div class="point left bottom" />
      <div class="point right top" />
      <div class="point right bottom" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['props'],
  computed: {
    ...mapState('screen', {
      selectedElement: state => state.selectedElement,
    }),
    isActive() {
      return this.selectedElement === this
    },
  },
  methods: {
    ...mapActions('screen', ['SELECT_ELEMENT']),
    // 捕获到点击时激活当前选框，
    // 除非已激活选框是当前选框的子项
    handleClick(e) {
      // 最多只有两层 Outline，所以目前只记录 firstTarget
      const firstTarget = (e.path || []).find(x =>
        x?.classList?.contains('box-outline'),
      )
      const allTargets = (e.path || []).filter(x =>
        x?.classList?.contains('box-outline'),
      )
      // 当前选中的是子项
      const isCurrentSelectedChildren =
        firstTarget === this.selectedElement?.$el
      // 当前点击传播到了自身
      const isPassbySelf = allTargets.includes(this.$el)
      const shouldIgnore = isCurrentSelectedChildren && isPassbySelf

      e.preventDefault()

      !shouldIgnore && this.SELECT_ELEMENT(this)
    },
  },
}
</script>

<style lang="scss" scoped>
.box-outline {
  position: relative;
  display: flex;

  .outline {
    position: absolute;
    left: -2px;
    top: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 2px);
    border: solid 2px transparent;
    z-index: 1;
    // todo refactor
    pointer-events: none;

    .point {
      display: none;
      position: absolute;
      width: 16px;
      height: 16px;
      border: solid 2px #a1caff;
      border-radius: 50%;
      background: white;

      &.left {
        left: -8px;
      }
      &.right {
        right: -8px;
      }
      &.top {
        top: -8px;
      }
      &.bottom {
        bottom: -10px;
      }
    }
  }
  &.active {
    & > .outline {
      border: solid 2px #a1caff;
      .point {
        display: block;
      }
    }
  }

  & > *:first-child {
    width: 100%;
  }
}
</style>
