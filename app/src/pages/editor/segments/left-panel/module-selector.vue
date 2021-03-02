<template>
  <div class="module-selector" @click="addToScreen">
    <p
      style="text-align: center; margin-top: 20px; color: #888; user-select: none"
    >
      {{ inits.title }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'module-selector',
  props: {
    // 组件数据
    inits: {
      required: true,
    },
  },
  methods: {
    ...mapActions('screen', ['ADD_MODULE']),
    addToScreen() {
      this.ADD_MODULE(this.inits)
    },
  },
}
</script>

<style lang="scss" scoped>
.module-selector {
  flex-shrink: 0;
  margin-top: 20px;
  width: 200px;
  height: 260px;
  border: solid 6px #f0f3f7;
  border-radius: 3px;
  transition: 0.25s;
  cursor: pointer;

  &:hover {
    background: #f0f3f766;
  }
  &:active {
    background: #f0f3f7ff;
  }
}
</style>
