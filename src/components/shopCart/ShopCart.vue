<template>
  <div class="shopCart">
    <div class="shopCart-content" @click="toggleList">
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
        <div class="sc-right-pri" :class="payClass" @click="payfns($event)">{{payDesc}}</div>
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
    <transition name="cartShow">
      <div class="shopCart-list" v-show="shopCartshow">
        <div class="list-header">
          <h3>购物车</h3>
          <span @click.stop="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="food in selectedFoods">
              <div class="list-con">
                <div class="list-inner">
                  <div class="list-name">{{food.name}}</div>
                  <div class="list-pri">&yen;<span>{{food.price*food.count}}</span></div>
                </div>
                <div class="list-cartcontrol">
                  <cartControl :food="food"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>

  </div>
</template>
<script type="text/ecmascript-6">
  import Bus from 'src/vueBus.js';
  import cartControl from 'components/cartcontrol/CartControl';
  import BScroll from 'better-scroll';
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
        fold: false
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
              return;
            }
          }
        });
      });
      Bus.$on('listMaskHide', (flag) => {
        this.fold = flag;
      });
    },
    computed: {
      empty() {
        this.selectedFoods.forEach((food) => {
          food.count = 0;
        });
      },
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
      },
      shopCartshow() {
        if (!this.totalCount > 0) {
          this.fold = false;
          Bus.$emit('listMaskFn', this.fold);
          return false;
        }
        if (this.fold) {
          this.$nextTick(() => {
            if (!this.BScroll) {
              this.BScroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.BScroll.refresh();
            }
          });
        }
        return this.fold;
      }
    },
    methods: {
      payfns(event) {
        if (this.payDesc === '去结算') {
          event.stopPropagation();
          window.alert(`需要支付${this.totalPrice}元`);
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
        Bus.$emit('listMaskFn', this.fold);
      },
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
            el.style.opacity = 0.5;
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
        el.style.opacity = 1;
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
    },
    components: {
      cartControl
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
    z-index: 40;
  }

  .shopCart-content {
    height: 98/$ppr;
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

  .shopCart-list {
    position: absolute;
    left: 0;
    top: 0/$ppr;
    right: 0;
    z-index: -1;
    transform: translate3d(0, -100%, 0);
    &.cartShow-enter-active, &.cartShow-leave-active {
      transform: translate3d(0, -100%, 0);
      transition: all .5s ease;
    }
    &.cartShow-enter, &.cartShow-leave-active {
      transform: translate3d(0, 100%, 0);
    }
    .list-header {
      display: flex;
      justify-content: space-between;
      height: 80/$ppr;
      background-color: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      h3 {
        font-size: 28/$ppr;
        line-height: 80/$ppr;
        color: rgb(7, 17, 27);
        padding: 0 38/$ppr;
      }
      span {
        font-size: 24/$ppr;
        color: rgb(0, 160, 220);
        line-height: 80/$ppr;
        padding: 0 38/$ppr;
      }
    }
    .list-content {
      background-color: #fff;
      max-height: 370/$ppr;
      overflow: hidden;
      li {
        padding: 0 35/$ppr;
      }
      .list-con {
        padding: 9/$ppr 0;
        border-bottom: 1px solid rgba(7, 12, 27, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .list-inner {
        flex: 1;
        display: flex;
        justify-content: space-between;
        max-width: 70%;
      }
      .list-name {
        line-height: 48/$ppr;
        font-size: 28/$ppr;
        color: rgb(7, 17, 27);
        max-width: 70%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .list-pri {
        line-height: 48/$ppr;
        font-size: 20/$ppr;
        color: rgb(240, 20, 20);
        span {
          font-size: 28/$ppr;
          font-weight: 700;
        }
      }
      .list-cartcontrol {
        margin: 0 -15/$ppr 0 24/$ppr;
        min-width: 20%;
      }
    }
  }

</style>
