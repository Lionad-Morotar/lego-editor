<template>
  <div
    class="module-card"
    :class="isSelected ? 'selected' : ''"
    @click.stop="selectModule"
  >
    <!-- 每个模块都附带一左一右两个 padding block，将剩余的空间填充满 -->
    <div class="padding left" />
    <outline :active="isSelected">
      <transparent-module-wrapper :module="module" />
    </outline>
    <div class="padding right" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Outline from './outline'
export default {
  components: {
    Outline,
    // 用于在 mounted 时给实例回传 Vue 实例
    TransparentModuleWrapper: {
      props: {
        module: Object,
      },
      render(h) {
        const { name, uuid, props } = this.$props.module
        return h(name, {
          props: {
            key: uuid,
            ...props,
          },
        })
      },
      mounted() {
        this.$props.module.setInstance(this.$children[0])
      },
    },
  },
  props: {
    module: {
      required: true,
    },
  },
  computed: {
    ...mapState('screen', {
      modules: state => state.modules,
      selected: state => state.selected,
    }),
    isSelected() {
      return this.selected === this.module
    },
  },
  methods: {
    ...mapActions('screen', ['SELECT_MODULE']),
    selectModule() {
      !this.isSelected && this.SELECT_MODULE(this.module)
    },
  },
}
</script>

<style lang="scss" scoped>
.module-card {
  display: flex;
  cursor: pointer;

  // todo refactor
  & > *:nth-child(2) {
    width: 375px;
  }

  &.selected {
    .padding {
      background: #e1e5ea;
    }
  }
  .padding {
    flex: 1;
    transition: 0.25s;
  }
  .module {
    flex-shrink: 0;
    width: 375px;
  }
}
</style>
