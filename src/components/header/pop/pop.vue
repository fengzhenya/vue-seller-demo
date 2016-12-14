<template>
  <div class="main-pop">
    <div class="pop-wrapper">
      <div class="pop-content">
        <h2>{{seller.name}}</h2>
        <div class="score-content">
          <scoreView :size="48" :score="seller.score"></scoreView>
        </div>
      </div>
    </div>
    <div class="pop-close">
      <i class="pop-close-i" @click="close($event)"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import scoreView from '../../score/score';

  export default {
    data() {
      return {
        showPop: true
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      close(e) {
        this.$emit('closepop', e);
      }
    },
    components: {
      scoreView
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../../assets/scss/mixin.scss";

  .main-pop {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 333;
    background: rgba(7, 17, 27, 0.8);
    -webkit-backdrop-filter: blur(10/$ppr);
  }

  .pop-wrapper {
    min-height: 100%;
    max-height: 100%;
    overflow: hidden;
    position: relative;
  }

  .pop-content {
    position: absolute;
    left: 0;
    top: 128/$ppr;
    right: 0;
    bottom: 148/$ppr;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    h2 {
      font-size: 32/$ppr;
      font-weight: 700;
      color: #fff;
      line-height: 32/$ppr;
      text-align: center;
    }
  }

  .pop-close {
    position: relative;
    top: -128/$ppr;
    height: 64/$ppr;
    text-align: center;
    .pop-close-i {
      width: 64/$ppr;
      height: 64/$ppr;
      display: inline-block;
      background-color: #000;
    }
  }

  .score-content {
    height: 48/$ppr;
    margin: 32/$ppr 0 56/$ppr;
  }
</style>
