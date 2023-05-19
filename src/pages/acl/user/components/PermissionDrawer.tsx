import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import type { Option } from '#/public'
import {
  Button,
  Drawer,
  Divider,
  Checkbox,
} from 'antd'
import { useState } from 'react'

interface Props {
  isVisible: boolean;
  treeData: Option[];
  checkedKeys: CheckboxValueType[];
  title?: string;
  onClose: () => void;
  onSubmit: (checked: CheckboxValueType[]) => Promise<void>
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
  
  const ids = treeData.map((item: Option) => item?.value)
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(() => checkedKeys)
    
  const [indeterminate, setIndeterminate] = useState(true)
  const [checkAll, setCheckAll] = useState<boolean>(false)

  /** 提交 */
  const handleSubmit = () => {
    onSubmit(checkedList)
  }

  /** 提交按钮 */
  const extraRender = (
    <Button type="primary" onClick={handleSubmit}>提交</Button>
  )

  /**
   * @description: 单选
   * @param {any} list
   * @returns {*}
   */
  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list)
    setIndeterminate(!!list.length && list.length < treeData.length)
    setCheckAll(list.length === treeData.length)
  }

  /**
   * @description: 全选
   * @param {CheckboxChangeEvent} e
   * @returns {*}
   */  
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? ids : [])
    setIndeterminate(false)
    setCheckAll(e.target.checked)
  }

  return (
    <Drawer
      open={isVisible}
      title={title || '权限配置'}
      placement="right"
      extra={extraRender}
      onClose={onClose}
    >
      <>
        <Checkbox
          checked={checkAll}
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
        >
          全选
        </Checkbox>
        <Divider />
        <Checkbox.Group
          options={treeData}
          style={{ flexWrap: 'wrap' }}
          value={checkedList}
          onChange={onChange}
        />
      </>
    </Drawer>
  )
}

export default PermissionDrawer