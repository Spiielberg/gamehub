import { Container } from '@/app/(browse)/_components/container'
import { Navbar } from '@/app/(browse)/_components/navbar'
import { Sidebar, SidebarSkeleton } from '@/app/(browse)/_components/sidebar'
import { ReactNode, Suspense } from 'react'

const BrowseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-16">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  )
}

export default BrowseLayout
