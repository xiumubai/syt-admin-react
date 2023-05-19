import type { FormData } from '#/form'
import type { PagePermission, TableOptions } from '#/public'
import type { FormFn } from '@/components/Form/BasicForm'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createList, searchList, tableColumns } from './model'
import { Button, message } from 'antd'
import { useTitle } from '@/hooks/useTitle'
import { checkPermission } from '@/utils/permissions'
import { useCommonStore } from '@/hooks/useCommonStore'
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'
import {
  getRoleList,
  deleteRole,
  createRole,
  updateRole,
} from '@/servers/system/role'
import {
  getAssignList,
  doAssign
} from '@/servers/system/permission'
import BasicContent from '@/components/Content/BasicContent'
import BasicSearch from '@/components/Search/BasicSearch'
import BasicModal from '@/components/Modal/BasicModal'
import BasicForm from '@/components/Form/BasicForm'
import BasicTable from '@/components/Table/BasicTable'
import BasicPagination from '@/components/Pagination/BasicPagination'
import PermissionDrawer from './components/PermissionDrawer'

// 当前行数据
interface RowData {
  id: string;
  username: string;
  password: string
}

// 初始化搜索
const initSearch = {
  page: 1,
  pageSize: 20
}

// 初始化新增数据
const initCreate = {
  status: 1
}

function Role() {
  useTitle('角色管理')
  const searchFormRef = useRef<FormFn>(null)
  const createFormRef = useRef<FormFn>(null)
  const [isLoading, setLoading] = useState(false)
  const [isCreateLoading, setCreateLoading] = useState(false)
  const [isCreateOpen, setCreateOpen] = useState(false)
  const [createTitle, setCreateTitle] = useState(ADD_TITLE)
  const [createId, setCreateId] = useState('')
  const [createData, setCreateData] = useState<FormData>(initCreate)
  const [page, setPage] = useState(initSearch.page)
  const [pageSize, setPageSize] = useState(initSearch.pageSize)
  const [total, setTotal] = useState(0)
  const [tableData, setTableData] = useState<FormData[]>([])

  const [promiseId, setPromiseId] = useState('')
  const [isPromiseVisible, setPromiseVisible] = useState(false)
  const [promiseCheckedKeys, setPromiseCheckedKeys] = useState([])
  const [promiseTreeData, setPromiseTreeData] = useState([])

  // 按钮权限列表
  const { buttons } = useCommonStore()
  
  // 按钮权限控制
  const pagePermission: PagePermission = {
    add: checkPermission(`btn.Role.add`, buttons),
    update: checkPermission(`btn.Role.update`, buttons),
    remove: checkPermission(`btn.Role.remove`, buttons),
    assgin: checkPermission(`btn.Role.assgin`, buttons)
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
      const { data: { data } } = await getRoleList(values)
      const { records, total } = data
      setTotal(total)
      setTableData(records)
    } finally {
      setLoading(false)
    }
  }, [])

  // 首次进入自动加载接口数据
  useEffect(() => {
    handleSearch({ ...initSearch })
  }, [handleSearch])

  /** 开启权限 */
  const openPermission = async (id: string) => {
    try {
      setLoading(true)
      const { data } = await getAssignList(id)
      const menuIds = getCheckedIds(data.data, [])
      setPromiseId(id)
      setPromiseTreeData(data.data[0].children)
      setPromiseCheckedKeys(menuIds as never)
      setPromiseVisible(true)
    } finally {
      setLoading(false)
    }
  }

  // 所有选中的节点id
  const getCheckedIds = (auths: any, initArr: any[]) => { 
    auths.forEach((item: any) => {
      if (item.select) {
        initArr.push(item?.id)
      }
      if (item.children) {
        getCheckedIds(item.children, initArr)
      }
    })
    return initArr
  }
  
  /** 关闭权限 */
  const closePermission = () => {
    setPromiseVisible(false)
    setPromiseTreeData([])
    setPromiseCheckedKeys(Object.values([]))
  }
  
  /**
   * 权限提交
   */
  const permissionSubmit = async (checkedList: CheckboxValueType[]) => {
    try {
      setLoading(true)
      const { data } = await doAssign(promiseId, checkedList)
      message.success(data.message || '授权成功')
      setPromiseVisible(false)
      // 重置数据
      setPromiseTreeData([])
      setPromiseCheckedKeys([])
      getPage()
    } finally {
      setLoading(false)
    }
  }

  /** 点击新增 */
  const onCreate = () => {
    setCreateOpen(true)
    setCreateTitle(ADD_TITLE)
    setCreateId('')
    setCreateData(initCreate)
  }

  /**
   * 点击编辑
   * @param id - 唯一值
   */
  const onUpdate = async (row: RowData) => {
    try {
      setCreateOpen(true)
      setCreateTitle(EDIT_TITLE(row?.username))
      setCreateId(row?.id)
      setCreateLoading(true)
      setCreateData(row as unknown as FormData)
    } finally {
      setCreateLoading(false)
    }
  }

  /** 表格提交 */
  const createSubmit = () => {
    createFormRef.current?.handleSubmit()
  }

  /** 关闭新增/修改弹窗 */
  const closeCreate = () => {
    setCreateOpen(false)
  }

  /** 获取表格数据 */
  const getPage = () => {
    const formData = searchFormRef.current?.getFieldsValue() || {}
    const params = { ...formData, page, pageSize }
    handleSearch(params)
  }

  /**
   * 新增/编辑提交
   * @param values - 表单返回数据
   */
  const handleCreate = async (values: FormData) => {
    try {
      setCreateLoading(true)
      const functions = () => createId ? updateRole({...values, id: createId}) : createRole(values)
      const { data } = await functions()
      message.success(data?.message || '操作成功')
      setCreateOpen(false)
      getPage()
    } finally {
      setCreateLoading(false)
    }
  }

  /**
   * 点击删除
   * @param id - 唯一值
   */
  const onDelete = async (id: string) => {
    try {
      setLoading(true)
      const { data } = await deleteRole(id as string)
      if (data?.code === 200) {
        message.success(data?.message || '删除成功')
        getPage()
      }
    } finally {
      setLoading(false)
    }
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
        pagePermission.assgin === true &&
        <Button
          className='mr-2'
          loading={isLoading}
          onClick={() => openPermission((record as RowData).id)}
        >
          权限
        </Button>
      }
      {
        pagePermission.update === true &&
        <UpdateBtn
          className='mr-5px'
          isLoading={isLoading}
          onClick={() => onUpdate(record as RowData)}
        />
      }
      {
        pagePermission.remove === true &&
        <DeleteBtn
          className='mr-5px'
          isLoading={isLoading}
          handleDelete={() => onDelete((record as RowData).id)}
        />
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
          isCreate={pagePermission.add}
          isLoading={isLoading}
          onCreate={onCreate}
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

        <BasicModal
          title={createTitle}
          open={isCreateOpen}
          confirmLoading={isCreateLoading}
          onOk={createSubmit}
          onCancel={closeCreate}
        >
          <BasicForm
            formRef={createFormRef}
            list={createList(createId)}
            data={createData}
            labelCol={{ span: 6 }}
            handleFinish={handleCreate}
          />
        </BasicModal>

        <PermissionDrawer
          isVisible={isPromiseVisible}
          treeData={promiseTreeData}
          checkedKeys={promiseCheckedKeys}
          onClose={closePermission}
          onSubmit={permissionSubmit}
        />
      </>
    </BasicContent>
  )
}

export default Role