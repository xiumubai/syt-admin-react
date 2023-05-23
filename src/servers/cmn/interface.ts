
// 字典项类型
export interface DictItem {
  id: number;
  name: string;
  dictCode: string;
  value: string;
  createTime: string;
  hasChildren: boolean;
  children: DictList; // 子列表   页面显示需要
}

// 字典列表类型
export type DictList = DictItem[]