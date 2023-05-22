import type { FormList } from '#/form'
import type { TableColumn, TableOptions } from '#/public'

// 搜索数据
export const searchList: FormList[] = [
  {
    label: '医院名称',
    name: 'hosname',
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
      title: '订单号',
      dataIndex: 'outTradeNo'
    },
    {
      title: '医院名称',
      dataIndex: 'hosname'
    },
    { 
      title: '科室名称',
      dataIndex: 'depname',
      width: 160 
    },
    { 
      title: '医生职称',
      dataIndex: 'title',
      width: 100 
    },
    { 
      title: '就诊人',
      dataIndex: 'patientName',
      width: 100
    },
    { 
      title: '预约号序',
      dataIndex: 'number',
      width: 100
    },
    { 
      title: '服务费',
      dataIndex: 'amount',
      width: 100
    },
    { 
      title: '订单状态',
      render (val, row: any) {
        return row?.param?.orderStatusString
      }
    },
    { 
      title: '创建时间',
      dataIndex: 'createTime',
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

export default tableColumns