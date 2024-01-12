'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon, XIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { FormEvent, useState } from 'react'

export const Search = () => {
  const [value, setValue] = useState('')

  const router = useRouter()

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!value) return

    const url = qs.stringifyUrl(
      {
        url: '/search',
        query: { term: value },
      },
      {
        skipEmptyString: true,
      },
    )

    router.push(url)
  }

  const onClear = () => {
    setValue('')
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex w-full items-center lg:w-[440px]"
    >
      <Input
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      {value && (
        <XIcon
          className="absolute right-14 top-2.5 h-5 w-5 cursor-pointer text-muted-foreground transition-opacity hover:opacity-75"
          onClick={onClear}
        />
      )}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none transition-opacity hover:opacity-75"
      >
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  )
}
