import { Container } from '@/app/(dashboard)/u/[username]/_components/container'
import { Navbar } from '@/app/(dashboard)/u/[username]/_components/navbar'
import { Sidebar } from '@/app/(dashboard)/u/[username]/_components/sidebar'
import { getSelfByUsername } from '@/lib/auth-service'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

interface CreatorLayoutProps {
  params: { username: string }
  children: ReactNode
}

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username)

  if (!self) {
    redirect('/')
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-16">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  )
}

export default CreatorLayout
