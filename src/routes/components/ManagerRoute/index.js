import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

function ManagerRoute({ children, ...rest }) {
  const auth = useAuth()
  console.log(auth.user.position.name)
  return auth.user.position.name === 'Руководитель проекта' ? (
    children
  ) : (
    <Navigate to="/not-found-404" replace />
  )
}

export default ManagerRoute
