import useAuth from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import logo from '../../image/logonav.png'
const { Header, Content, Footer } = Layout
function NavWorker({ children }) {
  const auth = useAuth()
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
        defaultSelectedKeys={['1']}
        items={items}
        onClick={function ({ key, keyPath, domEvent }) {
          if (key === '1') {
            navigate('/worker-calendar')
          }
          if (key === '2') {
            navigate('/worker-tasks')
          }
          if (key === '3') {
            navigate('/profile')
          }
        }}
      />
    </Header>
  )
}

export default NavWorker
