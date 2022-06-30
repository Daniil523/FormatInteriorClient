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
})
const schema = yup.object().shape({
  name: yup.string().min(6).required(),
  email: yup.string().email().required(),
  phone: yup.string().matches(phoneRegExp, 'Это поле указано неверно'),
})

export default schema
