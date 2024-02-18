import { getSelf } from '@/lib/auth-service'
import { db } from '@/lib/db'

export const getSearch = async (term?: string) => {
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
                blocked: {
                  some: {
                    blockedId: userId,
                  },
                },
              },
            },
            {
              NOT: {
                blockedBy: {
                  some: {
                    blockerId: userId,
                  },
                },
              },
            },
          ],
        },
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        thumbnailUrl: true,
        isLive: true,
        updatedAt: true,
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
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        thumbnailUrl: true,
        isLive: true,
        updatedAt: true,
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
