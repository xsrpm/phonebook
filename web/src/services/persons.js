import axios from 'axios'

// const ROOT_PATH = 'http://localhost:3001/api';
// const ROOT_PATH = 'https://lit-taiga-49599.herokuapp.com/api';
const ROOT_PATH = '/api'
export const getPersonsList = () => {
  return axios.get(`${ROOT_PATH}/persons`).then(response => {
    return response.data
  })
}

export const createPerson = data => {
  return axios.post(`${ROOT_PATH}/persons`, data).then(response => {
    console.log(response)
    return response.data
  })
}

export const deletePerson = id => {
  return axios.delete(`${ROOT_PATH}/persons/${id}`).then(response => {
    console.log(response)
    return response.data
  })
}

export const updatePerson = (id, data) => {
  return axios.put(`${ROOT_PATH}/persons/${id}`, data).then(response => {
    console.log(response)
    return response.data
  })
}
