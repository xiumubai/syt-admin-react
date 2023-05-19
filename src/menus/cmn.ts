import type { SideMenu } from '#/public'

export const cmn: SideMenu[] = [
  {
    label: '数据管理',
    key: 'cmn',
    icon: 'majesticons:article-search-line',
    children: [
      {
        label: '数据字典',
        key: '/cmn/dict',
        rule: '/Cmn/Dict',
      },
    ]
  }
]
