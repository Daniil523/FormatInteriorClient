import * as yup from 'yup'
yup.setLocale({
  mixed: {
    required: 'Это обязательное поле',
  },
})
const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})

export default schema
