'use client'

import { updateUser } from '@/actions/user'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import {
  ChangeEvent,
  ElementRef,
  FormEvent,
  useRef,
  useState,
  useTransition,
} from 'react'
import { toast } from 'sonner'

interface BioModalProps {
  initialValue: string | null
}

export const BioModal = ({ initialValue }: BioModalProps) => {
  const [bio, setBio] = useState(initialValue || '')

  const closeRef = useRef<ElementRef<'button'>>(null)

  const [isPending, startTransition] = useTransition()

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setBio(event.target.value)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    startTransition(() => {
      updateUser({ bio })
        .then(() => {
          toast.success('User bio updated')
          closeRef?.current?.click()
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="User bio"
            onChange={onChange}
            value={bio}
            disabled={isPending}
            className="max-h-[50vh]"
          />
          <div className="flex justify-between">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
