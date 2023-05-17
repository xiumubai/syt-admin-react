
import type { RootState } from '@/stores'
import { useSelector } from 'react-redux'

/**
 * 获取常用的状态数据
 */
export const useCommonStore = () => {
  // 菜单权限
  const permissions = useSelector((state: RootState) => state.user.permissions)
  // 按钮权限
  const buttons = useSelector((state: RootState) => state.user.buttons)
  // 用户名
  const name = useSelector((state: RootState) => state.user.userInfo.name)
  // 用户头像
  const avatar = useSelector((state: RootState) => state.user.userInfo.avatar)
  // 是否窗口最大化
  const isMaximize = useSelector((state: RootState) => state.tabs.isMaximize)
  // 导航数据
  const nav = useSelector((state: RootState) => state.tabs.nav)
  // 菜单是否收缩
  const isCollapsed = useSelector((state: RootState) => state.menu.isCollapsed)
  // 是否手机端
  const isPhone = useSelector((state: RootState) => state.menu.isPhone)
  // 是否重新加载
  const isRefresh = useSelector((state: RootState) => state.public.isRefresh)
  // 是否全屏
  const isFullscreen = useSelector((state: RootState) => state.public.isFullscreen)
  // 菜单打开的key
  const openKeys = useSelector((state: RootState) => state.menu.openKeys)
  // 菜单选中的key
  const selectedKeys = useSelector((state: RootState) => state.menu.selectedKeys)
  // 标签栏
  const tabs = useSelector((state: RootState) => state.tabs.tabs)
  // 主题
  const theme = useSelector((state: RootState) => state.public.theme)

  return {
    isMaximize,
    isCollapsed,
    isPhone,
    isRefresh,
    isFullscreen,
    nav,
    permissions,
    buttons,
    avatar,
    name,
    openKeys,
    selectedKeys,
    tabs,
    theme
  }
}