<template lang="html">
  <div class="goods">
    <div class="gl-menu" ref="menuWrapper">
      <ul>
        <li class="J-menuList" v-for="(item,index) in goods" :class="{'active': curIndex === index}"
            @click="selectMenuItem($event,index)">
          <span>
            <typeIcons v-if="item.type !== -1" :type="item.type"></typeIcons>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="gl-list" ref="itemWrapper">
      <ul>
        <li v-for="item in goods" class="food-list J-foodList">
          <h2 class="title">{{item.name}}</h2>
          <ul class="food-item-con">
            <li v-for="food in item.foods" class="food-item">
              <div class="item-pic">
                <img :src="food.icon" alt="">
              </div>
              <div class="item-des">
                <h3 class="name">{{food.name}}</h3>
                <p v-if="food.description" class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">&yen;{{food.price}}</span>
                  <del class="old" v-if="food.oldPrice">&yen;{{food.oldPrice}}</del>
                </div>
                <div class="cartCtl-wrapper">
                  <cartControl :food="food" @foodsConctrol="foodsConctrol"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import typeIcons from 'components/typeIcon/TypeIcon';
  import BScroll from 'better-scroll';
  import cartControl from 'components/cartcontrol/CartControl';
  import Bus from 'src/vueBus.js';
  export default {
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    created() {
      var _this = this;
      axios.get('/api/goods').then(function (response) {
        console.log(response);
        _this.goods = response.data.data;
        _this.$nextTick(function () {
          _this._initScroll();
          _this._calcHeight();
        });
      });
    },
    mounted() {
    },
    computed: {
      curIndex() {
        let menuList = this.$refs.menuWrapper.querySelectorAll('.J-menuList');
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            this.menuScroll.scrollToElement(menuList[i - 1], 400);
            return i;
          }
        }
        return 0;
      }
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.itemScroll = new BScroll(this.$refs.itemWrapper, {
          click: true,
          probeType: 3
        });
        this.itemScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calcHeight() {
        let foodList = this.$refs.itemWrapper.querySelectorAll('.J-foodList');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenuItem(event, index) {
        if (!event._constructed) {
          return;
        }
        if (this.curIndex === index) {
          return;
        }
        let foodList = this.$refs.itemWrapper.querySelectorAll('.J-foodList');
        let el = foodList[index];
        this.itemScroll.scrollToElement(el, 400);
      },
      foodsConctrol() {
        Bus.$emit('sendgoods', this.goods);
      }
    },
    components: {
      typeIcons,
      cartControl
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import '../../../assets/scss/mixin.scss';

  .goods {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 350/$ppr;
    bottom: 96/$ppr;
  }

  .gl-menu {
    flex: 0 0 160/$ppr;
    width: 160/$ppr;
    background-color: #f3f5f7;
    overflow: hidden;
    ul {
      padding: 0/$ppr 24/$ppr;
    }
    li {
      min-height: 108/$ppr;
      padding: 10/$ppr 0;
      border-bottom: 1/$ppr solid #dbdee1;
      display: flex;
      margin: -1/$ppr 0;
      color: rgb(7, 17, 27);
      &:last-child {
        border-bottom: none;
      }
      span {
        display: block;
        font-size: 24/$ppr;
        line-height: 1.4;
        flex: 1;
        align-self: center;
        justify-content: center;
      }
      &.active {
        margin: -1/$ppr -24/$ppr;
        padding: 10/$ppr 24/$ppr;
        background-color: #fff;
        border-bottom-color: #fff;
        font-weight: 700;
        color: #000;
      }
      .type-icon {
        width: 24/$ppr;
        height: 24/$ppr;
        vertical-align: top;
        margin-right: 5/$ppr;
        margin-top: 4/$ppr;
      }
    }
  }

  .gl-list {
    flex: 1 0 0;
    overflow: hidden;
    .title {
      height: 52/$ppr;
      line-height: 52/$ppr;
      color: rgb(147, 153, 159);
      font-size: 24/$ppr;
      background: #f3f5f7;
      padding-left: 28/$ppr;
      border-left: 4/$ppr solid #d9dde1;
    }
    .food-item-con {
      padding: 0 36/$ppr;
    }
    .food-item {
      display: flex;
      padding: 36/$ppr 0;
      border-top: 1/$ppr solid rgba(7, 17, 27, 0.1);
      &:first-child {
        border-top: none;
      }
    }
    .item-pic {
      flex: 0 0 114/$ppr;
      width: 114/$ppr;
      height: 114/$ppr;
      overflow: hidden;
      margin-right: 20/$ppr;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .item-des {
      flex: 1;
      position: relative;
      .name {
        font-size: 28/$ppr;
        color: rgb(7, 17, 27);
        line-height: 28/$ppr;
        margin: 4/$ppr 0 16/$ppr;
      }
      .desc, .extra {
        font-size: 20/$ppr;
        line-height: 1.2;
        margin: 16/$ppr 0;
        color: rgb(147, 153, 159);
      }
      .extra {
        margin-bottom: 4/$ppr;
      }
      .cartCtl-wrapper {
        position: absolute;
        right: -15/$ppr;
        bottom: -11/$ppr;
      }
    }
    .extra {
      span {
        margin-right: 24/$ppr;
      }
    }
    .price {
      font-size: 20/$ppr;
      color: rgb(147, 153, 159);
      line-height: 48/$ppr;
      font-weight: 700;
      .now {
        color: #f01414;
        font-size: 28/$ppr;
      }
    }
  }

</style>
