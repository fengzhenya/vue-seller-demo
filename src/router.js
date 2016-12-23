export default [
  {
    meta: {
      name: '首页'
    },
    path: '/',
    component: require('./views/index/index')
  },
  {
    meta: {
      name: '列表页'
    },
    path: '/list',
    component: require('./views/list/list'),
    children: [
      {
        name: 'list',
        meta: {
          name: '列表页-goods'
        },
        path: '/',
        redirect: 'goods'
      },
      {
        meta: {
          name: '列表页-discus'
        },
        path: 'discus',
        component: require('./views/list/discus/Discus')
      },
      {
        meta: {
          name: '列表页-goods'
        },
        path: 'goods',
        component: require('./views/list/goods/Goods')
      }
    ]
  },
  {
    name: 'details',
    meta: {
      name: '详情页'
    },
    path: '/details/:id',
    component: require('./views/details/details')
  },
  {
    path: '*',
    component: require('./views/index/index')
  }
];
