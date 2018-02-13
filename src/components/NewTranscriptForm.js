import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewTranscriptForm extends React.Component {
  state = {
    content: '',
    chat_id: this.props.chat_id,
    user: this.props.user
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ chat_id: nextProps.chat_id });
  };

  handleChange = e => {
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    fetch(`${API_ROOT}/transcripts`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ content: '' });
  };

  render = () => {
    return (
      <div className="newTranscriptForm">
        <form onSubmit={this.handleSubmit}>
          <label>Talk to me</label>
          <br />
          <input
            type="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewTranscriptForm;
