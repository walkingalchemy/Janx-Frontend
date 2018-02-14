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

  handleReceivedTranscript = (response) => {
    this.setState({ transcripts: [...this.state.transcripts, response], allUsers: [...this.state.allUsers, response.user] })
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

  renderTranscripts = () => {
    let chosenTrans = this.state.transcripts.filter(transcript => transcript.chat_session_id == this.state.currentChat.id)
    return chosenTrans.map(tran => {
      let user = this.state.allUsers.find( user => user.id === tran.user_id)
      user ? null : user = this.state.user
      const time = new Date(tran.created_at).toLocaleTimeString('en-US')
      return <tr className="transcript-row" key={tran.id}><td>{time}</td><td className="name">{user.username}:</td><td className="content"> {tran.content}</td></tr>
    })
  };

  render = () => {
    console.log(this.state.allUsers)
  return (
    <div>
      <h2>{this.state.currentChat.title}</h2>
      <div className="transcripts-area">
        <table id="transcripts"><tbody>{this.renderTranscripts()}</tbody></table>
        <br/>
          { this.state.allChats.length ? (
            <Cable
              chats = {this.state.allChats}
              handleReceivedTranscript={this.handleReceivedTranscript}
            />
          ) : null }
      </div>
      <NewTranscriptForm
        chat_id={this.state.currentChat.id} user={this.state.user}/>
      <br/>
      <button onClick={this.handleDeleteChat} id='delete-chat'>DELETE CHAT</button>
    </div>
    );
  }
};

export default TranscriptsArea;
