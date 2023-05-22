import type { FormList } from '#/form'
import type { TableColumn, TableOptions } from '#/public'

// 搜索数据
export const searchList: FormList[] = [
  {
    label: '手机号',
    name: 'keyword',
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
    {
      title: '手机号',
      dataIndex: 'phone'
    },
    {
      title: '昵称',
      dataIndex: 'nickName'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    },
    { 
      title: '状态',
      width: 160,
      render (val, row: any) {
        return row?.param?.statusString
      }
    },
    { 
      title: '认证状态',
      width: 160,
      render (val, row: any) {
        return row?.param?.authStatusString
      }
    },
    { 
      title: '创建时间',
      dataIndex: 'createTime',
      width: 100 
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 80,
      fixed: 'right',
      render: (value: unknown, record: object) => optionRender(value, record)
    },
  ]
}

export const detailColumns = () :TableColumn => {
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
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '证件类型',
      dataIndex: 'param.certificatesTypeString'
    },
    {
      title: '证件编号',
      dataIndex: 'certificatesNo'
    },
    { 
      title: '性别',
      width: 160,
      render (val, row: any) {
        return row.sex === 1 ? '男' : '女'
      }
    },
    { 
      title: '出生年月',
      dataIndex: 'birthdate'
    },
    { 
      title: '手机号',
      dataIndex: 'phone',
    },
    { 
      title: '是否结婚',
      dataIndex: 'phone',
      render (val, row: any) {
        return row.isMarry === 1 ? '时' : '否'
      }
    },
    { 
      title: '地址',
      dataIndex: 'param.fullAddress',
      render (val, row: any) {
        return row.param.fullAddress
      }
    },
    { 
      title: '注册时间',
      dataIndex: 'createTime',
    },
  ]
}

export default tableColumns