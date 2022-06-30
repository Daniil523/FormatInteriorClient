import useAuth from '../../hooks/useAuth'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Select, Input, DatePicker, Checkbox, ConfigProvider } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import Modal from '../../components/Modal'
import validationSchema from './validationChange'
import api from '../../services/api'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import locale from 'antd/lib/locale/ru_RU'
import { Field } from 'rc-field-form'
function getValue(value) {
  if (value) {
    return value
  } else {
    return null
  }
}
function FormChangeObject({ thisObject, getObject, setModalChangeObject, id }) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const [data, setData] = useState({})
  const changeObject = async (data) => {
    try {
      await api.auth.changeObject(data, id)
    } catch (e) {
      if (e.response.status) {
        console.log(e.response.status)
      }
    } finally {
      setModalChangeObject(false)
      getObject(id)
    }
  }
  return (
    <>
      <h1>Изменение объекта:</h1>
      <form onSubmit={handleSubmit(changeObject)}>
        <h4 style={{ marginTop: '10px' }}>Название объекта:</h4>
        <input
          className="custom_input"
          {...register('name')}
          type="text"
          defaultValue={thisObject.name}
          placeholder="Название объекта"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
        <h4 style={{ marginTop: '10px' }}>Заказчик:</h4>
        <input
          className="custom_input"
          {...register('client_name')}
          type="text"
          defaultValue={thisObject.client_name}
          placeholder="ФИО"
        />
        {errors.client_name && (
          <p className="error">{errors.client_name.message}</p>
        )}
        <h4 style={{ marginTop: '10px' }}>Телефон заказчика:</h4>
        <input
          className="custom_input"
          {...register('client_phone', { value: thisObject.client_phone })}
          type="text"
          defaultValue={thisObject.client_phone}
          placeholder="Номер телефона"
        />
        {errors.client_phone && (
          <p className="error">{errors.client_phone.message}</p>
        )}
        <h4 style={{ marginTop: '10px' }}>E-mail заказчика:</h4>
        <Controller
          name="client_email"
          control={control}
          defaultValue={thisObject.client_email}
          render={({ field }) => (
            <Input {...field} size="large" placeholder="E-mail" />
          )}
        />

        {errors.client_email && (
          <p className="error">{errors.client_email.message}</p>
        )}
        <h4 style={{ marginTop: '10px' }}>Адрес объекта:</h4>
        <input
          className="custom_input"
          {...register('location', { value: thisObject.location })}
          type="text"
          defaultValue={thisObject.location}
          placeholder="Адрес"
        />
        {errors.location && <p className="error">{errors.location.message}</p>}
        <h4 style={{ marginTop: '10px' }}>Описание объекта:</h4>
        <textarea
          className="custom_textarea"
          {...register('description', { value: thisObject.description })}
          type="text"
          rows="5"
          defaultValue={thisObject.description}
          placeholder="Описание"
        ></textarea>
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}
        <button className="btn">Изменить</button>
      </form>
    </>
  )
}

export default FormChangeObject
