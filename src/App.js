import './style.css'
import { useForm, Controller } from 'react-hook-form'
import useAuth from './hooks/useAuth'
import api from './services/api'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchema from './pages/Login/validation'
import Routes from './routes/Routes'
import { Layout, Menu } from 'antd'
import NavWorker from './components/NavWorker'
import NavManager from './components/NavManager'

const { Header, Content, Footer } = Layout

function App() {
  const auth = useAuth()
  return (
    <div className="App">
      <Layout className="layout">
        {auth.user && auth.user.position.name === 'Рабочий' ? (
          <NavWorker />
        ) : auth.user && auth.user.position.name === 'Руководитель проекта' ? (
          <NavManager />
        ) : (
          <></>
        )}
        {auth.user ? (
          <>
            <Content
              style={{
                // minHeight: '100vh',
                padding: '120px 40px 0 40px',
                backgroundColor: '#f0f2f5',
              }}
            >
              <div className="PageWraper">
                <Routes />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor: '#f0f2f5' }}>
              Format Interior ©2019
            </Footer>
          </>
        ) : (
          <Routes />
        )}
      </Layout>
    </div>
  )
}

export default App
