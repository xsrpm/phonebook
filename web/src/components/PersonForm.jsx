import React from 'react'

const PersonForm = ({ handleSubmit, handleChange, person }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input name='name' value={person.name} onChange={handleChange} />
      </div>
      <div>
        number:{' '}
        <input name='number' value={person.number} onChange={handleChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default PersonForm
