import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import logo from '../../image/logonav.png'
import {useEffect, useState} from "react";
const { Header} = Layout
function NavWorker() {
    const [activeNav, setActiveNav] = useState(null)
    useEffect(() => {
        if (window.location.pathname.includes('/worker-calendar')){
            setActiveNav('1')
        }
        if (window.location.pathname.includes('/worker-tasks')){
            setActiveNav('2')
        }
        if (window.location.pathname.includes('/profile')){
            setActiveNav('3')
        }
    }, [])
  const navigate = useNavigate()
  const items = [
    { label: 'Календарь', key: '1' }, // remember to pass the key prop
    { label: 'Задачи', key: '2' }, // which is required
    { label: 'Мой профиль', key: '3' }, // which is required
  ]
  return (
    <Header
      style={{
        textAlign: 'center',
        position: 'fixed',
        top: '0',
        left: '50%',
        transform: 'translate(-50%)',
        width: '100%',
        zIndex: '999',
      }}
    >
      <img src={logo} alt="logo" className="logonav" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={activeNav}
        items={items}
        onClick={function ({ key, keyPath, domEvent }) {
          if (key === '1') {
            setActiveNav('1')
            navigate('/worker-calendar')
          }
          if (key === '2') {
            setActiveNav('2')
            navigate('/worker-tasks')
          }
          if (key === '3') {
            setActiveNav('3')
            navigate('/profile')
          }
        }}
      />
    </Header>
  )
}

export default NavWorker
