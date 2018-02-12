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
      transcript: [...this.state.transcript, [event.target.line.value, new Date().toLocaleTimeString()]]
    })
    event.target.line.value = ''
    this.postHelper()
  }

  postHelper = () => {
    fetch(`http://localhost:3001/chat_sessions`, {
      method: 'POST',
      body: JSON.stringify(this.state.transcript),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res=>res.json()).then(data=>console.log(data))
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
