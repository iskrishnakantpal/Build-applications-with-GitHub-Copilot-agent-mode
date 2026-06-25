import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'

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
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  )
}

export default App
