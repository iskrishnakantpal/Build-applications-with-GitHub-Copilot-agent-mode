import { useEffect, useState } from 'react'

function Leaderboard({ apiUrl, normalize }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadLeaderboard = async () => {
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
          setError(loadError instanceof Error ? loadError.message : 'Failed to load leaderboard')
          setItems([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()
    return () => {
      isMounted = false
    }
  }, [apiUrl, normalize])

  if (loading) {
    return <p>Loading leaderboard...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section>
      <h2 className="h4">Leaderboard</h2>
      <p className="text-muted small mb-3">Endpoint: {apiUrl}</p>
      <div className="table-responsive">
        <table className="table table-striped table-sm align-middle">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry) => (
              <tr key={entry._id || entry.id || `${entry.rank}-${entry.user?.fullName || ''}`}>
                <td>{entry.rank || '-'}</td>
                <td>{entry.user?.fullName || entry.userName || '-'}</td>
                <td>{entry.team?.name || entry.teamName || '-'}</td>
                <td>{entry.points || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Leaderboard
