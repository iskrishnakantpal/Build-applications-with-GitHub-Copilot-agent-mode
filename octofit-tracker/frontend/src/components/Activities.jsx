import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const apiUrl = `${apiBase}/api/activities`

const normalizeApiItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }
  if (Array.isArray(payload?.items)) {
    return payload.items
  }
  if (Array.isArray(payload?.results)) {
    return payload.results
  }
  return []
}

function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadActivities = async () => {
      try {
        setLoading(true)
        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        if (isMounted) {
          setItems(normalizeApiItems(payload))
          setError('')
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load activities')
          setItems([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadActivities()
    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <p>Loading activities...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section>
      <h2 className="h4">Activities</h2>
      <p className="text-muted small mb-3">Endpoint: {apiUrl}</p>
      <div className="table-responsive">
        <table className="table table-striped table-sm align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {items.map((activity) => (
              <tr key={activity._id || activity.id}>
                <td>{activity.user?.fullName || activity.userName || '-'}</td>
                <td>{activity.type || '-'}</td>
                <td>{activity.durationMinutes ? `${activity.durationMinutes} min` : '-'}</td>
                <td>{activity.caloriesBurned || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities
