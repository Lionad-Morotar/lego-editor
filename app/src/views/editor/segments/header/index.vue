<template>
  <div class="header">
    <div class="left">
      <el-button type="text" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <div class="center">
      <el-button disabled type="text" icon="el-icon-back">上一步</el-button>
      <el-button disabled type="text" icon="el-icon-right">下一步</el-button>
      <el-button type="text" icon="el-icon-upload2" @click="save"
        >保 存</el-button
      >
    </div>
    <div class="right">
      <el-button disabled type="text" icon="el-icon-view">预览</el-button>
      <el-button class="release" type="primary" @click="save">发布</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('screen', {
      modules: state => state.modules,
    }),
  },
  methods: {
    ...mapActions('screen', []),
    save() {
      const isValid = this.modules.every(x => x.validate())
      if (isValid) {
        console.log('saved')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
/***************** 布局 *****************/
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  height: 100%;
}
.left,
.center,
.right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  height: 100%;
}
.left {
  justify-content: flex-start;
}
.center {
  justify-content: center;
}
.right {
  justify-content: flex-end;
}
/***************** 样式 *****************/
.left {
  .el-button {
    color: #9a9a9a;
    font-size: 12px;
  }
}
.center {
  .el-button {
    margin: 0;
    width: 110px;
    height: 100%;
    color: #ccc;
    transition: 0.25s;

    &:hover {
      background: #777;
    }
    &:disabled {
      color: #777;
      background: unset;
    }
  }
}
.right {
  .el-button {
    width: 110px;
    color: #ccc;
  }
  .release {
    padding: 0;
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #0058ff;
    color: white;
  }
}
</style>
