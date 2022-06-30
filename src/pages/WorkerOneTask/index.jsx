import useAuth from '../../hooks/useAuth'
import { useNavigate, useParams } from 'react-router-dom'
import NavWorker from '../../components/NavWorker'
import Modal from '../../components/Modal'
import validationSchema from './validation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState, useEffect } from 'react'
import api from '../../services/api'

function WorkerOneTask() {
  const auth = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()
  const [modalActive1, setModalActive1] = useState(false)
  const [modalActive2, setModalActive2] = useState(false)
  const [data, setData] = useState({
    service: {
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
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.auth.getTusk(id)
      setData(data[0])
    }
    fetchData()
  }, [])

  const changeStatus = async () => {
    let completeness = !data.completeness
    await api.auth.changeStatus({ completeness: completeness }, id)
    const { data: newData } = await api.auth.getTusk(id)
    setModalActive1(false)
    setModalActive2(false)
    setData(newData[0])
  }
  return (
    <div>
      <h1 className="profile-h1">{data.service.name}</h1>
      <h3>
        <b>Начало работ:</b> {data.date_start}
      </h3>
      <h3>
        <b>Окончания работ:</b> {data.date_finish}
      </h3>
      <h3>
        <b>Наличие материала:</b>
        {data.material_status ? <> Преобретён</> : <> Производится закупка</>}
      </h3>
      <h3>
        <b>Объем работ:</b> {data.size} {data.service.unit.name}
      </h3>
      <h3>
        <b>Адрес: </b> {data.object.location}
      </h3>
      <h3>
        <b>Описание объекта: </b>
        <br /> {data.object.description}
      </h3>
      <h3>
        <b>Руководитель проекта: </b> <br />
        {data.object.worker_id.name}
        <br />
        <a href={`tel:${data.object.worker_id.phone}`}>
          {data.object.worker_id.phone}
        </a>
        <br />
      </h3>

      {data.completeness ? (
        <button
          className="btn"
          onClick={() => {
            setModalActive2(true)
          }}
        >
          Вернуться к выполнению
        </button>
      ) : (
        <button
          className="btn"
          onClick={() => {
            setModalActive1(true)
          }}
        >
          Выполнить
        </button>
      )}
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
    </div>
  )
}

export default WorkerOneTask
