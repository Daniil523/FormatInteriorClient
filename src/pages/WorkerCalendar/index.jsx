import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import NavWorker from '../../components/NavWorker'
import Modal from '../../components/Modal'
import { Calendar, Badge, Select, Radio, Col, Row, Typography } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
import { useState, useEffect } from 'react'
import api from '../../services/api'
moment.locale('ru')
function WorkerCalendar() {
  const auth = useAuth()
  const navigate = useNavigate()
  const [modalActive, setModalActive] = useState(false)
  const [data, setData] = useState([])
  const [dataModal, setDataModal] = useState({
    date_for_head: '',
    tasks: [],
  })
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.auth.getWorkerTusks()
      setData(data)
    }
    fetchData()
  }, [])

  function getListData(value) {
    let tusks = []
    data.forEach((item) => {
      if (!item.completeness) {
        if (
          item.date_start === value.format('YYYY-MM-DD') ||
          item.date_finish === value.format('YYYY-MM-DD')
        ) {
          if (item.date_start === value.format('YYYY-MM-DD')) {
            if (item.date_start === item.date_finish) {
              tusks.push({
                completeness: item.completeness,
                id: item.id,
                material_status: item.material_status,
                date_start: item.date_start,
                date_finish: item.date_finish,
                category: item.category.name,
                name: item.service.name,
                location: item.object.location,
                color: 'yellow',
              })
            } else {
              tusks.push({
                completeness: item.completeness,
                id: item.id,
                material_status: item.material_status,
                date_start: item.date_start,
                date_finish: item.date_finish,
                category: item.category.name,
                name: item.service.name,
                location: item.object.location,
                color: 'green',
              })
            }
          } else {
            tusks.push({
              completeness: item.completeness,
              id: item.id,
              material_status: item.material_status,
              date_start: item.date_start,
              date_finish: item.date_finish,
              category: item.category.name,
              name: item.service.name,
              location: item.object.location,
              color: 'yellow',
            })
          }
        }
      }
    })
    return tusks
  }

  function dateCellRender(value) {
    const data = getListData(value)
    return (
      <ul className="events">
        {data.map((item) => (
          <li key={item.id}>
            <Badge color={item.color} text={item.name} />
            <br />
            <i>{item.location}</i>
          </li>
        ))}
      </ul>
    )
  }
  function goToTask(id) {
    navigate(`/worker-tasks/${id}`)
  }
  function createDateModal(value) {
    setDataModal({
      date_for_head: value.format('Do MMMM YYYY'),
      tasks: getListData(value),
    })
    console.log(dataModal.tasks)
    setModalActive(true)
  }
  return (
    <div>
      <Modal active={modalActive} setActive={setModalActive}>
        <h1 className="profile-h1">Задачи {dataModal.date_for_head}</h1>
        <div className="modal_calendar_wraper">
          {dataModal.tasks.length > 0 ? (
            dataModal.tasks.map((item) => (
              <div
                style={
                  item.completeness ? { backgroundColor: '#e2ffdb' } : null
                }
                key={item.id}
                onClick={() => {
                  goToTask(item.id)
                }}
                className="modal_task_card"
              >
                <h3 className="modal_task_name">
                  <b>{item.name}</b>
                </h3>
                <h4 className="modal_tusk_info">
                  <b>Начало / завершение задачи:</b>
                </h4>
                <p>
                  {item.date_start} / {item.date_finish}
                </p>
                <h4 className="modal_tusk_info">
                  <b>Адрес объекта:</b>
                </h4>
                <p>{item.location}</p>
                <h4 className="modal_tusk_info">
                  <b>Наличее материала:</b>
                </h4>
                {item.material_status ? (
                  <p>Преобретён</p>
                ) : (
                  <p>Производится закупка</p>
                )}
                <h4 className="modal_tusk_info">
                  <b>Категория задачи:</b>
                </h4>
                <p>{item.category}</p>
              </div>
            ))
          ) : (
            <h2>Задачи отсутствуют</h2>
          )}
        </div>
      </Modal>
      <Calendar
        locale={{
          lang: {
            locale: 'ru',
          },
        }}
        dateCellRender={dateCellRender}
        onSelect={createDateModal}
        mode="monthOnly"
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0
          const end = 12
          const monthOptions = []

          const current = value.clone()
          const localeData = value.localeData()
          const months = []
          for (let i = 0; i < 12; i++) {
            current.month(i)
            months.push(localeData.months(current))
          }

          for (let index = start; index < end; index++) {
            monthOptions.push(
              <Select.Option className="month-item" key={`${index}`}>
                {months[index]}
              </Select.Option>
            )
          }
          const month = value.month()

          const year = value.year()
          const options = []
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>
            )
          }
          return (
            <div style={{ padding: 8 }}>
              <Row gutter={8}>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear)
                      onChange(now)
                      setModalActive(false)
                    }}
                    value={String(year)}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    dropdownMatchSelectWidth={false}
                    value={String(month)}
                    onChange={(selectedMonth) => {
                      const newValue = value.clone()
                      newValue.month(parseInt(selectedMonth, 10))
                      console.log(selectedMonth)
                      onChange(newValue)
                      setModalActive(false)
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          )
        }}
      />
    </div>
  )
}

export default WorkerCalendar
