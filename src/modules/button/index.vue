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
        padding: [12, 20, 12, 20],
        left: 150,
        top: 150,
        width: 100,
        border: [1, 2, 5, 2],
        borderStyle: 'solid',
        borderColor: '#999',
        radius: 30
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
      alert('点击了按钮')
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
  background: #fff;
  -webkit-appearance: none;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
}
</style>
