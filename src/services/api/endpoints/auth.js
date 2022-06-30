import axios from '../axios'

const endpoints = {
  login: (data) => axios.post('/auth/token/login/', data),
  getProfile: () => axios.get('/api/auth/users/'),
  changeUser: (data, id) => axios.put(`/api/users/${id}/`, data),
  getWorkerTusks: () => axios.get(`/api/user_tasks/`),
  getAllTusks: () => axios.get(`/api/tasks/`),
  getTusk: (id) => axios.get(`api/tasks/${id}/`),
  changeStatus: (data, id) => axios.put(`api/tasks/${id}/`, data),
  getWorkers: () => axios.get(`/api/workers/`),
  getServiceForCategorie: (id) => axios.get(`/api/service_categories/${id}/`),
  createTask: (data) => axios.post('/api/tasks/', data),
  getCategories: () => axios.get(`/api/categories/`),
  getObjectTask: (id) => axios.get(`/api/tasks_object/${id}/`),
  getServiceInCategory: (id) => axios.get(`/api/service_categories/${id}/`),
  createNewTusk: (data) => axios.post('/api/task/add/', data),
  getObject: (id) => axios.get(`api/objects/${id}/`),
  deleteObject: (id) => axios.delete(`api/objects/${id}/`),
  changeObject: (data, id) => axios.put(`api/objects/${id}/`, data),
  getObjects: () => axios.get(`api/user_objects/`),
  createObject: (data) => axios.post('api/addObject/', data),
  deleteTusk: (id) => axios.delete(`api/tasks/${id}/`),
  changeTask: (data, id) => axios.put(`api/changeTasks/${id}/`, data),
}

export default endpoints
