import type { FormList } from '#/form'
import type { TableColumn, TableOptions } from '#/public'
import { INPUT_REQUIRED, } from '@/utils/config'

// 搜索数据
export const searchList: FormList[] = [
  {
    label: '医院名称',
    name: 'hosname',
    component: 'Input'
  },
  {
    label: '医院编号',
    name: 'hoscode',
    component: 'Input'
  },
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
      title: '医院名称',
      dataIndex: 'hosname',
    },
    {
      title: '医院编号',
      dataIndex: 'hoscode',
    },
    {
      title: 'api基础路径',
      dataIndex: 'apiUrl',
    },
    {
      title: '签名',
      dataIndex: 'signKey',
    },
    {
      title: '联系人姓名',
      dataIndex: 'contactsName',
    },
    {
      title: '联系人手机',
      dataIndex: 'contactsPhone',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 100,
      fixed: 'right',
      render: (value: unknown, record: object) => optionRender(value, record)
    },
  ]
}

// 新增数据
export const createList: (id: string) => FormList[] = id => [
  {
    label: '医院名称',
    name: 'hosname',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '医院编号',
    name: 'hoscode',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: 'api基础路径',
    name: 'apiUrl',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '联系人姓名',
    name: 'contactsName',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '联系人手机',
    name: 'contactsPhone',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
]