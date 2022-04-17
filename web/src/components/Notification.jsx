import React from 'react'

export default function Notification ({ notificationMessage }) {
  const notification = {
    backgroundColor: '#D3D3D3',
    borderStyle: 'solid',
    borderRadius: '5px',
    paddingLeft: '15px',
    paddingRight: '15px'
  }
  const success = {
    ...notification,
    borderColor: '#077E06',
    color: '077E06'
  }
  const error = {
    ...notification,
    borderColor: '#FF0101',
    color: 'FF0101'
  }
  if (notificationMessage.message.length === 0) return ''
  return (
    <div>
      <h3 style={notificationMessage.type === 'success' ? success : error}>
        {notificationMessage.message}
      </h3>
    </div>
  )
}
