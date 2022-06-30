import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Select, Input, Tabs, Table, Typography } from 'antd'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import api from '../../services/api'
import Modal from '../../components/Modal'
import { yupResolver } from '@hookform/resolvers/yup'
const { TextArea } = Input
const { Option } = Select
const { TabPane } = Tabs
const { Text } = Typography
function ManagerTasks() {
  const [objects, setObjects] = useState([])
  const [category, setCategory] = useState([])
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getObjects()
    getCategorys()
  }, [])

  const columns = [
    {
      title: 'Задача',
      dataIndex: 'task',
      key: 'task',
    },
    {
      title: 'Материал',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Объем работ',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Количество материала',
      dataIndex: 'material_size',
      key: 'material_size',
    },
    {
      title: 'Стоимость работ',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Стоимость материала',
      dataIndex: 'material_price',
      key: 'material_price',
    },
  ]
  async function getObjects() {
    const { data } = await api.auth.getObjects()
    console.log(data)
    setObjects(data)
  }
  async function getCategorys() {
    const { data } = await api.auth.getCategories()
    console.log(data)
    setCategory(data)
  }
  async function getTasks(id) {
    const { data } = await api.auth.getObjectTask(id)
    console.log(data)
    setTasks(data)
  }
  function createTable(name) {
    let data = []
    let workSum = 0
    let materialSum = 0

    tasks.forEach((item) => {
      if (item.category.name === name) {
        data.push({
          key: item.id,
          task: item.service.name,
          material: item.service.material.name,
          size: `${item.size} ${item.service.unit.name}`,
          material_size: `${item.service.material.expenditure * item.size} ${
            item.service.material.unit.name
          }`,
          price: `${Math.ceil(item.size * item.service.price)} руб.`,
          material_price: `${Math.ceil(
            item.size *
              item.service.material.expenditure *
              item.service.material.price
          )} руб.`,
        })
        workSum += Math.ceil(item.size * item.service.price)
        materialSum += Math.ceil(
          item.size *
            item.service.material.expenditure *
            item.service.material.price
        )
      }
    })
    return (
      <Table
        columns={columns}
        dataSource={data}
        summary={(pageData) => {
          console.log(tasks)
          return data.length === 0 ? (
            <></>
          ) : (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={4}>
                Итоговая стоимость
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text>{workSum} руб.</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text>{materialSum} руб.</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )
        }}
      />
    )
  }

  return (
    <>
      <Select
        style={{ width: '100%', marginBottom: '30px' }}
        showSearch
        size="large"
        onChange={(id) => {
          getTasks(id)
        }}
        placeholder="Выберете объект"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {objects.map((item) => (
          <Option key={item.id} value={item.id}>
            {`${item.name} - ${item.location}`}
          </Option>
        ))}
      </Select>
      <Tabs>
        {category.map((item) => (
          <TabPane tab={item.name} key={item.id}>
            {createTable(item.name)}
          </TabPane>
        ))}
      </Tabs>
    </>
  )
}

export default ManagerTasks
