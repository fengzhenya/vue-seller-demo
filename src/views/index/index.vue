<template lang="html">
  <div class="index">
    我是首页
    <p>
      <router-link to='/list'>去列表</router-link>
    </p>
    <div>{{counta}}</div>
    <div>{{otherCount}}</div>
    <button type="button" @click="increment">vuex</button>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex';
  export default {
    computed: {
      ...mapState({
        counta: state => state.indexPage.count
      }),
      ...mapGetters({
        otherCount: 'otherThings'
      })
    },
    created() {
    },
    methods: {
      increment() {
        this.$store.dispatch('todos', {amount: 123, bmount: 123});
      }
//      ...mapActions({
//        increment: 'todos'
//      })
    }
  };
</script>

<style lang="scss">
</style>
