const routers = [
    {
        path: '/',
        redirect: '/blogs',
        meta: {
            title: '',
        },
        component: resolve => require([ './views/index.vue' ], resolve),
        children: [
            {
                path: '/blog/edit',
                name: 'BlogEdit',
                meta: {
                    title: '编辑',
                },
                component: resolve => require([ './views/blog/edit.vue' ], resolve),
            },
            {
                path: '/blogs',
                name: 'BlogList',
                meta: {
                    title: '列表',
                },
                component: resolve => require([ './views/blog/list.vue' ], resolve),
            },
            {
                path: '/blogs/:id',
                name: 'BlogDetail',
                meta: {
                    title: '详情',
                },
                component: resolve => require([ './views/blog/detail.vue' ], resolve),
            },
        ],
    },
];
export default routers;
