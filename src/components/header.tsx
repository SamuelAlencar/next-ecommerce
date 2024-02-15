import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'

import { CartWidget } from './cart-widget'
import { SearchForm } from './search-form'
import Menu from './menu'
import { ButtonLogin } from './button-login'

interface HeaderProps {
  user: {
    id: number
    name: string
    email: string
  } | null
}

export function Header({ user }: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold text-white">
          NextStore
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <Menu />
      </div>
      <div className="flex items-center gap-5">
        <Suspense fallback={null}>
          <SearchForm />
        </Suspense>
      </div>
      <div className="flex items-center gap-4">
        <CartWidget />

        <div className="w-px h-4 bg-indigo-700"></div>

        {user ? (
          <Link href="/" className="flex items-center gap-2 hover:underline">
            <Image
              src="https://github.com/diego3g.png"
              className="h-6 w-6 rounded-full"
              width={24}
              height={24}
              alt=""
            />
            <span>{user.email}</span>
          </Link>
        ) : (
          <ButtonLogin />
        )}
      </div>
    </div>
  )
}
