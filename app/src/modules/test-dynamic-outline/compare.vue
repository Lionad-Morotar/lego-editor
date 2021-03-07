<template>
  <fragment>
    <slot />
  </fragment>
</template>
<script>
import Props from '../props'
// import ConfigCompares from './panel/config-compares'
import ConfigCompare from './panel/config-compare'
export default {
  props: {
    compares: Props.custom({
      // component: ConfigCompares,
      default: [
        {
          left: {
            title: '浩瀚家装',
            description: Props.text({
              default: '一站式购齐，风格统一',
            }),
            url: Props.image({
              default:
                'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/left.png',
            }),
          },
          right: {
            title: '普通家装',
            description: Props.text({
              default: '东拼西凑，材料来源未知，存在一定的安全隐患',
            }),
            url: Props.image({
              default:
                'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/right.png',
            }),
          },
        },
      ],
    }),
    compare: Props.custom({
      component: ConfigCompare,
      default: {
        left: {
          title: '浩瀚家装',
          description: Props.text({
            default: '一站式购齐，风格统一',
          }),
          url: Props.image({
            default:
              'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/left.png',
          }),
        },
        right: {
          title: '普通家装',
          description: Props.text({
            default: '东拼西凑，材料来源未知，存在一定的安全隐患',
          }),
          url: Props.image({
            default:
              'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/right.png',
          }),
        },
      },
    }),
  },
  mounted () {
    console.log(this.compare)
  }
}
</script>