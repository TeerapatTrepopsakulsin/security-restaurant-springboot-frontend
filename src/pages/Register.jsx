import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSignup(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await api.post('/api/auth/signup', {
        username,
        password,
        name,
      })

      // After successful signup → redirect to login page
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError('Signup failed. Try a different username.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-sm mx-auto">
    <h1 className="text-3xl font-bold mb-8">Create Account</h1>

    <form onSubmit={handleSignup} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        disabled={loading}
        className={`py-3 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
      >
        {loading ? 'Signing up…' : 'Register'}
      </button>

      {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>

    <p className="mt-6 text-center">
      Already have an account?{' '}
      <a href="/login" className="underline text-indigo-600 hover:text-indigo-800">
        Login here
      </a>
    </p>
  </div>
  )
}
