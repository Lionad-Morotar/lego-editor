<template>
  <div class="screen" @click="unselectedModule">
    <template v-for="m in modules">
      <screen-element :module="m" :key="m.uuid" />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ScreenElement from './element'
export default {
  components: {
    ScreenElement
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
  mounted () {
    // for test purposes
    setTimeout(() => {
      this.ADD_MODULE(this.plugins[0])
    }, 700)
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
  width: 100%;
  height: 100%;
  user-select: none;
}
</style>
