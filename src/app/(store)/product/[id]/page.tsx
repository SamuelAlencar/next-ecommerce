import Image from 'next/image'
import { Metadata } from 'next'

import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import { AddToCartButton } from '@/components/add-to-cart-button'

interface ProductProps {
  params: {
    id: string
  }
}

async function getProduct(id: string): Promise<Product> {
  const response = await api(`/${id}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  const product = (await response.json()) as Product

  return product
}

export async function generateMetadata({
  params,
}: ProductProps): Promise<Metadata> {
  const product = await getProduct(params.id)

  return {
    title: product.title,
  }
}

export async function generateStaticParams() {
  const response = await api(`?limit=3`)
  const products: Product[] = await response.json()

  return products.map((product) => {
    return [{ id: product.id }]
  })
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProduct(params.id)

  return (
    <div className="relative grid max-h-[600px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}</h1>

        <p className="mt-2 leading-relaxed text-indigo-400">
          {product.description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-sm text-indigo-400">
            Em até 12x s/ juros de{' '}
            {(product.price / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-indigo-700 bg-indigo-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-indigo-700 bg-indigo-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-indigo-700 bg-indigo-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button"
              className="flex h-9 w-14 items-center justify-center rounded-full border border-indigo-700 bg-indigo-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  )
}