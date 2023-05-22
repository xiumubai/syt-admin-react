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
const tableColumns = (optionRender: TableOptions<object>): TableColumn => {
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
    { // 先放一下
      title: '医院LOGO',
      width: 100,
      dataIndex: 'logoData',
      render (val) {
        return <img style={{width: '80px'}} className="hospital-logo" src={'data:image/jpeg;base64,' + val} alt="logo"/>
      }
    },
    {
      title: '医院名称',
      dataIndex: 'hosname'
    },
    {
      title: '等级',
      dataIndex: 'param',
      render (val, row: any) {
        return row?.param?.hostypeString
      }
    },
    {
      title: '详细地址',
      render (row) {
        return row.param.fullAddress
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render (val) {
        return val === 0 ? '未上线' : '已上线'
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
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

export default tableColumns