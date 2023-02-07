import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../../pages/Login'
import WorkerCalendar from '../../pages/WorkerCalendar'
import WorkerTasks from '../../pages/WorkerTasks'
import WorkerOneTask from '../../pages/WorkerOneTask'
import ManagerCalendar from '../../pages/ManagerCalendar'
import ManagerTasks from '../../pages/ManagerObjects'
import ManagerOneTask from '../../pages/ManagerObject'
import ManagerTaskOnObject from '../../pages/ManagerTaskOnObject'
import ManagerBuy from '../../pages/ManagerBuy'
import NotFound from '../../pages/NotFound'
import Profile from '../../pages/Profile'
import useAuth from '../../hooks/useAuth'
import ManagerRoute from '../components/ManagerRoute'
import GuestRoute from '../components/GuestRoute'
import WorkerRoute from '../components/WorkerRoute'
import PrivatRoute from '../components/PrivatRoute'
import ManagerObjectRoute from '../components/ManagerObjectRoute'
import WorkerTaskRoute from '../components/WorkerTaskRoute'
import ManagerTaskRoute from '../components/ManagerTaskRoute'

function AppRoutes() {
  const auth = useAuth()

  return auth.isLoaded ? (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/worker-calendar"
        element={
          <WorkerRoute>
            <WorkerCalendar />
          </WorkerRoute>
        }
      />
      <Route
        path="/worker-tasks"
        element={
          <WorkerRoute>
            <WorkerTasks />
          </WorkerRoute>
        }
      />
      <Route
        path="/worker-tasks/:id"
        element={
          <WorkerRoute>
            <WorkerTaskRoute>
              <WorkerOneTask />
            </WorkerTaskRoute>
          </WorkerRoute>
        }
      />
      <Route
        path="/manager-calendar"
        element={
          <ManagerRoute>
            <ManagerCalendar />
          </ManagerRoute>
        }
      />
      <Route
        path="/manager-tasks"
        element={
          <ManagerRoute>
            <ManagerTasks />
          </ManagerRoute>
        }
      />
      <Route
        path="/manager-tasks/:id"
        element={
          <ManagerRoute>
            <ManagerObjectRoute>
              <ManagerOneTask />
            </ManagerObjectRoute>
          </ManagerRoute>
        }
      />
      <Route
        path="/manager-object-task/:id/"
        element={
          <ManagerRoute>
            <ManagerTaskRoute>
              <ManagerTaskOnObject />
            </ManagerTaskRoute>
          </ManagerRoute>
        }
      />
      <Route
        path="/manager-buy"
        element={
          <ManagerRoute>
            <ManagerBuy />
          </ManagerRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivatRoute>
            <Profile />
          </PrivatRoute>
        }
      />
      <Route path="/not-found-404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found-404" />} />
    </Routes>
  ) : (
    <h1>Жди</h1>
  )
}

export default AppRoutes
