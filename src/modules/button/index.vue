<script>
import Props from '@/models/props'
import { pass } from '@/modules/utils'
import Forms from '@/forms'

export default {
  name: 'lego-button',
  inline: true,
  props: {
    layout: Props.layout({
      default: {
        auto: false,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        left: 150,
        top: 150,
        width: 100,
        radius: 4
      }
    })
  },
  computed: {
    styles () {
      return Props.genStyles(this.layout, { removeTranslate: true })
    }
  },
  methods: {
    handleClick () {
      console.log('!!!!1111')
    }
  },
  render () {
    return (
      <div class="lego-button" style={this.styles} onClick={this.handleClick}>
        <button-label />
      </div>
    )
  },
  components: {
    ButtonLabel: ButtonLabel()
  }
}

function ButtonLabel () {
  return {
    inline: true,
    props: {
      label: Props.text({
        label: '按钮文本',
        default: {
          text: '点击',
          fontSize: 14
        },
        component: pass(Forms.StyledText, {
          disable: ['align']
        })
      })
    },
    computed: {
      styles () {
        return Props.genStyles(this.$props.label)
      }
    },
    render () {
      return (
        <span style={this.styles}>{this.$props.label.text}</span>
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.lego-button {
  display: inline-block;
  box-sizing: border-box;
  margin: 0;
  outline: none;
  border: 1px solid #999;
  background: #fff;
  -webkit-appearance: none;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
}
</style>
