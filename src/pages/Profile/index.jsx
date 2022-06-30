import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import NavWorker from '../../components/NavWorker'
import Modal from '../../components/Modal'
import validationSchema from './validation'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import api from '../../services/api'
import { Input } from 'antd'
function Profile() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [modalActive, setModalActive] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const logOut = async () => {
    auth.logOut()
    navigate('/login')
  }
  const onSubmit = async (data) => {
    try {
      console.log(data)
      await api.auth.changeUser(data, auth.user.id)
      const { data: user } = await api.auth.getProfile()
      auth.setUser(user[0])
    } catch (e) {
      if (e.response.status) {
        console.log(e.response.status)
      }
    } finally {
      setModalActive(false)
    }
  }
  return (
    <>
      <h1 className="profile-h1">{auth.user.name}</h1>
      <h2 className="profile-h2">
        <b>Должность:</b> {auth.user.position.name}
      </h2>
      <h2 className="profile-h2">
        <b>E-mail: </b>
        <a href={`mailto:${auth.user.email}`}>{auth.user.email}</a>
      </h2>
      <h2 className="profile-h2">
        <b>Телефон:</b> <a href={`tel:${auth.user.phone}`}>{auth.user.phone}</a>
      </h2>
      <h2 className="profile-h2">
        <b>Описание:</b> {auth.user.description}
      </h2>
      <button onClick={() => setModalActive(true)} className="btn mr">
        Редактировать
      </button>
      <button onClick={logOut} className="btn">
        Выйти
      </button>
      <Modal active={modalActive} setActive={setModalActive}>
        <h1>{auth.user.name}</h1>
        <form className="Login_form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h4 style={{ marginTop: '10px' }}>ФИО:</h4>
            <Controller
              name="name"
              control={control}
              defaultValue={auth.user.name}
              render={({ field }) => (
                <Input {...field} size="large" placeholder="ФИО" />
              )}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div>
            <h4 style={{ marginTop: '10px' }}>E-mail:</h4>
            <Controller
              name="email"
              control={control}
              defaultValue={auth.user.email}
              render={({ field }) => (
                <Input {...field} size="large" placeholder="E-mail" />
              )}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div>
            <h4 style={{ marginTop: '10px' }}>Номер телефона:</h4>
            <Controller
              name="phone"
              control={control}
              defaultValue={auth.user.phone}
              render={({ field }) => (
                <Input {...field} size="large" placeholder="Номер телефона" />
              )}
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>
          <button className="btn">Изменить</button>
        </form>
      </Modal>
    </>
  )
}

export default Profile
