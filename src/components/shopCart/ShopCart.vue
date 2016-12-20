<template>
  <div class="shopCart">
    <div class="sc-left" :class="{'highlight': totalCount > 0}">
      <div class="sc-icon">
        <div class="sc-icon-con">
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
      </div>
      <div class="pri">&yen;{{totalPrice}}</div>
      <div class="desc">另需要配送费&yen;{{deliveryPrice}}元</div>
    </div>
    <div class="sc-right">
      <div class="sc-right-pri" :class="payClass">{{payDesc}}</div>
    </div>
    <div class="balls-con">
      <template v-for="item,index in balls">
        <transition @before-enter="beforeEnter" @after-enter="afterEnter" @leave="leave"
                    @after-leave="afterLeave" name="drop">
          <div class="ball-item" v-show="item.show" :data-index="index">
            <div class="ball-inner J-ball-inner"></div>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Bus from 'src/vueBus.js';
  export default {
    props: {
      selectedFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false,
            isBusy: false
          },
          {
            show: false,
            isBusy: false
          },
          {
            show: false,
            isBusy: false
          },
          {
            show: false,
            isBusy: false
          },
          {
            show: false,
            isBusy: false
          }
        ],
        dropBalls: []
      };
    },
    created() {
      const _this = this;
      Bus.$on('dropCtrl', function (target) {
        this.$nextTick(() => {
          for (let i = 0; i < _this.balls.length; i++) {
            let ball = _this.balls[i];
            if (!ball.isBusy) {
              ball.show = true;
              ball.isBusy = true;
              ball.el = target;
              _this.dropBalls.push(ball);
              return;
            }
          }
        });
      });
    },
    computed: {
      totalPrice() {
        let totalPrice = 0;
        this.selectedFoods.forEach((food) => {
          totalPrice += food.count * food.price;
        });
        return totalPrice;
      },
      totalCount() {
        let totalCount = 0;
        this.selectedFoods.forEach((food) => {
          totalCount += food.count;
        });
        return totalCount;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          return `还差￥${this.minPrice - this.totalPrice}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice >= this.minPrice) {
          return 'enough';
        }
      }
    },
    methods: {
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            /* global lib:true */
            /* eslint no-undef: "error" */
            let x = lib.flexible.px2rem(rect.left) - lib.flexible.px2rem(32);
            let y = -(lib.flexible.px2rem(window.innerHeight - rect.top) - lib.flexible.px2rem(38));
            el.style.dispaly = '';
            el.style.webkitTransform = `translate3d(0,${y}rem,0)`;
            el.style.transform = `translate3d(0,${y}rem,0)`;
            let inner = el.querySelectorAll('.J-ball-inner')[0];
            inner.style.webkitTransform = `translate3d(${x}rem,0,0)`;
            inner.style.transform = `translate3d(${x}rem,0,0)`;
          }
        }
      },
      afterEnter(el) {
        let ball = this.balls[el.getAttribute('data-index')];
        if (ball) {
          ball.show = false;
        }
      },
      leave(el) {
        el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.querySelectorAll('.J-ball-inner')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
      },
      afterLeave(el) {
        let ball = this.balls[el.getAttribute('data-index')];
        if (ball) {
          ball.isBusy = false;
          el.style.display = 'none';
        }
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/mixin.scss";

  .shopCart {
    height: 98/$ppr;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background: #141d27;
    display: flex;
  }

  .sc-left {
    display: flex;
    flex: 1;
    &.highlight {
      .sc-icon-con {
        background: #00a0dc;
      }
      .pri {
        color: #fff;
      }
    }
    .sc-icon {
      width: 114/$ppr;
      height: 114/$ppr;
      background: #141d27;
      padding: 12/$ppr;
      position: relative;
      top: -20/$ppr;
      margin: 0 24/$ppr;
      border-radius: 50%;
    }

    .sc-icon-con {
      width: 90/$ppr;
      height: 90/$ppr;
      border-radius: 50%;
      background: #2b343c;
      position: relative;
      .num {
        width: 48/$ppr;
        height: 32/$ppr;
        line-height: 32/$ppr;
        position: absolute;
        top: -16/$ppr;
        right: -16/$ppr;
        font-size: 20/$ppr;
        text-align: center;
        color: #fff;
        background: rgb(240, 20, 20);
        border-radius: 32/$ppr;
        box-shadow: 0/$ppr 4/$ppr 8/$ppr 0 rgba(0, 0, 0, .4);
      }
    }

    .pri {
      font-size: 32/$ppr;
      height: 48/$ppr;
      line-height: 48/$ppr;
      color: rgba(255, 255, 255, .2);
      margin: 25/$ppr 0;
      padding-right: 24/$ppr;
      border-right: 1/$ppr solid rgba(255, 255, 255, .1);
    }
    .desc {
      flex: 1;
      height: 48/$ppr;
      line-height: 48/$ppr;
      margin: 25/$ppr 0;
      padding-left: 24/$ppr;
      color: rgba(255, 255, 255, .4);
    }
  }

  .sc-right {
    flex: 0 0 210/$ppr;
    width: 210/$ppr;
  }

  .sc-right-pri {
    width: 100%;
    text-align: center;
    line-height: 98/$ppr;
    color: rgba(255, 255, 255, .4);
    font-weight: bold;
    background-color: #2b333b;
    &.enough {
      font-size: 28/$ppr;
      background: #00a0dc;
      color: #fff;
    }
  }

  .balls-con {
    .ball-item {
      position: fixed;
      left: 64/$ppr;
      bottom: 48/$ppr;
      z-index: 200;
      &.drop-leave-active {
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .ball-inner {
          transition: all 0.4s linear;
        }
      }
      .ball-inner {
        width: 32/$ppr;
        height: 32/$ppr;
        border-radius: 50%;
        background: #00a0dc;
      }
    }
  }

</style>
