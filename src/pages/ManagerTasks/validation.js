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
  name: yup.string().min(5).required(),
  client_name: yup.string().min(5).required(),
  description: yup.string().min(5).required(),
  location: yup.string().required(),
  client_email: yup.string().email().required(),
  client_phone: yup
    .string()
    .required()
    .matches(phoneRegExp, 'Это поле указано неверно'),
})

export default schema
