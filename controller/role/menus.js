// 作为 Layout子组件 展示, 并为左侧菜单显示的路由
exports.appRouter = [
    {
        id: '4',
        apiKey: '/api',
        title: '审核管理',
        children: [
            {
                id: '1',
                apiKey: '/review/content',
                title: '内容审核'
            }
        ]
    },
    {
        id: '3',
        apiKey: '/api',
        title: '内容管理',
        children: [
            {
                id: '1',
                apiKey: '/content',
                title: '综合内容管理'
            },
            {
                id: '2',
                apiKey: '/content/my',
                title: '我的内容管理'
            }
        ]
    },
    {
        id: '2',
        apiKey: '/api',
        title: '基本设置',
        children: [
            {
                id: '1',
                apiKey: '/module',
                title: '模块设置'
            },
            {
                id: '2',
                apiKey: '/column',
                title: '栏目设置'
            },
            {
                id: '3',
                apiKey: '/type',
                title: '分类设置'
            }
        ]
    },
    {
        id: '1',
        apiKey: '/api',
        title: '系统管理',
        children: [
            {
                id: '1',
                apiKey: '/role',
                title: '角色管理'
            },
            {
                id: '3',
                apiKey: '/user',
                title: '用户管理'
            }
        ]
    }
]
