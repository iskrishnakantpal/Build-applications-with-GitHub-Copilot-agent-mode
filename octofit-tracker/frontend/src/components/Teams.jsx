import { useEffect, useState } from 'react'

function Teams({ apiUrl, normalize }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadTeams = async () => {
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
          setError(loadError instanceof Error ? loadError.message : 'Failed to load teams')
          setItems([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadTeams()
    return () => {
      isMounted = false
    }
  }, [apiUrl, normalize])

  if (loading) {
    return <p>Loading teams...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section>
      <h2 className="h4">Teams</h2>
      <p className="text-muted small mb-3">Endpoint: {apiUrl}</p>
      <div className="table-responsive">
        <table className="table table-striped table-sm align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Members</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {items.map((team) => (
              <tr key={team._id || team.id}>
                <td>{team.name || '-'}</td>
                <td>{team.city || '-'}</td>
                <td>{team.memberCount || team.members || '-'}</td>
                <td>{team.createdBy?.fullName || team.createdByName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Teams
