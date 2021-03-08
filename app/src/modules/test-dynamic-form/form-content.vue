<template>
  <div class="form-con">
    <el-form label-position="top" label-width="80px">
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
</template>

<script>
import Props from '@/modules/props'
export default {
  props: {
    postURL: Props.string({
      label: '请求地址',
      default: 'www.baidu.com',
      placeholder: '暂不可设置',
      disabled: true
    })
  },
  data () {
    return {
      mobile: '18579157140'
    }
  },
  methods: {
    validate () {
      if (!this.mobile) {
        alert('请填写电话')
        return false
      }
      return true
    },
    submit () {
      const isValid = this.validate()
      if (!isValid) {
        const formData = new FormData()
        formData.append('name', this.name)
        formData.append('mobile', this.mobile)

        // for test purposes
        console.log('value: ', this.name, this.mobile)

        const req = new XMLHttpRequest()
        req.onreadystatechange = function () {
          if (req.readyState === 4) {
            const message = req.status === 200 ? '提交成功' : '提交失败'
            alert(message)
          }
        }
        req.open('post', this.postURL, true)
        req.send(formData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-con {
  padding: 0 15px;
  width: 100%;
  min-height: 160px;
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
