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
          <el-button class="submit" type="primary" @click="submit"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'test-dynamic-form',
  props: {
    postURL: {
      required: true,
      default: '',
    },
    name: {
      default: '',
    },
    mobile: {
      default: '',
    },
  },
  // 整点 styles、plugins
  methods: {
    validate() {
      if (!this.name) {
        alert('请填写姓名')
        return false
      }
      if (!this.mobile) {
        alert('请填写电话')
        return false
      }
      return true
    },
    submit() {
      const isValid = this.validate()
      if (!isValid) {
        let formData = new FormData()
        formData.append('name', this.name)
        formData.append('mobile', this.mobile)

        // for test purposes
        console.log('value: ', this.name, this.mobile)

        const req = new XMLHttpRequest()
        req.onreadystatechange = function() {
          if (req.readyState === 4) {
            const message = req.status === 200 ? '提交成功' : '提交失败'
            alert(message)
          }
        }
        req.open('post', this.postURL, true)
        req.send(formData)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
