'use client'
import { api } from '@/data/api'
import React, { useState, useEffect } from 'react'

const Menu = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api('/categories', {
          next: {
            revalidate: 60 * 60, // 1 hour
          },
        })
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <nav className=" p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <a
              key={category}
              href={`/category/${category}`}
              className="text-white hover:text-violet-300 transition duration-300"
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Menu
