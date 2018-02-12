import React from 'react'
import ChatShow from './ChatShow'
import ChatForm from './ChatForm'

import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';

import Cable from './Cable';


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
