<template lang="html">
  <div class="details-con">
    <div class="details-slider-con">
      <div class="details-slider">
        <img :src="food.image" alt="">
      </div>
      <div class="details-msg">
        <div class="det-name">
          {{food.name}} {{$route.params.id}}
        </div>
        <div class="det-des">
          <span>月售1132份</span>
          <span>好评率100%</span>
        </div>
        <div class="det-price">
          <span class="now"><em>&yen;</em>24</span><span class="old"><em>&yen;</em>28</span>
        </div>
        <div class="det-cartBtn">
          <a class="det-cartBtn-a" href="#">加入购物车</a>
          <div class="cart-control-con"></div>
        </div>
      </div>
    </div>
    <div class="details-des">
      <h4>商品介绍</h4>
      <p>一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足</p>
    </div>
    <div class="details-rantings">
      <div class="det-rantcon">
        <h4>商品评价</h4>
        <div class="rantings-tab">
          <a href="#">全部<em>57</em></a>
          <a href="#">推荐<em>47</em></a>
          <a href="#">吐槽<em>10</em></a>
        </div>
      </div>
      <div class="rantings-btn">
        <p>
          <span></span>只看有内容的评价
        </p>
      </div>
      <div class="rantings-list">
        <ul>
          <li>
            <div class="rantings-time">
              <div>2016-07-07 12:34</div>
              <div>
                <span class="username">3*******2</span>
                <em class="user-pic"></em>
              </div>
            </div>
            <div class="rantings-text">
              <span></span>太少了,不够一个吃
            </div>
          </li>
          <li>
            <div class="rantings-time">
              <div>2016-07-07 12:34</div>
              <div>
                <span class="username">3*******2</span>
                <em class="user-pic"></em>
              </div>
            </div>
            <div class="rantings-text">
              <span></span>太少了,不够一个吃
            </div>
          </li>
          <li>
            <div class="rantings-time">
              <div>2016-07-07 12:34</div>
              <div>
                <span class="username">3*******2</span>
                <em class="user-pic"></em>
              </div>
            </div>
            <div class="rantings-text">
              <span></span>太少了,不够一个吃
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from 'src/vueBus.js';
  //  import {mapGetters, mapActions} from 'vuex';
  export default {
    data() {
      return {
        food: {}
      };
    },
    created() {
      let _this = this;
      Bus.$on('foodToDet', function (value) {
        _this.food = value;
      });
    },
    destroyed() {
      Bus.$off('foodToDet');
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/mixin";

  .details-con {
    width: 100%;
    min-height: 100%;
    background: #f3f5f7;
  }

  .details-slider-con {
    background-color: #fff;
    border-bottom: 1/$ppr solid rgba(7, 17, 27, 0.1);
  }

  .details-slider {
    background-color: #e9e9e9;
    width: 100%;
    height: 750/$ppr;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .details-msg {
    position: relative;
    padding: 36/$ppr;
    .det-name {
      font-size: 28/$ppr;
      font-weight: bold;
      color: rgb(7, 17, 27);
      line-height: 28/$ppr;
      margin-bottom: 16/$ppr;
    }
    .det-des {
      font-size: 0/$ppr;
      color: rgb(147, 153, 159);
      margin: 16/$ppr 0 36/$ppr 0;
      span {
        font-size: 20/$ppr;
        margin-right: 24/$ppr;
        display: inline-block;
        line-height: 20/$ppr;
      }
    }
    .det-price {
      height: 48/$ppr;
      overflow: hidden;
      line-height: 48/$ppr;
      padding-right: 160/$ppr;
      font-size: 0;
      span {
        margin-right: 15/$ppr;
      }
      em {
        font-size: 20/$ppr;
        font-style: normal;
      }
      .now {
        font-size: 28/$ppr;
        font-weight: bold;
        color: rgb(240, 20, 20);
      }
      .old {
        font-size: 20/$ppr;
        font-weight: bold;
        color: rgb(147, 153, 159);
      }
    }
    .det-cartBtn {
      width: 148/$ppr;
      height: 48/$ppr;
      position: absolute;
      right: 36/$ppr;
      bottom: 36/$ppr;
      .det-cartBtn-a {
        display: block;
        background: #00a0dc;
        color: #fff;
        text-align: center;
        line-height: 48/$ppr;
        font-size: 20/$ppr;
        border-radius: 24/$ppr;
      }
    }
  }

  .details-des {
    padding: 36/$ppr;
    background-color: #fff;
    border-bottom: 1/$ppr solid rgba(7, 17, 27, 0.1);
    border-top: 1/$ppr solid rgba(7, 17, 27, 0.1);
    margin: 32/$ppr 0;
    h4 {
      font-size: 28/$ppr;
      line-height: 28/$ppr;
      color: rgb(7, 17, 27);
    }
    p {
      margin-top: 12/$ppr;
      line-height: 48/$ppr;
      font-size: 24/$ppr;
      padding-left: 16/$ppr;
      color: rgb(77, 85, 93);
    }
  }

  .details-rantings {
    margin: 32/$ppr 0 0 0;
    background-color: #fff;
  }

  .det-rantcon {
    padding: 36/$ppr;
    padding-bottom: 0;
    h4 {
      font-size: 28/$ppr;
      line-height: 28/$ppr;
      color: rgb(7, 17, 27);
      margin-bottom: 12/$ppr;
    }
    .rantings-tab {
      margin-top: 24/$ppr;
      height: 100/$ppr;
      font-size: 0;
      padding-bottom: 36/$ppr;
      border-bottom: 1/$ppr solid rgba(7, 17, 27, .1);
      a {
        font-size: 24/$ppr;
        display: inline-block;
        min-width: 120/$ppr;
        height: 64/$ppr;
        line-height: 32/$ppr;
        text-align: center;
        padding: 16/$ppr;
        color: rgb(77, 85, 93);
        margin-right: 16/$ppr;
        border-radius: 2/$ppr;
        em {
          font-size: 16/$ppr;
          font-style: normal;
        }
        &:nth-child(1) {
          background: rgb(0, 160, 220);
          color: #fff;
        }
        &:nth-child(2) {
          background: rgba(0, 160, 220, .2);
        }
        &:nth-child(3) {
          background: rgba(77, 85, 93, .2);
        }
      }
    }
  }

  .rantings-btn {
    padding: 24/$ppr 36/$ppr;
    min-height: 48/$ppr;
    line-height: 48/$ppr;
    p {
      display: inline-block;
    }
    span {
      display: inline-block;
      width: 40/$ppr;
      height: 40/$ppr;
      background-color: #000;
      vertical-align: top;
      margin-top: 4/$ppr;
      margin-right: 12/$ppr;
    }
  }

  .rantings-list {
    padding: 0 36/$ppr;
    border-top: 1/$ppr solid rgba(7, 17, 27, .1);
    border-bottom: 1/$ppr solid rgba(7, 17, 27, .1);
    li {
      padding: 32/$ppr 0;
      border-bottom: 1/$ppr solid rgba(7, 17, 27, .1);
      &:last-child {
        border-bottom: none;
      }
    }
    .rantings-time {
      display: flex;
      justify-content: space-between;
      font-size: 20/$ppr;
      color: rgb(147, 153, 159);
      line-height: 24/$ppr;
      margin-bottom: 12/$ppr;
      .user-pic {
        display: inline-block;
        width: 24/$ppr;
        height: 24/$ppr;
        border-radius: 50%;
        vertical-align: top;
        overflow: hidden;
        background: #000;
      }
    }
    .rantings-text {
      margin-top: 12/$ppr;
      font-size: 24/$ppr;
      color: rgb(7, 17, 27);
      line-height: 1.4;
      span {
        width: 24/$ppr;
        height: 24/$ppr;
        vertical-align: top;
        display: inline-block;
        background-color: #000;
        margin-right: 8/$ppr;
        margin-top: 4/$ppr;
      }
    }
  }
</style>
