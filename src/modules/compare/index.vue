<template>
  <div class="lego-compare">
    <form-header />
    <div class="compare-con">
      <compare
        v-for="(compare, idx) in compares"
        :compare="compare"
        :idx="idx"
        :key="idx"
      />
    </div>
  </div>
</template>

<script>
import Props from '@/models/props'
import FormHeader from './form-header'
import Compare from './compare'
import AddRemoveCompare from './panel/add-remove-compare'
export default {
  name: 'lego-compare',
  props: {
    compares: Props.custom({
      type: Array,
      component: AddRemoveCompare,
      default: [
        {
          left: {
            title: '浩瀚家装',
            description: Props.text({
              default: {
                text: '一站式购齐，风格统一',
                color: '#333',
                fontSize: 12,
                lineHeight: 1.5
              }
            }),
            url: Props.image({
              default:
                'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/left.png'
            })
          },
          right: {
            title: '普通家装',
            description: Props.text({
              default: {
                text: '东拼西凑，材料来源未知，存在一定的安全隐患',
                color: '#333',
                fontSize: 12,
                lineHeight: 1.5
              }
            }),
            url: Props.image({
              default:
                'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/right.png'
            })
          }
        },
        {
          left: {
            title: '浩瀚家装',
            description: Props.text({
              default: {
                text: '免费出效果图，提前看到家的样子',
                color: '#333',
                fontSize: 12,
                lineHeight: 1.5
              }
            }),
            url: Props.image({
              default:
                'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/left.png'
            })
          },
          right: {
            title: '普通家装',
            description: Props.text({
              default: {
                text: '没效果图，看个鬼鬼啊',
                color: '#333',
                fontSize: 12,
                lineHeight: 1.5
              }
            }),
            url: Props.image({
              default:
                'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/right.png'
            })
          }
        }
      ],
      validator (v, props) {
        const { title } = props
        if (v.length === 0) return '请添加至少一项对比'
        const errors = v.map((compare, idx) => {
          const base = `请填写${title.text}的第${idx + 1}项对比中的`
          if (!compare.left.title) return base + '左侧标题'
          if (!compare.left.description.text) return base + '左侧描述'
          if (!compare.left.url.url) return base + '左侧图片'
          if (!compare.right.title) return base + '右侧标题'
          if (!compare.right.description.text) return base + '右侧描述'
          if (!compare.right.url.url) return base + '右侧图片'
        })
        return errors.filter(Boolean)[0]
      }
    })
  },
  components: {
    FormHeader,
    Compare
  }
}
</script>

<style lang="scss" scoped>
.lego-compare {
  padding: 24px 16px;
  background: white;
}
.form-sub-title {
  padding: 5px 0 15px 0;
  font-size: 12px;
  color: #f0f3f7;
  text-align: center;
}
</style>
