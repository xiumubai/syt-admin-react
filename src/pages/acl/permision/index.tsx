import type { FormData } from '#/form'
import type { PagePermission, TableOptions } from '#/public'
import type { FormFn } from '@/components/Form/BasicForm'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createList, tableColumns, PermisionType } from './model'
import { Button, message, Alert, Space } from 'antd'
import { useTitle } from '@/hooks/useTitle'
import { checkPermission } from '@/utils/permissions'
import { useCommonStore } from '@/hooks/useCommonStore'
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'
import {
  getPermissionList,
  deletePermission,
  createPermission,
  updatePermission,
} from '@/servers/system/permission'
import BasicContent from '@/components/Content/BasicContent'
import BasicModal from '@/components/Modal/BasicModal'
import BasicForm from '@/components/Form/BasicForm'
import BasicTable from '@/components/Table/BasicTable'

// 当前行数据
interface RowData {
  id: string;
  name: string;
  level: number
}

const defalutPermision = {
  level: 0,
  name: '',
  code: '',
  toCode: '',
}

const description = `菜单权限添加规则：开头字母全部大写，二级路由使用'/'分开。\n 按钮权限添加规则：使用btn.[模块名].[功能名]`

function Persmisson() {
  useTitle('权限管理')
  const createFormRef = useRef<FormFn>(null)
  const [isLoading, setLoading] = useState(false)
  const [isCreateLoading, setCreateLoading] = useState(false)
  const [isCreateOpen, setCreateOpen] = useState(false)
  const [createTitle, setCreateTitle] = useState(ADD_TITLE)
  const [createId, setCreateId] = useState('')
  const [createData, setCreateData] = useState<FormData>()
  const [tableData, setTableData] = useState<FormData[]>([])
  const [permision, setPermision] = useState<PermisionType>(defalutPermision)
  // 按钮权限列表
  const { buttons } = useCommonStore()
  
  // 按钮权限控制
  const pagePermission: PagePermission = {
    add: checkPermission(`btn.Permission.add`, buttons),
    update: checkPermission(`btn.Permission.update`, buttons),
    remove: checkPermission(`btn.Permission.remove`, buttons)
  }

  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async () => {
    try {
      setLoading(true)
      const { data: { data } } = await getPermissionList()
      setTableData(data)
    } finally {
      setLoading(false)
    }
  }, [])

  // 首次进入自动加载接口数据
  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  /** 点击新增 */
  const onCreate = (row: RowData) => {
    setCreateOpen(true)
    setCreateTitle(ADD_TITLE)
    setCreateId('')
    setPermision(permision => {
      return {
        ...permision,
        id: '',
        pid: row.id,
        level: row.level + 1,
        type: permision.level === 4 ? 2 : 1,
      }
    })
  }

  /**
   * 点击编辑
   * @param id - 唯一值
   */
  const onUpdate = async (row: RowData) => {
    try {
      setPermision(() => {
        return {
          ...row,
          type: permision.level === 4 ? 2 : 1, 
        }
      })
      setCreateOpen(true)
      setCreateTitle(EDIT_TITLE(row?.name))
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
    handleSearch()
  }

  /**
   * 新增/编辑提交
   * @param values - 表单返回数据
   */
  const handleCreate = async (values: FormData) => {
    try {
      setCreateLoading(true)
      const functions = () => createId ? 
        updatePermission({...permision, ...values}) : 
        createPermission({...permision, ...values})
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
      const { data } = await deletePermission(id as string)
      if (data?.code === 200) {
        message.success(data?.message || '删除成功')
        getPage()
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * 渲染操作
   * @param _ - 当前值
   * @param record - 当前行参数
   */
  const optionRender: TableOptions<object> = (_, record) => (
    <>
      {
        pagePermission.add === true &&
        <Button
          disabled={record.level === 4}
          className='mr-2'
          loading={isLoading}
          onClick={() => onCreate(record)}
        >
          添加菜单
        </Button>
      }
      {
        pagePermission.update === true &&
        <UpdateBtn
        disabled={record.level === 1}
          className='mr-5px'
          isLoading={isLoading}
          onClick={() => onUpdate(record)}
        />
      }
      {
        pagePermission.remove === true &&
        <DeleteBtn
          disabled={record.level === 1}
          className='mr-5px'
          isLoading={isLoading}
          handleDelete={() => onDelete(record.id)}
        />
      }
    </>
  )

  return (
    <BasicContent>
      <>
        <Space style={{ width: '100%', marginBottom: '14px'}}>
          <Alert
            message="权限添加规则"
            description={description}
            type="info"
            closable
          />
        </Space>
        <BasicTable
          loading={isLoading}
          columns={tableColumns(optionRender)}
          dataSource={tableData}
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
      </>
    </BasicContent>
  )
}

export default Persmisson