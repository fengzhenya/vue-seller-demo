<template>
  <div>
    <seller-header :seller="seller"></seller-header>
    <div class="tab">
      <div class="item">
        <router-link to="/list/goods">商品</router-link>
      </div>
      <div class="item">评论</div>
      <div class="item">商家</div>
    </div>
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>

    <shopCart :selectedFoods="selFoods" :deliveryPrice="seller.deliveryPrice"
              :minPrice="seller.minPrice"></shopCart>
  </div>
</template>

<script type="text/ecmascript-6">
  import selleHeader from 'components/header/header';
  import axios from 'axios';
  import shopCart from 'components/shopCart/ShopCart';
  import Bus from 'src/vueBus.js';
  export default {
    data() {
      return {
        seller: {},
        busGoods: []
      };
    },
    components: {
      'seller-header': selleHeader,
      shopCart
    },
    created() {
      let _that = this;
      axios.get('/api/seller').then(function (res) {
        _that.seller = res.data.data;
      });
    },
    mounted() {
      let _this = this;
      Bus.$on('sendgoods', (goods) => {
        _this.busGoods = goods;
      });
    },
    computed: {
      selFoods() {
        let selectedArr = [];
        this.busGoods.forEach((goods) => {
          goods.foods.forEach((food) => {
            if (food.count || food.count > 0) {
              selectedArr.push(food);
            }
          });
        });
        return selectedArr;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../assets/scss/mixin.scss";

  .tab {
    display: flex;
    height: 82/$ppr;
    border-bottom: 1/$ppr solid #e5e5e5;
    .item {
      flex: 1;
      font-size: 28/$ppr;
      text-align: center;
      line-height: 88/$ppr;
      .router-link-active {
        color: rgb(240, 20, 20);
      }
    }
  }
</style>
