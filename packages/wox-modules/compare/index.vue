<template>
  <div class="m-compare">
    <form-header />
    <div class="compare-con">
      <div class="compare-wrapper" v-for="(compare, idx) in compares" :key="idx">
        <compare :compare="compare" :idx="idx" />
      </div>
    </div>
  </div>
</template>

<script>
import Props from 'wox-props'
import FormHeader from './form-header'
import Compare from './compare'
import AddRemoveCompare from './panel/add-remove-compare'
export default {
  name: 'm-compare',
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
            image: Props.image({
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
            image: Props.image({
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
            image: Props.image({
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
            image: Props.image({
              default:
                'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/right.png'
            })
          }
        }
      ]
    })
  },
  components: {
    FormHeader,
    Compare
  }
}
</script>

<style lang="scss" scoped>
.m-compare {
  padding: 24px 16px;
  background: white;
}
.form-sub-title {
  padding: 5px 0 15px 0;
  font-size: 12px;
  color: #f0f3f7;
  text-align: center;
}
.compare-wrapper {
  margin-top: 13px;
  padding-top: 12px;
}
</style>
