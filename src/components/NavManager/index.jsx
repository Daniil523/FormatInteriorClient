import {NavLink} from 'react-router-dom'
import { Layout } from 'antd'
import logo from '../../image/logonav.png'
const { Header} = Layout
function NavManager() {
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
        <NavLink to={'/manager-calendar'} className={({isActive}) => isActive ? 'nav navActive' : 'nav'}>Календарь</NavLink>
        <NavLink to={'/manager-tasks'} className={({isActive}) => isActive ? 'nav navActive' : 'nav'}>Объекты</NavLink>
        <NavLink to={'/manager-buy'} className={({isActive}) => isActive ? 'nav navActive' : 'nav'}>Сводка</NavLink>
        <NavLink to={'/profile'} className={({isActive}) => isActive ? 'nav navActive' : 'nav'}>Мой профиль</NavLink>
    </Header>
  )
}

export default NavManager
