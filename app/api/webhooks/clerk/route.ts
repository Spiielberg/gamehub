import { db } from '@/lib/db'
import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

export const POST = async (req: Request) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local',
    )
  }

  const headerPayload = headers()
  const svixId = headerPayload.get('svix-id')
  const svixSignature = headerPayload.get('svix-signature')
  const svixTimestamp = headerPayload.get('svix-timestamp')

  if (!svixId || !svixSignature || !svixTimestamp) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const webHook = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = webHook.verify(body, {
      'svix-id': svixId,
      'svix-signature': svixSignature,
      'svix-timestamp': svixTimestamp,
    }) as WebhookEvent
  } catch (err) {
    console.log('Error verifying webhook', err)
    return new Response('Error occurred', { status: 400 })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    await db.user.create({
      data: {
        externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
        stream: {
          create: {
            name: `${payload.data.username}'s stream`,
          },
        },
      },
    })
  }

  if (eventType === 'user.updated') {
    const currentUser = await db.user.findUnique({
      where: { externalUserId: payload.data.id },
    })

    if (!currentUser) {
      return new Response('User not found', { status: 404 })
    }

    await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    })
  }

  if (eventType === 'user.deleted') {
    const currentUser = await db.user.findUnique({
      where: { externalUserId: payload.data.id },
    })

    if (!currentUser) {
      return new Response('User not found', { status: 404 })
    }

    await db.user.delete({
      where: { externalUserId: payload.data.id },
    })
  }

  return new Response('', { status: 200 })
}
