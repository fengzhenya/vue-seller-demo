<template>
  <i class="type-icon" :class="typeClass"></i>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      type: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        msg: 'hello vue'
      };
    },
    computed: {
      typeClass() {
        let reCls = null;
        const types = this.type;
        if (types === '') {
          return;
        }
        switch (types) {
          case 0 :
            reCls = 'decrease';
            break;
          case 1 :
            reCls = 'discount';
            break;
          case 2 :
            reCls = 'special';
            break;
          case 3 :
            reCls = 'invoice';
            break;
          case 4 :
            reCls = 'guarantee';
            break;
        }
        return reCls;
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/mixin.scss";
  /*ICON*/
  .type-icon {
    width: 32/$ppr;
    height: 32/$ppr;
    margin-right: 12/$ppr;
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    vertical-align: top;
    &.decrease {
      @include bg-image('../../assets/images/decrease_2');
    }
    &.discount {
      @include bg-image('../../assets/images/discount_2');
    }
    &.guarantee {
      @include bg-image('../../assets/images/guarantee_2');
    }
    &.invoice {
      @include bg-image('../../assets/images/invoice_2');
    }
    &.special {
      @include bg-image('../../assets/images/special_2');
    }
  }
</style>
