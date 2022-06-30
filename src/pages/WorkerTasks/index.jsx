import useAuth from '../../hooks/useAuth'
import { Radio } from 'antd'
import { useNavigate } from 'react-router-dom'
import NavWorker from '../../components/NavWorker'
import moment from 'moment'
import { useState, useEffect } from 'react'
import api from '../../services/api'
function WorkerTasks() {
  const [data, setData] = useState([])
  const [tasks, setTasks] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.auth.getWorkerTusks()
      setData(data)
      setTasks(data)
    }
    fetchData()
  }, [])
  function goToTask(id) {
    navigate(`/worker-tasks/${id}`)
  }
  function allTasks() {
    setTasks(data)
  }
  function inWorkTasks() {
    let tasks = []
    data.forEach((item) => {
      let start = new Date(item.date_start)
      let now = new Date()
      let finish = new Date(item.date_finish)
      if (start <= now && !item.completeness) {
        tasks.push(item)
      }
    })
    setTasks(tasks)
  }
  function closeTusks() {
    let tasks = []
    let now = new Date()
    var closest = Infinity
    data.forEach(function (item) {
      let date = new Date(item.date_start)
      if (date >= now && date < closest) {
        closest = item.date_start
      }
    })

    console.log(closest)
    data.forEach((item) => {
      if (item.date_start === closest) {
        tasks.push(item)
      }
    })
    setTasks(tasks)
  }
  function onChange(value) {
    console.log(value.target.value)
    if (value.target.value === 1) {
      allTasks()
    }
    if (value.target.value === 2) {
      inWorkTasks()
    }
    if (value.target.value === 3) {
      closeTusks()
    }
  }

  return (
    <div>
      <Radio.Group
        defaultValue={1}
        size="large"
        style={{ marginBottom: '30px' }}
        onChange={onChange}
      >
        <Radio.Button value={1}>Все задачи</Radio.Button>
        <Radio.Button value={2}>Выполняемые</Radio.Button>
        <Radio.Button value={3}>Ближайшие</Radio.Button>
      </Radio.Group>
      <div className="modal_calendar_wraper">
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <div
              onClick={() => {
                goToTask(item.id)
              }}
              key={item.id}
              className="modal_task_card"
              style={item.completeness ? { backgroundColor: '#e2ffdb' } : {}}
            >
              <h3 className="modal_task_name">
                <b>{item.service.name}</b>
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
              <p>{item.object.location}</p>
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
              <p>{item.category.name}</p>
            </div>
          ))
        ) : (
          <h2 style={{ marginTop: '40px' }}>Задачи отсутствуют</h2>
        )}
      </div>
    </div>
  )
}

export default WorkerTasks
