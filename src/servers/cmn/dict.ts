import type { FormData } from '#/form'
import type { ServerResult } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/admin/cmn/dict'
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getDictList(id: number) {
  return request.get<ServerResult<FormData[]>>(
    `${API.URL}/findByParentId/${id}`,
  )
}
