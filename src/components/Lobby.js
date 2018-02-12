import React from 'react'
import TranscriptsArea from './TranscriptsArea'
import { ActionCable } from 'react-actioncable-provider'
import { API_ROOT } from '../constants'
import NewChatForm from './NewChatForm'
// import MessagesArea from './MessagesArea'
import Cable from './Cable'

class Lobby extends React.Component {

  state = {
    chats: [],
    currentChat: null
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/chat_sessions`)
      .then(res => res.json())
      .then(chats => this.setState({ chats }))
  }

  handleClick = (id) => {
    this.setState({ currentChat: id})
  }

  handleReceivedChat = (response) => {
    debugger
    const { chat } = response
    this.setState({
      chats: [...this.state.chats, chat]
    })
  }

  handleReceivedTranscript = (response) => {
    debugger
    const chats = [...this.state.chats]
    const chat = chats.find(
      chat => chat.id === response.chat_channel_id
    )
    chat.transcripts = [...chat.transcripts, response]
    this.setState({ chats })
  }


  render = () => {
    const { chats, currentChat } = this.state
    return (
      <div className="lobby">
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
            chat={findCurrentChat(chats, currentChat)}
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

const mapChats = (chats, handleClick) => {
  return chats.map(chat => {
    return (
      <dt key={chat.id} onClick={() => handleClick(chat.id)}>
        {chat.title}
      </dt>
    )
  })
}
