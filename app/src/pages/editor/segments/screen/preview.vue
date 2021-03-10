<template>
  <div class="mask">
    <div class="preview">
      <template v-for="m in modules">
        <instance :module="m" :key="m.uuid" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DefaultModule from '@/modules'
import TestData from '@/modules/test/example-data'
import Instance from './instance'
export default {
  components: {
    Instance
  },
  computed: {
    ...mapState('editor', {
      installedModules: state => state.modules
    }),
    ...mapState('screen', {
      modules: state => state.modules
    })
  },
  created () {
    // todo “重安装”
    this.modules.length = 0
    this.CLEAR_MODULE()
    this.INSTALL_MODULES({
      modules: DefaultModule.getDefaultModuleList(),
      isPreview: true
    })
  },
  mounted () {
    const datas = TestData
    const findInits = datas.map((x, idx) => {
      const targetModule = this.installedModules.find(y => y.name === x.meta.name)
      if (targetModule) {
        datas[idx].meta.component = targetModule.component
        return targetModule
      } else {
        /* Do not delete these console logs Start */
        console.log('datas: ', datas)
        console.log('installedModules: ', this.installedModules)
        /* Do not delete these console logs End */
        throw new Error('[ERR] invalid modules or datas')
      }
    })
    findInits.map((inits, idx) => {
      this.ADD_MODULE({
        inits,
        initialData: datas[idx]
      })
    })
  },
  methods: {
    ...mapActions('editor', [
      'INSTALL_MODULES',
      'CLEAR_MODULE'
    ]),
    ...mapActions('screen', [
      'ADD_MODULE'
    ])
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
  margin: 0 auto;
  width: 375px;
  min-height: 655px;
  box-shadow: 0 0 7px 1px #ddd;
}
</style>
