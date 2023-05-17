import type { SideMenu } from '#/public'

export const acl: SideMenu[] = [
  {
    label: '权限管理',
    key: 'Acl',
    icon: 'majesticons:article-search-line',
    children: [
      {
        label: '用户管理',
        key: '/Acl/User',
        rule: '/Acl/User',
      },
      {
        label: '角色管理',
        key: '/Acl/Role',
        rule: '/Acl/Role',
      },
      {
        label: '菜单管理',
        key: '/Acl/Permision',
        rule: '/Acl/Permision',
      },
    ]
  }
]
