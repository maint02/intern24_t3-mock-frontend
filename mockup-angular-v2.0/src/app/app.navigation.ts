export const NavigationItems = [
    {
        title: 'Quản trị',
        tags: 'Quản trị',
        icon: 'far fa-cogs',
        items: [
            {
                title: 'Quản lý user',
                tags: 'Quản lý user',
                icon: 'far fa-tasks',
                items: [
                    {
                        title: 'Thêm mới/sửa/resetpass',
                        tags: 'Thêm mới/sửa/resetpass',
                        routerLink: '/quan-ly-user',
                        icon: 'far fa-tasks',
                    }
                ]
            }
        ]
    },
    {
        title: 'Examples Below',
        tags: 'examples',
        icon: 'fal fa-tag',
        items: [
            {
                title: 'Multi column headers',
                tags: 'multi column headers',
                routerLink: '/examples/multi-column-headers',
                icon: 'far fa-tasks',
            },
            {
                title: 'Dynamic column',
                tags: 'dynamic column',
                routerLink: '/examples/dynamic-column',
                icon: 'far fa-tasks',
            }
        ]
    }
];
