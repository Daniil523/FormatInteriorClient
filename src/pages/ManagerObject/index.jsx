import useAuth from '../../hooks/useAuth'
import { useState, useEffect } from 'react'
import {
  NavigationType,
  useNavigate,
  useParams,
  Navigate,
} from 'react-router-dom'
import { Select, Input, DatePicker, Checkbox, ConfigProvider } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import Modal from '../../components/Modal'
import validationSchema from './validation'
import api from '../../services/api'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import locale from 'antd/lib/locale/ru_RU'
import ModalChangeObject from './FormChangeObject'
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
function getValue(value) {
  if (value) {
    return value
  } else {
    return null
  }
}

function ManagerOneTask() {
  const auth = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const [workers, setWorkers] = useState([])
  const [categories, setCategories] = useState([])
  const [task, setTask] = useState([])
  const [categoryForAdd, setCategoryForAdd] = useState()
  const [thisObject, setThisObject] = useState({})
  const [formC, setFormC] = useState(<></>)
  const [serviceInCategory, setServiceInCategory] = useState([])
  const [modalForAddActive, setModalForAddActive] = useState(false)
  const [modalChangeObject, setModalChangeObject] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const createNewTusk = async (taskForAdd) => {
    taskForAdd.object = id
    taskForAdd.category = categoryForAdd.id
    taskForAdd.date_start = moment(taskForAdd.date_start).format('YYYY-MM-DD')
    taskForAdd.date_finish = moment(taskForAdd.date_finish).format('YYYY-MM-DD')
    try {
      await api.auth.createNewTusk(taskForAdd)
    } catch (e) {
      if (e.response.status) {
        console.log(e.response.status)
      }
    } finally {
      reset()
      setModalForAddActive(false)
    }
    getTaskForObject(id)

    setModalForAddActive(false)
  }
  const getServiceInCategory = async (id) => {
    const { data } = await api.auth.getServiceInCategory(id)
    setServiceInCategory(data)
  }
  const getWorkers = async () => {
    const { data } = await api.auth.getWorkers()
    setWorkers(data)
  }
  async function getObject(id) {
    const { data } = await api.auth.getObject(id)
    setThisObject(data[0])
  }
  async function deleteObject(id) {
    await api.auth.deleteObject(id)
    navigate(-1)
    setModalDelete(false)
  }
  const getCategories = async () => {
    const { data } = await api.auth.getCategories()
    setCategories(data)
  }
  const getTaskForObject = async () => {
    const { data } = await api.auth.getObjectTask(id)
    setTask(data)
  }
  const changeМaterialStatus = async (task) => {
    let material_status = !task.material_status
    await api.auth.changeStatus({ material_status: material_status }, task.id)
    getTaskForObject()
  }
  function createForm(Object) {
    setFormC(
      <ModalChangeObject
        getObject={getObject}
        thisObject={Object}
        setModalChangeObject={setModalChangeObject}
        id={id}
      />
    )
  }
  useEffect(() => {
    getWorkers()
    getObject(id)
    getCategories()
    getTaskForObject()
  }, [])

  return (
    <div>
      <h1 className="profile-h1">{thisObject.name}</h1>
      <h3>
        <b>Заказчик: </b>
        {thisObject.client_name}
      </h3>
      <h3>
        <b>Телфон заказчика: </b>
        <a href={`tel:${thisObject.client_phone}`}>{thisObject.client_phone}</a>
      </h3>
      <h3>
        <b>E-mail заказчика: </b>
        <a href={`mailto:${thisObject.client_email}`}>
          {thisObject.client_email}
        </a>
      </h3>
      <h3>
        <b>Адрес: </b>
        {thisObject.location}
      </h3>
      <h3 style={{ marginTop: '30px' }}>
        <b>Описание объекта:</b>
        <br />
        {thisObject.description}
      </h3>
      <button
        onClick={() => {
          createForm(thisObject)
          setModalChangeObject(true)
        }}
        className="btn"
        style={{ marginRight: '10px' }}
      >
        Изменить
      </button>
      <button
        className="btn"
        onClick={() => {
          setModalDelete(true)
        }}
      >
        Удалить
      </button>
      {categories.map((cat) => (
        <div key={cat.id} className="task_categorie_list">
          <h1 style={{ marginTop: '30px' }}>{cat.name}</h1>
          <div className="object_task_wraper">
            {task.map((task) =>
              task.category.name === cat.name ? (
                <div
                  key={task.id}
                  className="modal_task_card"
                  onClick={() => {
                    navigate(`/manager-object-task/${task.id}`)
                  }}
                  style={
                    task.completeness ? { backgroundColor: '#e2ffdb' } : {}
                  }
                >
                  <h3 className="modal_task_name">
                    <b>{task.service.name}</b>
                  </h3>
                  <h4 className="modal_tusk_info">
                    <b>Начало / завершение задачи:</b>
                  </h4>
                  <p>
                    {task.date_start} / {task.date_finish}
                  </p>
                  <h4 className="modal_tusk_info">
                    <b>Материал:</b>
                    <br />
                    {task.service.material.name} (
                    {task.service.material.expenditure * task.size}{' '}
                    {task.service.material.unit.name})
                  </h4>
                  <p>
                    <Checkbox
                      checked={task.material_status}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                      onChange={() => {
                        changeМaterialStatus(task)
                      }}
                    >
                      Приобретён
                    </Checkbox>
                  </p>
                  <h4 className="modal_tusk_info">
                    <b>Объём работы:</b>
                  </h4>
                  <p>
                    {task.size} {task.service.unit.name}
                  </p>
                  <h4 className="modal_tusk_info">
                    <b>Исполнитель:</b>
                  </h4>
                  <p>{task.worker_id.name}</p>
                </div>
              ) : null
            )}
          </div>
          <button
            className="btn"
            onClick={() => {
              setCategoryForAdd(cat)
              getServiceInCategory(cat.id)
              setModalForAddActive(true)
            }}
            style={{ textAlign: 'center', marginTop: '20px' }}
          >
            Добавить задачу
          </button>
        </div>
      ))}
      <Modal active={modalForAddActive} setActive={setModalForAddActive}>
        <h1>Добавление задачи</h1>
        <form onSubmit={handleSubmit(createNewTusk)}>
          <h4 style={{ marginTop: '10px' }}>Предоставляемая услуга:</h4>
          <Controller
            name="service"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <Select
                style={{ width: '100%' }}
                showSearch
                size="large"
                value={getValue(field.value)}
                placeholder="Выберете услугу"
                optionFilterProp="children"
                onChange={field.onChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {serviceInCategory.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          />
          {errors.service && <p className="error">{errors.service.message}</p>}
          <ConfigProvider locale={locale}>
            <h4 style={{ marginTop: '10px' }}>Дата начала работ:</h4>
            <Controller
              name="date_start"
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
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                placeholder="Укажите объем работ"
              />
            )}
          />
          {errors.size && <p className="error">{errors.size.message}</p>}
          <h4 style={{ marginTop: '10px' }}>Исполнитель:</h4>
          <Controller
            name="worker_id"
            control={control}
            defaultValue=""
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
          <button className="btn">Создать задачу</button>
        </form>
      </Modal>
      <Modal active={modalChangeObject} setActive={setModalChangeObject}>
        {formC}
      </Modal>
      <Modal active={modalDelete} setActive={setModalDelete}>
        <div className="modal_tusk">
          <h1>Вы хотите удалить этот объект?</h1>
          <div className="btn_wrap">
            <button
              className="btn"
              onClick={() => {
                setModalDelete(false)
              }}
              style={{ marginRight: '10px' }}
            >
              Отмена
            </button>
            <button
              className="btn"
              onClick={() => {
                deleteObject(id)
              }}
            >
              Подтвердить
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ManagerOneTask
