<template>
  <div class="main-pop" @click="stopfns">
    <div class="pop-wrapper">
      <div class="pop-content">
        <h2>{{seller.name}}</h2>
        <div class="score-content">
          <scoreView :size="48" :score="seller.score"></scoreView>
        </div>
        <div class="pop-tit">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <div class="pop-yhlist">
          <ul>
            <li v-for="(item,index) in seller.supports" :key="index">
              <typeIcons :type="item.type"></typeIcons><span>{{item.description}}</span>
            </li>
          </ul>
        </div>
        <div class="pop-tit">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="pop-notice">
          {{seller.bulletin}}
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
  import typeIcons from '../../typeIcon/TypeIcon';

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
      },
      stopfns(e) {
        e.stopPropagation();
      }
    },
    components: {
      scoreView,
      typeIcons
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

  .pop-tit {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 56/$ppr auto 48/$ppr;
    .line {
      font-size: 0;
      overflow: hidden;
      height: 1/$ppr;
      flex: 1;
      background: rgba(255, 255, 255, .2);
    }
    .text {
      font-size: 28/$ppr;
      font-weight: 700;
      padding: 0 24/$ppr;
      color: #fff;
      line-height: 28/$ppr;
    }
  }

  .pop-yhlist {
    width: 70%;
    margin: 48/$ppr auto 56/$ppr;
    color: #fff;
    li {
      height: 32/$ppr;
      line-height: 32/$ppr;
      margin-bottom: 24/$ppr;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .pop-notice {
    width: 70%;
    color: #fff;
    font-size: 24/$ppr;
    line-height: 48/$ppr;
    margin: 48/$ppr auto 0;
  }
</style>
