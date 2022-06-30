import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

function WorkerRoute({ children, ...rest }) {
  const auth = useAuth()
  const location = useLocation()
  const url = new URLSearchParams(location.search.slice(1))
  console.log(auth.user.position.name)
  return auth.user.position.name === 'Рабочий' ? (
    children
  ) : (
    <Navigate to="/not-found-404" replace />
  )
}

export default WorkerRoute
