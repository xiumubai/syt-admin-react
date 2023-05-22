import type { FormData } from '#/form'
import type { PagePermission, TableOptions } from '#/public'
import type { FormFn } from '@/components/Form/BasicForm'
import { useCallback, useEffect, useRef, useState } from 'react'
import tableColumns, { searchList } from './model'
import { message, Button } from 'antd'
import { useTitle } from '@/hooks/useTitle'
import { checkPermission } from '@/utils/permissions'
import { useCommonStore } from '@/hooks/useCommonStore'
import {
  getHospitalList,
  updateHosStatus
} from '@/servers/hospitial/list'
import BasicContent from '@/components/Content/BasicContent'
import BasicSearch from '@/components/Search/BasicSearch'
import BasicTable from '@/components/Table/BasicTable'
import BasicPagination from '@/components/Pagination/BasicPagination'

// 当前行数据
interface RowData {
  id: string;
  status: number;
}

// 初始化搜索
const initSearch = {
  page: 1,
  pageSize: 20
}

function List() {
  useTitle('医院列表')
  const searchFormRef = useRef<FormFn>(null)
  const [isLoading, setLoading] = useState(false)
  const [page, setPage] = useState(initSearch.page)
  const [pageSize, setPageSize] = useState(initSearch.pageSize)
  const [total, setTotal] = useState(0)
  const [tableData, setTableData] = useState<FormData[]>([])

  // 按钮权限列表
  const { buttons } = useCommonStore()
  
  // 按钮权限控制
  const pagePermission: PagePermission = {
    add: checkPermission(`btn.User.add`, buttons),
    update: checkPermission(`btn.User.update`, buttons),
    remove: checkPermission(`btn.User.remove`, buttons),
    assgin: checkPermission(`btn.User.assgin`, buttons)
  }

  /**
   * 点击搜索
   * @param values - 表单返回数据
   */
  const onSearch = (values: FormData) => {
    setPage(1)
    handleSearch({ page: 1, pageSize, ...values })
  }

  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async (values: FormData) => {
    try {
      setLoading(true)
      const { data: { data } } = await getHospitalList(values)
      const { content, totalElements } = data
      setTotal(totalElements || 0)
      setTableData(content || [])
    } finally {
      setLoading(false)
    }
  }, [])

  // 首次进入自动加载接口数据
  useEffect(() => {
    handleSearch({ ...initSearch })
  }, [handleSearch])

  /**
   * 点击查看
   * @param id - 唯一值
   */
  const onView = async (id: string) => {
    console.log(id)
  }

  /**
   * @description: 点击排班
   * @param {string} id
   */  
  const onSchedule = (id: string) => {
    console.log(id)
  }

  /** 获取表格数据 */
  const getPage = () => {
    const formData = searchFormRef.current?.getFieldsValue() || {}
    const params = { ...formData, page, pageSize }
    handleSearch(params)
  }

  /** 上线，下线 */
  const onUpdateStatus = async (row: RowData) => {
    updateHosStatus
    await updateHosStatus(row.id, row.status === 0 ? 1 : 0)
    message.success('更新状态成功')
    getPage()
  }

  /**
   * 处理分页
   * @param page - 当前页数
   * @param pageSize - 每页条数
   */
  const onChangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
    const formData = searchFormRef.current?.getFieldsValue()
    handleSearch({ ...formData, page, pageSize })
  }

  /**
   * 渲染操作
   * @param _ - 当前值
   * @param record - 当前行参数
   */
  const optionRender: TableOptions<object> = (_, record) => (
    <>
      {
        pagePermission.update === true &&
        <Button
          className='mr-5px'
          type='primary'
          onClick={() => onView((record as RowData).id)}
        >
          查看
        </Button>

      }
      {
        <Button
          className='mr-5px'
          type='primary'
          onClick={() => onSchedule((record as RowData).id)}
        >
          排班
        </Button>
      }
      {
        <Button
          className='mr-2'
          type='primary'
          onClick={() => onUpdateStatus((record as RowData))}
        >
          { record?.status === 0 ? '上线' : '下线' }
        </Button>
      }
    </>
  )

  return (
    <BasicContent>
      <>
        <BasicSearch
          formRef={searchFormRef}
          list={searchList}
          data={initSearch}
          isCreate={false}
          isLoading={isLoading}
          handleFinish={onSearch}
        />
        
        <BasicTable
          loading={isLoading}
          columns={tableColumns(optionRender)}
          dataSource={tableData}
        />

        <BasicPagination
          disabled={isLoading}
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={onChangePagination}
        />
      </>
    </BasicContent>
  )
}

export default List