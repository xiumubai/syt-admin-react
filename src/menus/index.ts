import type { SideMenu } from '#/public'
import { system } from './system'
import { demo } from './demo'
import { content } from './content'
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
  ...demo as SideMenu[],
  ...system as SideMenu[],
  ...content as SideMenu[],
  ...acl as SideMenu[],
  ...cmn as SideMenu[],
  ...hospital as SideMenu[],
  ...order as SideMenu[],
  ...member as SideMenu[],
]