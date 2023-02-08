import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import logo from '../../image/logonav.png'
import {useEffect, useState} from "react";
const { Header, Content, Footer } = Layout
function NavManager() {
  const [activeNav, setActiveNav] = useState(null)
  useEffect(() => {
      if (window.location.pathname.includes('/manager-calendar')){
          setActiveNav('1')
      }
      if (window.location.pathname.includes('/manager-tasks')){
          setActiveNav('2')
      }
      if (window.location.pathname.includes('/manager-object-task')){
          setActiveNav('2')
      }
      if (window.location.pathname.includes('/manager-buy')){
          setActiveNav('3')
      }
      if (window.location.pathname.includes('/profile')){
          setActiveNav('4')
      }
  }, [])
  const auth = useAuth()
  const navigate = useNavigate()
  const items = [
    { label: 'Календарь', key: '1' }, // remember to pass the key prop
    { label: 'Объекты', key: '2' }, // which is required
    { label: 'Сводка', key: '3' }, // which is required
    { label: 'Мой профиль', key: '4' }, // which is required
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
            navigate('/manager-calendar')
          }
          if (key === '2') {
            setActiveNav('2')
            navigate('/manager-tasks')
          }
          if (key === '3') {
            setActiveNav('3')
            navigate('/manager-buy')
          }
          if (key === '4') {
            setActiveNav('4')
            navigate('/profile')
          }
        }}
      />
    </Header>
  )
}

export default NavManager
