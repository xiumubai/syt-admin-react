import { useTitle } from '@/hooks/useTitle'

function Page() {
  useTitle('demo')
  return (
    <div className="m-30px">demo</div>
  )
}

export default Page