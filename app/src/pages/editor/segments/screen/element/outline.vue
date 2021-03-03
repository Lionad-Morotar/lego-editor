<template>
  <div
    class="box-outline"
    :class="isActive ? 'active' : ''"
    @click="selectElement"
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
  name: 'box-outline',
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
    // 捕获到点击时激活当前选框
    selectElement(e) {
      const allTargets = (e.path || []).filter(x =>
        x?.classList?.contains('box-outline'),
      )
      const firstTarget = allTargets[0]
      // 当前选中的是子项
      const isCurrentSelectedChildren =
        firstTarget === this.selectedElement?.$el
      // 忽略点击事件冒泡触发的事件
      const isPassbySelf = allTargets[allTargets.length - 1] === this.$el
      const shouldIgnore = isCurrentSelectedChildren && isPassbySelf
      // console.log(isPassbySelf, shouldIgnore)
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
