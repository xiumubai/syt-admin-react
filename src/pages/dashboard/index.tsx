import { useTitle } from '@/hooks/useTitle'
import BasicContent from '@/components/Content/BasicContent'
import Line from './components/Line'
import Bar from './components/Bar'
import Block from './components/Block'

function Dashboard() {
  useTitle('数据展览')

  return (
    <BasicContent isPermission={true}>
      <>

        <div className='py-10px'>
          <Block />
        </div>

        <div className='flex justify-between w-full'>
          <Line />
          <Bar />
        </div>
      </>
    </BasicContent>
  )
}

export default Dashboard