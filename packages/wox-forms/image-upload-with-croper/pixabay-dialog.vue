<template>
  <el-dialog
    title="搜索在线图片（Pixabay）"
    width="1150px"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    :visible="visible"
    :before-close="close">
    <!-- 搜索框 -->
    <el-input placeholder="请输入搜索内容" v-model="query">
      <el-button slot="append" icon="el-icon-search" @click="() => search()"></el-button>
    </el-input>
    <!-- 结果数量 -->
    <p class="tips" v-if="hits">
      <template v-if="prevQuery">共找到 {{hits}} 张关于 "{{prevQuery}}" 的图片</template>
      <template v-else>找到 {{hits}} 张默认图片</template>
    </p>
    <p class="tips" v-else>没有找到相关图片，换个搜索词试试？</p>

    <div class="image-con">
      <div v-for="img in imgs" class="image" :key="img.id" @click="() => select(img)">
        <img :src="img.webformatURL" />
      </div>
    </div>
    <!-- 加载更多 -->
    <div class="loadmore-con">
      <el-button type="text" @click="loadMore" v-if="moreImgs">加载更多</el-button>
    </div>
  </el-dialog>
</template>

<script>
const PIXABAY_PREFIX = 'https://pixabay.com/api/'
const API_KEY = '4943525-e14877d84360aa0fb9efc70a3'

export default {
  props: ['visible'],
  data () {
    return {
      imgs: [],
      query: '',
      prevQuery: '',
      pageNum: 1,
      hits: '',
      moreImgs: false,
      perPage: 18
    }
  },
  mounted () {
    this.$keyboards.watch('enter', this.search)
    this.$keyboards.watch('esc', this.close)
    this.search()
  },
  beforeDestroy () {
    this.$keyboards.unwatch('enter')
    this.$keyboards.unwatch('esc')
  },
  methods: {
    search (page = 1) {
      this.pageNum = page
      const getURL = (query, pageNum) => `${PIXABAY_PREFIX}?key=${API_KEY}&q=${encodeURIComponent(query)}&per_page=${this.perPage}&page=${pageNum}`
      fetch(getURL(this.query, this.pageNum))
        .then(res => res.json())
        .then(json => {
          this.prevQuery = this.query
          if (this.pageNum === 1) {
            this.imgs = json.hits
          } else {
            this.imgs = this.imgs.concat(json.hits)
          }
          this.hits = json.total
          if (json.hits.length >= this.perPage) {
            this.moreImgs = true
          } else {
            this.moreImgs = false
          }
        })
    },
    loadMore () {
      this.search(++this.pageNum)
    },
    select (val) {
      if (val) {
        const { webformatURL, largeImageURL, imageWidth, imageHeight } = val
        this.$emit('select', {
          url: webformatURL || largeImageURL,
          width: imageWidth,
          height: imageHeight
        })
      }
    },
    close () {
      this.$emit('select', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.tips {
  color: #333;
  margin: 16px 0
}
.image-con {
  display: flex;
  flex-wrap: wrap;
  gap: 2em;

  .image {
    width: 160px;
    height: 112px;

    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
      background: #f3f3f3;
      border: solid 3px transparent;
      border-radius: 3px;
      cursor: pointer;
      transition: .3s;

      &:hover {
        background: #e9e9e9;
        border: solid 3px #66b1ff;
        filter: brightness(1.08);
      }
      &:active {
        background: #ccc;
        border: solid 3px #ccc;
        filter: brightness(1.15);
      }
    }
  }
}
.loadmore-con {
  display: flex;
  justify-content: center;

  .el-button {
    margin-top: 20px;
  }
}
</style>
