<template>
  <div class="vs-con">
    <template v-if="counts === 0">
      <p>还没有内容哦，快去添加吧~</p>
    </template>
    <template v-else>
      <div class="vs" v-for="idx in counts" :key="idx">
        <div class="left">
          <div class="title">{{compares[idx-1].left.title}}</div>
          <img :src="compares[idx-1].left.url.url" />
          <div class="description" :style="styles[idx-1].leftDes">{{compares[idx-1].left.description.text}}</div>
        </div>
        <div class="right">
          <div class="title">{{compares[idx-1].right.title}}</div>
          <img :src="compares[idx-1].right.url.url" />
          <div class="description" :style="styles[idx-1].rightDes">{{compares[idx-1].right.description.text}}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Props from '@/modules/props'
import AddRemoveCompare from './panel/add-remove-compare'
import ConfigCompares from './panel/config-compares'
export default {
  props: {
    counts: Props.custom({
      type: Number,
      default: 2,
      component: AddRemoveCompare,
    }),
    compares: Props.custom({
      type: Array,
      component: ConfigCompares,
      default: [
        {
          left: {
            title: '浩瀚家装',
            description: Props.text({
              default: '一站式购齐，风格统一',
            }),
            url: Props.image({
              default: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/left.png'
            })
          },
          right: {
            title: '普通家装',
            description: Props.text({
              default: '东拼西凑，材料来源未知，存在一定的安全隐患',
            }),
            url: Props.image({
              default: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/right.png'
            })
          }
        },
        {
          left: {
            title: '浩瀚家装',
            description: Props.text({
              default: '免费出效果图，提前看到家的样子',
            }),
            url: Props.image({
              default: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/left.png'
            })
          },
          right: {
            title: '普通家装',
            description: Props.text({
              default: '看个鬼鬼',
            }),
            url: Props.image({
              default: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/right.png'
            })
          }
        }
      ],
    })
  },
  computed: {
    styles () {
      return this.compares.map(x => ({
        leftDes: Props.genStyles(x.left.description),
        rightDes: Props.genStyles(x.right.description),
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.vs-con {
  padding: 15px;
  width: 100%;
  min-height: 160px;
  background: white;

  .vs {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    position: relative;
    margin-bottom: 30px;
    padding-top: 20px;
    padding-bottom: 10px;
    border: solid 1px #4381ff;
    border-radius: 5px;
    width: 345px;
    min-height: 155px;

    &:last-child {
      margin-bottom: 0;
    }

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
