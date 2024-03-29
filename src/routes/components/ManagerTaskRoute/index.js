import { useEffect, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import api from '../../../services/api'
function ManagerTaskRoute({ children, ...rest }) {
  const auth = useAuth()
  const [ret, setRet] = useState()

  const { id} = useParams()

  useEffect(() => {
    async function getTusk(id) {
      const { data } = await api.auth.getTusk(id)
      if (data.length === 0) {
        setRet(<Navigate to="/not-found-404" replace />)
      } else {
        if (data[0].object.worker_id.id === auth.user.id) {
          setRet(children)
        } else {
          setRet(<Navigate to="/not-found-404" replace />)
        }
      }
    }
    console.log(id)
    getTusk(id)
  }, [])
  return ret
}

export default ManagerTaskRoute
