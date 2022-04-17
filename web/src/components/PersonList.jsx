import React from 'react'

const PersonList = ({ persons, handleClickDelete }) => {
  if (typeof persons === 'undefined' || persons.length === 0) return ''
  return persons.map(person => (
    <p key={person.id}>
      {person.name} : {person.number}
      <button
        onClick={handleClickDelete}
        data-id={person.id}
        data-name={person.name}
      >
        delete
      </button>
    </p>
  ))
}

export default PersonList
