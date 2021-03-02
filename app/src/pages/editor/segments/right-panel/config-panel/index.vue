defau
<template>
  <div class="segment" v-if="selected && configEntries.length > 0">
    <div class="header">
      <span class="label">控制面板</span>
      <i class="el-icon el-icon-arrow-down" />
    </div>
    <div class="content">
      <div class="config-panel">
        <el-form label-width="80px" label-position="top">
          <template v-for="[name, item] in configEntries">
            <el-form-item :label="item.config.label" :key="name">
              <component :is="item.config.component" v-model="selected.props[name]" />
            </el-form-item>
          </template>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('screen', {
      selected: state => state.selected,
    }),
    config() {
      return this.selected.component.props || {}
    },
    configEntries() {
      return Object.entries(this.config)
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.config-panel {
  width: 100%;

  /deep/ .el-input__inner {
    background-color: white;
  }
  /deep/ .el-form-item__label {
    padding: 0;
  }
  /deep/ .el-form-item {
    margin: 0;
  }
}
</style>
