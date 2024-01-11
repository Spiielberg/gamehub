import { Logo } from '@/app/(auth)/_components/logo'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-6">
      <Logo />
      {children}
    </div>
  )
}

export default AuthLayout
