import type { SideMenu } from '#/public'

export const order: SideMenu[] = [
  {
    label: '会员管理',
    key: 'order',
    icon: 'majesticons:article-search-line',
    children: [
      {
        label: '会员列表',
        key: '/order/list',
        rule: '/Order/orderList',
      }
    ]
  }
]
