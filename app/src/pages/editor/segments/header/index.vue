<template>
  <div class="header">
    <div class="left">
      <el-button class="return-btn" type="text"><i class="el-icon el-icon-arrow-left" />返回</el-button>
    </div>
    <div class="center">
      <el-button disabled type="text" icon="el-icon-back">上一步</el-button>
      <el-button disabled type="text" icon="el-icon-right">下一步</el-button>
      <el-button type="text" icon="el-icon-upload2" @click="save"
        >保 存</el-button
      >
    </div>
    <div class="right">
      <el-button type="text" icon="el-icon-view" @click="togglePreview">{{
        isPreview ? '编辑' : '预览'
      }}</el-button>
      <el-button class="release" type="primary" @click="save">发布</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DefaultModule from '@/modules'
export default {
  computed: {
    ...mapState('editor', {
      isPreview: state => state.isPreview
    }),
    ...mapState('screen', {
      modules: state => state.modules
    })
  },
  methods: {
    ...mapActions('editor', [
      'TOGGLE_ISPREVIEW',
      'INSTALL_MODULES',
      'CLEAR_MODULE'
    ]),
    ...mapActions('screen', []),
    save () {
      console.log(this.modules.map(x => x.data))
    },
    togglePreview () {
      this.CLEAR_MODULE()
      this.INSTALL_MODULES({
        modules: DefaultModule.getDefaultModuleList(),
        editable: this.isPreview
      })
      this.TOGGLE_ISPREVIEW()
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
/***************** 布局 *****************/
.header {
  @include flex;
  height: 100%;
  background: #222;
}
.left,
.center,
.right {
  @include flex;
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
    color: #cecece;
    transition: 0.25s;

    &:hover {
      background: #333;
      color: white;
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
    color: #cecece;
  }
  .release {
    padding: 0;
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #0058ff;
    color: white;
    transition: .25s;

    &:hover {
      background: #5d8cf7;
    }
  }
}
.return-btn {
  .el-icon {
    margin-top: -3px;
    margin-right: 2px;
    font-size: 18px;
    font-weight: bold;
    vertical-align: middle;
  }
}
</style>
