import type { SideMenu } from '#/public'

export const member: SideMenu[] = [
  {
    label: '会员管理',
    key: 'member',
    icon: 'majesticons:article-search-line',
    children: [
      {
        label: '会员列表',
        key: '/member/list',
        rule: '/Member/memberList',
      },
      {
        label: '认证审批列表',
        key: '/member/auth',
        rule: '/Member/certificationApprovalList',
      },
    ]
  }
]
