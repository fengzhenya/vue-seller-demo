<template>
  <div class="score" :class="scoreSize">
    <span class="item" v-for="items in itemClasses" :class="items"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    data() {
      return {};
    },
    computed: {
      scoreSize() {
        return 'score-' + this.size;
      },
      itemClasses() {
        const result = [];
        const LENGTH = 5;
        const CLS_ON = 'on';
        const CLS_HALF = 'half';
        const CLS_OFF = 'off';
        const num = Math.floor(this.score * 2) / 2;
        const hasDecimal = num % 1 !== 0;
        const integer = Math.floor(num);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }

        if (hasDecimal) {
          result.push(CLS_HALF);
        }

        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }

        return result;
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/mixin.scss";

  .score {
    font-size: 0;
    text-align: center;
    .item {
      display: inline-block;
      vertical-align: top;
      &.on {
        @include bg-image('../../assets/images/star48_on')
      }
      &.half {
        @include bg-image('../../assets/images/star48_half')
      }
      &.off {
        @include bg-image('../../assets/images/star48_off')
      }
      background-size: cover;
      background-repeat: no-repeat;
    }
    &.score-48 {
      .item {
        width: 48/$ppr;
        height: 48/$ppr;
        margin-right: 40/$ppr;
        &.last-child {
          margin-right: 0;
        }
      }
    }
    &.score-32 {
      .item {
        width: 32/$ppr;
        height: 32/$ppr;
        margin-right: 30/$ppr;
        &.last-child {
          margin-right: 0;
        }
      }
    }
    &.score-24 {
      .item {
        width: 24/$ppr;
        height: 24/$ppr;
        margin-right: 20/$ppr;
        &.last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>
