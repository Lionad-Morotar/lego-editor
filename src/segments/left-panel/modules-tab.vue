<template>
  <div class="modules-block">
    <div class="menus">
      <div class="header">基础组件</div>
      <template v-for="cate in basementCategories">
        <div class="menu"
          :key="cate"
          :class="selectedModuleCategory===cate ? 'active' : ''"
          @click="selectCate(cate)"
        >{{cate}}</div>
      </template>
      <div class="header">高级组件</div>
      <template v-for="cate in composedCategories">
        <div class="menu"
          :key="cate"
          :class="selectedModuleCategory===cate ? 'active' : ''"
          @click="selectCate(cate)"
        >{{cate}}</div>
      </template>
    </div>
    <div class="content">
      <div class="module-cards-con">
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
  name: 'modules-block',
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
      'basementCategories',
      'composedCategories',
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
.modules-block {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.menus {
  padding: 6px 0;
  width: 116px;
  border-right: solid 1px #f0f3f7;
  font-size: 14px;

  .header {
    margin-top: 10px;
    padding-left: 18px;
    height: 42px;
    line-height: 42px;
    font-weight: bold;
    cursor: default;
  }
  .header:first-child {
    margin-top: 0;
  }

  .menu {
    padding-left: 23px;
    height: 43px;
    line-height: 43px;
    border-left: 2px transparent solid;
    color: #777;
    font-size: 13px;
    transition: 0.25s;
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
    &.active {
      border-left: 2px #409eff solid;
      background: #f5f8ff;
      color: #409eff;
    }
    .label {
      margin-top: 5px;
      font-size: 12px;
    }
  }
}
.content {
  flex: 1;

  .module-cards-con {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    overflow: hidden scroll;
  }
}
.ghost {
  color: #409eff;
}
</style>
