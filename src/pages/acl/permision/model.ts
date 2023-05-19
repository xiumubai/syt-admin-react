import type { FormList } from '#/form'
import type { TableColumn, TableOptions } from '#/public'
import { INPUT_REQUIRED, } from '@/utils/config'

// 搜索数据
export const searchList: FormList[] = [
  {
    label: '角色名',
    name: 'roleName',
    component: 'Input'
  }
]

/**
 * 表格数据
 * @param optionRender - 渲染操作函数
 */
 export const tableColumns = (optionRender: TableOptions<object>): TableColumn => {
  return [
    {
      title: '序号',
      dataIndex: 'hoscode',
      render(value, row, index) {
        return index + 1
      },
      fixed: 'left',
      width: 100,
      align: 'center',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      fixed: 'left'
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '权限值',
      dataIndex: 'code',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 200,
      fixed: 'right',
      render: (value: unknown, record: object) => optionRender(value, record)
    },
  ]
}

// 新增数据
export const createList: (id: string) => FormList[] = id => [
  {
    label: '名称',
    name: 'name',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '权限值',
    name: 'code',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
]

export interface PermisionType {
  id?: string;
  level: number;
  name: string;
  code: string;
  toCode: string;
  pid?: string,
  type?: number
}
