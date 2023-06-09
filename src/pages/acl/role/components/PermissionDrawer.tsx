import type { DataNode, TreeProps } from 'antd/es/tree'
import type { Key } from 'antd/lib/table/interface'
import { Drawer, Tree, Button } from 'antd'
import { useState, useEffect } from 'react'

interface Props {
  isVisible: boolean;
  treeData: DataNode[];
  checkedKeys: Key[];
  title?: string;
  onClose: () => void;
  onSubmit: (checked: Key[]) => Promise<void>
}

const fieldNames = {
  title: 'name',
  key: 'id',
}

function PermissionDrawer(props: Props) {
  const {
    title,
    isVisible,
    treeData,
    checkedKeys,
    onClose,
    onSubmit
  } = props
  const [treeCheckedKeys, setTreeCheckedKeys] = useState<Key[]>([])

  useEffect(() => {
    setTreeCheckedKeys(checkedKeys)
  }, [checkedKeys])

  /** 提交 */
  const handleSubmit = () => {
    onSubmit(treeCheckedKeys)
  }

  /** 右上角渲染 */
  const extraRender = (
    <Button type="primary" onClick={handleSubmit}>提交</Button>
  )

  /**
   * 处理勾选
   * @param checked - 勾选值
   */
  const handleCheck: TreeProps['onCheck'] = checked => {
    setTreeCheckedKeys(checked as Key[])
  }

  return (
    <Drawer
      open={isVisible}
      title={title || '权限配置'}
      placement="right"
      extra={extraRender}
      onClose={onClose}
    >
      <Tree
        checkable
        checkedKeys={treeCheckedKeys}
        treeData={treeData}
        onCheck={handleCheck}
        fieldNames={fieldNames}
      />
    </Drawer>
  )
}

export default PermissionDrawer