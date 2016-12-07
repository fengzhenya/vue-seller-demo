export default [
    {
        path: '/',
        component: require('./components/index/index')
    },
    {
        path: '/list',
        component: require('./App'),
        children: [
            {
                path: '/',
                redirect: 'goods'
            },
            {
                path: 'goods',
                component: require('./components/goods/goods')
            },
            {
                path: 'details',
                component: require('./components/details/details')
            }
        ]
    }
];
