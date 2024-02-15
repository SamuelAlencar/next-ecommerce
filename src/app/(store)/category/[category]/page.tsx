/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next'

import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import Link from 'next/link'
import Image from 'next/image'
import StarRating from '@/components/star-rating'

interface CategoryProps {
  category: string
  params: {
    category: string
  }
}

async function getProduct(category: string): Promise<Product> {
  const response = await api(`/category/${category}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const product = (await response.json()) as Product

  return product
}

export async function generateMetadata({
  params,
}: CategoryProps): Promise<Metadata> {
  const product = await getProduct(params.category)

  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const response = await api(`?limit=20`)
  const products: Product[] = await response.json()

  return products.map((product) => {
    return [{ category: product.category }]
  })
}

export default async function ProductPage({ params }: CategoryProps) {
  const products: any = await getProduct(params.category)
  const firstCategory =
    products.length > 0 ? (products[0] as CategoryProps).category : ''

  return (
    <div className="flex flex-col gap-4">
      <p className="text-md">
        <span className="p-4 text-md">
          category:{' '}
          <span className="font-semibold text-lg  uppercase">
            {firstCategory}({products.length})
          </span>
        </span>
      </p>
      <div className="grid grid-cols-3 gap-6">
        {products.map((product: Product) => {
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
                alt={product.title}
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
