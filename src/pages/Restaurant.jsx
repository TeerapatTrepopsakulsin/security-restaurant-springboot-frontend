import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function init() {
      try {
        // 1. Validate user is logged in
        const me = await api.get('/api/auth/me')
        setUser(me.data)

        // 2. Fetch restaurants
        const res = await api.get('/api/restaurants')
        setRestaurants(res.data.content)

      } catch (error) {
        console.error(error)
        navigate('/login') // if not authenticated, go to login
      } finally {
        setLoading(false)
      }
    }

    init()
  }, [navigate])

  async function handleLogout() {
    try {
      await api.post('/api/auth/logout')
    } catch (_) {}
    navigate('/login')
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">Restaurant List</h1>
      <p className="mb-8 text-lg text-gray-700">
        Welcome, <strong className="font-semibold text-indigo-600">{user.username}</strong>
      </p>

      <div className="mb-6 flex gap-4">
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Logout
        </button>
        <button
          onClick={() => navigate('/restaurant/new')}
          className="px-5 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Create New Restaurant
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 border-collapse block md:table">
          <thead className="bg-gray-100 sticky top-0 z-10 block md:table-header-group">
            <tr className="border border-gray-300 block md:table-row">
              <th className="p-3 text-left font-semibold text-gray-700 block md:table-cell border border-gray-300">Name</th>
              <th className="p-3 text-left font-semibold text-gray-700 block md:table-cell border border-gray-300">Rating</th>
              <th className="p-3 text-left font-semibold text-gray-700 block md:table-cell border border-gray-300">Location</th>
            </tr>
          </thead>

          <tbody className="block md:table-row-group">
            {restaurants.map((r, idx) => (
              <tr
                key={idx}
                className={`border border-gray-300 block md:table-row hover:bg-indigo-50 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="p-3 block md:table-cell border border-gray-300">{r.name}</td>
                <td className="p-3 block md:table-cell border border-gray-300">{r.rating}</td>
                <td className="p-3 block md:table-cell border border-gray-300">{r.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}
