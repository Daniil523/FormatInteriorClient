import * as yup from 'yup'
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
yup.setLocale({
  mixed: {
    required: 'Это обязательное поле',
  },
  string: {
    email: 'E-mail указан неверно',
    min: 'Это поле указано неверно',
  },
})
const schema = yup.object().shape({
  name: yup.string().min(6).required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(phoneRegExp, 'Номер телефона указан неверно'),
})

export default schema
