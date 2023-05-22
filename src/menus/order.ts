import type { SideMenu } from '#/public'

export const order: SideMenu[] = [
  {
    label: '订单管理',
    key: 'order',
    icon: 'majesticons:article-search-line',
    children: [
      {
        label: '订单列表',
        key: '/order/list',
        rule: '/Order/orderList',
      }
    ]
  }
]
