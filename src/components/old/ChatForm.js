import React from 'react'

const ChatForm = (props) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input id='line' type='text' />
        <input type='submit' value='Chat' />
      </form>
    </div>
  )
}


export default ChatForm
