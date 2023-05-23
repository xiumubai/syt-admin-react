import type { SideMenu } from '#/public'
import { acl } from './acl'
import { cmn } from './cmn'
import { hospital } from './hospital'
import { member } from './member'
import { order } from './order'

export const defaultMenus: SideMenu[] = [
  {
    label: '仪表盘',
    key: 'dashboard',
    icon: 'la:tachometer-alt',
    children: [
      {
        label: '数据总览',
        key: '/dashboard',
        rule: '/Dashboard',
      }
    ]
  },
  ...acl as SideMenu[],
  ...cmn as SideMenu[],
  ...hospital as SideMenu[],
  ...order as SideMenu[],
  ...member as SideMenu[],
]