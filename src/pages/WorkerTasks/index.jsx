import useAuth from '../../hooks/useAuth'
import {Radio, Space, Table, Tag} from 'antd'
import { useNavigate } from 'react-router-dom'
import NavWorker from '../../components/NavWorker'
import { useState, useEffect } from 'react'
import api from '../../services/api'
import Modal from '../../components/Modal'
function WorkerTasks() {
  const [data, setData] = useState([])
  const [tasks, setTasks] = useState([])
  const [filters, setFilters] = useState([])
  const [modalActive1, setModalActive1] = useState(false)
  const [modalActive2, setModalActive2] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    let tasks = []
    let filters = []
    const fetchData = async () => {
      const { data } = await api.auth.getWorkerTusks()
      let stack = []
      data.forEach((item) => {
        tasks.push({
          key: item.id,
          name: item.service.name,
          date_start: item.date_start,
          date_finish: item.date_finish,
          address: item.object.location,
          status: item.completeness,
          material_status: item.material_status,
          size: item.size,
          size_unit: item.service.unit.name,
          object_description: item.object.description,
          manager: item.object.worker_id,
        })
        if (!stack.includes(item.object.location)) {
          filters.push({
            text: item.object.location,
            value: item.object.location,
          })
          stack.push(item.object.location)
        }
      })
      setData(data)
      setTasks(tasks)
      setFilters(filters)
    }
    fetchData()
    function createTable() {
      let data = []
      tasks.forEach((item) => {
        data.push({
          name: item.service.name,
          date_start: item.date_start,
          date_finish: item.date_finish,
          address: item.object.location,
        })
      })
      setData(data)
    }
    createTable()
  }, [])
  const changeStatus = async (id) => {
    let completeness = !data.completeness
    await api.auth.changeStatus({ completeness: completeness }, id)
    const { data: newData } = await api.auth.getTusk(id)
    setModalActive1(false)
    setModalActive2(false)
    setData(newData[0])
  }
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
  const columns = [
    {
      title: 'Задача',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {goToTask(record.key)}}>{record.name}</a>
        </Space>
      ),
    },
    {
      title: 'Статус',
      key: 'status',
      dataIndex: 'status',
      filters: [
        {
          text: 'Завершено',
          value: true,
        },
        {
          text: 'В работе',
          value: false,
        },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, { status }) => (

          status ? <Tag color='green'>
          Завершено
        </Tag> : <Tag color='blue'>
      В работе
    </Tag>)
    },
    {
      title: 'Начало',
      dataIndex: 'date_start',
      key: 'date_start',
      sorter: (a, b) => new Date(a.date_start) - new Date(b.date_start),
    },
    {
      title: 'Завершение',
      dataIndex: 'date_finish',
      key: 'date_finish',
      sorter: (a, b) => new Date(a.date_finish) - new Date(b.date_finish),
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
      filters: filters,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={tasks} expandable={{
        expandedRowRender: record => <>
          <h4>
            <b>Описание объекта: </b>
            <br /> {record.object_description}
          </h4>
          <h4>
            <b>Руководитель проекта: </b> <br />
            {record.manager.name}
            <br />
            <a href={`tel:${record.manager.phone}`}>
              {record.manager.phone}
            </a>
            <br />
          </h4>
          <h4>
            <b>Наличие материала:</b>
            {record.material_status ? <> Преобретён</> : <> Производится закупка</>}
          </h4>
          <h4>
            <b>Объем работ:</b> {record.size} {record.size_unit}
          </h4>
        </>,
        rowExpandable: record => record.name !== 'Not Expandable',
      }}/>
    </div>
  )
}

export default WorkerTasks
