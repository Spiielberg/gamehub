import { getSelf } from '@/lib/auth-service'
import { db } from '@/lib/db'

export const getStreams = async () => {
  let userId

  try {
    const self = await getSelf()

    userId = self.id
  } catch (error) {
    userId = null
  }

  let streams = []

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        user: {
          AND: [
            {
              NOT: {
                blockedBy: {
                  some: {
                    blockerId: userId,
                  },
                },
              },
            },
            {
              NOT: {
                blocked: {
                  some: {
                    blockedId: userId,
                  },
                },
              },
            },
          ],
        },
      },
      select: {
        id: true,
        name: true,
        thumbnailUrl: true,
        isLive: true,
        user: {
          select: {
            username: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [
        {
          isLive: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    })
  } else {
    streams = await db.stream.findMany({
      select: {
        id: true,
        name: true,
        thumbnailUrl: true,
        isLive: true,
        user: {
          select: {
            username: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [
        {
          isLive: 'desc',
        },
        {
          updatedAt: 'desc',
        },
      ],
    })
  }

  return streams
}
