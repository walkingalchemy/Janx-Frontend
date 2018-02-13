import React from 'react'
import TranscriptsArea from './TranscriptsArea'
import { ActionCable } from 'react-actioncable-provider'
import { API_ROOT } from '../constants'
import { HEADERS } from '../constants'
import NewChatForm from './NewChatForm'
import LoginForm from './LoginForm'
import Cable from './Cable'

class Lobby extends React.Component {

  state = {
    chats: [],
    transcripts: [],
    currentChat: null
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/chat_sessions`)
      .then(res => res.json())
      .then(data => this.setState({
        chats: data.chats,
        transcripts: data.transcripts
      }))
  }

  componentWillUnmount = () => {
    // STOP LISTENING!!!
  }

  handleClick = (id) => {
    this.setState({ currentChat: id})
  }

  handleReceivedChat = (response) => {
    console.log(response)
    this.setState({
      chats: [...this.state.chats, response]
    })
  }

  handleReceivedTranscript = (response) => {
    this.setState({ transcripts: [...this.state.transcripts, response] })
  }

  handleLogin = (event) => {
    event.preventDefault()
    fetch(`${API_ROOT}/users`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
        bio: ''
      })
    });
    event.target.username.value = ''
    event.target.password.value = ''
  }

  handleDeleteChat = () => {
    fetch(`${API_ROOT}/chat_sessions/${this.state.currentChat}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Headers': 'application/json'
      }
    });
  }

  render = () => {
    const { chats, transcripts, currentChat } = this.state
    return (
      <div className="lobby">
        <LoginForm handleLogin={this.handleLogin}/>
        <ActionCable
          channel = {{ channel: 'ChatChannel'}}
          onReceived = {this.handleReceivedChat}
        />
        { chats.length ? (
          <Cable
            chats = {chats}
            handleReceivedTranscript={this.handleReceivedTranscript}
          />
        ) : null }
        <h2>Chats</h2>
        <dl>{mapChats(chats, this.handleClick)}</dl>
        <NewChatForm />
        {currentChat ? (
          <TranscriptsArea
            chat={findCurrentChat(chats, currentChat)} transcripts={findCurrentTranscripts(transcripts, currentChat)}
            handleDeleteChat={this.handleDeleteChat}
            />)
            : null}
      </div>
    )
  }
}

export default Lobby

// helpers

const findCurrentChat = (chats, currentChat) => {
  return chats.find(
    chat => chat.id === currentChat
  )
}

const findCurrentTranscripts = (transcripts, currentChat) => {
  return transcripts.filter(
    transcript => transcript.chat_session_id === currentChat
  )
}

const mapChats = (chats, handleClick) => {
  return chats.map(chat => {
    return (
      <dt key={chat.id} onClick={() => handleClick(chat.id)}>
        {chat.title}
      </dt>
    )
  })
}
