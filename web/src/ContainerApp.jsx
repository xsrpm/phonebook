import React, { useState, useEffect } from 'react'
import App from './App'
import {
  getPersonsList,
  createPerson,
  deletePerson,
  updatePerson
} from './services/persons'

export default function ContainerApp () {
  const [persons, setPersons] = useState([])
  const [personsToShow, setPersonsToShow] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [textFilter, setTextFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({
    message: '',
    type: ''
  })
  useEffect(() => {
    getPersonsList().then(persons => {
      setPersons(persons)
      setPersonsToShow(persons)
    })
  }, [])
  const handleChangeSearch = e => {
    setTextFilter(e.target.value)
    setPersonsToShow(
      persons.filter(person => {
        return person.name.toLowerCase().includes(e.target.value)
      })
    )
  }

  const sendNotification = (message, type) => {
    setNotificationMessage({ message, type })
    setTimeout(() => {
      setNotificationMessage({ message: '', type: '' })
    }, 3000)
  }
  const handleClickDelete = e => {
    console.log(e.target.dataset.id)
    console.log(e.target.dataset.name)
    if (confirm(`Delete ${e.target.dataset.name} ?`)) {
      deletePerson(e.target.dataset.id)
        .then(response => {
          console.log(`${response}`)
          sendNotification(
            `the person '${e.target.dataset.name}' was deleted from server`,
            'success'
          )
        })
        .catch(error => {
          console.log(`${error}`)
          sendNotification(
            `the person '${e.target.dataset.name}' was already deleted from server`,
            'error'
          )
        })
        .finally(() => {
          getPersonsList().then(persons => {
            setPersons(persons)
            setPersonsToShow(persons)
          })
        })
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    const person = persons.filter(person => person.name === newPerson.name)[0]
    /// console.log(person);
    if (typeof person !== 'undefined') {
      if (
        confirm(
          `${person.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        updatePerson(person.id, newPerson)
          .then(returnedPerson => {
            // console.log(returnedPerson);
            getPersonsList().then(persons => {
              setPersons(persons)
              setPersonsToShow(persons)
            })
            sendNotification(`Updated ${newPerson.name}`, 'success')
            setTextFilter('')
            setNewPerson({ name: '', number: '' })
            /*
          setPersons(prevPersons =>
            prevPersons.map(person =>
              person.id !== newPerson.id ? person : returnedPerson
            )
          );
          setPersonsToShow(prevPersons =>
            prevPersons.map(person =>
              person.id !== newPerson.id ? person : returnedPerson
            )
          );
          */
          })
          .catch(error => {
            console.log(error.response.data)
            sendNotification(error.response.data.error, 'error')
          })
      }
    } else {
      createPerson(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setPersonsToShow(persons.concat(response))
          setNewPerson({ name: '', number: '' })
          setTextFilter('')
          sendNotification(`Added ${newPerson.name}`, 'success')
        })
        .catch(error => {
          console.log(error.response.data)
          sendNotification(error.response.data.error, 'error')
        })
    }
  }
  const handleChangeNewPerson = e => {
    setNewPerson({
      ...newPerson,
      [e.target.name]: e.target.value
    })
  }
  return (
    <App
      handleSubmit={handleSubmit}
      handleChangeNewPerson={handleChangeNewPerson}
      newPerson={newPerson}
      handleChangeSearch={handleChangeSearch}
      textFilter={textFilter}
      personsToShow={personsToShow}
      handleClickDelete={handleClickDelete}
      notificationMessage={notificationMessage}
    />
  )
}
