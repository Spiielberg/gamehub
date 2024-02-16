import {
  Results,
  ResultsSkeleton,
} from '@/app/(browse)/(home)/_components/results'
import { Suspense } from 'react'

const Home = () => {
  return (
    <div className="mx-auto h-full max-w-screen-2xl p-8">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results />
      </Suspense>
    </div>
  )
}

export default Home
