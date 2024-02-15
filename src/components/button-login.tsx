'use client'

import { useState } from 'react'

import Login from './login'

export function ButtonLogin() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={() => setIsModalOpen(true)}>login</button>
        <Login isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  )
}
