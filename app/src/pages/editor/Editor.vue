<template>
  <el-container id="editor">
    <el-header id="header">
      <nav-header />
    </el-header>
    <el-container id="body">
      <el-aside width="340px" id="left-panel">
        <left-panel />
      </el-aside>
      <el-main id="main">
        <screen />
      </el-main>
      <el-aside width="340px" id="right-panel">
        <right-panel />
      </el-aside>
      <!-- float panel here -->
    </el-container>
  </el-container>
</template>

<script>
import NavHeader from './segments/header/index'
import LeftPanel from './segments/left-panel/index'
import RightPanel from './segments/right-panel/index'
import Screen from './segments/screen/index'

export default {
  components: {
    NavHeader,
    LeftPanel,
    RightPanel,
    Screen,
  },
}
</script>
