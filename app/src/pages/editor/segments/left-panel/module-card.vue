<template>
  <div class="module-selector" @click="addToScreen">
    <div class="title">{{ inits.title }}</div>
    <img class="cover" :src="inits.cover" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'module-selector',
  props: ['inits'],
  methods: {
    ...mapActions('screen', ['ADD_MODULE']),
    addToScreen () {
      this.ADD_MODULE(this.inits)
    }
  }
}
</script>

<style lang="scss" scoped>
.module-selector {
  margin: 15px auto;
  cursor: pointer;

  &+& {
    margin-top: 0;
  }

  .title {
    height: 37px;
    line-height: 37px;
    font-size: 12px;
    color: #444;
  }

  .cover {
    width: 100%;
    height: auto;
  }
}
</style>
