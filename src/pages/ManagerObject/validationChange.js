import * as yup from 'yup'
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
yup.setLocale({
  mixed: {
    required: 'Это поле указано неверно',
  },
  string: {
    email: 'Это поле указано неверно',
    min: 'Это поле указано неверно',
  },
  number: {
    min: 'Это поле указано неверно',
  },
})
const schema = yup.object().shape({
  name: yup.string().required(),
  location: yup.string().required(),
  client_name: yup.string().required(),
  client_phone: yup.string().matches(phoneRegExp, 'Это поле указано неверно'),
  client_email: yup.string().email().required(),
  description: yup.string().required(),
})

export default schema
