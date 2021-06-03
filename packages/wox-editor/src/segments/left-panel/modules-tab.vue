<template>
  <div class="modules-tab">
    <div class="menus">
      <div class="header">基础模块</div>
      <template v-for="cate in basementModulesCategories">
        <div class="menu"
          :key="cate"
          :class="selectedModuleCategory===cate ? 'active' : ''"
          @click="selectCate(cate)"
        >{{cate}}</div>
      </template>
      <div class="header">营销模块</div>
      <template v-for="cate in composedModulesCategories">
        <div class="menu"
          :key="cate"
          :class="selectedModuleCategory===cate ? 'active' : ''"
          @click="selectCate(cate)"
        >{{cate}}</div>
      </template>
    </div>
    <div class="content">
      <div class="cards-con">
        <!-- TODO 优化落点范围 -->
        <draggable
          :group="{ name: 'installed-moudle', pull: 'clone', put: false }"
          :list="selectedModulesByCategories"
          :move="dragMove"
          @end="dragEnd">
          <module-card
            v-for="m in selectedModulesByCategories"
            :inits="m"
            :key="m.name"
          />
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Draggable from 'vuedraggable'
import ModuleCard from './module-card'
export default {
  name: 'modules-tab',
  components: {
    Draggable,
    ModuleCard
  },
  computed: {
    ...mapState('editor', {
      modules: state => state.modules,
      selectedModuleCategory: state => state.selectedModuleCategory
    }),
    ...mapGetters('editor', [
      'basementModulesCategories',
      'composedModulesCategories',
      'selectedModulesByCategories'
    ])
  },
  methods: {
    ...mapActions('editor', [
      'SELECT_MODULE_CATEGORY'
    ]),
    ...mapActions('screen', [
      'ADD_MODULE'
    ]),
    selectCate (newCate) {
      this.SELECT_MODULE_CATEGORY(newCate)
    },
    dragMove (e) {
      return [...e.related.classList].includes('module-block')
    },
    dragEnd (e) {
      this.ADD_MODULE({
        inits: e.item.__vue__.inits,
        index: e.newIndex
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modules-tab {
  display: flex;
  height: 100%;
  overflow: hidden;
}
</style>
