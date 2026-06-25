import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'
const endpointPaths = {
  activities: '/activities',
  leaderboard: '/leaderboard',
  teams: '/teams',
  users: '/users',
  workouts: '/workouts',
}

export const normalizeApiItems = (payload) => {
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

export const getCollectionEndpoint = (collectionName) => {
  const endpointPath = endpointPaths[collectionName] || `/${collectionName}`
  return `${apiHost}${endpointPath}`
}

function App() {
  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="h2 mb-2">OctoFit Tracker</h1>
        <p className="text-muted mb-2">React 19 presentation tier using routed API-backed views.</p>
        <p className="small mb-0">
          Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> for Codespaces API URLs.
          When unset, the app safely falls back to localhost.
        </p>
      </header>

      <nav className="nav nav-pills gap-2 mb-4">
        <NavLink className="nav-link" to="/users">
          Users
        </NavLink>
        <NavLink className="nav-link" to="/teams">
          Teams
        </NavLink>
        <NavLink className="nav-link" to="/activities">
          Activities
        </NavLink>
        <NavLink className="nav-link" to="/leaderboard">
          Leaderboard
        </NavLink>
        <NavLink className="nav-link" to="/workouts">
          Workouts
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users apiUrl={getCollectionEndpoint('users')} normalize={normalizeApiItems} />} />
        <Route path="/teams" element={<Teams apiUrl={getCollectionEndpoint('teams')} normalize={normalizeApiItems} />} />
        <Route
          path="/activities"
          element={<Activities apiUrl={getCollectionEndpoint('activities')} normalize={normalizeApiItems} />}
        />
        <Route
          path="/leaderboard"
          element={<Leaderboard apiUrl={getCollectionEndpoint('leaderboard')} normalize={normalizeApiItems} />}
        />
        <Route path="/workouts" element={<Workouts apiUrl={getCollectionEndpoint('workouts')} normalize={normalizeApiItems} />} />
      </Routes>
    </main>
  )
}

export default App
