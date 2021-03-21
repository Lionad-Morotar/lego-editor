<template>
  <div class="lego-procedure">
    <procedure-header />
    <div class="container">
      <procedure
        v-for="(procedure, idx) in procedures"
        :procedures="procedures"
        :procedure="procedure"
        :idx="idx"
        :key="idx+procedure.title"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
// TODO  48:20  error  Strings must use singlequote quotes
import Props from '@/models/props'
import ProcedureHeader from './procedure-header'
import Procedure from './procedure'
import ConfigCounts from './panel/config-counts'
import ConfigProcedures from './panel/config-procedures'
import { zip } from '@/modules/utils'
export default {
  name: 'lego-procedure',
  props: {
    procedures: Props.custom({
      type: Array,
      component: zip(ConfigCounts, ConfigProcedures),
      default: [
        {
          title: '流程1',
          content: `24小时上门验货\n专人快速鉴定`,
          image: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/procedure-1-1.png'
        },
        {
          title: '流程2',
          content: `咨询考察签订合同专家\n鉴定团队、交易迅速`,
          image: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/procedure-1-2.png'
        },
        {
          title: '流程3',
          content: `全国品牌连锁店铺\n售后有保障`,
          image: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/procedure-1-3.png'
        },
        {
          title: '流程4',
          content: `咨询考察签订合同\n现场转账，快捷`,
          image: 'https://baxing-lionad.oss-cn-shanghai.aliyuncs.com/lego/procedure-1-4.png'
        }
      ]
    })
  },
  components: {
    ProcedureHeader,
    Procedure
  }
}
</script>

<style lang="scss">
.lego-procedure {
  padding: 24px 16px;

  .container {
    margin-top: 24px;

    & > *:nth-child(2n) .procedure {
      background: #cc392b;
      flex-direction: row-reverse;

      .title {
        color: #cc392b;
      }
    }
    & > *:first-child .procedure {
      margin-top: 0;
    }

    .procedure {
      margin-top: 10px;
      display: flex;
      width: 100%;
      height: 122px;
      border-radius: 9px;
      background: #f09033;
      overflow: hidden;

      .content-con {
        flex: 1;
      }
      .title {
        margin: auto;
        margin-top: 10px;
        width: 117px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 16px;
        background: white;
        color: #f09033;
        font-weight: bold;
        letter-spacing: 1px;
      }
      .content {
        padding-top: 6px;
        text-align: center;
        color: #f2f2f2;
        font-size: 13px;
        line-height: 1.5;
        letter-spacing: .5px;
        word-break: keep-all;
      }
      .image {
        width: 165px;
        height: 100%;
      }
    }
  }
}
</style>
