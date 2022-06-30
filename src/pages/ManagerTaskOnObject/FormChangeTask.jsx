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
const { Option } = Select
function getValue(value) {
  if (value) {
    return value
  } else {
    return null
  }
}
function FormChangeTask({ thisTask, getTaskForObject, setModalChange, id }) {
  const [workers, setWorkers] = useState([])
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const changeTask = async (data) => {
    data.date_start = moment(data.date_start).format('YYYY-MM-DD')
    data.date_finish = moment(data.date_finish).format('YYYY-MM-DD')
    try {
      await api.auth.changeTask(data, id)
    } catch (e) {
      if (e.response.status) {
        console.log(e.response.status)
      }
    } finally {
      setModalChange(false)
      getTaskForObject(id)
    }
  }

  const getWorkers = async () => {
    const { data } = await api.auth.getWorkers()
    setWorkers(data)
  }
  useEffect(() => {
    getWorkers()
  }, [])
  return (
    <>
      <h1>Добавление задачи</h1>
      <form onSubmit={handleSubmit(changeTask)}>
        <ConfigProvider locale={locale}>
          <h4 style={{ marginTop: '10px' }}>Дата начала работ:</h4>
          <Controller
            name="date_start"
            defaultValue={moment(thisTask.date_start)}
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                size="large"
                value={getValue(field.value)}
                style={{ width: '100%' }}
                showNow={false}
              />
            )}
          />
          {errors.date_start && (
            <p className="error">{errors.date_start.message}</p>
          )}
          <h4 style={{ marginTop: '10px' }}>Дата окончания работ:</h4>
          <Controller
            name="date_finish"
            control={control}
            defaultValue={moment(thisTask.date_finish)}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                size="large"
                value={getValue(field.value)}
                style={{ width: '100%' }}
                showNow={false}
              />
            )}
          />
          {errors.date_finish && (
            <p className="error">{errors.date_finish.message}</p>
          )}
        </ConfigProvider>
        <h4 style={{ marginTop: '10px' }}>Объем работ:</h4>
        <Controller
          name="size"
          control={control}
          defaultValue={thisTask.size}
          render={({ field }) => (
            <Input {...field} size="large" placeholder="Укажите объем работ" />
          )}
        />
        {errors.size && <p className="error">{errors.size.message}</p>}
        <h4 style={{ marginTop: '10px' }}>Исполнитель:</h4>
        <Controller
          name="worker_id"
          control={control}
          defaultValue={thisTask.worker_id.id}
          render={({ field }) => (
            <Select
              style={{ width: '100%' }}
              showSearch
              value={getValue(field.value)}
              size="large"
              placeholder="Выберете сотрудника"
              optionFilterProp="children"
              onChange={field.onChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {workers.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        />
        {errors.worker_id && (
          <p className="error">{errors.worker_id.message}</p>
        )}
        <button className="btn">Изменить задачу</button>
      </form>
    </>
  )
}

export default FormChangeTask
