import { useEffect, useState } from 'react'

function Workouts({ apiUrl, normalize }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadWorkouts = async () => {
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
          setError(loadError instanceof Error ? loadError.message : 'Failed to load workouts')
          setItems([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()
    return () => {
      isMounted = false
    }
  }, [apiUrl, normalize])

  if (loading) {
    return <p>Loading workouts...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section>
      <h2 className="h4">Workouts</h2>
      <p className="text-muted small mb-3">Endpoint: {apiUrl}</p>
      <div className="table-responsive">
        <table className="table table-striped table-sm align-middle">
          <thead>
            <tr>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Muscle Group</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {items.map((workout) => (
              <tr key={workout._id || workout.id}>
                <td>{workout.title || '-'}</td>
                <td>{workout.difficulty || '-'}</td>
                <td>{workout.targetMuscleGroup || '-'}</td>
                <td>{workout.durationMinutes ? `${workout.durationMinutes} min` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Workouts
