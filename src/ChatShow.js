import React from 'react'
import ChatLine from './ChatLine'
import './ChatShow.css'

const ChatShow = (props) => {

  const lines = props.transcript.map((line) => <ChatLine line={line[0]} date={line[1]}/>)

  return (
    <div className='chat-show'>
      {lines}
    </div>
  )

}

export default ChatShow
