<template lang="html">
    <div class="goods">
        i'm goods12312312312312
        <router-link to='/details/123123123213'>去详情</router-link>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {};
    },
    methods: {
        getGoodData() {
            axios.get('/api/goods').then(function(response) {
                console.log(response);
            });
        }
    },
    created() {}
};
</script>

<style lang="scss">
</style>
