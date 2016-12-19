<template>
  <div class="header" @click="popflag = true">
    <div class="ht-wrapper">
      <div class="ht-pic">
        <img width="32" height="32" :src="seller.avatar" alt="">
      </div>
      <div class="ht-content">
        <div class="ct-name">
          <span class="brand"></span>
          <span class="name">粥品香坊(大运村)</span>
        </div>
        <div class="ct-des">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="ct-cx" v-if="seller.supports">
          <TypeIcon :type="seller.supports[0].type"></TypeIcon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="ht-tips">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon">&gt;</i>
      </div>
    </div>
    <div class="bullet-wrapper">
      <span class="flag"></span><span class="text">{{seller.bulletin}}</span><i class="icon">&gt;</i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name="fade">
      <mainPop @closepop="hidePop" v-show="popflag" :seller="seller"></mainPop>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import mainPop from './pop/pop';
  import TypeIcon from '../typeIcon/TypeIcon';
  export default {
    data() {
      return {
        popflag: false
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      hidePop(e) {
        e.stopPropagation();
        this.popflag = false;
      }
    },
    components: {
      mainPop,
      TypeIcon
    }
  };
</script>


<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/mixin.scss";

  /*弹窗动画*/
  .fade-enter-active,.fade-leave-active {
    transition: all .3s ease;
  }
  .fade-enter {
    transform: scale(2);
    opacity: 0;
  }
  .fade-leave-active {
    transform: scale(1.5);
    opacity: 0;
  }

  .header {
    width: 100%;
    height: 268/$ppr;
    background: rgba(7, 17, 27, 0.5);
    overflow: hidden;
    position: relative;
  }

  .ht-wrapper {
    width: 100%;
    height: 212/$ppr;
    padding: 48/$ppr 24/$ppr 36/$ppr 48/$ppr;
    display: flex;
    position: relative;
  }

  .ht-pic {
    width: 128/$ppr;
    height: 128/$ppr;
    margin-right: 32/$ppr;
    background: #c1c1c1;
    overflow: hidden;
    border-radius: 2/$ppr;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .ht-content {
    flex: 1;
    color: #fff;
  }

  .ht-tips {
    min-width: 48/$ppr;
    height: 48/$ppr;
    padding: 0 16/$ppr;
    background: rgba(0, 0, 0, 0.2);
    font-size: 20/$ppr;
    line-height: 48/$ppr;
    color: #fff;
    border-radius: 24/$ppr;
    position: absolute;
    right: 24/$ppr;
    bottom: 30/$ppr;
    span {
      display: inline-block;
      vertical-align: top;
    }
    i {
      display: inline-block;
      vertical-align: top;
    }
  }

  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    filter: blur(10px)
  }

  .ct-name {
    font-size: 0;
    margin: 4/$ppr 0 16/$ppr 0;
    .brand {
      width: 60/$ppr;
      height: 36/$ppr;
      display: inline-block;
      vertical-align: top;
      @include bg-image('../../assets/images/brand');
      background-size: cover;
      margin-right: 12/$ppr;
    }
    .name {
      font-size: 32/$ppr;
      font-weight: bold;
      line-height: 36/$ppr;
    }
  }

  .ct-des {
    margin: 16/$ppr 0 20/$ppr 0;
  }

  .ct-cx {
    font-size: 0;
    .type-icon {
      width: 24/$ppr;
      height: 24/$ppr;
      margin-right: 8/$ppr;
    }
    .text {
      font-size: 20/$ppr;
      line-height: 24/$ppr;
    }
  }

  /*公告*/
  .bullet-wrapper {
    height: 56/$ppr;
    line-height: 56/$ppr;
    padding: 0 42/$ppr 0 24/$ppr;
    color: #fff;
    background: rgba(7, 17, 27, 0.2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    .flag {
      display: inline-block;
      vertical-align: top;
      width: 44/$ppr;
      height: 24/$ppr;
      margin-right: 8/$ppr;
      margin-top: 16/$ppr;
      @include bg-image('../../assets/images/bulletin');
      background-size: cover;
      background-repeat: no-repeat;
    }
    .text {
      font-size: 20/$ppr;
    }
    .icon {
      width: 16/$ppr;
      height: 16/$ppr;
      position: absolute;
      right: 24/$ppr;
      line-height: 16/$ppr;
      text-align: center;
      top: 20/$ppr;
    }
  }
</style>
