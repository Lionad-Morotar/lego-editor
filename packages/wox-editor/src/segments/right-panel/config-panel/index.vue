<template>
  <folder v-if="selected && configEntries.length > 0" title="配置面板">
    <span slot="header-postpend" v-if="!isSelectedTopOutline">
      <span class="go-back-btn" @click="goBack">返回父模块</span>
    </span>
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
import { mapState, mapGetters, mapActions } from 'vuex'
import Props from 'wox-props'
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
    ...mapGetters('screen', [
      'isSelectedTopOutline'
    ]),
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
    },
    title () {
      return '配置面板'
    }
  },
  methods: {
    ...mapActions('screen', [
      'SELECT_OUTLINE'
    ]),
    goBack () {
      this.SELECT_OUTLINE(this.selected.$outlines[0])
    }
  }
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
.go-back-btn {
  margin-left: 1em;
  font-size: 12px;
  font-weight: normal;
  cursor: pointer;
  color: #555;
}
</style>
