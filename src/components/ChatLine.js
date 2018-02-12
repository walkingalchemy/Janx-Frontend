import React from 'react'
import './ChatShow.css'

const ChatLine = ({line, date}) => {

  return (
    <div>
      <div className='time'>{date}</div>
      <div className='text'>{line}</div>
    </div>
  )
}

export default ChatLine
