<template>
  <div class="mask">
    <div class="preview">
      <template v-for="(m, idx) in modules">
        <instance :module="m" :key="m.uuid" :style="styles[idx]" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Props from '@/models/props'
import Instance from './instance'
export default {
  components: {
    Instance
  },
  computed: {
    ...mapState('screen', {
      modules: state => state.modules
    }),
    styles () {
      return this.modules.map(m => Props.genStyles(m.props.layout, { onlyTranslate: true }))
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin-top: 55px;
  padding: 0 calc(50vw - 188px);
  padding-top: 45px;
  padding-bottom: calc(55px + 45px);
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
.preview {
  position: relative;
  margin: 0 auto;
  width: 375px;
  min-height: 655px;
  box-shadow: 0 0 7px 1px #ddd;
  overflow: hidden;
}
</style>
