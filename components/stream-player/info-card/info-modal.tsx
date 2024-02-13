import { updateStream } from '@/actions/stream'
import { Hint } from '@/components/hint'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadDropzone } from '@/lib/uploadthing'
import { TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  ChangeEvent,
  ElementRef,
  FormEvent,
  useRef,
  useState,
  useTransition,
} from 'react'
import { toast } from 'sonner'

interface ModalProps {
  initialName: string
  initialThumbnailUrl: string | null
}

export const Modal = ({ initialName, initialThumbnailUrl }: ModalProps) => {
  const [name, setName] = useState(initialName)
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl)

  const closeRef = useRef<ElementRef<'button'>>(null)

  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success('Thumbnail removed')
          setThumbnailUrl('')
          closeRef?.current?.click()
        })
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    startTransition(() => {
      updateStream({ name })
        .then(() => {
          toast.success('Stream updated')
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
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10">
                <div className="absolute right-2 top-2 z-[10]">
                  <Hint label="Remove thumbnail" asChild>
                    <Button
                      type="button"
                      onClick={onRemove}
                      disabled={isPending}
                      className="h-auto w-auto p-1.5"
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: { color: '#F8FAFC' },
                    allowedContent: { color: '#9DA3AE' },
                    container: { cursor: 'pointer' },
                  }}
                  onClientUploadComplete={(res) => {
                    toast.success('Thumbnail updated')
                    setThumbnailUrl(res?.[0]?.url)
                    router.refresh()
                    closeRef?.current?.click()
                  }}
                />
              </div>
            )}
          </div>
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
