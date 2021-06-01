<template>
  <div class="module-card" @click="addToScreen">
    <div class="title">{{ inits.title }}</div>
    <img class="cover" v-if="inits.cover" :alt="inits.title" :src="inits.cover" />
    <div class="fake-cover" v-else>{{ inits.title }}</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'module-card',
  props: ['inits'],
  computed: {
    ...mapState('screen', {
      modules: state => state.modules
    })
  },
  methods: {
    ...mapActions('screen', [
      'ADD_MODULE',
      'ADD_DRAFT'
    ]),
    addToScreen () {
      this.ADD_MODULE({
        inits: this.inits
      })
      this.ADD_DRAFT()
      this.$nextTick(() => {
        const $el = this.modules[this.modules.length - 1].$instance.$el
        const $parent = this.$utils.findParentByClass($el, 'module-block')
        this.$utils.scrollIntoView($parent)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.module-card {
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

  .cover,
  .fake-cover {
    width: 210px;
    height: auto;
    min-height: 62px;
    background: #f2f2f2;
    box-shadow: 0 0 3px 0 transparent;
    transition: .25s, box-shadow .15s;
    will-change: scale;
    image-rendering: -webkit-optimize-contrast;

    &:hover {
      box-shadow: 0 0 7px 0 #ccc;
      transform: scale(1.05);
    }
  }

  .fake-cover {
    line-height: 60px;
    color: #94c7fb;
    font-size: 26px;
    font-weight: bold;
    letter-spacing: 3.5px;
    text-align: center;
  }
}
</style>
