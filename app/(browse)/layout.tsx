import { Navbar } from '@/app/(browse)/_components/navbar'
import { ReactNode } from 'react'

const BrowseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </>
  )
}

export default BrowseLayout
