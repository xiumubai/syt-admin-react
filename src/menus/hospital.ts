import type { SideMenu } from '#/public'

export const hospital: SideMenu[] = [
  {
    label: '医院管理',
    key: 'hospital',
    icon: 'majesticons:article-search-line',
    children: [
      {
        label: '医院设置',
        key: '/hospital/set',
        rule: '/Hospital/Set',
      },
      {
        label: '医院列表',
        key: '/hospital/list',
        rule: '/Hospital/List',
      },
    ]
  }
]
