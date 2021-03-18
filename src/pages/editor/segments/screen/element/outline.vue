<template>
  <div
    class="box-outline"
    :class="isActive ? 'active' : ''"
    @click.stop="selectElement"
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
import Module from '../../../models/module'
export default {
  name: 'box-outline',
  inject: ['model'],
  props: ['props'],
  computed: {
    ...mapState('screen', {
      selectedOutline: state => state.selectedOutline
    }),
    curModel () {
      return Module.getModel(this.model)
    },
    isActive () {
      return this.selectedOutline === this
    }
  },
  mounted () {
    // console.log(this.$attrs, this.$props)
  },
  methods: {
    ...mapActions('screen', [
      'SELECT_MODULE',
      'SELECT_OUTLINE'
    ]),
    selectElement () {
      this.SELECT_MODULE(this.curModel)
      this.SELECT_OUTLINE(this)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-outline {
  position: relative;
  // display: flex;

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
