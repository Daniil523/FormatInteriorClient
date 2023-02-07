import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Select, Input } from 'antd'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import validationSchema from './validation'
import api from '../../services/api'
import Modal from '../../components/Modal'
import { yupResolver } from '@hookform/resolvers/yup'
const { TextArea } = Input
const { Option } = Select
function ManagerTasks() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [modalForAddObject, setModalForAddObject] = useState(false)

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const fetchData = async () => {
    const { data } = await api.auth.getObjects()
    setData(data)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const createNewObject = async (data) => {
    console.log(data)
    data.worker_id = auth.user.id
    await api.auth.createObject(data)
    fetchData()
    setModalForAddObject(false)
  }
  return (
    <>
      <div className="objects_card_wraper">
        {data.map((obj) => (
          <div
            key={obj.id}
            className="objects_card"
            onClick={() => {
              navigate(`/manager-tasks/${obj.id}`)
            }}
          >
            <h3 className="modal_task_name">
              <b>{obj.name}</b>
            </h3>
            <h4 className="modal_tusk_info">
              <b>Заказчик: </b>
              {obj.client_name}
            </h4>
            <h4 className="modal_tusk_info">
              <b>Адрес: </b>
              {obj.location}
            </h4>
            <h4 className="modal_tusk_info">
              <b>Описание:</b>
            </h4>
            <p>{obj.description}</p>
          </div>
        ))}
        <div
          className="objects_card"
          style={{ textAlign: 'center' }}
          onClick={() => {
            reset()
            setModalForAddObject(true)
          }}
        >
          Добавить объект
        </div>
      </div>
      <Modal active={modalForAddObject} setActive={setModalForAddObject}>
        <h1>Добавление объекта</h1>
        <form onSubmit={handleSubmit(createNewObject)}>
          <h4 style={{ marginTop: '10px' }}>Название объекта:</h4>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} size="large" placeholder="Название" />
            )}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
          <h4 style={{ marginTop: '10px' }}>Адрес объекта:</h4>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input {...field} size="large" placeholder="Адрес" />
            )}
          />
          {errors.location && (
            <p className="error">{errors.location.message}</p>
          )}
          <h4 style={{ marginTop: '10px' }}>ФИО заказчика:</h4>
          <Controller
            name="client_name"
            control={control}
            render={({ field }) => (
              <Input {...field} size="large" placeholder="ФИО" />
            )}
          />
          {errors.client_name && (
            <p className="error">{errors.client_name.message}</p>
          )}
          <h4 style={{ marginTop: '10px' }}>Номер телефона заказчика:</h4>
          <Controller
            name="client_phone"
            control={control}
            render={({ field }) => (
              <Input {...field} size="large" placeholder="Номер телефона" />
            )}
          />
          {errors.client_phone && (
            <p className="error">{errors.client_phone.message}</p>
          )}
          <h4 style={{ marginTop: '10px' }}>E-mail заказчика:</h4>
          <Controller
            name="client_email"
            control={control}
            render={({ field }) => (
              <Input {...field} size="large" placeholder="E-mail" />
            )}
          />
          {errors.client_email && (
            <p className="error">{errors.client_email.message}</p>
          )}
          <h4 style={{ marginTop: '10px' }}>Описание:</h4>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextArea
                rows={5}
                {...field}
                size="large"
                placeholder="Описание"
              />
            )}
          />
          {errors.description && (
            <p className="error">{errors.description.message}</p>
          )}
          <button className="btn">Добавить объект</button>
        </form>
      </Modal>
    </>
  )
}

export default ManagerTasks
