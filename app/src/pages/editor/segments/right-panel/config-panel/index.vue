<template>
  <div class="segment" v-if="selected && configEntries.length > 0">
    <div class="header">
      <span class="label">配置面板</span>
      <i class="el-icon el-icon-arrow-down" />
    </div>
    <div class="content">
      <div class="config-panel">
        <el-form label-width="80px" label-position="top" @submit.native.prevent>
          <template v-for="[name, item] in configEntries">
            <config-item
              :name="name"
              :config="item.config"
              :selected="selected"
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
import Props from '../quick-form/props'
export default {
  components: {
    ConfigItem: {
      props: ['name', 'config', 'selected'],
      render(h) {
        const { name, config, selected } = this.$props
        // console.log(selected.propsConfig[name])
        return h(
          'el-form-item',
          {
            key: selected.uuid + '_' + name,
            props: {
              label: config.label,
              required: config.required,
              error: selected.propsConfig[name]?.lastError,
              ['inline-message']: true,
            },
          },
          [
            h(config.component, {
              props: {
                ...config,
                value: selected.props[name],
                props: selected.props,
              },
              attrs: {
                ...config,
              },
              on: {
                // input: newVal => selected.setProp(name, newVal),
                change: newVal => selected.setProp(name, newVal),
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
      // console.log(this.selectedOutline)
      return Object.entries(
        Object.entries(this.config).reduce((h, [k, v]) => {
          if (v instanceof Props.Prop) {
            h[k] = v
          }
          return h
        }, {}),
      )
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.config-panel {
  width: 100%;

  .el-form-item + .el-form-item {
    margin-top: 20px;
  }

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

<style lang="scss">
.config-panel {
  width: 100%;

  .el-input-number {
    width: 100%;
  }
}
</style>
