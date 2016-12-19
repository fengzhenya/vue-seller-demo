<template>
  <div class="cart-conctrol">
    <transition name="mcds">
      <div class="cart-decrease" v-show="food.count > 0" @click="minusCart($event)">
        <em>-</em>
      </div>
    </transition>
    <transition name="mcnum">
      <div class="cart-num" v-show="food.count > 0">{{food.count}}</div>
    </transition>
    <div class="cart-plus" @click.stop="addCart($event)"><em>+</em></div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Bus from 'src/vueBus.js';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          this.$set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('foodsConctrol');
        Bus.$emit('dropCtrl', event.target);
      },
      minusCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count === 0) {
          return;
        }
        this.food.count--;
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/mixin.scss";

  .mcds-enter-active, .mcds-leave-active {
    transition: all .3s ease;
    em {
      transition: all .3s ease;
      transform: rotate(0deg);
    }
  }

  .mcds-enter, .mcds-leave-active {
    opacity: 0;
    transform: translate3d(88/$ppr, 0, 0);
    em {
      transform: rotate(180deg);
    }
  }

  .mcnum-enter-active, .mcnum-leave-active {
    transition: all .3s ease;
  }

  .mcnum-enter, .mcnum-leave-active {
    opacity: 0;
    transform: translate3d(40/$ppr, 0, 0);
  }

  .cart-conctrol {
    font-size: 0;
    vertical-align: top;
    .cart-decrease, .cart-plus {
      width: 70/$ppr;
      height: 70/$ppr;
      padding: 15/$ppr;
      display: inline-block;
      border-radius: 50%;
      vertical-align: top;
      line-height: 40/$ppr;
      position: relative;
      em {
        font-style: normal;
        border-radius: 50%;
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        color: #fff;
        font-size: 24/$ppr;
        text-align: center;
      }
    }
    .cart-decrease {
      z-index: 2;
      em {
        background-color: #c1c1c1;
      }
    }
    .cart-plus {
      z-index: 3;
      em {
        background: #00a0dc;
      }
      font-size: 24/$ppr;
      color: #fff;
      text-align: center;
    }
    .cart-num {
      margin: 15/$ppr -15/$ppr;
      vertical-align: top;
      line-height: 40/$ppr;
      width: 48/$ppr;
      text-align: center;
      display: inline-block;
      font-size: 20/$ppr;
      color: rgb(147, 153, 159);
    }
  }
</style>
