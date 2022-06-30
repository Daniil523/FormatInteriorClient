import { Navigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

function PrivatRoute({ children, ...rest }) {
  const auth = useAuth()
  return auth.user ? children : <Navigate to="/not-found-404" replace />
}

export default PrivatRoute
