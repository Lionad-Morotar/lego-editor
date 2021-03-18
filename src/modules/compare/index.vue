<template>
  <div class="lego-compare">
    <form-header />
    <div class="content">
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
import Props from '../props'
import FormHeader from './form-header'
import Compare from './compare'
import AddRemoveCompare from './panel/add-remove-compare'
// import ConfigCompares from './panel/config-compares'
import { zip } from '../utils'
export default {
  name: 'lego-compare',
  props: {
    compares: Props.custom({
      type: Array,
      // component: zip(AddRemoveCompare, ConfigCompares),
      component: zip(AddRemoveCompare),
      default: [
        {
          left: {
            title: '浩瀚家装',
            description: Props.text({
              default: '一站式购齐，风格统一'
            }),
            url: Props.image({
              default:
                'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/left.png'
            })
          },
          right: {
            title: '普通家装',
            description: Props.text({
              default: '东拼西凑，材料来源未知，存在一定的安全隐患'
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
              default: '免费出效果图，提前看到家的样子'
            }),
            url: Props.image({
              default:
                'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/left.png'
            })
          },
          right: {
            title: '普通家装',
            description: Props.text({
              default: '没效果图，看个鬼鬼啊'
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
.content {

  & > *:first-child {
    border: 4px;
  }

  /deep/ .vs {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    position: relative;
    margin: 24px auto 0;
    padding: 20px 12px 10px 12px;
    border: solid 1px #4381ff;
    border-radius: 5px;
    min-height: 155px;

    &:before {
      content: '';
      position: absolute;
      top: -20px;
      left: calc(50% - 17.5px);
      width: 35.5px;
      height: 35.5px;
      border: solid 1px #4381ff;
      background: white;
      transform: rotate(45deg);
      clip-path: polygon(0% 100%, 100% 100%, 100% 0%);
    }
    &:after {
      content: 'VS';
      position: absolute;
      top: -0.5em;
      left: 50%;
      width: 100px;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      letter-spacing: 1px;
      text-indent: 0.3em;
      transform: translateX(-50%);
    }

    .left,
    .right {
      flex-shrink: 0;
      width: 140px;
    }
    .title {
      word-break: break-all;
    }

    .left {
      .title {
        left: -1px;
        background: #5200d1;
        border-bottom-left-radius: 0;
        &:after,
        &:before {
          left: 0;
        }
        &:after {
          border-top-left-radius: 100%;
          clip-path: polygon(0% 0%, 100% 0%, 0 100%);
        }
        &:before {
          clip-path: polygon(0% 0%, 90% 0%, 0 90%);
          background: #5200d1;
        }
      }
    }
    .right {
      .title {
        right: -1px;
        background: #ac83ec;
        border-bottom-right-radius: 0;
        &:after,
        &:before {
          right: 0;
        }
        &:after {
          border-top-right-radius: 100%;
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
        }
        &:before {
          clip-path: polygon(10% 0%, 100% 0%, 100% 90%);
          background: #ac83ec;
        }
      }
    }

    .title {
      position: absolute;
      top: -12px;
      width: 75px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 4px;
      letter-spacing: 0.3px;
      font-size: 13px;
      font-weight: 300;
      color: white;

      &:after,
      &:before {
        content: '';
        position: absolute;
        bottom: -12px;
        width: 12px;
        height: 12px;
      }
      &:after {
        background: white;
      }
    }
    img {
      width: 100%;
      height: 84px;
      background: #fefefe;
    }
    .description {
      min-height: 2em;
      font-size: 12px;
      color: #333;
      line-height: 1.5em;
    }
  }
}
</style>
