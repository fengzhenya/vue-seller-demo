export default [
    {
        path: '/',
        component: require('./views/index/index')
    },
    {
        path: '/list',
        component: require('./views/list/list'),
        children: [
            {
                path: '/',
                redirect: 'goods'
            },
            {
                path: 'goods',
                component: require('./views/list/goods/goods')
            }
        ]
    },
    {
        path: '/details/:productCode',
        component: require('./views/details/details')
    }
];
