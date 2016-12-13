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
  </div>
</template>

<script>
  import selleHeader from 'components/header/header';
  import axios from 'axios';

  export default {
    data() {
      return {
        seller: {}
      };
    },
    components: {
      'seller-header': selleHeader
    },
    created() {
      let _that = this;
      axios.get('/api/seller').then(function(res) {
        _that.seller = res.data.data;
      });
    }
  };
</script>

<style lang="scss">
  @import "../../assets/scss/mixin.scss";
  .tab {
    display: flex;
    height: 88/$ppr;
    .item {
      flex: 1;
      font-size: 28/$ppr;
      text-align: center;
      line-height: 88/$ppr;
      .router-link-active {
        color: rgb(240,20,20);
      }
    }
  }
</style>
