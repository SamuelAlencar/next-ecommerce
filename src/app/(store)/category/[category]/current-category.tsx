'use client'

import { useSearchParams } from 'next/navigation'

export function CurrentCategory() {
  const searchParams = useSearchParams()

  const query = searchParams.get('/category')

  return (
    <p className="text-sm">
      Resultados para: <span className="font-semibold">{query}</span>
    </p>
  )
}
