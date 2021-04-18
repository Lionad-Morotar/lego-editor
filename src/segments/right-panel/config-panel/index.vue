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
import ConfigItem from './item'
export default {
  components: {
    Folder,
    ConfigItem
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
