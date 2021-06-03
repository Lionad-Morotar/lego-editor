<template>
  <el-container id="editor">
    <el-header id="header">
      <nav-header />
    </el-header>
    <el-container id="body">
      <el-aside width="365px" id="left-panel">
        <left-panel />
      </el-aside>
      <el-main id="main">
        <preview v-if="isPreview" />
        <template v-else>
          <screen />
          <screen-footer />
        </template>
      </el-main>
      <el-aside width="341px" id="right-panel">
        <right-panel />
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'

import NavHeader from './segments/header/index'
import LeftPanel from './segments/left-panel/index'
import RightPanel from './segments/right-panel/index'
import Screen from './segments/screen/index'
import Preview from './segments/screen/preview'
import ScreenFooter from './segments/screen-footer/index'

const Layout = {
  components: {
    NavHeader,
    LeftPanel,
    RightPanel,
    Screen,
    Preview,
    ScreenFooter
  },
  computed: {
    ...mapState('editor', {
      isPreview: state => state.isPreview
    })
  }
}

export default Layout
</script>
