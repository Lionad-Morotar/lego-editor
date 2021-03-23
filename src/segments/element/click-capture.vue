<script>
// 也许应该叫 native-events-capture ???
export default {
  render (h) {
    return h('div', {
      class: ['click-capture'],
      on: {
        '!click': e => {
          const clickOnChildComponents = e.path.reduce((h, c) => {
            return h + ([...(c.classList || [])].includes('click-capture') ? 1 : 0)
          }, 0) > 1
          if (!clickOnChildComponents) {
            e.stopPropagation()
          }
        }
      }
    }, [this.$slots.default])
  }
}
</script>

<style lang="scss" scoped>
.click-capture {
  position: relative;

  .click-capture > *:first-child {
    pointer-events: none;
  }

  & > *:first-child {
    width: 100%;
  }
}
</style>
