<template>
  <div class="screen" @click="unselectedModule">
    <div class="page">
      <template v-for="m in modules">
        <screen-block :module="m" :key="m.uuid" />
      </template>
    </div>
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
    /* for test purposes */
    this.modules.length = 0
    // setTimeout(() => {
    //   this.ADD_MODULE(this.plugins.find(x => x.title === '流程模块-测试选中子项流程高亮'))
    // }, 200)

    // 测试组件
    setTimeout(() => {
      this.ADD_MODULE(this.plugins[this.plugins.length - 1])
    }, 200)
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
  padding: 45px 0;
  width: 100%;
  height: 100%;
  overflow: hidden scroll;
  user-select: none;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-track {
    width: 0;
  }
}
.page {
  margin: 0 auto;
  width: 375px;
  min-height: 655px;
  // 白色先写死，后期背景色可能会作为页面的属性
  background: white;
  box-shadow: 0 0 7px 1px #ddd;
}
</style>
