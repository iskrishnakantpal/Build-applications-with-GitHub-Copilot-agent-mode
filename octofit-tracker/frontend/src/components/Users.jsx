import { useEffect, useState } from 'react'

function Users({ apiUrl, normalize }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        if (isMounted) {
          setItems(normalize(payload))
          setError('')
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Failed to load users')
          setItems([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadUsers()
    return () => {
      isMounted = false
    }
  }, [apiUrl, normalize])

  if (loading) {
    return <p>Loading users...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section>
      <h2 className="h4">Users</h2>
      <p className="text-muted small mb-3">Endpoint: {apiUrl}</p>
      <div className="table-responsive">
        <table className="table table-striped table-sm align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Level</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
              <tr key={user._id || user.id}>
                <td>{user.fullName || user.name || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>{user.fitnessLevel || '-'}</td>
                <td>{user.team?.name || user.teamName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users
