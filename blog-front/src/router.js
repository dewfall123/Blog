const routers = [{
        path: '/',
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
        ]
    },
];
export default routers;