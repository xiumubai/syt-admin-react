// import type { Permissions } from "@/pages/login/model"

/**
 * 授权参数转字符串数组
 * @param permissions - 授权值
 */
export const permissionsToArray = (permissions: string[]): string[] => {
  const res: string[] = []
  for (let i = 0; i < permissions.length; i++) {
    const id = permissions[i]
    res.push(`/${id}`)
    // 处理按钮权限
    // for (let y = 0; y < operation.length; y++) {
    //   res.push(`/${id}/${operation[y]}`)
    // }
  }
  return res
}

/**
 * 检测是否有权限
 * @param value - 检测值
 * @param permissions - 权限
 */
export const checkPermission = (value: string, buttons: string[]): boolean => {
  if (!buttons || buttons.length === 0) return false
  return buttons.includes(value)
}
