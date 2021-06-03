<template>
  <div class="template-card" @click="useTemplate">
    <div class="title">{{ inits.title }}</div>
    <img class="cover" :alt="inits.title" :src="inits.cover" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'template-card',
  props: ['inits'],
  computed: {
    ...mapState('screen', {
      modules: state => state.modules
    }),
    ...mapState('editor', {
      installedModules: state => state.modules
    })
  },
  methods: {
    ...mapActions('screen', [
      'ADD_MODULE',
      'CLEAR_SCREEN',
      'ADD_DRAFT'
    ]),
    // 更加人性化的 API
    useTemplate () {
      this.CLEAR_SCREEN()
      this.$nextTick(() => {
        this.inits.data.map((x) => {
          const target = this.installedModules.find(y => y.name === x.meta.name)
          if (target) {
            this.ADD_MODULE({
              inits: target,
              initialData: x
            })
          }
        })
        this.ADD_DRAFT()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.template-card {
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
}
</style>
