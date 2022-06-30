import { useEffect, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import api from '../../../services/api'
function ManagerObjectRoute({ children, ...rest }) {
  const auth = useAuth()
  const [ret, setRet] = useState()

  const { id } = useParams()

  console.log(auth.user.position.name)
  useEffect(() => {
    async function getObject(id) {
      const { data } = await api.auth.getObject(id)
      console.log(data)
      if (data.length === 0) {
        setRet(<Navigate to="/not-found-404" replace />)
      } else {
        if (data[0].worker_id.id === auth.user.id) {
          setRet(children)
        } else {
          setRet(<Navigate to="/not-found-404" replace />)
        }
      }
    }
    getObject(id)
  }, [])
  return ret
}

export default ManagerObjectRoute
