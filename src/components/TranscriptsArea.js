import React from 'react';
import NewTranscriptForm from './NewTranscriptForm';
import { API_ROOT } from '../constants'

class TranscriptsArea extends React.Component {
  // {chat: { id, title}, transcripts, handleDeleteChat, user} = this.props

  state = {
    id: '',
    title: '',
    transcripts: [],
    users: []
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/chat_sessions/${this.props.chat}`)
    .then(resp => resp.json())
    .then(json => {this.setState({
      id: json.id,
      title: json.title,
      transcripts: json.transcripts,
      users: [json.users]
    })
  }
  )
  }

  componentWillReceiveProps(nextProps) {

  }

  orderedTranscripts = () => {

    return this.state.transcripts.map(transcript => {

      // const user = this.state.users.find( user => user[0].id === transcript.user_id)
      return <div key={transcript.id}>{transcript.created_at} -  {transcript.content}</div>;
    });
    //removed username
  };

  render = () => {
  return (
      <div className="transcripts-area">
        <h2>{this.state.title}</h2>
        <div>{this.orderedTranscripts()}</div>
        <br/>
        <NewTranscriptForm chat_id={this.state.id} user={this.props.user}/>
        <button onClick={this.props.handleDeleteChat} id='delete-chat'>Delete Chat</button>

      </div>
    );
  }
};

export default TranscriptsArea;

// helpers
