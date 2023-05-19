import { useTitle } from '@/hooks/useTitle'

function Page() {
  useTitle('数据管理')
  return (
    <div className="m-30px">三层结构</div>
  )
}

export default Page