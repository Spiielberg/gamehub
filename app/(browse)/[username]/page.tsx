import { Actions } from '@/app/(browse)/[username]/_components/actions'
import { isBlockedByUser, isUserBlocked } from '@/lib/block-service'
import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'

interface UserPageProps {
  params: {
    username: string
  }
}

const UserPage = async ({ params }: UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if (!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.id)
  const isUserBlockedByMe = await isUserBlocked(user.id)
  const isBlockedByThisUser = await isBlockedByUser(user.id)

  return (
    <div className="flex flex-col gap-y-4">
      <p>username: {user.username}</p>
      <p>user ID: {user.id}</p>
      <p>is following: {`${isFollowing}`}</p>
      <p>is user blocked by me: {`${isUserBlockedByMe}`}</p>
      <p>is blocked by this user: {`${isBlockedByThisUser}`}</p>
      <Actions
        isFollowing={isFollowing}
        isUserBlocked={isUserBlockedByMe}
        userId={user.id}
      />
    </div>
  )
}

export default UserPage
