<template>
  <div class="vs-con">
    {{counts}}
    <div class="vs">
      <div class="left">
        <div class="title">浩瀚家装</div>
        <img src="" />
        <div class="description">一站式购齐，风格统一</div>
      </div>
      <div class="right">
        <div class="title">普通家装</div>
        <img src="" />
        <div class="description">
          东拼西凑，材料来源未知，存在一定的安全隐患
        </div>
      </div>
    </div>

    <div class="vs">
      <div class="left">
        <div class="title">浩瀚家装</div>
        <img src="" />
        <div class="description">免费出效果图，提前看到家的样子</div>
      </div>
      <div class="right">
        <div class="title">普通家装</div>
        <img src="" />
        <div class="description">多站式购物，风格不统一</div>
      </div>
    </div>
  </div>
</template>

<script>
import Props from '@/modules/props'
import AddRemoveCompare from './panel/add-remove-compare'
export default {
  props: {
    // 如果需要多个组件公用一个配置项，只需要直接写同名 props 就可以了，
    // 也可以导出一份配置，多个组件 Import 这个配置的内容，
    // 但不能直接 Import parent.vue from xxx，会有循环依赖问题
    counts: Props.custom({
      type: Number,
      default: 1,
      component: AddRemoveCompare,
    }),
  },
  data() {
    return {}
  },
  methods: {},
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
    align-items: center;
    position: relative;
    margin-bottom: 30px;
    border: solid 1px #4381ff;
    border-radius: 5px;
    width: 345px;
    height: 155px;

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
      height: 2em;
      font-size: 12px;
      color: #333;
      line-height: 1.5em;
    }
  }
}
</style>
