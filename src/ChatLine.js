import React from 'react'

const ChatLine = ({line, date}) => {

  return (
    <div>
      <p>{date}  {line}</p>
    </div>
  )
}

export default ChatLine
