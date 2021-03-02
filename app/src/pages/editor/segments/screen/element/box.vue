<template>
  <div class="box" :class="active ? 'active' : ''">
    <slot />
    <!-- 元素多起来的话，会不会有性能问题？ -->
    <div class="outline">
      <div class="point left top" />
      <div class="point left bottom" />
      <div class="point right top" />
      <div class="point right bottom" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  display: flex;

  .outline {
    position: absolute;
    left: -2px;
    top: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    transition: 0.25s;
    border: solid 2px transparent;
    // todo refactor
    user-select: none;
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
        bottom: -8px;
      }
    }
  }
  &.active {
    .outline {
      border: solid 2px #a1caff;
      .point {
        display: block;
      }
    }
  }

  & > *:first-child {
    flex: 1;
  }
}
</style>
