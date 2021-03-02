<template>
  <div class="test-form">
    <h4>请填写表单</h4>
    <div class="form-con">
      <el-form label-position="top" label-width="80px">
        <el-form-item label="姓名">
          <el-input placeholder="请输入姓名" v-model="name" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input placeholder="请输入电话" v-model="mobile" />
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="handleClick"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-form',
  data() {
    return {
      disabled: false,
      url: 'www.baidu.com',
      nameLabel: '姓名',
      namePlaceholder: '请输入姓名',
      name: '',
      mobileLabel: '电话',
      mobilePlaceholder: '请输入电话',
      mobile: '',
    }
  },
  // 整点 styles、plugins
  methods: {
    validate(callback) {
      !this.nameLabel && callback('请填写第一行输入框的标题')
      !this.name && callback('请填写第一行输入框的内容')
      !this.mobileLabel && callback('请填写第二行输入框的标题')
      !this.mobile && callback('请填写第二行输入框的内容')
      callback()
    },
    handleClick() {
      if (this.disabled) return

      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('mobile', this.mobile)
      console.log('value: ', this.name, this.mobile)
      // const req = new XMLHttpRequest()
      // req.onreadystatechange = function () {
      //   if (req.readyState === 4) {
      //     const message = req.status === 200 ? '提交成功' : '提交失败'
      //     alert(message)
      //   }
      // }
      // req.open('post', 'www.baidu.com', true)
      // req.send(formData)
    },
  },
}
</script>

<style lang="less" scoped>
.test-form {
  padding: 15px;
  height: 330px;
  background: #5200d1;
}
h4 {
  margin: 20px;
  margin-top: 10px;
  font-size: 24px;
  color: white;
  font-weight: 300;
  text-align: center;
  letter-spacing: 1px;
}
.form-con {
  padding: 0 15px;
  width: 100%;
  height: 234px;
  background: white;

  .submit {
    margin-top: 17px;
    padding: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #5300d1;
    border-radius: 3px;
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
