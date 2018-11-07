const routers = [{
        path: '/',
        redirect: '/blog/list',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children: [
            {
                path: '/blog/edit',
                name: 'blogedit',
                meta: {
                    title: '编辑'
                },
                component: (resolve) => require(['./views/blog/edit.vue'], resolve)
            },
            {
                path: '/blog/list',
                name: 'bloglist',
                meta: {
                    title: '列表'
                },
                component: (resolve) => require(['./views/blog/list.vue'], resolve)
            },
            {
                path: '/blog/detail',
                name: 'blogdetail',
                meta: {
                    title: '详情'
                },
                component: (resolve) => require(['./views/blog/detail.vue'], resolve)
            },
        ]
    },
];
export default routers;