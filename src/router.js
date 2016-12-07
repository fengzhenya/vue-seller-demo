export default [
    {
        path: '/',
        component: require('./components/index/index')
    },
    {
        path: '/list',
        component: require('./components/list/list'),
        children: [
            {
                path: '/',
                redirect: 'goods'
            },
            {
                path: 'goods',
                component: require('./components/goods/goods')
            }
        ]
    },
    {
        path: 'details',
        component: require('./components/details/details')
    }
];
