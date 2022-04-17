import React from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import Notification from './components/Notification'
const App = ({
  handleSubmit,
  handleChangeNewPerson,
  newPerson,
  handleChangeSearch,
  textFilter,
  personsToShow,
  handleClickDelete,
  notificationMessage
}) => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2>Phonebook</h2>
      <Notification notificationMessage={notificationMessage} />
      <PersonForm
        handleSubmit={handleSubmit}
        handleChange={handleChangeNewPerson}
        person={newPerson}
      />
      <h2>Numbers</h2>
      <Filter
        handleChandleSearch={handleChangeSearch}
        textFilter={textFilter}
      />
      <PersonList
        persons={personsToShow}
        handleClickDelete={handleClickDelete}
      />
    </div>
  )
}

export default App
