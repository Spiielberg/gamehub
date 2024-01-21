import { Navigation } from '@/app/(dashboard)/u/[username]/_components/sidebar/navigation'
import { Toggle } from '@/app/(dashboard)/u/[username]/_components/sidebar/toggle'
import { Wrapper } from '@/app/(dashboard)/u/[username]/_components/sidebar/wrapper'

export const Sidebar = () => {
  return (
    <Wrapper>
      <Toggle />
      <Navigation />
    </Wrapper>
  )
}
