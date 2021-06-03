<template>
  <div class="compare">
    <div class="left">
      <div class="title">{{ compare.left.title }}</div>
      <!-- 简单解决 -->
      <div class="clip-rect">
        <img
          :src="compare.left.image.url"
          :style="styles.leftImage"
        />
      </div>
      <div class="description" :style="styles.leftDes">
        {{ compare.left.description.text }}
      </div>
    </div>
    <div class="right">
      <div class="title">{{ compare.right.title }}</div>
      <!-- 简单解决 -->
      <div class="clip-rect">
        <img
          :src="compare.right.image.url"
          :style="styles.rightImage"
        />
      </div>
      <div class="description" :style="styles.rightDes">
        {{ compare.right.description.text }}
      </div>
    </div>
  </div>
</template>

<script>
import Props from 'wox-props'
import ConfigCompare from './panel/config-compare'
export default {
  props: {
    idx: Props.pass(),
    compare: Props.pass({
      component: ConfigCompare,
      bindProps (props) {
        return props.compares[this.idx]
      }
    })
  },
  computed: {
    styles () {
      return {
        leftDes: Props.genStyles(this.compare.left.description),
        rightDes: Props.genStyles(this.compare.right.description),
        leftImage: Props.genStyles({
          ...this.compare.left.image,
          width: 140
        }),
        rightImage: Props.genStyles({
          ...this.compare.right.image,
          width: 140
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.compare {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.5em;
  position: relative;
  margin: auto;
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
    word-break: break-all;
  }
}
</style>
