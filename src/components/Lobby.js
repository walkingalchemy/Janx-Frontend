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
    currentChat: null,
    user: ''
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/chat_sessions`)
      .then(res => res.json())
      .then(data => this.setState({
        chats: data.chats
      }))
  }

  handleClick = (id) => {
    this.setState({ currentChat: id})
  }

  handleReceivedChat = (response) => {
    if (response.status === 'deleted') {
      let newChats = this.state.chats.filter(c => c.id !== response.id)
      this.setState({chats: newChats, currentChat: null})
    } else {
      this.setState({
        chats: [...this.state.chats, response]
      })
    }

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
    })
    .then(resp => resp.json())
    .then(json => this.setState({user: json}))
    event.target.username.value = ''
    event.target.password.value = ''
  }

  handleLogout = () => {
    this.setState({user: ''})
  }

  render = () => {
    const { user, chats, transcripts, currentChat } = this.state
    return (
      <div className="lobby">
        { !user ?
        <LoginForm handleLogin={this.handleLogin}/>
        :
        <div>
          <button onClick={this.handleLogout}>Log Out</button>
          <h1> Hi {user.username}!</h1>
          <h1> Welcome to Janx</h1>
          <p>Choose a chat to join below</p>
            {currentChat ? (
              <TranscriptsArea
                user={user}
                chat={findCurrentChat(chats, currentChat)}
                handleReceivedChat={this.handleReceivedChat}
                />)
                : null}

        </div>
        }
        <ActionCable
          channel = {{ channel: 'ChatChannel'}}
          onReceived = {this.handleReceivedChat}
        />

      <h1>Chats</h1>
        {mapChats(chats, this.handleClick)}
        {user ? <NewChatForm /> : null}

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
      <p key={chat.id} onClick={() => handleClick(chat.id)}>
        {chat.title}
      </p>
    )
  })
}
