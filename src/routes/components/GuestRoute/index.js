import { Navigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

function GuestRoute({ children, ...rest }) {
  const auth = useAuth()
  if (auth.user) {
    if (auth.user.position.name === 'Рабочий') {
      return <Navigate to="/worker-calendar" replace />
    }
    if (auth.user.position.name === 'Руководитель проекта') {
      return <Navigate to="/manager-calendar" replace />
    }
  } else {
    return children
  }
}

export default GuestRoute
