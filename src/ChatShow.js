import React from 'react'
import ChatLine from './ChatLine'

const ChatShow = (props) => {

  const lines = props.transcript.map((line) => <ChatLine line={line[0]} date={line[1]}/>)

  return (
    <div>
      {lines}
    </div>
  )

}

export default ChatShow