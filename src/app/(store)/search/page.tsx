import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Product } from '@/data/types/product'
import { api } from '@/data/api'
import StarRating from '@/components/star-rating'

interface SearchProps {
  searchParams: {
    q: string
  }
}

async function searchProducts(query: string): Promise<Product[]> {
  const response = await api(`?q=${query}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const products = await response.json()

  return products
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query } = searchParams

  if (!query) {
    redirect('/')
  }

  const products = await searchProducts(query)

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        {products.length} results for:{' '}
        <span className="font-semibold">{query}</span>
      </p>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative rounded-lg bg-white overflow-hidden flex justify-center items-center max-w-[480px] min-h-[480px] max-h-[380px]"
            >
              <Image
                src={product.image}
                className="group-hover:scale-105 transition-transform duration-500 max-w-[230px] min-h-[230px] max-h-[auto]"
                width={480}
                height={480}
                quality={100}
                alt=""
              />
              <div className="absolute bottom-10 right-10 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-indigo-500 bg-black/60 p-1 pl-5">
                <span className="text-sm truncate">{product.title}</span>
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="absolute bottom-0 right-10 h-8 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-indigo-500 bg-black/60 p-1 pl-5 mb-1">
                <div className="text-sm">Rating({product.rating.count}) - </div>
                <StarRating rate={product.rating.rate} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
