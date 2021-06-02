<template>
  <div class="question-card">
    <div class="cover-con">
      <h4>{{title}}</h4>
      <i v-if="showClose" class="iconfont icon-close" @click="goBack" />
    </div>
    <div class="item-con">
      <div class="item clicked"
        :class="[item.type]"
        v-for="item, idx in lists"
        :key="item.title + idx"
        @click="handleClick(item)">
          <span class="title">{{item.title}}</span>
          <span class="content" v-if="item.content">{{item.content}}</span>
          <span class="icon" v-if="item.type === 'go'">
            <i class="iconfont icon-right" />
          </span>
      </div>
    </div>
  </div>
</template>

<script>
const packageJSON = require('../../../../package.json')

// TODO Path Parser
export default {
  data () {
    return {
      select: null,
      root: [
        {
          title: '快捷键',
          type: 'go',
          select: 'keys'
        },
        {
          title: '问题反馈',
          type: 'go',
          link: packageJSON.homepage
        }
      ],
      keys: []
    }
  },
  computed: {

    /* Data */

    lists () {
      return this[this.select || 'root']
    },

    /* Interavtive */

    title () {
      const titleMap = {
        keys: '快捷键'
      }
      return titleMap[this.select] || '在线帮助'
    },
    showClose () {
      return this.select
    }

  },
  mounted () {
    const keys = Object.entries(this.$keymaps)
      .map(([k, v]) => {
        return {
          group: v.type,
          title: v.title,
          content: k.split('+').join(' + '),
          type: 'key'
        }
      }, [])
    const grouped = this._.groupBy(keys, 'group')
    this.keys = Object.entries(grouped)
      .reduce((h, [k, v]) => {
        h.push({
          title: k,
          type: 'header'
        })
        h.push(...v)
        return h
      }, [])
  },
  methods: {
    goBack () {
      this.select = null
    },
    handleClick (item) {
      if (item.link) {
        window.open(item.link)
        this.$emit('close')
      }
      if (item.select) {
        this.select = item.select
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.question-card {
  position: absolute;
  right: 25px;
  bottom: 90px;
  border-radius: 4px;
  background: white;
  color: #666;
  z-index: 1;
  filter: drop-shadow(0 0 8px #eee);

  &::after {
    content: '';
    position: absolute;
    right: 16px;
    bottom: -16px;
    border: solid 7px transparent;
    border-top: solid 10px white;
  }

  .cover-con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    line-height: 65px;
    background-image: url(https://lego-editor.oss-cn-shanghai.aliyuncs.com/assets/helper.png);
    background-repeat: repeat;
    font-size: 20px;
    font-weight: bold;
    color: #424242;
    text-shadow: -1px 1px #f3b68f;

    .iconfont {
      padding-top: 10px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .item-con {
    padding: 8px 0;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    padding-right: 17px;
    width: 220px;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    cursor: pointer;

    &:hover {
      background: #fafafa;
    }
    &:active {
      background: #f8f8f8;
    }

    &.header .title {
      font-size: 14px;
      font-weight: bold;
    }

    .content {
      width: 110px;
      line-height: 2em;
      background: #f3f3f3;
      border-radius: 3px;
      text-align: center;
    }

    .iconfont {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
