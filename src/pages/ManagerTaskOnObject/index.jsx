import useAuth from '../../hooks/useAuth'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Select, Input, DatePicker, Checkbox, ConfigProvider } from 'antd'
import { useForm, Controller } from 'react-hook-form'
import Modal from '../../components/Modal'
import api from '../../services/api'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import locale from 'antd/lib/locale/ru_RU'
import FormChangeTask from './FormChangeTask'
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
  const [modalActive1, setModalActive1] = useState(false)
  const [modalActive2, setModalActive2] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalChange, setModalChange] = useState(false)
  const [form, setForm] = useState()
  const [task, setTask] = useState({
    service: {
      expenditure: {},
      material: {
        name: '',
        unit: {
          name: '',
        },
      },
      unit: {
        name: '',
      },
    },
    object: {
      description: '',
      location: '',
      worker_id: {
        name: '',
        phone: '',
        email: '',
      },
    },
    size: '',
    worker_id: {
      name: '',
      phone: '',
      email: '',
    },
  })
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.auth.getTusk(id)
      setTask(data[0])
    }
    fetchData()
  }, [])
  function createForm() {
    setForm(
      <FormChangeTask
        thisTask={task}
        getTaskForObject={getTaskForObject}
        setModalChange={setModalChange}
        id={id}
      />
    )
  }
  const deleteTusk = async (task) => {
    await api.auth.deleteTusk(id)
    navigate(-1)
  }
  const changeМaterialStatus = async (task) => {
    let material_status = !task.material_status
    await api.auth.changeStatus({ material_status: material_status }, task.id)
    getTaskForObject()
  }
  const getTaskForObject = async () => {
    const { data } = await api.auth.getTusk(id)
    setTask(data[0])
  }
  const changeStatus = async () => {
    let completeness = !task.completeness
    await api.auth.changeStatus({ completeness: completeness }, id)
    const { data: newData } = await api.auth.getTusk(id)
    setModalActive1(false)
    setModalActive2(false)
    setTask(newData[0])
  }
  return (
    <div>
      <h1 className="profile-h1">{task.service.name}</h1>
      <h3>
        <b>Начало работ:</b> {task.date_start}
      </h3>
      <h3>
        <b>Окончания работ:</b> {task.date_finish}
      </h3>
      <h3>
        <b>Объем работ:</b> {task.size} {task.service.unit.name}
      </h3>
      <h3>
        <b>Материал:</b>
        <br />
        {task.service.material.name} (~
        {task.service.material.expenditure * task.size}{' '}
        {task.service.material.unit.name})<br />
        <Checkbox
          checked={task.material_status}
          onClick={(e) => {
            e.stopPropagation()
          }}
          onChange={() => {
            changeМaterialStatus(task)
          }}
        >
          Преобретён
        </Checkbox>
      </h3>
      <h3>
        <b>Исполнитель: </b> <br />
        {task.worker_id.name}
        <br />
        <a href={`tel:${task.worker_id.phone}`}>{task.worker_id.phone}</a>
        <br />
      </h3>

      {task.completeness ? (
        <button
          style={{ marginRight: '10px' }}
          className="btn"
          onClick={() => {
            setModalActive2(true)
          }}
        >
          Вернуться к выполнению
        </button>
      ) : (
        <button
          style={{ marginRight: '10px' }}
          className="btn"
          onClick={() => {
            setModalActive1(true)
          }}
        >
          Выполнить
        </button>
      )}
      <button
        style={{ marginRight: '10px' }}
        className="btn"
        onClick={() => {
          createForm()
          setModalChange(true)
        }}
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
      <Modal active={modalActive1} setActive={setModalActive1}>
        <div className="modal_tusk">
          <h1>Вы подтверждаете выполнение данной задачи?</h1>
          <div className="btn_wrap">
            <button
              className="btn"
              onClick={() => {
                setModalActive1(false)
              }}
              style={{ marginRight: '10px' }}
            >
              Отмена
            </button>
            <button className="btn" onClick={changeStatus}>
              Подтвердить
            </button>
          </div>
        </div>
      </Modal>
      <Modal active={modalActive2} setActive={setModalActive2}>
        <div className="modal_tusk">
          <h1>Вернуться к выполнению данной задачи?</h1>
          <div className="btn_wrap">
            <button
              className="btn"
              onClick={() => {
                setModalActive2(false)
              }}
              style={{ marginRight: '10px' }}
            >
              Отмена
            </button>
            <button className="btn" onClick={changeStatus}>
              Подтвердить
            </button>
          </div>
        </div>
      </Modal>
      <Modal active={modalDelete} setActive={setModalDelete}>
        <div className="modal_tusk">
          <h1>Вы подтверждаете удаление данной задачи?</h1>
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
            <button className="btn" onClick={deleteTusk}>
              Подтвердить
            </button>
          </div>
        </div>
      </Modal>
      <Modal active={modalChange} setActive={setModalChange}>
        {form}
      </Modal>
    </div>
  )
}

export default ManagerOneTask
