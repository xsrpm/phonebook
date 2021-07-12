const personRouter = require('express').Router()
const {
  getAllPersons,
  getOnePerson,
  savePerson,
  deletePerson,
  updatedPerson,
  getPersonInfo
} = require('../models/person')

personRouter.get('/', (request, response) => {
  getAllPersons().then(personas => {
    response.json(personas)
  })
})

personRouter.get('/info', (request, response) => {
  getPersonInfo().then(res => {
    response.send(res)
  })
})

personRouter.get('/:id', (request, response, next) => {
  getOnePerson(request.params.id)
    .then(person => {
      if (person) {
        response.status(202).json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personRouter.post('/', (request, response, next) => {
  const body = request.body
  savePerson(body)
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

personRouter.put('/:id', (request, response, next) => {
  const body = request.body

  updatedPerson(body, request.params.id)
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

personRouter.delete('/:id', (request, response, next) => {
  deletePerson(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = personRouter
