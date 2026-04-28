import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardOverview from './pages/DashboardOverview'
import Ships from './pages/dashboard/Ships'
import Ports from './pages/dashboard/Ports'
import Voyages from './pages/dashboard/Voyages'
import Cargo from './pages/dashboard/Cargo'
import Crew from './pages/dashboard/Crew'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<DashboardOverview />} />
        <Route path="ships" element={<Ships />} />
        <Route path="ports" element={<Ports />} />
        <Route path="voyages" element={<Voyages />} />
        <Route path="cargo" element={<Cargo />} />
        <Route path="crew" element={<Crew />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
