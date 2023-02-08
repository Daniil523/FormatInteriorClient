import {NavLink} from 'react-router-dom'
import { Layout } from 'antd'
import logo from '../../image/logonav.png'
const { Header} = Layout
function NavWorker() {
  return (
    <Header
      style={{
        position: 'fixed',
        top: '0',
        left: '50%',
        transform: 'translate(-50%)',
        width: '100%',
        zIndex: '999',
      }}
    >
      <img src={logo} alt="logo" className="logonav" />
        <NavLink to={'/worker-calendar'} className={({isActive}) => isActive ? 'nav navActive' : 'nav'}>Календарь</NavLink>
        <NavLink to={'/worker-tasks'} className={({isActive}) => isActive ? 'nav navActive' : 'nav'}>Задачи</NavLink>
        <NavLink to={'/profile'} className={({isActive}) => isActive ? 'nav navActive' : 'nav'}>Мой профиль</NavLink>
    </Header>
  )
}

export default NavWorker
