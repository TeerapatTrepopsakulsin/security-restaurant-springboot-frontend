import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function NewRestaurant() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const payload = {
        name,
        location,
        description,
        imageUrl,
      }

      await api.post('/api/restaurants', payload)
      navigate('/restaurant')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Failed to create restaurant')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 700 }}>
      <h1>Create New Restaurant</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', fontWeight: 600 }}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', fontWeight: 600 }}>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', fontWeight: 600 }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <label style={{ display: 'block', fontWeight: 600 }}>Image URL</label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '0.75rem' }}>{error}</div>
        )}

        <div>
          <button type="submit" disabled={submitting} style={{ padding: '0.5rem 1rem' }}>
            {submitting ? 'Creating...' : 'Create Restaurant'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/restaurant')}
            style={{ marginLeft: '0.75rem', padding: '0.5rem 1rem' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
