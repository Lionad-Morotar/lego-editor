<template>
  <div class="segment" v-if="selected && configEntries.length > 0">
    <div class="header">
      <span class="label">配置面板</span>
      <i class="el-icon el-icon-arrow-down" />
    </div>
    <div class="content">
      <div class="config-panel">
        <el-form label-width="80px" label-position="top">
          <template v-for="[name, item] in configEntries">
            <config-item
              :name="name"
              :config="item.config"
              :selected="selected"
              :selectedOutline="selectedOutline"
              :key="name"
            />
          </template>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {
    ConfigItem: {
      props: ['name', 'config', 'selected', 'selectedOutline'],
      render(h) {
        const { name, config, selected } = this.$props
        return h(
          'el-form-item',
          {
            key: selected.uuid + '_' + name,
            props: {
              label: config.label,
              required: config.required,
              error: selected.propsConfig[name].error
            },
          },
          [
            h(config.component, {
              props: {
                ...config,
                value: selected.props[name],
              },
              attrs: {
                ...config,
              },
              on: {
                input: function(newVal) {
                  selected.setProp(name, newVal)
                },
              },
            }),
          ],
        )
      },
    },
  },
  computed: {
    ...mapState('screen', {
      selected: state => state.selected,
      selectedOutline: state => state.selectedOutline,
    }),
    config() {
      return this.selectedOutline?.props || {}
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
