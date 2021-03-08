<template>
  <div class="preview">
    <template v-for="m in modules">
      <instance :module="m" :key="m.uuid" />
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    Instance: {
      props: ['module'],
      render(h) {
        const { name } = this.$props.module
        return h(name, {
          props: {},
        })
      },
    },
  },
  computed: {
    ...mapState('screen', {
      modules: state => state.modules,
    }),
  },
}
</script>

<style lang="scss" scoped>
.preview {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-top: 55px;
  padding: 0 calc(50vw - 188px);
  padding-top: 20px;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 999;
  overflow: hidden scroll;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-track {
    width: 0;
  }
}
</style>
