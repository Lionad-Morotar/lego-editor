<template>
  <fragment>
    <div class="question-btn clicked" @click="toggleCard">
      <i class="iconfont icon-question-plain" />
    </div>
    <div class="fullscreen-mask" v-if="open" @click="open=false" @mousewheel="open=false" />
    <transition
      enter-active-class="fadeIn"
      leave-active-class="fadeOut">
        <questions v-if="open" @close="closeCard" />
    </transition>
  </fragment>
</template>

<script>
import Questions from './questions'

export default {
  components: {
    Questions
  },
  data () {
    return {
      open: false
    }
  },
  methods: {
    toggleCard () {
      this.open = !this.open
    },
    closeCard () {
      this.open = false
    }
  }
}
</script>

<style lang="scss" scoped>
.question-btn {
  position: absolute;
  right: 30px;
  bottom: 30px;
  padding: 6px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 5px #ccc;
  cursor: pointer;

  .iconfont {
    font-size: 22px;
    color: #999;
  }
}
</style>
