'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const query = searchParams.get('q')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData)

    const query = data.q

    if (!query) {
      return null
    }

    router.push(`/search?q=${query}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-[320px] items-center gap-3 rounded-full bg-indigo-900 px-5 py-3 ring-indigo-700"
    >
      <input
        name="q"
        defaultValue={query ?? ''}
        placeholder="Search..."
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-indigo-500"
        required
      />
      <input
        type="submit"
        value="➡️"
        className="btn btn-primary cursor-pointer text-lg"
      />
    </form>
  )
}
