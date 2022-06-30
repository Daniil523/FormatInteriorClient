import * as yup from 'yup'
const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
yup.setLocale({
  mixed: {
    required: 'Это поле указано неверно',
    // notType: 'Это поле указано неверно',
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
  date_start: yup.string().required(),
  date_finish: yup.string().required(),
  size: yup.number().min(0).required(),
  worker_id: yup.string().required(),
})

export default schema
