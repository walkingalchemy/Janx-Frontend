import React from 'react'
import ChatShow from './ChatShow'
import ChatForm from './ChatForm'

class ChatContainer extends React.Component {

  state = {
    transcript: []
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      transcript: [...this.state.transcript, event.target.line.value]
    })
  }

  render (){
    return (
      <div>
        <ChatShow transcript={this.state.transcript}/>
        <ChatForm handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default ChatContainer
