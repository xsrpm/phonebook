import React from 'react'

const Filter = ({ handleChandleSearch, textFilter }) => {
  return (
    <div>
      filter:{' '}
      <input type='search' onChange={handleChandleSearch} value={textFilter} />
    </div>
  )
}

export default Filter
