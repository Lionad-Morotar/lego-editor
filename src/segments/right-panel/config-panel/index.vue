<template>
  <folder v-if="selected && configEntries.length > 0" title="配置面板">
    <div class="content">
      <div class="config-panel">
        <template v-for="[name, item] in configEntries">
          <config-item
            :name="name"
            :config="item.config"
            :selected="selected"
            :selectedOutline="selectedOutline"
            :key="name"
          />
        </template>
      </div>
    </div>
  </folder>
</template>

<script>
import { mapState } from 'vuex'
import Props from '@/models/props'
import Folder from '../folder/index'
export default {
  components: {
    Folder,
    ConfigItem: {
      // TODO refactor
      props: ['name', 'config', 'selected', 'selectedOutline'],
      render (h) {
        const { name, config, selected, selectedOutline } = this.$props

        /* 获取动态表单 v-model 绑定的值 */
        const usePassValue = config.pass
        const value = selected.props[name]
        const $child = selectedOutline.$children[0].$children[0]
        const getPassValue = () => config.bindProps
          ? config.bindProps.bind($child)({ ...selected.props })
          : $child.props[name]

        return h(config.component, {
          key: selected.uuid + '_' + selectedOutline._uid,
          props: {
            ...config,
            config,
            value: usePassValue ? getPassValue() : value,
            props: selected.props
          },
          attrs: {
            ...config
          },
          on: {
            change: newVal => !config.bindProps && selected.setProp(name, newVal)
          }
        })
      }
    }
  },
  computed: {
    ...mapState('screen', {
      selected: state => state.selected,
      selectedOutline: state => state.selectedOutline
    }),
    config () {
      return this.selectedOutline?.props || {}
    },
    configEntries () {
      return Object.entries(
        Object.entries(this.config).reduce((h, [k, v]) => {
          if (Props.isProp(v) && v.config.component) {
            h[k] = v
          }
          return h
        }, {})
      )
    }
  },
  methods: {}
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

<style lang="scss">
.config-panel {
  width: 100%;

  .el-input-number {
    width: 100%;
  }
}
</style>
