<template>
  <div class="templates-block">
    <div class="menus">
      <div class="header">测试模板</div>
      <template v-for="cate in templatesCategories">
        <div class="menu"
          :key="cate"
          :class="selectedTemplateCategory===cate ? 'active' : ''"
          @click="selectCate(cate)"
        >{{cate}}</div>
      </template>
    </div>
    <div class="content">
      <div class="cards-con">
        <template-card
          v-for="m in selectedTemplatesByCategories"
          :inits="m"
          :key="m.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import TemplateCard from './template-card'
export default {
  name: 'templates-block',
  components: {
    TemplateCard
  },
  computed: {
    ...mapState('editor', {
      selectedTemplateCategory: state => state.selectedTemplateCategory
    }),
    ...mapGetters('editor', [
      'templatesCategories',
      'selectedTemplatesByCategories'
    ])
  },
  methods: {
    ...mapActions('editor', [
      'SELECT_TEMPLATE_CATEGORY'
    ]),
    selectCate (newCate) {
      this.SELECT_TEMPLATE_CATEGORY(newCate)
    }
  }
}
</script>

<style lang="scss" scoped>
.templates-block {
  display: flex;
  height: 100%;
  overflow: hidden;
}
</style>
