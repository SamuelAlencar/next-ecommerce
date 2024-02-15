'use client'
import Link from 'next/link'
import { useState } from 'react'

interface LoginProps {
  isOpen: boolean
  onClose: () => void
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error('Credenciais inválidas')
      }

      onClose()
    } catch (error) {
      setError('Ocorreu um erro durante o login')
    }
  }

  return (
    <div className={`fixed inset-0 z-10 ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="fixed inset-0 bg-black opacity-90"></div>
      <div className="flex items-center justify-center h-screen z-0">
        <div className="w-96 p-8 bg-white rounded shadow-md z-20">
          <h2 className="text-2xl font-bold mb-4 text-gray-600">Login</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                User
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-gray-600 text-sm font-medium text-gray-600"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded focus:outline-none focus:ring focus:border-violet text-sm font-medium text-gray-600"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Link
              href={'#'}
              onClick={handleLogin}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300] "
            >
              <span className="min-w-[80px]">Login</span>
            </Link>
            <Link
              href="/register"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ml-4"
            >
              <span className="min-w-[120px]">Register</span>
            </Link>
            <Link
              href="/forgot-password"
              className="flex items-center gap-2 hover:underline text-gray-600 text-sm mt-5"
            >
              I Forgot my password
            </Link>
          </form>
          <button
            className="absolute top-4 right-4 text-black-500 hover:text-black-700 text-lg"
            onClick={onClose}
          >
            ✖️
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
