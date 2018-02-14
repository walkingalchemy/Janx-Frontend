import React from 'react';
import NewTranscriptForm from './NewTranscriptForm';
import Cable from './Cable'
import { API_ROOT } from '../constants'

class TranscriptsArea extends React.Component {

  state = {
    currentChat: this.props.chat,
    transcripts: [],
    allChats: [],
    allUsers: [],
    user: this.props.user
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/chat_sessions/`)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        allChats: json.chats,
        transcripts: json.transcripts,
        allUsers: json.users
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    nextProps.chat.id !== this.state.id ? this.setState({currentChat: nextProps.chat}) : null
  }

  renderTranscripts = () => {
    let chosenTrans = this.state.transcripts.filter(transcript => transcript.chat_session_id == this.state.currentChat.id)
    return chosenTrans.map(tran => {
      const user = this.state.allUsers.find( user => user.id === tran.user_id)
      console.log(user)
      const time = new Date(tran.created_at).toLocaleTimeString('en-US')
      return <p key={`${time}-${tran.content}`}>{time} - {user.username}: {tran.content}</p>
    })
  };

  handleReceivedTranscript = (response) => {
    this.setState({ transcripts: [...this.state.transcripts, response] })
  }

  handleDeleteChat = () => {
    fetch(`${API_ROOT}/chat_sessions/${this.state.currentChat.id}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Headers': 'application/json'
      }
    })
    .then(response => this.props.handleReceivedChat(response))

  }

  render = () => {
  return (
      <div className="transcripts-area">
        <h2>{this.state.currentChat.title}</h2>
        <div>{this.renderTranscripts()}</div>
        <br/>
          { this.state.allChats.length ? (
            <Cable
              chats = {this.state.allChats}
              handleReceivedTranscript={this.handleReceivedTranscript}
            />
          ) : null }
        <NewTranscriptForm
          chat_id={this.state.currentChat.id} user={this.state.user}/>
        <br/>
        <button onClick={this.handleDeleteChat} id='delete-chat'>DELETE CHAT</button>
      </div>
    );
  }
};

export default TranscriptsArea;

// helpers
