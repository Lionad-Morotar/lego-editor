<template>
  <div class="screen" @click="unselectedModule">
    <template v-for="m in modules">
      <screen-block :module="m" :key="m.uuid" />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ScreenBlock from './block'
export default {
  components: {
    ScreenBlock
  },
  computed: {
    ...mapState('editor', {
      // todo rename ?
      plugins: state => state.modules
    }),
    ...mapState('screen', {
      modules: state => state.modules
    })
  },
  created () {
    // for test purposes
    if (this.modules.length === 0) {
      setTimeout(() => {
        this.ADD_MODULE(this.plugins[0])
      }, 200)
      setTimeout(() => {
        this.ADD_MODULE(this.plugins[1])
      }, 200)
      setTimeout(() => {
        this.ADD_MODULE(this.plugins[2])
      }, 200)
    }
  },
  methods: {
    ...mapActions('screen', ['ADD_MODULE', 'UNSELECTED']),
    unselectedModule () {
      this.UNSELECTED()
    }
  }
}
</script>

<style lang="scss" scoped>
.screen {
  padding: 20px 0;
  width: 100%;
  height: 100%;
  overflow: hidden scroll;
  user-select: none;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-track {
    width: 0;
  }
}
</style>
