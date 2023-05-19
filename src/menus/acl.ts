import type { SideMenu } from '#/public'

export const acl: SideMenu[] = [
  {
    label: '系统管理',
    key: 'acl',
    icon: 'majesticons:article-search-line',
    children: [
      {
        label: '用户管理',
        key: '/acl/user',
        rule: '/Acl/User',
      },
      {
        label: '角色管理',
        key: '/acl/role',
        rule: '/Acl/Role',
      },
      {
        label: '菜单管理',
        key: '/acl/permision',
        rule: '/Acl/Permision',
      },
    ]
  }
]
