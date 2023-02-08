import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchema from './validation'
import api from '../../services/api'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import logo from '../../image/logologin.jpg'
function Login() {
  const auth = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    try {
      setIsLoading(true)
      const { data: loginData } = await api.auth.login(data)
      auth.setToken(loginData.auth_token)
      const { data: user } = await api.auth.getProfile()
      auth.setUser(user[0])
    } catch (e) {
      if (e.response.status === 400) {
        setError('password', {
          type: 'manual',
          message: 'Неверный логин или пароль',
        })
        console.log('gg')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="Login_page">
      <div className="Login_form_wrap">
        <img src={logo} alt="logo" className="logologin" />
        <form className="Login_form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              className="input_login"
              type="text"
              placeholder="Логин"
              {...register('username')}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>
          <div>
            <input
              className="input_login"
              type="password"
              placeholder="Пароль"
              {...register('password')}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>
          <div>
            <button className="btn">Войти</button>
          </div>
        </form>
        <h3>Для корректной работы отключите AdBlock</h3>
      </div>
    </div>
  )
}

export default Login
