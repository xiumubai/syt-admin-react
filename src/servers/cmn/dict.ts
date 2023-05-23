import type { DictList } from './interface'
import type { ServerResult } from '#/public'
import { request } from '@/utils/request'

enum API {
  URL = '/admin/cmn/dict'
}

/**
 * 获取分页数据
 * @param data - 请求数据
 */
export function getDictList(id: string | number) {
  return request.get<ServerResult<DictList>>(
    `${API.URL}/findByParentId/${id}`,
  )
}
