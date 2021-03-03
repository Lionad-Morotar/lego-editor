<template>
  <div
    class="module-card"
    :class="isSelected ? 'selected' : ''"
    @click.stop="selectModule"
  >
    <!-- 每个模块都附带一左一右两个 padding block，将剩余的空间填充满 -->
    <div class="padding left" />
    <instance :ref="module.uuid" :module="module" />
    <div class="padding right" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Instance from './instance'
export default {
  components: {
    Instance,
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
    ...mapActions('screen', ['SELECT_MODULE','SELECT_ELEMENT']),
    selectModule() {
      if (!this.isSelected) {
        this.SELECT_MODULE(this.module)
        this.SELECT_ELEMENT(this.$refs[this.module.uuid].$children[0].$children[0])
      }
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
